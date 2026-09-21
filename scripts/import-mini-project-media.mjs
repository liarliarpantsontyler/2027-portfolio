/**
 * Copy mini-project stills into public/ and print metadata for content/home.ts.
 *
 * Default: byte-copy (no re-encode). Optional --webp at quality 92.
 *
 * Usage:
 *   node scripts/import-mini-project-media.mjs --out public/work/my-slug ./shots/*.jpg
 *   node scripts/import-mini-project-media.mjs --webp --out public/work/my-slug ~/Downloads/frame.png
 */

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function usage() {
  console.error(`Usage: node scripts/import-mini-project-media.mjs [--webp] --out <destDir> <files-or-dirs...>`);
  process.exit(1);
}

function toKebab(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

async function collectInputs(paths) {
  const files = [];
  for (const input of paths) {
    const stat = await fs.stat(input);
    if (stat.isDirectory()) {
      const entries = await fs.readdir(input);
      for (const entry of entries) {
        const full = path.join(input, entry);
        const s = await fs.stat(full);
        if (s.isFile() && IMAGE_EXT.has(path.extname(entry).toLowerCase())) files.push(full);
      }
    } else if (stat.isFile() && IMAGE_EXT.has(path.extname(input).toLowerCase())) {
      files.push(input);
    }
  }
  return files.sort();
}

function rgbToHex(r, g, b) {
  const h = (n) => n.toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

/** Sample corners + edge midpoints; pick the most common bucket (flat field backgrounds). */
async function sampleBackground(inputPath) {
  const meta = await sharp(inputPath).metadata();
  const w = meta.width ?? 1;
  const h = meta.height ?? 1;
  const sample = Math.max(4, Math.min(24, Math.floor(Math.min(w, h) * 0.04)));

  const regions = [
    { left: 0, top: 0 },
    { left: w - sample, top: 0 },
    { left: 0, top: h - sample },
    { left: w - sample, top: h - sample },
    { left: Math.floor(w / 2 - sample / 2), top: 0 },
    { left: Math.floor(w / 2 - sample / 2), top: h - sample },
    { left: 0, top: Math.floor(h / 2 - sample / 2) },
    { left: w - sample, top: Math.floor(h / 2 - sample / 2) },
  ];

  const buckets = new Map();
  for (const { left, top } of regions) {
    const { data } = await sharp(inputPath)
      .extract({
        left: Math.max(0, Math.min(left, w - 1)),
        top: Math.max(0, Math.min(top, h - 1)),
        width: Math.min(sample, w),
        height: Math.min(sample, h),
      })
      .resize(1, 1)
      .raw()
      .toBuffer({ resolveWithObject: true });
    const r = data[0];
    const g = data[1];
    const b = data[2];
    const key = `${Math.round(r / 8)}-${Math.round(g / 8)}-${Math.round(b / 8)}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }

  let best = regions[0];
  let bestCount = -1;
  let bestRgb = [0, 0, 0];
  for (let i = 0; i < regions.length; i++) {
    const { left, top } = regions[i];
    const { data } = await sharp(inputPath)
      .extract({
        left: Math.max(0, Math.min(left, w - 1)),
        top: Math.max(0, Math.min(top, h - 1)),
        width: Math.min(sample, w),
        height: Math.min(sample, h),
      })
      .resize(1, 1)
      .raw()
      .toBuffer({ resolveWithObject: true });
    const r = data[0];
    const g = data[1];
    const b = data[2];
    const key = `${Math.round(r / 8)}-${Math.round(g / 8)}-${Math.round(b / 8)}`;
    const count = buckets.get(key) ?? 0;
    if (count > bestCount) {
      bestCount = count;
      bestRgb = [r, g, b];
      best = regions[i];
    }
  }

  void best;
  return rgbToHex(bestRgb[0], bestRgb[1], bestRgb[2]);
}

async function runCwebp(input, output) {
  await new Promise((resolve, reject) => {
    const child = spawn("cwebp", ["-q", "92", input, "-o", output], { stdio: "inherit" });
    child.on("error", reject);
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`cwebp exited ${code}`))));
  });
}

async function runFfmpegWebp(input, output) {
  await new Promise((resolve, reject) => {
    const child = spawn(
      "ffmpeg",
      ["-hide_banner", "-loglevel", "error", "-y", "-i", input, "-c:v", "libwebp", "-quality", "92", output],
      { stdio: "inherit" },
    );
    child.on("error", reject);
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`))));
  });
}

async function convertToWebp(input, output) {
  try {
    await runCwebp(input, output);
  } catch {
    await runFfmpegWebp(input, output);
  }
}

async function main() {
  const args = process.argv.slice(2);
  let webp = false;
  let outDir = null;
  const inputs = [];

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--webp") webp = true;
    else if (args[i] === "--out") outDir = args[++i];
    else inputs.push(args[i]);
  }

  if (!outDir || inputs.length === 0) usage();

  const dest = path.resolve(outDir);
  await fs.mkdir(dest, { recursive: true });

  const files = await collectInputs(inputs.map((p) => path.resolve(p)));
  if (files.length === 0) {
    console.error("No image files found.");
    process.exit(1);
  }

  const results = [];
  const usedNames = new Set();

  for (const src of files) {
    const base = toKebab(path.basename(src)) || "image";
    let name = base;
    let n = 2;
    while (usedNames.has(name)) {
      name = `${base}-${n++}`;
    }
    usedNames.add(name);

    const ext = webp ? ".webp" : path.extname(src).toLowerCase();
    const destFile = path.join(dest, `${name}${ext}`);

    if (webp && ext === ".webp") {
      await convertToWebp(src, destFile);
    } else {
      await fs.copyFile(src, destFile);
    }

    const metaPath = destFile;
    const meta = await sharp(metaPath).metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    const background = await sampleBackground(metaPath);

    const publicPath = "/" + path.relative(path.resolve("public"), destFile).split(path.sep).join("/");

    const orientation = height > width ? "portrait" : "landscape";
    const backgroundRequired = orientation === "portrait";

    results.push({
      src: publicPath,
      width,
      height,
      orientation,
      backgroundRequired,
      ...(backgroundRequired ? { background } : { backgroundOptional: background }),
      file: path.relative(process.cwd(), destFile),
    });
  }

  console.log("\n// Paste into homeTiles modal media[] (adjust alt text):\n");
  for (const r of results) {
    console.log(JSON.stringify(r, null, 2) + ",\n");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
