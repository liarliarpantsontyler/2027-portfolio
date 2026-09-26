export type HomeMediaKind = "image" | "video" | "gif";

export type MiniProjectMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  mediaKind?: HomeMediaKind;
  poster?: string;
  caption?: string;
  /** Override fit. Stills default: landscape → cover, portrait → contain. Videos always contain. */
  fit?: "contain" | "cover";
  /** Letterbox / stage fill when media aspect ratio does not fill the modal (e.g. match a screen recording). */
  background?: string;
};

export type MiniProject = {
  slug: string;
  title: string;
  description: string;
  media: [MiniProjectMedia, ...MiniProjectMedia[]];
  /** Show this many items at once in a grid; carousel advances by page (e.g. 3 square loops). */
  mediaGridPerSlide?: number;
  /** Stage / cell letterbox when using mediaGridPerSlide. */
  mediaStageBackground?: string;
  projectUrl?: string;
  projectUrlLabel?: string;
};

type HomeTileBase = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  label?: string;
  mediaKind?: HomeMediaKind;
  poster?: string;
  /** Homepage reading order (1 = top); matches visual top-to-bottom order and mobile single column. */
  rank: number;
  wash?: boolean;
  lined?: boolean;
  /** Tile stage fill when letterboxing or behind cover (edge sample from import script). */
  background?: string;
  /** How cover media fills the square-min tile. Default: contain. */
  fit?: "contain" | "cover";
};

export type HomeLinkTile = HomeTileBase & {
  destination: { type: "link"; href: string };
};

export type HomeModalTile = HomeTileBase & {
  destination: { type: "modal"; project: MiniProject };
};

export type HomeTile = HomeLinkTile | HomeModalTile;

export type HomeTileSize = "standard" | "compact" | "solo";
export type HomeTileTreatment = "framed" | "fullBleed";

export type HomeMediaViewport = {
  /** Clip window aspect (usually the device screen), e.g. "16 / 10" */
  aspect: `${number} / ${number}`;
  /** object-fit inside the clip; tune crop with position, not large scale values. */
  fit?: "cover" | "contain";
  /** object-position, e.g. "50% 42%" */
  position?: string;
  /** Inner clip radius. */
  radius?: string;
  /** Letterbox fill when media uses contain; should match source matte. */
  background?: string;
};

export type HomeTileLayout = {
  treatment: HomeTileTreatment;
  /** Reserved stage aspect for CLS; e.g. "16 / 10", "4 / 3", "1 / 1" */
  stageAspect?: `${number} / ${number}`;
  /** Framed only: max width of media inside padding when no viewport, e.g. 0.52 */
  mediaScale?: number;
  /** Cropped clip with rounded corners inside the stage. */
  mediaViewport?: HomeMediaViewport;
};

export type HomeLayoutRow = {
  size: HomeTileSize;
  tileIds: string[];
};

