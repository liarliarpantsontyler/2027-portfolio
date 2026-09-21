import type { MiniProjectMedia } from "@/content/home";

export function isPortraitSlide(item: Pick<MiniProjectMedia, "width" | "height">): boolean {
  return item.height > item.width;
}

/** Stills: landscape → cover (full bleed), portrait → contain. Videos always contain. */
export function resolveSlideFit(item: MiniProjectMedia): "contain" | "cover" {
  if (item.mediaKind === "video") return "contain";
  if (item.fit) return item.fit;
  return isPortraitSlide(item) ? "contain" : "cover";
}

export function slideUsesLetterboxBackground(item: MiniProjectMedia): boolean {
  if (item.mediaKind === "video") return Boolean(item.background);
  if (item.background) return true;
  return isPortraitSlide(item);
}

export function resolveStageBackground(
  item: MiniProjectMedia,
  sampledBySrc: Record<string, string>,
): string {
  if (item.background) return item.background;
  if (item.mediaKind === "video") return "#000000";
  if (isPortraitSlide(item)) return sampledBySrc[item.src] ?? "#000000";
  return "#000000";
}
