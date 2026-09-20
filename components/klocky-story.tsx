import { KlockyCollection } from "@/components/klocky-collection";
import type { Project } from "@/content/projects";
import { ProjectMedia } from "@/components/project-media";

export function KlockyStory({ project }: { project: Project }) {
  const [hero, , onboarding, customization, fullscreen] = project.gallery;

  return (
    <section className="klocky-story" aria-label="Klocky selected work">
      <div className="klocky-hero-stage">
        <ProjectMedia item={hero} first />
      </div>

      <section className="klocky-beat klocky-beat-centered">
        <p className="kicker">The collection</p>
        <h2>Thirteen ways to tell the time.</h2>
        <p>Each clock pairs its own composition with an original generative atmosphere.</p>
      </section>

      <KlockyCollection />

      <section className="klocky-feature klocky-feature-portrait">
        <div className="klocky-feature-copy">
          <p className="kicker">Choose a starting point</p>
          <h2>Your time. Your place. Your clock.</h2>
          <p>Set the essentials, then begin with a design that feels right.</p>
        </div>
        <ProjectMedia item={onboarding} first={false} />
      </section>

      <section className="klocky-feature klocky-feature-wide">
        <div className="klocky-feature-copy">
          <p className="kicker">Make it yours</p>
          <h2>Three choices change the whole mood.</h2>
          <p>Background, layout, and type stay simple enough to explore without turning Klocky into a design tool.</p>
        </div>
        <ProjectMedia item={customization} first={false} />
      </section>

      <section className="klocky-feature klocky-feature-final">
        <div className="klocky-feature-copy">
          <p className="kicker">Then let it be</p>
          <h2>The interface gets out of the way.</h2>
          <p>Controls fade. The screen becomes time, type, color, and motion.</p>
        </div>
        <ProjectMedia item={fullscreen} first={false} />
      </section>

      <section className="klocky-credit" aria-label="Contribution">
        <p className="kicker">Contribution</p>
        <p>{project.role}</p>
        {project.projectUrl ? (
          <a href={project.projectUrl} target="_blank" rel="noreferrer">
            Visit Klocky <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </section>
    </section>
  );
}
