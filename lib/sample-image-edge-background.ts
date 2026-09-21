/** Match edge/corner sampling used by scripts/import-mini-project-media.mjs (browser). */
export function sampleImageEdgeBackground(img: HTMLImageElement): string {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  if (!w || !h) return "#000000";

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return "#000000";

  const sample = Math.max(4, Math.min(24, Math.floor(Math.min(w, h) * 0.04)));
  const regions: [number, number][] = [
    [0, 0],
    [w - sample, 0],
    [0, h - sample],
    [w - sample, h - sample],
    [Math.floor(w / 2 - sample / 2), 0],
    [Math.floor(w / 2 - sample / 2), h - sample],
    [0, Math.floor(h / 2 - sample / 2)],
    [w - sample, Math.floor(h / 2 - sample / 2)],
  ];

  const bucketCounts = new Map<string, number>();
  const bucketRgb = new Map<string, [number, number, number]>();

  for (const [left, top] of regions) {
    ctx.drawImage(
      img,
      Math.max(0, left),
      Math.max(0, top),
      Math.min(sample, w),
      Math.min(sample, h),
      0,
      0,
      1,
      1,
    );
    const d = ctx.getImageData(0, 0, 1, 1).data;
    const key = `${Math.round(d[0] / 8)}-${Math.round(d[1] / 8)}-${Math.round(d[2] / 8)}`;
    bucketCounts.set(key, (bucketCounts.get(key) ?? 0) + 1);
    bucketRgb.set(key, [d[0], d[1], d[2]]);
  }

  let bestKey = "";
  let bestCount = -1;
  for (const [key, count] of bucketCounts) {
    if (count > bestCount) {
      bestCount = count;
      bestKey = key;
    }
  }

  const rgb = bucketRgb.get(bestKey) ?? [0, 0, 0];
  const hex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${hex(rgb[0])}${hex(rgb[1])}${hex(rgb[2])}`;
}
