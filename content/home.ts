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
    id: "ratings-photo",
    src: "/work/ratings-phone-photo.webp",
    width: 1536,
    height: 1024,
    alt: "Phone in hand showing the Flavor Ratings tool",
    href: "/work/flavor-ratings/",
    label: "Flavor Ratings",
    column: "right",
  },
  {
    id: "oats-loyalty",
    src: "/work/oats-loyalty.mp4",
    width: 1920,
    height: 1404,
    alt: "Oats Overnight loyalty experience",
    href: "/work/oats-overnight-app/",
    label: "Oats Overnight App",
    kind: "video",
    poster: "/work/oats-loyalty-poster.webp",
    column: "left",
  },
  {
    id: "creativeos",
    src: "/work/creativeos-wide-poster.webp",
    width: 1600,
    height: 956,
    alt: "creativeOS workspace",
    href: "/work/creativeos/",
    label: "creativeOS",
    column: "right",
  },
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
    id: "teladoc-cover",
    src: "/home/teladoc-cover.webp",
    width: 2522,
    height: 1754,
    alt: "Teladoc Health product and brand compositions",
    href: "/work/teladoc-health/",
    label: "Teladoc Health",
    column: "right",
  },
  {
    id: "oats-shop",
    src: "/work/oats-shop-cards.webp",
    width: 2000,
    height: 759,
    alt: "Oats Overnight shop cards for new flavors, Protein Coffee, and browsing",
    href: "/work/oats-overnight-app/",
    label: "Oats Overnight App",
    column: "left",
  },
  {
    id: "portrait",
    src: "/tyler-portrait.webp",
    width: 900,
    height: 900,
    alt: "Portrait of Tyler Hunter",
    href: "/about/",
    label: "About",
    column: "right",
  },
  {
    id: "ratings-cover",
    src: "/home/ratings-cover.webp",
    width: 2704,
    height: 1106,
    alt: "Flavor Ratings interface on a soft gradient",
    href: "/work/flavor-ratings/",
    label: "Flavor Ratings",
    column: "left",
  },
  {
    id: "creativeos-portrait",
    src: "/work/creativeos-portrait-poster.webp",
    width: 1080,
    height: 1440,
    alt: "creativeOS product walkthrough",
    href: "/work/creativeos/",
    label: "creativeOS",
    column: "right",
  },
];
