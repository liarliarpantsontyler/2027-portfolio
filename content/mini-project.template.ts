/**
 * Mini project template — copy into `homeTiles` in content/home.ts.
 *
 * Live reference: `vizzy-cover` in content/home.ts
 * UI: components/mini-project-modal.tsx + .mini-project-* in app/globals.css
 *
 * Do not create a per-project modal. All mini projects share this layout:
 * - Large modal (~960×880 max), full-bleed media on black
 * - Optional carousel (2+ media): controls sit on white, below media
 * - Title, description, optional external link with arrow
 * - Shareable URL: /?project=<slug>
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
        },
        {
          src: "/work/your-project/detail.webp",
          width: 1688,
          height: 950,
          alt: "Secondary still or UI shot",
        },
      ],
    },
  },
} satisfies HomeModalTile;
