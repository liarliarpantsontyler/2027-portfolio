# Portfolio roadmap

Last updated: 2026-09-24

This is the shared source of truth for planned portfolio work. Any coding assistant with access to this repository can read it. Order reflects Tyler's current priorities; it is not a delivery schedule.

## What's next?

**Completed: TABBY-01 — Independent product story (2026-09-24).** Implemented and validated locally at `/work/tabby/`, with a linked homepage tile. Ready to publish through the existing portfolio deployment workflow.

**Next Oats project: OATS-02 — Loyalty & Rewards.** A first visual-first draft with two real recordings is built at `/work/loyalty-rewards/`. Next, confirm the throwing-tomatoes badge trigger and recognition with Tyler, then add that distinctive example and verify current earning/redemption rules. Cross-sell motion and analytics remain deferred; no native screen control should interrupt Tyler’s work.

The larger goal is to split the broad Oats Overnight app case study into focused projects with enough depth to show the problem, research, design decisions, interactions, and results. Ratings & Notes already has its own case study and should remain separate.

## Ordered queue

| Order | ID | Project | Status |
| --- | --- | --- | --- |
| 1 | OATS-01 | Cross-sell and upsell system | Page rebuilt with real stills — high-resolution motion and analytics evidence pending |
| 2 | OATS-02 | Loyalty program and reward systems | Draft built — hidden until homepage hero + badge details, rules, and impact evidence |
| 3 | OATS-03 | Survey feature design | Planned |
| 4 | OATS-04 | Restructure the Oats app overview and portfolio navigation | Planned — after the focused stories are ready |

Existing foundation: **Ratings & Notes**, `/work/flavor-ratings/`. This is already a separate case study, not a new item to rebuild.

## TABBY-01 — Independent product story

**Demo preview fix — completed (2026-09-24):** Restored automatic website screenshots for newly pasted URLs. The original local adapter returned a mock failure for every non-sample URL and its content policy blocked the preview service. The adapter now permits the existing HTTPS Microlink endpoint with credentials omitted, retains deterministic sample previews and local account data, and allows 30 seconds for a fresh capture. Restarted the demo server. Verified a real pasted `https://example.com/` URL populated its title and screenshot, the image loaded successfully, and both persisted and rendered after reload. No production account/analytics requests or page errors. JavaScript syntax checks and `git diff --check` passed.

**Done — implementation and validation, 2026-09-24.** Added a concise visual-first story at `/work/tabby/` and a homepage tile at rank 6. Per Tyler’s follow-up, Teladoc and creativeOS share the two-tile row; Tabby, Oontelligence, and Vizzy share the following three-tile row, all with 4:5 stages. The page covers the personal tab-hoarding problem, visual organization, Spaces, the Chrome extension, the brand, and end-to-end ownership. Uses the existing `SiteFrame`, shared project header, `ProjectMedia`, project navigation/metadata, `ProjectGrid`, `HomeProjectTile`, and `HomeMedia`. One new server-rendered story component: `components/tabby-story.tsx`. Styling is scoped in `app/globals.css`; the shared header spacing stays 28px 0 48px. No new runtime dependencies or videos.

**Product evidence:** Inspected the sibling Tabby repository: `app/index.html`, `extension/manifest.json`, `extension/background.js`, `extension/popup.html`, `extension/popup.js`, `extension/popup.css`, and existing brand/media assets. Confirmed Spaces → groups → optional folders, editable visual previews, search and drag organization, light/dark themes, and the extension’s single-page and selected-open-tab save flows. The current-page capture path uses `chrome.tabs.captureVisibleTab`, with metadata imagery as a fallback; saving a link does not reuse the current page’s screenshot. Batch saving deduplicates exact URLs and filters internal browser pages. The story emphasizes the visible product choices, without adoption, research, or impact claims. Ownership and the personal origin come from Tyler’s brief.

