export type HomeMediaKind = "image" | "video" | "gif";

export type MiniProjectMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  mediaKind?: HomeMediaKind;
  poster?: string;
  caption?: string;
  /** How the slide fills the modal stage. Default: contain (no crop). */
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
    id: "teladoc-screens",
    src: "/work/teladoc-app-overview.webp",
    width: 867,
    height: 1024,
    alt: "Five Teladoc product screens",
    destination: { type: "link", href: "/work/teladoc-health/" },
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
    destination: { type: "link", href: "/work/flavor-ratings/" },
    label: "Flavor Ratings",
    mediaKind: "video",
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
    destination: { type: "link", href: "/work/oats-overnight-app/" },
    label: "Oats Overnight App",
    mediaKind: "video",
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
    destination: { type: "link", href: "/work/creativeos/" },
    label: "creativeOS",
    mediaKind: "video",
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
    destination: { type: "link", href: "/work/just-for-fun/" },
    label: "Just for Fun",
    mediaKind: "video",
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
    id: "retail-bottles-cover",
    src: "/home/retail-bottles-cover.jpg",
    width: 1024,
    height: 768,
    alt: "Oats Overnight retail shake bottles arranged on a purple background with flavor ingredients",
    label: "Retail bottles",
    mediaKind: "image",
    column: "right",
    column3: 3,
    destination: {
      type: "modal",
      project: {
        slug: "retail-bottles",
        title: "Oats Overnight retail bottles",
        description:
          "I designed the illustration and packaging for Oats Overnight’s retail shake bottles — a flavor-coded system built for shelf impact. One label structure repeats across every flavor; color and graphic carry the rest. It’s illustration work, but it’s the same muscle as a branding system — just outside the usual UX and product-design frame.",
        projectUrl: "/work/oats-overnight-app/",
        projectUrlLabel: "Oats app case study",
        media: [
          {
            src: "/work/retail-bottles/hero-flatlay.jpg",
            width: 1024,
            height: 768,
            alt: "Flat lay of Oats Overnight retail bottles on a purple field with ingredients for each flavor",
            background: "#d2a1f9",
          },
          {
            src: "/work/retail-bottles/lineup-green.jpg",
            width: 1024,
            height: 768,
            alt: "Full lineup of retail bottle flavors on a bright green background",
            background: "#78a21f",
          },
          {
            src: "/work/retail-bottles/marketing-grid.jpg",
            width: 1024,
            height: 682,
            alt: "Grid of product photography for individual retail bottle flavors",
            background: "#a8d437",
          },
          {
            src: "/work/retail-bottles/blueberry-explorations.jpg",
            width: 1024,
            height: 902,
            alt: "Ten Blueberry Muffin label illustration explorations in purple",
            background: "#ffffff",
          },
          {
            src: "/work/retail-bottles/design-matrix.jpg",
            width: 1024,
            height: 583,
            alt: "Large matrix of bottle label design iterations across flavors and color systems",
            background: "#ffffff",
          },
          {
            src: "/work/retail-bottles/walmart.jpg",
            width: 831,
            height: 1024,
            alt: "Walmart retail creative featuring three Oats Overnight shake flavors",
            background: "#ffffff",
          },
          {
            src: "/work/retail-bottles/retail-shelf.jpg",
            width: 630,
            height: 1024,
            alt: "Oats Overnight bottles on shelf in a grocery store",
            background: "#fbfbfb",
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
];
