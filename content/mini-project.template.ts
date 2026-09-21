/**
 * Mini project template — copy into `homeTiles` in content/home.ts.
 *
 * Live reference: `vizzy-cover` in content/home.ts
 * UI: components/mini-project-modal.tsx + .mini-project-* in app/globals.css
 *
 * Do not create a per-project modal. All mini projects share this layout:
 * - Large modal (~960×880 max); landscape stills full-bleed, portrait stills letterboxed
 * - Optional carousel (2+ media): controls sit on white, below media
 * - Title, description, optional external link with arrow
 * - Shareable URL: /?project=<slug>
 *
 * Homepage cover (tile on the grid):
 * - Wide stills render in at least a 1:1 tile; avoid grey letterbox bands.
 * - UI / flat field (vizzy-cover): default contain + tile `background` from import script.
 * - Product / photo (retail-bottles-cover): tile `fit: "cover"` for full-bleed crop.
 */

import type { HomeModalTile } from "./home";

export const miniProjectTileTemplate = {
  id: "your-project-slug",
  src: "/home/your-project-cover.mp4",
  width: 1920,
  height: 1080,
  alt: "Accessible description of the homepage cover",
  label: "Project name",
  mediaKind: "video",
  poster: "/home/your-project-cover-poster.webp",
  // background: "#defc52", // wide UI still — edge sample from import script (vizzy-cover)
  // fit: "cover", // product photography — full-bleed tile (retail-bottles-cover)
  column: "right",
  column3: 1,
  destination: {
    type: "modal",
    project: {
      slug: "your-project-slug",
      title: "Project name",
      description: "One or two sentences on the problem and your role.",
      projectUrl: "https://example.com/your-project",
      projectUrlLabel: "View project",
      media: [
        {
          src: "/work/your-project/demo.mp4",
          width: 1688,
          height: 1072,
          alt: "What the demo video shows",
          mediaKind: "video",
          poster: "/work/your-project/demo-poster.webp",
          // background: "rgb(47, 47, 47)", // screen recordings — letterbox matches capture
        },
        {
          src: "/work/your-project/detail.webp",
          width: 1688,
          height: 950,
          alt: "Secondary still or UI shot (landscape — cover by default, no background needed)",
        },
        {
          src: "/work/your-project/poster.webp",
          width: 1080,
          height: 1440,
          alt: "Portrait still example",
          background: "#ffffff", // required for portrait — from import script when backgroundRequired: true
        },
      ],
    },
  },
} satisfies HomeModalTile;
