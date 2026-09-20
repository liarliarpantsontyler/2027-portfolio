export type HomeMediaKind = "image" | "video" | "gif";

export type MiniProjectMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  mediaKind?: HomeMediaKind;
  poster?: string;
  caption?: string;
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
    src: "/home/vizzy-cover.mp4",
    width: 1920,
    height: 1080,
    alt: "Vizzy Figma plugin moving comments between pages",
    label: "Vizzy",
    mediaKind: "video",
    poster: "/home/vizzy-cover-poster.webp",
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
];
