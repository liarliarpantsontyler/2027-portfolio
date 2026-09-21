/** Offline 60 fps rendering of the real local Klocky app. See docs/klocky-capture.md. */
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { once } from "node:events";
import fs from "node:fs/promises";
import path from "node:path";
const require = createRequire(
  path.resolve(process.env.KLOCKY_ROOT || "../Klocky", "package.json"),
);
const { chromium } = require("@playwright/test");
const origin = process.env.KLOCKY_URL || "http://127.0.0.1:5173";
const output = path.resolve(
  process.env.CAPTURE_OUT || "/private/tmp/klocky-renders",
);
await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: ["--force-color-profile=srgb"],
});

// Step product rAF/timers at exactly 1/60 s, so capture speed cannot drop frames.
// CSS/Web Animations are advanced on the same timeline. Every frame is a new render; intermediate JPEGs use maximum quality.
function installTimeline() {
  let now = 0,
    next = 1;
  const frames = new Map(),
    timers = new Map(),
    animations = new WeakMap();
  const NativeDate = Date;
  const epoch = new NativeDate("2026-09-20T20:24:10Z").getTime();
  window.Date = class extends NativeDate {
    constructor(...args) {
      super(...(args.length ? args : [epoch]));
    }
    static now() {
      return epoch;
    }
  };
  Object.defineProperty(performance, "now", { value: () => now });
  window.requestAnimationFrame = (cb) => {
    const id = next++;
    frames.set(id, cb);
    return id;
  };
  window.cancelAnimationFrame = (id) => frames.delete(id);
  window.setTimeout = (cb, ms = 0, ...args) => {
    const id = next++;
    timers.set(id, {
      cb: () => typeof cb === "function" && cb(...args),
      at: now + Math.max(1, Number(ms) || 0),
    });
    return id;
  };
  window.clearTimeout = (id) => timers.delete(id);
  window.setInterval = (cb, ms = 0, ...args) => {
    const id = next++;
    timers.set(id, {
      cb: () => cb(...args),
      at: now + Math.max(1, ms),
      interval: Math.max(1, ms),
    });
    return id;
  };
  window.clearInterval = window.clearTimeout;
  window.__captureStep = (t) => {
    now = t;
    for (const [id, timer] of [...timers])
      if (timer.at <= now) {
        if (timer.interval) timer.at += timer.interval;
        else timers.delete(id);
        timer.cb();
      }
    const pending = [...frames];
    frames.clear();
    for (const [, cb] of pending) cb(now);
  };
  window.__captureCSS = () => {
    for (const a of document.getAnimations()) {
      if (!animations.has(a)) {
        animations.set(a, now);
        a.pause();
      }
      const elapsed = now - animations.get(a);
      const end = a.effect.getComputedTiming().endTime;
      if (Number.isFinite(end) && elapsed >= end) {
        try {
          a.finish();
        } catch {}
      } else a.currentTime = elapsed;
    }
  };
  localStorage.setItem("klocky.installHintDismissed", "1");
}

