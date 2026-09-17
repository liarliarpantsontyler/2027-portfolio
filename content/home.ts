export type HomeTile = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  href?: string;
  label?: string;
  kind?: "image" | "video" | "gif";
  poster?: string;
  column: "left" | "right";
};

export const homeTiles: HomeTile[] = [
  {
    id: "teladoc-screens",
    src: "/work/teladoc-app-overview.webp",
    width: 2000,
    height: 1350,
    alt: "Five Teladoc product screens",
    href: "/work/teladoc-health/",
    label: "Teladoc Health",
    column: "left",
  },
  {
    id: "ratings-cover",
    src: "/home/ratings-cover.mp4",
    width: 1080,
    height: 1440,
    alt: "Flavor Ratings cover on a phone",
    href: "/work/flavor-ratings/",
    label: "Flavor Ratings",
    kind: "video",
    poster: "/home/ratings-cover-poster.webp",
    column: "right",
  },
  {
    id: "oats-cover",
    src: "/home/oats-cover.mp4",
    width: 1080,
    height: 1440,
    alt: "Oats Overnight App cover on a phone",
    href: "/work/oats-overnight-app/",
    label: "Oats Overnight App",
    kind: "video",
    poster: "/home/oats-cover-poster.webp",
    column: "left",
  },
  {
    id: "coco-orb",
    src: "/home/coco-orb.mp4",
    width: 600,
    height: 600,
    alt: "Coco, an animated virtual healthcare assistant",
    href: "/work/coco-ai/",
    label: "Coco AI",
    kind: "video",
    poster: "/home/coco-orb-poster.webp",
    column: "left",
  },
  {
    id: "creativeos-cover",
    src: "/home/creativeos-cover.mp4",
    width: 1080,
    height: 1440,
    alt: "creativeOS cover on a laptop",
    href: "/work/creativeos/",
    label: "creativeOS",
    kind: "video",
    poster: "/home/creativeos-cover-poster.webp",
    column: "right",
  },
];