**Visual provenance:** Existing guest-board marketing captures were too empty to tell the story. New screenshots render the actual local app and extension code using isolated sample data drawn from Tyler’s public portfolio projects; no production account was accessed or changed. Screens are labeled as sample content on the page. Network calls to the account backend were intercepted with local fixtures. Existing logo and icon SVGs are copied from Tabby’s `Brand Assets/`. Sources in the Tabby repository remain unchanged.

| Asset | Pixels | Source/treatment |
| --- | --- | --- |
| `public/work/tabby/board.webp` | 2160 × 1320 | Actual app at 1440 × 880 and 1.5× density, with sample tabs |
| `public/work/tabby/spaces.webp` | 1140 × 665 | Detail of the actual open Spaces menu; cropped from the native capture |
| `public/work/tabby/extension.webp` | 760 × 1380 | Actual extension save UI at 2×; sample page/group/folder |
| `public/work/tabby/batch.webp` | 760 × 1100 | Actual batch-save UI at 2×; four sample tabs |
| `public/home/tabby-cover.webp` | 1440 × 1080 | Browser composition using the captured board and original logo |

Stills use WebP quality 92, following the portfolio’s media guidance. The page defers images below the hero; the homepage uses its existing rank-based image loading and hover treatment. The new story needs no animation runtime and works under reduced motion.

**Validation:** Production compile, lint/type validation, and static export passed in `/tmp/tabby-portfolio-build`, an isolated copy using its own `.next`, preserving the already-running development server’s cache. Inspected home and story at 1440, 1024, 834, and 393px. No horizontal overflow, broken images, or browser console/page errors. Verified homepage-tile navigation and reduced-motion behavior. Not pushed or deployed.

**Optional next asset:** A genuine recording of right-click → Save to Tabby → returning to the saved card would add interaction context. No synthetic interaction video is presented as a recording, and no missing asset blocks the finished still-based page.

