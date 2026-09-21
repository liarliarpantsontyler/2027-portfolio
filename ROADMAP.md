# Portfolio roadmap

Last updated: 2026-09-21

This is the shared source of truth for planned portfolio work. Any coding assistant with access to this repository can read it. Order reflects Tyler's current priorities; it is not a delivery schedule.

## What's next?

**Next: OATS-02 — Loyalty program and reward systems.** OATS-01 is live at `/work/cross-sell-upsell/` with narrative scaffold and media placeholders; replace placeholder metrics and swap in production screenshots before final publish.

The larger goal is to split the broad Oats Overnight app case study into focused projects with enough depth to show the problem, research, design decisions, interactions, and results. Ratings & Notes already has its own case study and should remain separate.

## Ordered queue

| Order | ID | Project | Status |
| --- | --- | --- | --- |
| 1 | OATS-01 | Cross-sell and upsell system | In progress — page at `/work/cross-sell-upsell/`; assets and sourced metrics pending |
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

**Progress (2026-09-21):** Dedicated page shipped — [`content/briefs/cross-sell-upsell.md`](content/briefs/cross-sell-upsell.md), [`components/oats-cross-sell-story.tsx`](components/oats-cross-sell-story.tsx). Homepage Oats tile still points to `/work/oats-overnight-app/` until OATS-04. Hero uses placeholder **+$215K** and **~14%** acceptance until production data replaces them.

Done when: production media fills placeholders, analytics source the 70% / revenue / conversion figures, and the estimate is either sourced or explicitly qualified per evidence rules above.

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
