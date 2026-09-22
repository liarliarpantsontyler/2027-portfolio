# Portfolio roadmap

Last updated: 2026-09-22

This is the shared source of truth for planned portfolio work. Any coding assistant with access to this repository can read it. Order reflects Tyler's current priorities; it is not a delivery schedule.

## What's next?

**Next: finish OATS-01 media and evidence.** The visual-first page rewrite and selected stills are implemented. Capture one qualifying native-resolution motion pilot before producing the three clips; then obtain the analytics reporting window and denominator. OATS-02 follows this work.

The larger goal is to split the broad Oats Overnight app case study into focused projects with enough depth to show the problem, research, design decisions, interactions, and results. Ratings & Notes already has its own case study and should remain separate.

## Ordered queue

| Order | ID | Project | Status |
| --- | --- | --- | --- |
| 1 | OATS-01 | Cross-sell and upsell system | Page rebuilt with real stills — high-resolution motion and analytics evidence pending |
| 2 | OATS-02 | Loyalty program and reward systems | Planned — next |
| 3 | OATS-03 | Survey feature design | Planned |
| 4 | OATS-04 | Restructure the Oats app overview and portfolio navigation | Planned — after the focused stories are ready |

Existing foundation: **Ratings & Notes**, `/work/flavor-ratings/`. This is already a separate case study, not a new item to rebuild.

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
