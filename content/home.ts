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
  column: "left" | "right";
  column3?: 1 | 2 | 3;
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

export const homeTiles: HomeTile[] = [
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
    column: "left",
    column3: 3,
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
    column: "left",
    column3: 1,
  },
  {
    id: "teladoc-screens",
    src: "/home/teladoc-screens-cover.mp4",
    width: 2160,
    height: 3200,
    alt: "Five Teladoc product screens",
    destination: { type: "link", href: "/work/teladoc-health/" },
    label: "Teladoc Health",
    mediaKind: "video",
    poster: "/home/teladoc-screens-cover-poster.webp",
    column: "left",
    column3: 1,
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
    column: "right",
    column3: 2,
    lined: true,
  },
  {
    id: "creativeos-cover",
    src: "/home/creativeos-cover.mp4",
    width: 1080,
    height: 1440,
    alt: "creativeOS cover on a laptop",
    destination: { type: "link", href: "/work/creativeos/" },
    label: "creativeOS",
    mediaKind: "video",
    poster: "/home/creativeos-cover-poster.webp",
    column: "right",
    column3: 2,
  },
  {
    id: "just-for-fun",
    src: "/work/fun-01.gif",
    width: 720,
    height: 720,
    alt: "Hand-drawn animation loop",
    destination: { type: "link", href: "/work/just-for-fun/" },
    label: "Just for Fun",
    mediaKind: "gif",
    poster: "/work/fun-01-poster.webp",
    column: "right",
    column3: 3,
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
    column: "right",
    column3: 1,
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
    id: "oontelligence-cover",
    src: "/home/oontelligence-cover.mp4?v=20250921b",
    width: 720,
    height: 762,
    alt: "Phone screen showing flavor ratings, notes, loyalty rewards, and delivery in the Oats Overnight app",
    label: "Oontelligence",
    mediaKind: "video",
    poster: "/home/oontelligence-cover-poster.webp?v=20250921b",
    background: "rgb(47, 47, 47)",
    column: "left",
    column3: 2,
    lined: true,
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
    id: "retail-bottles-cover",
    src: "/home/retail-bottles-cover.jpg",
    width: 1024,
    height: 768,
    alt: "Oats Overnight retail shake bottles arranged on a purple background with flavor ingredients",
    label: "Retail bottles",
    mediaKind: "image",
    fit: "cover",
    column: "left",
    column3: 2,
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
];
