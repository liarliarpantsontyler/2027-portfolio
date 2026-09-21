import { createRequire } from "node:module";
import path from "node:path";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const require = createRequire(
  path.resolve(process.env.KLOCKY_ROOT || "../Klocky", "package.json"),
);
const { chromium, webkit } = require("@playwright/test");
const base = process.env.PORTFOLIO_URL || "http://localhost:3000";
const output = "/private/tmp/klocky-qa";
await fs.mkdir(output, { recursive: true });
for (const [name, engine] of [
  ["chromium", chromium],
  ["webkit", webkit],
]) {
  const browser = await engine.launch({ headless: true });
  try {
    for (const mobile of [false, true]) {
      const context = await browser.newContext({
        viewport: mobile
          ? { width: 390, height: 844 }
          : { width: 1440, height: 1000 },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();
      const requested = [];
      const errors = [];
      page.on("request", (r) => {
        if (r.url().endsWith(".mp4")) requested.push(r.url());
      });
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(`${base}/work/klocky/`);
      await page.waitForTimeout(700);
      assert(
        !requested.some((s) => /\/(index|quarters)\.mp4$/.test(s)),
        "Distant videos requested before scrolling",
      );
      await page
        .locator("#klocky-clock-collection figure")
        .first()
        .scrollIntoViewIfNeeded();
      const first = page.locator("#klocky-clock-collection video").first();
      await first.waitFor();
      await page.waitForFunction(() => {
        const v = document.querySelector("#klocky-clock-collection video");
        return v && !v.paused && v.currentTime > 0.1;
      });
      await page
        .getByRole("button", { name: "Pause animations", exact: true })
        .click();
      await page.waitForFunction(() =>
        [...document.querySelectorAll("#klocky-clock-collection video")].every(
          (v) => v.paused,
        ),
      );
      await page
        .getByRole("button", { name: "Resume animations", exact: true })
        .focus();
      await page.keyboard.press("Enter");
      await page.waitForFunction(() =>
        [...document.querySelectorAll("#klocky-clock-collection video")].some(
          (v) => !v.paused,
        ),
      );
      // Visibility event handling, independent of headless window-manager behavior.
      await page.evaluate(() => {
        Object.defineProperty(document, "hidden", {
          configurable: true,
          value: true,
        });
        document.dispatchEvent(new Event("visibilitychange"));
      });
      await page.waitForFunction(() =>
        [...document.querySelectorAll(".motion-video video")].every(
          (v) => v.paused,
        ),
      );
      await page.evaluate(() => {
        delete document.hidden;
        document.dispatchEvent(new Event("visibilitychange"));
      });
      await page.waitForFunction(() =>
        [...document.querySelectorAll("#klocky-clock-collection video")].some(
          (v) => !v.paused,
        ),
      );
      await page.screenshot({
        path: `${output}/${name}-${mobile ? "mobile" : "desktop"}.png`,
      });
      await page.locator(".klocky-credit").scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      assert(
        await page
          .locator("#klocky-clock-collection video")
          .evaluateAll((vs) => vs.every((v) => v.paused)),
        "Offscreen videos still playing",
      );
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForFunction(
        () => document.querySelectorAll(".motion-video video").length === 0,
      );
      assert.equal(
        await page.locator("#klocky-clock-collection img").count(),
        6,
      );
      assert.equal(
        await page
          .getByRole("button", { name: "Pause animations", exact: true })
          .isVisible(),
        false,
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
        "Horizontal overflow",
      );
      assert.deepEqual(errors, []);
      await context.close();
      console.log(
        `${name} ${mobile ? "mobile" : "desktop"}: playback, lazy loading, keyboard pause, visibility, reduced motion, geometry PASS`,
      );
    }
    const context = await browser.newContext();
    await context.route("**/work/klocky/meridian.mp4", (r) => r.abort());
    const p = await context.newPage();
    await p.goto(`${base}/work/klocky/`);
    await p
      .locator("#klocky-clock-collection figure")
      .first()
      .scrollIntoViewIfNeeded();
    await p
      .locator("#klocky-clock-collection figure")
      .first()
      .locator("img")
      .waitFor();
    await p.waitForTimeout(1000);
    assert.equal(
      await p
        .locator("#klocky-clock-collection figure")
        .first()
        .locator("video")
        .count(),
      0,
    );
    await context.close();
    console.log(`${name}: failed media poster PASS`);
  } finally {
    await browser.close();
  }
}
