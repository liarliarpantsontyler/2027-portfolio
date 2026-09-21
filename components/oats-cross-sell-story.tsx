"use client";

import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectMedia } from "@/components/project-media";

const SYSTEM_STEPS = [
  {
    title: "Customer context",
    detail: "Current products · Subscription size · Order state · Behavior · History",
  },
  { title: "Eligibility", detail: "What could this customer meaningfully buy or upgrade?" },
  { title: "Priority", detail: "Which opportunity is most valuable and relevant right now?" },
  { title: "Placement", detail: "Where should the offer appear in the customer's existing journey?" },
  { title: "Offer", detail: "Upgrade · Add-on · Cross-sell · Trial" },
  { title: "Action", detail: "Add to next order · Upgrade subscription · Try product · Dismiss" },
  { title: "Measurement", detail: "Exposure · Acceptance · Incremental revenue · Future behavior" },
];

export function OatsCrossSellStory({ project }: { project: Project }) {
  const [
    heroMotion,
    shopCards,
    orderManagement,
    packLadder,
    flavorBuilder,
    upgrade16to24,
    eightPackModal,
    proteinCoffee,
  ] = project.gallery;

  return (
    <section className="project-story oats oats-growth-story" aria-label="Cross-sell and upsell story">
      <div className="oats-growth-hero-stage">
        <div className="oats-growth-hero-grid">
          <div className="oats-growth-hero-primary">
            <ProjectMedia item={heroMotion} first />
          </div>
          <div className="oats-growth-hero-secondary">
            <ProjectMedia item={shopCards} first={false} />
            <ProjectMedia item={orderManagement} first={false} />
          </div>
        </div>
      </div>

      <section className="oats-growth-beat">
        <p className="kicker">The problem</p>
        <h2>The app wasn't really a store.</h2>
        <p>
          Customers were already logging into Oats Overnight regularly. The problem was what happened once they got
          there. Approximately <strong>70% of logged-in users took no measurable action</strong>. Most of the remaining
          behavior centered on practical subscription tasks — checking an upcoming order, changing flavors, adjusting
          quantity, skipping or managing delivery — with very little encouragement to discover or purchase something
          additional.
        </p>
        <blockquote className="oats-growth-pull">
          People used the app more like a banking app than an ecommerce store.
        </blockquote>
        <p>
          They came in with a specific task, checked or changed something, and left. Simply adding a Shop tab or waiting
          for customers to browse wasn't likely to create much new revenue.
        </p>
      </section>

      <section className="oats-growth-beat oats-growth-beat-compact">
        <p className="kicker">The original ask</p>
        <h2>From one upsell to a growth system.</h2>
        <p>The business wanted to encourage customers to move into larger subscription sizes. What could have been treated as “Add an upsell” became a broader question:</p>
        <p className="oats-growth-emphasis">
          How should Oats systematically create additional revenue from an existing subscriber throughout their
          relationship with us?
        </p>
      </section>

      <section className="oats-growth-beat">
        <p className="kicker">The insight</p>
        <h2>Shopping intent wasn't something we could assume.</h2>
        <p>
          Customers already had strong behaviors inside the product. Instead of manufacturing an entirely new shopping
          habit, I introduced relevant offers inside the behaviors that already existed.
        </p>
        <blockquote className="oats-growth-pull">
          If customers weren't naturally going shopping, commerce had to meet them where they already were.
        </blockquote>
      </section>

      <section className="oats-growth-beat">
        <p className="kicker">The tension</p>
        <h2>Productive friction, not zero friction.</h2>
        <p>
          Good UX often tries to remove interruptions. Here, interruption was part of the strategy. If a customer could
          complete a subscription task without ever encountering another product option, the experience worked for them
          but left a major business opportunity untouched.
        </p>
        <p className="oats-growth-emphasis">
          Where can we interrupt an existing task with a relevant offer without making the core experience feel harder
          to use?
        </p>
        <p>The goal wasn't maximum interruption — it was finding moments where the commercial opportunity made sense in context.</p>
      </section>

      <section className="oats-growth-beat">
        <p className="kicker">The strategy</p>
        <h2>Three principles.</h2>
        <ol className="oats-growth-principles">
          <li>
            <strong>Meet existing behavior.</strong> Put offers inside or adjacent to high-frequency subscription
            behaviors instead of depending on a dedicated store visit.
          </li>
          <li>
            <strong>Make the next step obvious.</strong> Show the most relevant step up from the customer's current
            state — 8 → 16 → 24 → 32 — not the whole catalog.
          </li>
          <li>
            <strong>Build a system, not a campaign.</strong> Offers respond to customer context — subscription, pack
            size, products owned, flavor history, tenure, inventory, prior offer response — so growth doesn't require a
            redesign every time.
          </li>
        </ol>
      </section>

      <section className="oats-growth-beat oats-growth-system" aria-label="How the system works">
        <p className="kicker">The system</p>
        <h2>A growth engine, not a collection of modals.</h2>
        <ol className="oats-growth-flow">
          {SYSTEM_STEPS.map((step) => (
            <li key={step.title}>
              <p className="oats-growth-flow-title">{step.title}</p>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="oats-growth-feature">
        <div className="oats-growth-feature-copy">
          <p className="kicker">Experience 01</p>
          <h2>Creating a pack-size ladder.</h2>
          <p>
            Rather than treating every pack size as equally important, the experience is built around progression:{" "}
            <strong>8 → 16 → 24 → 32</strong>. The interface distinguishes what the customer has, the next logical
            upgrade, what they receive, incremental price, and per-meal economics.
          </p>
          <p>
            The decision shrinks from “Which subscription should I choose?” to <strong>“Is the next step worth it?”</strong>
          </p>
        </div>
        <ProjectMedia item={packLadder} first={false} />
      </section>

      <section className="oats-growth-feature oats-growth-feature-split">
        <div className="oats-growth-feature-copy">
          <p className="kicker">Experience 02</p>
          <h2>16 meals → 24 meals.</h2>
          <p>
            A 16-pack subscriber has already demonstrated commitment. The upgrade can be framed incrementally — get 8
            more meals for a clear incremental price — instead of asking them to reconsider their entire subscription.
          </p>
          <p className="oats-growth-need">[NEED: exact messaging used in production]</p>
          <p className="oats-growth-need">[NEED: acceptance / conversion data]</p>
        </div>
        <div className="oats-growth-feature-media-stack">
          <ProjectMedia item={upgrade16to24} first={false} />
          <ProjectMedia item={flavorBuilder} first={false} />
        </div>
      </section>

      <section className="oats-growth-feature">
        <div className="oats-growth-feature-copy">
          <p className="kicker">Experience 03</p>
          <h2>The 8-pack modal.</h2>
          <p>
            This moment is one placement in the larger system — eligible customers see an offer when context, pack size,
            and journey align. Acceptance upgrades the subscription; dismissal records exposure for the next decision.
          </p>
          <p className="oats-growth-need">[NEED: exact trigger]</p>
          <p className="oats-growth-need">[NEED: measured result]</p>
        </div>
        <ProjectMedia item={eightPackModal} first={false} />
      </section>

      <section className="oats-growth-feature oats-growth-feature-split">
        <div className="oats-growth-feature-copy">
          <p className="kicker">Experience 04</p>
          <h2>Cross-selling another product.</h2>
          <p>
            Pack size isn't the only lever. The same system can introduce Protein Coffee or other relevant products —
            shifting from “Here's another thing we sell” to “Here's something relevant to what we already know about
            you,” using purchase history, flavors, ratings, and upcoming orders.
          </p>
          <p className="oats-growth-need">[NEED: cross-sell conversion / attach data]</p>
        </div>
        <div className="oats-growth-feature-media-stack">
          <ProjectMedia item={proteinCoffee} first={false} />
          <ProjectMedia item={shopCards} first={false} />
        </div>
      </section>

      <section className="oats-growth-decisions" aria-label="Key decisions">
        <article className="oats-growth-decision">
          <p className="kicker">Key decision</p>
          <h3>Interrupting customers intentionally</h3>
          <dl>
            <div>
              <dt>Observation</dt>
              <dd>Customers had little organic shopping behavior inside the logged-in experience.</dd>
            </div>
            <div>
              <dt>Decision</dt>
              <dd>Place commerce opportunities directly inside high-frequency customer journeys.</dd>
            </div>
            <div>
              <dt>Why</dt>
              <dd>
                A perfectly unobtrusive experience preserved the old pattern: complete the task and leave. Relevant
                offers create productive friction when the business value justifies the interruption.
              </dd>
            </div>
          </dl>
        </article>
        <article className="oats-growth-decision">
          <p className="kicker">Key decision</p>
          <h3>Show the next step, not the whole catalog</h3>
          <dl>
            <div>
              <dt>Observation</dt>
              <dd>Large choice sets make an upsell feel like another shopping task.</dd>
            </div>
            <div>
              <dt>Decision</dt>
              <dd>Anchor the experience on the current subscription and highlight the next logical step.</dd>
            </div>
            <div>
              <dt>Why</dt>
              <dd>
                The customer is already committed. The easiest question is “Do I want a little more?” not “What should I
                buy?”
              </dd>
            </div>
          </dl>
        </article>
      </section>

      <section className="oats-growth-impact" aria-label="Impact">
        <p className="kicker">Impact</p>
        <h2>Estimated incremental revenue in the first ~5 months.</h2>
        <p className="oats-growth-impact-primary">+$215K</p>
        <p className="oats-growth-impact-method">
          Estimated using eligible offer exposures × incremental conversion × incremental revenue per accepted offer.
          Replace with sourced production data before claiming causal incrementality.
        </p>
        <ul className="oats-growth-impact-secondary">
          <li>[NEED: offer acceptance]</li>
          <li>[NEED: pack upgrade rate]</li>
          <li>[NEED: cross-sell attach rate]</li>
          <li>[NEED: AOV / units / guardrail metrics]</li>
        </ul>
      </section>

      <section className="oats-growth-beat">
        <p className="kicker">What this became</p>
        <h2>Commerce inside the lifecycle.</h2>
        <p>
          What started as a request to increase subscription size became a reusable way to create revenue inside
          existing customer behavior. Instead of treating ecommerce as a separate destination, the system makes commerce
          part of the relationship — connecting subscription behavior, discovery, ratings, flavor preferences, loyalty,
          and recommendations over time.
        </p>
      </section>

      <section className="oats-growth-beat oats-growth-beat-compact">
        <p className="kicker">What happened next</p>
        <h2>More contextual growth surfaces.</h2>
        <p>
          The same framework opened smarter pack-size recommendations, product cross-sells, add-to-next-order flows,
          flavor- and ratings-informed offers, and loyalty incentives — each a placement in the same engine, not a
          one-off campaign.
        </p>
      </section>

      <section className="oats-growth-related" aria-label="Related work">
        <p className="kicker">Related work</p>
        <ul>
          <li>
            <Link href="/work/flavor-ratings/">Flavor Ratings</Link> — structured feedback that informs taste and product
            decisions.
          </li>
          <li>
            <Link href="/work/oats-overnight-app/">The customer app</Link> — loyalty, surveys, and the broader logged-in
            experience (dedicated case studies coming).
          </li>
        </ul>
      </section>

      <section className="oats-growth-credit" aria-label="Contribution">
        <p className="kicker">Contribution</p>
        <p>{project.role}</p>
      </section>
    </section>
  );
}