async function prepare(name, portrait = false) {
  const context = await browser.newContext({
    viewport: portrait
      ? { width: 390, height: 844 }
      : name === "hero"
        ? { width: 1688, height: 780 }
        : { width: 844, height: 390 },
    deviceScaleFactor: name === "hero" ? 1.5 : 3,
    timezoneId: name === "onboarding" ? "America/New_York" : "America/Chicago",
    locale: "en-US",
    reducedMotion: "no-preference",
  });
  await context.addInitScript(installTimeline);
  const page = await context.newPage();
  page.captureScale = name === "hero" ? 1.5 : 3;
  page.captureSession = await context.newCDPSession(page);
  console.log(`Preparing ${name}`);
  await page.goto(
    origin +
      (name === "hero" || name === "onboarding"
        ? "/"
        : `/display?preset=${name === "customization" ? "meridian" : name === "fullscreen" ? "sunday" : name}`),
  );
  await page.evaluate(() => document.fonts.ready);
  // Hydrate and compile shaders at t=0, without consuming animation time.
  for (let n = 0; n < 10; n++) {
    await page.evaluate(() => {
      window.__captureStep(0);
      window.__captureCSS();
    });
    await screenshot(page);
  }
  await page.locator('canvas[data-status="ready"]').first().waitFor();
  return { context, page };
}
async function screenshot(page, format = "jpeg") {
  const offset = await page.evaluate(() => ({ x: scrollX, y: scrollY }));
  const result = await page.captureSession.send("Page.captureScreenshot", {
    format,
    ...(format === "jpeg" ? { quality: 100 } : {}),
    optimizeForSpeed: true,
    captureBeyondViewport: false,
    clip: { ...offset, ...page.viewportSize(), scale: page.captureScale },
  });
  return Buffer.from(result.data, "base64");
}
async function frame(page, t) {
  await page.evaluate((t) => window.__captureStep(t), t);
  await page.evaluate(() => window.__captureCSS());
  return screenshot(page);
}
async function render(
  name,
  seconds,
  { portrait = false, warm = 0, actions = [] } = {},
) {
  const { context, page } = await prepare(name, portrait);
  for (let i = 0; i < warm * 60; i++) {
    await page.evaluate((t) => window.__captureStep(t), (i * 1000) / 60);
    await page.evaluate(() => window.__captureCSS());
  }
  const raw = path.join(output, `${name}-raw.mp4`);
  const ff = spawn("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-f",
    "image2pipe",
    "-framerate",
    "60",
    "-vcodec",
    "mjpeg",
    "-i",
    "pipe:0",
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "-crf",
    "16",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    raw,
  ]);
  ff.stderr.on("data", (d) => process.stderr.write(d));
  const started = Date.now();
  for (let i = 0; i < Math.round(seconds * 60); i++) {
    for (const action of actions)
      if (action.frame === i) await action.run(page);
    const png = await frame(page, ((warm * 60 + i) * 1000) / 60);
    if (i === 60)
      await fs.writeFile(
        path.join(output, `${name}-sample.png`),
        await screenshot(page, "png"),
      );
    if (!ff.stdin.write(png)) await once(ff.stdin, "drain");
    if (i % 120 === 0)
      console.log(
        `${name}: ${i}/${seconds * 60} frames (${Math.round((Date.now() - started) / 1000)}s elapsed)`,
      );
  }
  ff.stdin.end();
  const [code] = await once(ff, "close");
  if (code !== 0) throw new Error(`ffmpeg ${code}`);
  await fs.writeFile(
    path.join(output, `${name}-final.png`),
    await screenshot(page, "png"),
  );
  await context.close();
  console.log(
    `Done ${name}: ${raw} in ${Math.round((Date.now() - started) / 1000)}s`,
  );
}
// Gesture-like scrolling is captured on every frame, never jumped between shots.
function scrollAction(at, selector, container = null, duration = 1.2) {
  return {
    frame: Math.round(at * 60),
    run: (page) =>
      page.evaluate(
        ({ selector, container, duration }) => {
          const target = document.querySelector(selector);
          const root = container
            ? document.querySelector(container)
            : document.scrollingElement;
          if (!target || !root)
            throw new Error(`Missing scroll target ${selector}`);
          const from = root.scrollTop;
          const bounds = container
            ? root.getBoundingClientRect()
            : { top: 0, height: innerHeight };
          const rect = target.getBoundingClientRect();
          const to = Math.max(
            0,
            Math.min(
              root.scrollHeight - root.clientHeight,
              from +
                rect.top -
                bounds.top -
                bounds.height / 2 +
                rect.height / 2,
            ),
          );
          const start = performance.now();
          const move = (now) => {
            const t = Math.min(1, (now - start) / (duration * 1000));
            const eased = t * t * (3 - 2 * t);
            root.scrollTop = from + (to - from) * eased;
            if (t < 1) requestAnimationFrame(move);
          };
          requestAnimationFrame(move);
        },
        { selector, container, duration },
      ),
  };
}
const click = (at, selector) => ({
  frame: Math.round(at * 60),
  run: async (page) => {
    const target = page.locator(selector);
    await target.evaluate((e) => {
      const r = e.getBoundingClientRect();
      if (
        r.width === 0 ||
        r.height === 0 ||
        r.top < 0 ||
        r.bottom > innerHeight
      )
        throw new Error(`Action outside viewport: ${e.textContent}`);
      e.click();
    });
  },
});
const onboardingActions = [
  click(3, ".onboarding-primary"),
  scrollAction(5, 'input[aria-label="Timezone"]'),
  {
    frame: 8 * 60,
    run: (page) =>
      page.locator('input[aria-label="Timezone"]').evaluate((e) => {
        Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          "value",
        ).set.call(e, "America/Chicago");
        e.dispatchEvent(new Event("input", { bubbles: true }));
      }),
  },
  {
    frame: 10 * 60,
    run: (page) =>
      page
        .getByRole("button", { name: "24 hour", exact: true })
        .evaluate((e) => e.click()),
  },
  {
    frame: 12 * 60,
    run: (page) =>
      page
        .getByRole("button", { name: "12 hour", exact: true })
        .evaluate((e) => e.click()),
  },
  scrollAction(13, ".onboarding-location .onboarding-primary"),
  click(15, ".onboarding-location .onboarding-primary"),
  scrollAction(17, ".onboarding-clock-list-item:first-child"),
  click(20, ".onboarding-clock-list-item:first-child .onboarding-clock-cta"),
];
const customizationActions = [
  click(3, ".edit-button"),
  click(6, 'button[aria-label="Background Chroma"]'),
  scrollAction(8, ".editor-step-continue", ".editor-scroll"),
  click(10, ".editor-step-continue"),
  scrollAction(11, 'button[aria-label="Fold"]', ".editor-scroll"),
  click(13, 'button[aria-label="Fold"]'),
  scrollAction(
    15,
    'button[aria-controls="editor-font-content"]',
    ".editor-scroll",
  ),
  click(17, 'button[aria-controls="editor-font-content"]'),
  scrollAction(18, ".typeface-trigger", ".editor-scroll"),
  click(20, ".typeface-trigger"),
  scrollAction(
    20.5,
    '.typeface-menu [role="option"]:nth-child(5)',
    ".editor-scroll",
  ),
  click(22, '.typeface-menu [role="option"]:nth-child(5)'),
  scrollAction(22.5, ".typeface-trigger", ".editor-scroll", 0.8),
  {
    frame: 24 * 60,
    run: (page) => page.locator(".display-stage").evaluate((e) => e.click()),
  },
];
try {
  const shot = process.argv[2] || "sample";
  if (shot === "inspect-hero") {
    const { page, context } = await prepare("hero");
    for (let i = 0; i < 60; i++) {
      await page.evaluate((t) => window.__captureStep(t), (i * 1000) / 60);
      await page.evaluate(() => window.__captureCSS());
    }
    await fs.writeFile(
      path.join(output, "hero-framing.png"),
      await screenshot(page, "png"),
    );
    await context.close();
  } else if (shot === "benchmark") await render("meridian", 1);
  else if (shot === "sample") await render("index", 2, { warm: 5 });
  else if (
    ["meridian", "fold", "sunday", "lucent", "index", "quarters"].includes(shot)
  )
    await render(shot, 15, { warm: 5 });
  else if (shot === "onboarding")
    await render(shot, 30, { portrait: true, actions: onboardingActions });
  else if (shot === "customization")
    await render(shot, 32, { portrait: true, actions: customizationActions });
  else if (shot === "inspect-onboarding" || shot === "inspect-customization") {
    const name = shot.replace("inspect-", "");
    const { page, context } = await prepare(name, true);
    const actions =
      name === "onboarding" ? onboardingActions : customizationActions;
    for (let i = 0; i < 28 * 60; i++) {
      for (const a of actions)
        if (a.frame === i) {
          console.log(`Action ${i / 60}`);
          await a.run(page);
        }
      await page.evaluate((t) => window.__captureStep(t), (i * 1000) / 60);
      await page.evaluate(() => window.__captureCSS());
      if (i % 120 === 0) {
        await fs.writeFile(
          path.join(output, `${name}-step-${i / 60}.png`),
          await screenshot(page, "png"),
        );
        console.log(`Step ${i / 60}`);
      }
    }
    console.log("Final URL", page.url());
    await context.close();
  } else if (shot === "hero") await render(shot, 14);
  else if (shot === "fullscreen") await render(shot, 14);
  else throw new Error(`Unknown shot ${shot}`);
} finally {
  await browser.close();
}
