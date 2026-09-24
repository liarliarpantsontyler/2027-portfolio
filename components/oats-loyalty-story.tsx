import Link from "next/link";
import type { Project } from "@/content/projects";
import { ProjectMedia } from "@/components/project-media";
import { CaseStudyClip } from "@/components/case-study-clip";

export function OatsLoyaltyStory({ project }: { project: Project }) {
  const [earning, hub, progression, achievements] = project.gallery;

  return (
    <section className="project-story oats-growth-story loyalty-story" aria-label="Loyalty and rewards story">
      <figure className="loyalty-hero">
        <div className="growth-hero-note">
          <p className="kicker">A little feedback. A little recognition.</p>
          <h2>Make participation<br />feel rewarding.</h2>
          <p>A rating becomes a visible step forward. The reward arrives in the same moment as the contribution.</p>
          <span className="growth-tag">Mobile interaction · Recorded design walkthrough</span>
        </div>
        <CaseStudyClip item={earning} />
        <figcaption>A flavor rating earns points in the existing project recording. Use Pause or Replay to inspect the interaction.</figcaption>
      </figure>

      <section className="growth-chapter loyalty-premise">
        <p className="kicker">The opportunity</p>
        <h2>Give customers a reason<br />to have a say.</h2>
        <p>Oats asks customers to rate flavors and help shape what comes next. Loyalty gives that participation a visible return: points, progress, and benefits they can work toward.</p>
        <p>I connected those moments across the portal. The design needed to explain how an everyday action contributes to a longer relationship, while keeping the next useful step easy to find.</p>
        <ol className="loyalty-loop" aria-label="The participation loop">
          <li><span>01</span><strong>Contribute</strong><p>Rate a flavor or share feedback.</p></li>
          <li><span>02</span><strong>See progress</strong><p>Connect the action to points earned.</p></li>
          <li><span>03</span><strong>Keep going</strong><p>Put the next benefit within view.</p></li>
        </ol>
      </section>

      <section className="growth-chapter growth-feature loyalty-hub" aria-labelledby="loyalty-hub-title">
        <div className="growth-copy">
          <p className="kicker">01 / Bring it together</p>
          <h2 id="loyalty-hub-title">A home for<br />their contribution.</h2>
          <p>The rewards hub brings a customer’s profile, participation history, next reward, and available surveys into one place. Their contribution gets a presence alongside their subscription.</p>
          <p>Flavor surveys sit beneath the progress card, linking a reason to participate with a way to act. Completed states make it easier to see which feedback has already been shared.</p>
        </div>
        <figure className="loyalty-hub-screen"><CaseStudyClip item={hub} /><figcaption>A mobile crop of the existing loyalty walkthrough, moving from progress to surveys and achievements.</figcaption></figure>
      </section>

      <section className="growth-chapter loyalty-progress" aria-labelledby="loyalty-progress-title">
        <div className="growth-copy">
          <p className="kicker">02 / Make progress legible</p>
          <h2 id="loyalty-progress-title">Show what’s next.<br />And how close it is.</h2>
          <p>A point balance needs context. The progression view pairs the total with the distance to the next tier, then lists the benefits associated with each stage.</p>
          <p>Earned and locked states help customers understand the difference between what they have and what they can unlock. Earning history gives the balance a trail they can inspect.</p>
        </div>
        <figure><ProjectMedia item={progression} first={false} /><figcaption>Progression detail from the design walkthrough. Values and benefits shown are examples from that design version.</figcaption></figure>
      </section>

      <section className="growth-chapter growth-feature loyalty-achievements" aria-labelledby="loyalty-achievements-title">
        <div className="growth-copy">
          <p className="kicker">03 / Give recognition some personality</p>
          <h2 id="loyalty-achievements-title">More than<br />a number going up.</h2>
          <p>Achievements create smaller moments of recognition alongside the longer tier journey. Named badges, illustrations, and bonus-point callouts give customers something specific to notice.</p>
          <p>The card invites people to learn how to unlock it. That explanation matters: a playful badge should also make the action behind it understandable.</p>
        </div>
        <figure><ProjectMedia item={achievements} first={false} /><figcaption>Achievement cards in the existing design walkthrough.</figcaption></figure>
      </section>

      <section className="growth-close">
        <div>
          <p className="kicker">The design</p>
          <h2>A visible connection between giving and getting.</h2>
          <p>The experience connects useful feedback with immediate recognition and a longer view of progress. These recordings show the interaction design; measured participation and retention effects are not yet established for this case study.</p>
        </div>
        <div className="growth-contribution">
          <p className="kicker">My contribution</p>
          <p>Product and interaction design connecting feedback, points, progression, and rewards across the customer portal.</p>
          <Link href="/work/flavor-ratings/">Explore the Ratings &amp; Notes story ↗</Link>
        </div>
      </section>
    </section>
  );
}