**Reusable demo board (requested follow-up):** `npm run demo:tabby` serves [localhost:4174](http://localhost:4174/) using `scripts/tabby-demo.mjs` and `scripts/tabby-demo/runtime.js`. The actual Tabby app is rendered with the same six sample cards, three Spaces, and a local fixture adapter. Changes persist in that browser; Reset board restores the seed. Verified search, saving a new URL and reloading, space switching, theme persistence, reset, mobile overflow, and the absence of production backend/analytics requests. Only static artwork is exposed by the server. Known sample links use local previews; other URLs now fetch screenshots and metadata through Microlink (see preview fix above). This is separate from live extension saves. Start/restart instructions are in `README.md`.

## OATS-01 — Cross-sell and upsell system

**Story:** How a simple request became a growth system. Show how design can influence buying decisions and improve revenue within an app people primarily use to check or manage their subscriptions.

Tyler's starting context:

- About 70% of users log in and take no measurable action; about 30% take a subscription-management action. Users treat the app like a banking app: they mostly come to check something, rarely to shop.
- To encourage additional purchases, the experience has to intentionally interrupt that original task. Explain the design reasoning behind the interruption, its placement, and how it supports the business while accounting for the user's original intent.
- Trace the evolution from the initial ask to the larger cross-sell and upsell system. Include actual entry points, offers, flows, iterations, and the decisions Tyler influenced.
- Include an estimate of incremental revenue since launch, described as five months ago at the time of this roadmap entry.

Evidence to collect:

- Analytics source, date range, denominator (users or sessions), and event definitions behind the 70% / 30% split. No recorded action does not itself prove a user's intent; support the banking-app interpretation with research or observed behavior.
- Original request, before/after screens, offer logic, design alternatives, and rollout dates.
- Actual launch date and five-month reporting window; eligible audience, exposure, conversion, order value, refunds/cancellations, and any experiment or comparison group.
- Estimate incremental revenue using the best available baseline. Prefer a holdout comparison of net revenue per eligible user multiplied by exposed eligible users. Without a credible comparison, report attributed sales separately and label any incremental estimate with its assumptions and uncertainty. Do not invent a dollar amount or equate all offer sales with incremental revenue. Distinguish revenue from profit.

**Implementation started (2026-09-21):** Rebuild around homepage discovery, contextual add-ons, and the prefilled 16→24 upgrade. The prior entry claimed production stills existed, but that media directory was absent from the audited checkout. Remove +$215K / ~14% placeholders. Exclude the unverified pack ladder and 8-pack modal. Validate one recording before producing three clips; native 393×852 layout at 3× capture is the target, with no upscaling.

**Design evidence:** Only [For Dev :: Build Week of 7/20 :: X-sell](https://www.figma.com/design/AJCLHBCMcPPStppNG9sRNq/X-sell-Upsell-Sandbox?node-id=245-8222) was reviewed. Tyler confirmed end-to-end ownership. Notes document a smaller loyalty header, replacement of the carousel with an educational offer, and reuse of existing Quick Add eligibility (Protein Pack → extra FIDs → upgrade; coffee-only subscriptions omit Oats add-ons; hide when no upgrade remains). These rules are documented design intent, not independently verified backend behavior. Figma's 78% no-action figure conflicts with the earlier ~70%; its action table also exceeds its stated active-user denominator. Keep both unpublished pending source, window, and definition verification. The production coffee CTA currently opens the builder directly, unlike the education flow in Figma.

**Delivered (2026-09-22):** Replaced the long scaffold with a visual-first case study in `components/oats-cross-sell-story.tsx`, updated the project entry and scoped CSS, and added six lossless WebP stills in `public/work/oats-cross-sell/`. The page leads with the live homepage, compares a clearly labeled historical Figma reference, shows the real coffee builder, contextual Protein Pack details, and a prefilled 24/24 upgrade. A compact diagram explains the documented existing Quick Add sequence. Removed placeholder revenue, conversion, no-action metrics, unsupported personalization claims, public evidence notes, the pack ladder, and the 8-pack modal. Tyler's end-to-end ownership is explicit. No portal purchase or subscription change was made.

**Homepage addition (2026-09-22):** Added a linked Cross-sell + Upsell tile in `content/home.ts` with `public/home/cross-sell-cover.webp`. The 1080 × 1440 cover composes the verified 786px-wide production capture at its native size over a vector color field; it contains no private shipment map or address. Checked the tile and destination at desktop and 393px mobile widths. The case study now has gentle editorial motion on the opening device and documented progression, disabled for reduced-motion users. These CSS animations do not depict portal interactions and do not replace the requested videos.

**Media provenance and limits:**

| Asset | Source | Actual pixels | Treatment |
| --- | --- | --- | --- |
| `homepage.webp` | Live Chrome mobile capture, September 21 | 786 × 1240 | Native 2× image cropped above shipment map/details; no scaling |
| `historical-homepage.webp` | Approved Figma page, node `275:17866` | 1179 × 1380 | Native 3× vector export, cropped above address/order details |
| `coffee-builder.webp` | Live portal, September 22 | 393 × 852 | Native browser still; no scaling |
| `protein-context.webp` | Live portal, September 22 | 393 × 852 | Native browser still; no scaling |
| `protein-details.webp` | Live portal, September 22 | 393 × 852 | Native browser still; no scaling |
| `upgrade.webp` | Live portal, September 22 | 393 × 852 | Native browser still; no scaling |

The four 1× source stills are interim and displayed below their intrinsic width (typically 270 CSS pixels), but do not meet the desired 3× capture resolution. Replace them with native high-density captures when the motion workflow is available. Lossless WebP avoids introducing another compression pass; it cannot recover detail missing from the source. The cropped historical reference and homepage contain no shipping address or map. Modal/context stills were visually checked for private details.

**Motion quality gate — not delivered:** Browser automation exposes still capture, not a video recorder. Native Chrome capture controls repeatedly timed out; its successful export was 2×, and changing to DPR 3 did not produce a verified export. No low-resolution footage, synthetic interaction, or slideshow was substituted. Required setup: a recorder producing actual 1179 × 2556 pixels from a 393 × 852 mobile layout (native iPhone capture or a DPR-3 browser capture), with frame rate verified by media inspection; target 60fps. Validate a short pilot for sharp text and smooth scroll first. Then record separate 10–20 second clips: homepage coffee → production builder; contextual Protein Pack → recurring terms; Manage → 24-pack prefilled flavors and editing. Export H.264 MP4 with matching WebP posters, redact private details, and wire readable posters plus playback controls/reduced-motion handling with deferred loading. Preserve sources. No existing desktop video remains on this page. The homepage cover and editorial motion are shipped; the three actual interaction recordings remain outstanding.

**Validation (2026-09-22):** Production build, TypeScript checks, and static export passed. Desktop at 1440px and mobile at 393 × 852 were visually inspected; no horizontal overflow, missing images, public placeholder metrics, or browser console errors were found. Shared header padding remains 28px 0 48px. Stills load eagerly only for the opening image and lazily thereafter; this version has no autoplay or video downloads. The standard prebuild check was corrected to detect only listening processes on port 3000, avoiding false positives from closed browser sockets. `npm run build` passed with that guard enabled after stopping the development server. Network access was needed for the existing Google Fonts dependency.

**Remaining analytics evidence:** Confirm the reporting window, denominator, event definitions, and source for the Figma 78% figure before publication. Obtain launch date and exposure/conversion/net-revenue data with a credible baseline before claiming business impact. The public page currently reports only verified shipped behaviors.

Done when: the motion pilot meets the quality bar, the three genuine mobile clips and high-density stills are integrated and checked, and any published business metrics have verified sources and definitions. Missing metrics may remain unpublished rather than be replaced by estimates without evidence.

## OATS-02 — Loyalty program and reward systems

**Story:** Give customers unexpected reasons to participate, especially in feedback that matters to Oats Overnight.

**Started (2026-09-22):** Build around the immediate points response, a unified rewards hub, tier progression, and achievement cards. Existing `ratings-loyalty.mp4` (798 × 1528, 120fps) and `oats-loyalty.mp4` (1920 × 1404, 60fps) provide motion without new screen recording. Derivatives preserve native pixels: rewarded ratings cropped to 660 × 1372 and exported at 60fps; the loyalty hub cropped to 542 × 1172 and trimmed to the relevant five seconds. The crop removes the source’s separate shipping/account-management screen. Footage is labeled as recorded design walkthroughs, not verified current production; demo values and tier rules remain design-version examples. The exact throwing-tomatoes badge trigger and recognition are awaiting Tyler’s clarification. No badge rule or impact metric will be invented.

**Draft delivered (2026-09-22):** Added `components/oats-loyalty-story.tsx`, the `loyalty-rewards` project entry and route integration, scoped CSS, and six assets in `public/work/oats-loyalty/`: two H.264 clips, two WebP posters, and progression/achievement stills. A reusable `CaseStudyClip` adds Pause, Replay, and Open video controls to the existing viewport-aware player. Clips load near the viewport, pause offscreen, and use still posters under reduced motion. The story connects feedback to points, a unified rewards hub, readable progression, and achievement recognition. Existing source recordings remain untouched.

**Withheld from public (2026-09-23):** The case study is `hidden: true` (no rail link, no static route, 404 in production) and the homepage tile is removed until the cover hero is fixed. The prototype tile reused the earning-points recording, which reads as **Ratings & Notes** again on the grid next to Flavor Ratings. Before re-enabling: pick a distinct homepage hero — e.g. **metal shakers** or another reward/product moment from the loyalty story — not the ratings screen. Wire a new `public/home/loyalty-rewards-cover.*`, restore the tile in `content/home.ts`, then clear `hidden` on the project entry.

**Validation:** Inspected at 1280px desktop and 393 × 852 mobile in a hidden browser, with no horizontal overflow or broken images. Confirmed actual playback, Pause/Replay behavior, deferred video loading, native crop dimensions and 60fps, and no browser console errors. Header padding remains 28px 0 48px. `npm run build` passed with the development server stopped, including lint/type checks and static export. Current production behavior, earning/redemption rules, the tomato badge, and measured impact still need evidence before this draft meets the full brief.

- Showcase the badges, how they are earned, and the broader points and reward system.
- Feature the **throwing tomatoes badge**: capture its real trigger, meaning, visual treatment, and customer experience rather than guessing its rules.
- Explain how unexpected recognition gives customers reasons to contribute feedback and return.
- Show the connection to Ratings & Notes and surveys, while keeping the focus on the reward system itself.

Evidence to collect: badge inventory and earning rules; points and redemption rules; research and design iterations; actual feedback-participation or repeat-engagement results if available. Identify which effects were measured and which were design hypotheses.

Done when: a dedicated case study shows the reward model, distinctive badge examples, earning and redemption flows, and the reasoning behind rewarding feedback.

## OATS-03 — Survey feature design

**Story:** Turn feedback into something customers want to participate in by helping them feel heard, influential, and curious about how their answers compare with others.

- Tell the transition from email linking to Typeform to the in-app survey experience.
- Tyler reports monthly participation growing from **4,000 to 20,000**: **5× participation**, or a **400% increase**, if the periods and definitions are comparable.
- Show comparison with other people's answers as the main participation incentive, supported by the research that informed it.
- Explain how the survey supports participation in the Flavor in Development (FID) program.
- Show how participation earns loyalty points and connect to the dedicated loyalty story.
- Include the research into what makes customers feel heard and able to influence decisions, then show how those findings changed the experience.

Evidence to collect: baseline and current reporting months; unique participants versus submissions; audience sizes and survey frequency; research notes or quotes; comparison-results screens; point-earning rules; FID participation data. Separate observed growth from claims about which feature caused it.

Done when: a dedicated case study shows the research, complete survey and results flow, comparison incentive, FID and loyalty connections, and clearly defined participation results.

## OATS-04 — Restructure the overview and navigation

- Map existing Oats content and assets to the three new studies and the existing Ratings & Notes story.
- Update homepage tiles and project navigation once each new study is ready.
- Decide whether `/work/oats-overnight-app/` becomes a concise overview linking to the focused stories or is retired with a redirect. Keep the current page working until that decision and replacement are implemented.
- Avoid repeating the same broad narrative or counting shared outcomes as separate wins across projects.

Done when: readers can discover each focused project, existing links still work, and the broad overview no longer substitutes for detailed case studies.

## Starting points in this repository

- `content/projects.ts`: existing `oats-overnight-app` and `flavor-ratings` content, outcomes, and media references.
- `content/home.ts`: homepage project tiles.
- `public/work/`: existing Oats media, including loyalty, survey, and ratings recordings.
- `README.md`: shared page-layout and media conventions.

## How assistants should use this roadmap

- For “what's next on my roadmap?”, read this file and report the first unfinished priority, its status, and its next concrete action. Do not begin implementation merely because the user asked for status.
- When asked to work on an item, use its brief and collect missing evidence as needed. Missing metrics need not block outlining, asset inventory, or other independent work.
- Update status to `In progress` when work starts. Mark `Done` only when the deliverable is implemented and checked; record the completion date and relevant file or page links here.
- Update the “What's next?” section when priorities or completion change. Keep completed entries as history and add new plans here instead of creating competing roadmaps.
- Treat the figures and interpretations above as Tyler-provided planning inputs until their sources and reporting periods are documented. Never fabricate research, quotes, metrics, or revenue.
