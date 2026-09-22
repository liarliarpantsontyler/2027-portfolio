import type { Project } from "@/content/projects";
import { ProjectMedia } from "@/components/project-media";

export function OatsCrossSellStory({ project }: { project: Project }) {
  const [home, before, coffee, proteinContext, proteinDetails, upgrade] = project.gallery;

  return (
    <section className="project-story oats oats-growth-story" aria-label="Cross-sell and upsell story">
      <figure className="growth-hero">
        <div className="growth-hero-note">
          <p className="kicker">The shipped experience</p>
          <h2>A new reason<br />to open the app.</h2>
          <p>Discovery gets a place on the homepage, before the familiar subscription tasks.</p>
          <span className="growth-tag">Live customer portal · Mobile</span>
        </div>
        <div className="growth-hero-screen"><ProjectMedia item={home} first /></div>
        <figcaption>Production homepage detail. Cropped above private shipment information.</figcaption>
      </figure>

      <section className="growth-chapter" aria-labelledby="growth-discovery">
        <div className="growth-copy">
          <p className="kicker">01 / Make discovery visible</p>
          <h2 id="growth-discovery">Interrupt the routine.<br />Earn the attention.</h2>
          <p>Customers landed here to check an order or manage a subscription. I wanted that familiar visit to also introduce something worth trying, without requiring a separate trip to the shop.</p>
          <p>I reduced the loyalty header and gave one offer the prominent placement previously occupied by a carousel. Product imagery and concise benefits explain the value before “Explore Now” invites the next step.</p>
        </div>
        <div className="growth-comparison">
          <figure>
            <div className="growth-image-stage growth-before"><ProjectMedia item={before} first={false} /></div>
            <figcaption><strong>Before / Historical Figma reference</strong>A large loyalty header and an ad-like carousel competed for attention.</figcaption>
          </figure>
          <figure>
            <div className="growth-image-stage growth-after"><ProjectMedia item={home} first={false} /></div>
            <figcaption><strong>Today / Production</strong>A smaller header makes room for an offer with a product story.</figcaption>
          </figure>
        </div>
        <div className="growth-feature growth-coffee">
          <div className="growth-copy">
            <p className="kicker">From discovery to choosing</p>
            <h3>The next step is the product.</h3>
            <p>In the shipped experience, Explore Now opens the Protein Coffee box builder directly. Customers can compare pack sizes and choose flavors. The earlier education flow in Figma is a design reference; this screen shows the actual destination.</p>
          </div>
          <figure><ProjectMedia item={coffee} first={false} /><figcaption>Live mobile builder, reached from the homepage offer.</figcaption></figure>
        </div>
      </section>

      <section className="growth-chapter" aria-labelledby="growth-addon">
        <div className="growth-copy">
          <p className="kicker">02 / Make the add-on understandable</p>
          <h2 id="growth-addon">Right beside the box<br />they already know.</h2>
          <p>Quick Add sits beneath Edit Flavors, where customers are already considering their next delivery. Protein Pack explains what it adds, how to use it, and the price before opening the details.</p>
          <p>The next screen makes the commitment explicit: 16 packs for $20, shipping monthly with the Oats subscription, with cancellation available anytime. Customers can also choose a different quantity.</p>
        </div>
        <div className="growth-pair growth-protein">
          <figure><ProjectMedia item={proteinContext} first={false} /><figcaption><strong>In context</strong>The offer follows flavor editing.</figcaption></figure>
          <figure><ProjectMedia item={proteinDetails} first={false} /><figcaption><strong>Before adding</strong>Benefits, recurring terms, and quantity choices.</figcaption></figure>
        </div>
        <div className="growth-rules">
          <p className="kicker">Quick Add / Documented progression</p>
          <ol>
            <li><span>01</span><strong>Protein Pack</strong><p>Oats subscription</p></li>
            <li><span>02</span><strong>Extra FIDs</strong><p>Already has Protein Pack</p></li>
            <li><span>03</span><strong>Pack upgrade</strong><p>Already has both</p></li>
          </ol>
          <p className="growth-caption">I reused existing eligibility rules. The design notes prioritize this sequence for Oats subscribers; coffee-only subscriptions skip Oats add-ons, and the upgrade hides at the maximum pack size. FIDs are Flavors in Development.</p>
        </div>
      </section>

      <section className="growth-chapter growth-feature growth-upgrade" aria-labelledby="growth-upgrade">
        <div className="growth-copy">
          <p className="kicker">03 / Prepare the next step</p>
          <h2 id="growth-upgrade">A bigger box.<br />Still their flavors.</h2>
          <p>Manage → Upgrade to 24 Pack opens a prepared box. The system adjusts quantities to 24/24, so customers can evaluate the upgrade without rebuilding their selection.</p>
          <p>They keep control: remove a flavor, adjust quantities, or pick additional flavors. The persistent action shows the total alongside the pack count. Less setup, with the final choice still in their hands.</p>
        </div>
        <figure><ProjectMedia item={upgrade} first={false} /><figcaption>Production: prefilled 24/24 state with editing controls and the $86 upgrade action.</figcaption></figure>
      </section>

      <section className="growth-close" aria-labelledby="growth-outcome">
        <div>
          <p className="kicker">Shipped outcome</p>
          <h2 id="growth-outcome">Discovery joins the everyday journey.</h2>
          <p>The live portal brings homepage discovery, contextual add-ons, and prepared upgrades into subscription management. These shipped interactions are the outcome shown here; revenue and conversion impact remain unverified.</p>
        </div>
        <div className="growth-contribution">
          <p className="kicker">My contribution</p>
          <p>I owned the work end-to-end: product strategy, experience design, offer placement, interaction details, and delivery.</p>
        </div>
      </section>
    </section>
  );
}
