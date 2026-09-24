/**
 * Prepare homepage cover MP4s for web delivery (H.264, no audio, +faststart).
 *
 * - remux: stream copy only — no generation loss; use when bitrate is already sensible.
 * - compress: libx264 slow CRF 23 — for oversized Rotato exports (Klocky, Teladoc tiles).
 *
 * Matches project conventions: yuv420p, -an, +faststart (see encode-klocky.mjs).
 *
 * Usage: node scripts/encode-home-covers.mjs
 */
import { spawn } from "node:child_process";
import { once } from "node:events";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public");

/** @type {{ path: string; mode: "remux" | "compress" }[]} */
const TARGETS = [
  { path: "home/klocky-signal.mp4", mode: "compress" },
  { path: "home/ratings-cover.mp4", mode: "remux" },
  { path: "home/creativeos-cover.mp4", mode: "remux" },
  { path: "home/oontelligence-cover.mp4", mode: "remux" },
  { path: "home/teladoc-screens-cover.mp4", mode: "compress" },
  { path: "work/fun-01.mp4", mode: "remux" },
];

async function ffmpeg(args) {
  const child = spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], {
    stdio: "inherit",
  });
  const [code] = await once(child, "close");
  if (code !== 0) throw new Error(`ffmpeg exited ${code}`);
}

async function processTarget(relativePath, mode) {
  const input = path.join(root, relativePath);
  await fs.access(input);
  const dir = path.dirname(input);
  const base = path.basename(input, ".mp4");
  const staging = path.join(dir, `${base}.encode-staging.mp4`);
  const before = (await fs.stat(input)).size;

  if (mode === "remux") {
    await ffmpeg(["-i", input, "-c", "copy", "-movflags", "+faststart", staging]);
  } else {
    await ffmpeg([
      "-i",
      input,
      "-an",
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "23",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      staging,
    ]);
  }

  await fs.rename(staging, input);
  const after = (await fs.stat(input)).size;
  const delta = ((1 - after / before) * 100).toFixed(1);
  console.log(
    `${relativePath} (${mode}): ${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024 / 1024).toFixed(2)}MB (${delta}% smaller)`,
  );
}

for (const { path: target, mode } of TARGETS) {
  console.log(`\n${target}…`);
  await processTarget(target, mode);
}

console.log("\nDone.");
