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
  column3?: 1 | 2 | 3;
  wash?: boolean;
  lined?: boolean;
};

export const homeTiles: HomeTile[] = [
  {
    id: "teladoc-screens",
    src: "/work/teladoc-app-overview.webp",
    width: 1024,
    height: 684,
    alt: "Five Teladoc product screens",
    href: "/work/teladoc-health/",
    label: "Teladoc Health",
    column: "left",
    column3: 1,
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
    column3: 2,
    lined: true,
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
    column3: 1,
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
    column3: 2,
  },
  {
    id: "just-for-fun",
    src: "/work/fun-01.mp4",
    width: 720,
    height: 720,
    alt: "Hand-drawn animation loop",
    href: "/work/just-for-fun/",
    label: "Just for Fun",
    kind: "video",
    poster: "/work/fun-01-poster.webp",
    column: "right",
    column3: 3,
  },
];