export const homeTiles: HomeTile[] = [
  {
    id: "tabby-cover",
    src: "/home/tabby-cover.webp",
    width: 1440,
    height: 1080,
    alt: "Tabby — 0→1 Product, Brand, UX, and Development. I built Pinterest for browser tabs because I couldn’t stop keeping 70 of them open.",
    destination: { type: "link", href: "/work/tabby/" },
    label: "Tabby",
    mediaKind: "image",
    background: "#ffcf9e",
    fit: "cover",
    rank: 6,
  },
  {
    id: "klocky-cover",
    src: "/home/klocky-signal.mp4",
    width: 1080,
    height: 1440,
    alt: "Klocky's clock collection scrolling on a phone over the animated Signal background",
    destination: { type: "link", href: "/work/klocky/" },
    label: "Klocky",
    mediaKind: "video",
    poster: "/home/klocky-signal-poster.webp",
    rank: 1,
  },
  {
    id: "ratings-cover",
    src: "/home/ratings-cover.mp4",
    width: 1080,
    height: 1440,
    alt: "Flavor Ratings cover on a phone",
    destination: { type: "link", href: "/work/flavor-ratings/" },
    label: "Flavor Ratings",
    mediaKind: "video",
    poster: "/home/ratings-cover-poster.webp",
    fit: "cover",
    rank: 2,
  },
  {
    id: "creativeos-cover",
    src: "/home/creativeos-cover.mp4",
    width: 1920,
    height: 1440,
    alt: "creativeOS cover on a laptop",
    destination: { type: "link", href: "/work/creativeos/" },
    label: "creativeOS",
    mediaKind: "video",
    poster: "/home/creativeos-cover-poster.webp",
    rank: 5,
  },
  {
    id: "oontelligence-cover",
    src: "/home/oontelligence-cover.mp4?v=20250921b",
    width: 720,
    height: 762,
    alt: "Phone screen showing flavor ratings, notes, loyalty rewards, and delivery in the Oats Overnight app",
    label: "Oontelligence",
    mediaKind: "video",
    poster: "/home/oontelligence-cover-poster.webp?v=20250921b",
    background: "rgb(47, 47, 47)",
    rank: 7,
    destination: {
      type: "modal",
      project: {
        slug: "oontelligence",
        title: "Oontelligence",
        description:
          "I connected loyalty rewards + Smart Delivery to Ratings & Notes to get more customers sharing what they think of each flavor. That feedback feeds Oontelligence, our AI flavor-data platform, helping us improve existing flavors, develop new ones, and decide what products to create next.",
        projectUrl: "/work/flavor-ratings/",
        projectUrlLabel: "Flavor Ratings case study",
        media: [
          {
            src: "/work/oontelligence/demo.mp4",
            width: 1080,
            height: 1144,
            alt: "Screen recording of loyalty, delivery, and Ratings & Notes working together in the app",
            mediaKind: "video",
            poster: "/work/oontelligence/demo-poster.webp",
            background: "rgb(47, 47, 47)",
          },
          {
            src: "/work/ratings-components.webp",
            width: 2000,
            height: 1138,
            alt: "Rating controls, flavor badges, category switching, and sorting in the Ratings & Notes system",
          },
        ],
      },
    },
  },
  {
    id: "teladoc-screens",
    src: "/home/teladoc-screens-cover.mp4?v=20250924b",
    width: 1920,
    height: 1440,
    alt: "Five Teladoc product screens",
    destination: { type: "link", href: "/work/teladoc-health/" },
    label: "Teladoc Health",
    mediaKind: "video",
    poster: "/home/teladoc-screens-cover-poster.webp?v=20250924b",
    rank: 4,
  },
  {
    id: "vizzy-cover",
    src: "/home/vizzy-cover.webp",
    width: 1024,
    height: 576,
    alt: "Vizzy Figma plugin UI with sticky comment cards on the canvas",
    label: "Vizzy",
    mediaKind: "image",
    background: "#defc52",
    rank: 8,
    destination: {
      type: "modal",
      project: {
        slug: "vizzy",
        title: "Vizzy Figma Plugin",
        description:
          "I got tired of not being able to move comments page-to-page or into another file. Vizzy is the plugin I built to fix that. Sole designer and developer.",
        projectUrl:
          "https://www.figma.com/community/generative-plugin/1683396907519346280/vizzy-comment-mover",
        projectUrlLabel: "Check out Vizzy",
        media: [
          {
            src: "/work/vizzy/demo.mp4",
            width: 1688,
            height: 1072,
            alt: "Screen recording of Vizzy moving Figma comments between pages",
            mediaKind: "video",
            poster: "/work/vizzy/demo-poster.webp",
          },
          {
            src: "/work/vizzy/figma-ui.webp",
            width: 1688,
            height: 950,
            alt: "Vizzy plugin UI inside Figma",
          },
        ],
      },
    },
  },
  {
    id: "cross-sell-cover",
    src: "/home/cross-sell-cover.webp",
    width: 1080,
    height: 1440,
    alt: "Mobile Oats Overnight portal showing the Protein Coffee discovery offer above order status",
    destination: { type: "link", href: "/work/cross-sell-upsell/" },
    label: "Cross-sell + Upsell",
    mediaKind: "image",
    fit: "cover",
    rank: 3,
  },
  {
    id: "retail-bottles-cover",
    src: "/home/retail-bottles-cover.jpg",
    width: 1024,
    height: 768,
    alt: "Oats Overnight retail shake bottles arranged on a purple background with flavor ingredients",
    label: "Retail bottles",
    mediaKind: "image",
    fit: "cover",
    rank: 9,
    destination: {
      type: "modal",
      project: {
        slug: "retail-bottles",
        title: "Oats Overnight retail bottles",
        description:
          "I designed the illustration and packaging system for Oats Overnight’s retail shake bottles. Each flavor uses the same label structure, with color and illustration doing the work to make every bottle distinct and easy to recognize on shelf. It’s a simple system that can scale as new flavors are added.",
        media: [
          {
            src: "/work/retail-bottles/hero-flatlay.jpg",
            width: 1024,
            height: 768,
            alt: "Flat lay of Oats Overnight retail bottles on a purple field with ingredients for each flavor",
          },
          {
            src: "/work/retail-bottles/lineup-green.jpg",
            width: 1024,
            height: 768,
            alt: "Full lineup of retail bottle flavors on a bright green background",
          },
          {
            src: "/work/retail-bottles/marketing-grid.jpg",
            width: 1024,
            height: 682,
            alt: "Grid of product photography for individual retail bottle flavors",
          },
          {
            src: "/work/retail-bottles/floating-lineup.jpg",
            width: 1024,
            height: 255,
            alt: "Oats Overnight bottles floating on a light blue field",
          },
          {
            src: "/work/retail-bottles/blueberry-explorations.jpg",
            width: 1024,
            height: 902,
            alt: "Ten Blueberry Muffin label illustration explorations in purple",
          },
          {
            src: "/work/retail-bottles/flavor-explorations.png",
            width: 1024,
            height: 748,
            alt: "Label design explorations for Caramel Macchiato, Banana Pudding, and Chocolate Chip Cookie Dough",
          },
          {
            src: "/work/retail-bottles/design-matrix.jpg",
            width: 1024,
            height: 583,
            alt: "Large matrix of bottle label design iterations across flavors and color systems",
          },
          {
            src: "/work/retail-bottles/walmart.jpg",
            width: 831,
            height: 1024,
            alt: "Walmart retail creative featuring three Oats Overnight shake flavors",
            background: "#ffffff",
          },
          {
            src: "/work/retail-bottles/kitchen-lineup.jpg",
            width: 1024,
            height: 809,
            alt: "Retail bottle flavors lined up on a kitchen counter",
          },
          {
            src: "/work/retail-bottles/retail-shelf.jpg",
            width: 630,
            height: 1024,
            alt: "Oats Overnight bottles on shelf in a grocery store",
            background: "#fbfbfb",
          },
          {
            src: "/work/retail-bottles/expo-booth.jpg",
            width: 1024,
            height: 811,
            alt: "Oats Overnight team at an expo booth with branded backdrop",
          },
        ],
      },
    },
  },
  {
    id: "just-for-fun",
    src: "/work/fun-01.mp4",
    width: 720,
    height: 720,
    alt: "Hand-drawn animation loop",
    label: "Just for Fun",
    mediaKind: "video",
    poster: "/work/fun-01-poster.webp",
    background: "#f5f5f5",
    rank: 10,
    destination: {
      type: "modal",
      project: {
        slug: "just-for-fun",
        title: "Just for Fun",
        description:
          "I’m an illustrator by heart. These loops were made just for fun — vector, stop motion, and frame by frame.",
        mediaGridPerSlide: 3,
        mediaStageBackground: "#f5f5f5",
        projectUrl: "/work/just-for-fun/",
        projectUrlLabel: "See all loops",
        media: [
          {
            src: "/work/fun-01.mp4",
            width: 720,
            height: 720,
            alt: "Hand-drawn animation loop",
            mediaKind: "video",
            poster: "/work/fun-01-poster.webp",
          },
          ...([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const).map((n) => ({
            src: `/work/fun-${String(n).padStart(2, "0")}.mp4`,
            width: 720,
            height: 720,
            alt: "Hand-drawn animation loop",
            mediaKind: "video" as const,
            poster: `/work/fun-${String(n).padStart(2, "0")}-poster.webp`,
          })),
        ],
      },
    },
  },
];

export const homeTileLayout: Record<string, HomeTileLayout> = {
  "tabby-cover": {
    treatment: "framed",
    stageAspect: "4 / 5",
    mediaViewport: {
      aspect: "4 / 3",
      fit: "contain",
      background: "#ffcf9e",
    },
  },
  "klocky-cover": {
    treatment: "framed",
    stageAspect: "4 / 5",
  },
  "ratings-cover": {
    treatment: "framed",
    stageAspect: "4 / 5",
    mediaViewport: {
      aspect: "9 / 16",
      fit: "cover",
      position: "50% 50%",
    },
  },
  "creativeos-cover": {
    treatment: "framed",
    stageAspect: "4 / 3",
    mediaViewport: {
      aspect: "4 / 3",
      fit: "contain",
      position: "50% 50%",
    },
  },
  "teladoc-screens": {
    treatment: "framed",
    stageAspect: "4 / 3",
    mediaViewport: {
      aspect: "4 / 3",
      fit: "contain",
      position: "50% 50%",
    },
  },
  "oontelligence-cover": {
    treatment: "framed",
    stageAspect: "4 / 5",
    mediaViewport: {
      aspect: "9 / 16",
      fit: "cover",
      position: "50% 48%",
    },
  },
  "cross-sell-cover": {
    treatment: "framed",
    stageAspect: "4 / 5",
    mediaViewport: {
      aspect: "9 / 16",
      fit: "cover",
      position: "50% 18%",
    },
  },
  "vizzy-cover": {
    treatment: "framed",
    stageAspect: "4 / 5",
    mediaViewport: {
      aspect: "4 / 3",
      fit: "contain",
      position: "50% 50%",
      background: "#defc52",
    },
  },
  "retail-bottles-cover": {
    treatment: "framed",
    stageAspect: "4 / 5",
    mediaViewport: {
      aspect: "4 / 3",
      fit: "cover",
      position: "50% 50%",
    },
  },
  "just-for-fun": {
    treatment: "framed",
    stageAspect: "4 / 5",
    mediaViewport: {
      aspect: "4 / 3",
      fit: "contain",
      position: "50% 50%",
      background: "#f5f5f5",
    },
  },
};

export const homeLayoutRows: HomeLayoutRow[] = [
  {
    size: "compact",
    tileIds: ["klocky-cover", "ratings-cover", "cross-sell-cover"],
  },
  { size: "standard", tileIds: ["teladoc-screens", "creativeos-cover"] },
  {
    size: "compact",
    tileIds: ["tabby-cover", "oontelligence-cover", "vizzy-cover"],
  },
  { size: "standard", tileIds: ["retail-bottles-cover", "just-for-fun"] },
];

const EXPECTED_ROW_LENGTH: Record<HomeTileSize, number> = {
  standard: 2,
  compact: 3,
  solo: 1,
};

if (process.env.NODE_ENV !== "production") {
  const ranks = homeTiles.map((tile) => tile.rank);
  if (new Set(ranks).size !== ranks.length) {
    throw new Error("homeTiles: each tile must have a unique rank.");
  }

  const layoutIds = homeLayoutRows.flatMap((row) => row.tileIds);
  const tileIds = homeTiles.map((tile) => tile.id);
  if (layoutIds.length !== tileIds.length) {
    throw new Error("homeLayoutRows: must include every homepage tile exactly once.");
  }
  if (new Set(layoutIds).size !== layoutIds.length) {
    throw new Error("homeLayoutRows: duplicate tile id.");
  }
  for (const id of tileIds) {
    if (!layoutIds.includes(id)) {
      throw new Error(`homeLayoutRows: missing tile id "${id}".`);
    }
    if (!homeTileLayout[id]) {
      throw new Error(`homeTileLayout: missing layout for "${id}".`);
    }
  }
  for (const row of homeLayoutRows) {
    if (row.tileIds.length !== EXPECTED_ROW_LENGTH[row.size]) {
      throw new Error(
        `homeLayoutRows: row size "${row.size}" expects ${EXPECTED_ROW_LENGTH[row.size]} tiles.`,
      );
    }
  }
}
