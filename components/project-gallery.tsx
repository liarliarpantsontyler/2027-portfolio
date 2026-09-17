import { Fragment } from "react";
import type { Project, ProjectImage } from "@/content/projects";
import { OatsOverview } from "@/components/oats-overview";

function ProjectMedia({ item, first }: { item: ProjectImage; first: boolean }) {
  if (item.treatment === "overview") return <OatsOverview />;

  return (
    <div className={`story-media ${item.treatment}`}>
      {item.kind === "video" ? (
        <video
          width={item.width}
          height={item.height}
          poster={item.poster}
          controls
          playsInline
          preload="none"
          aria-label={item.alt}
        >
          <source src={item.src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={item.src}
          width={item.width}
          height={item.height}
          alt={item.alt}
          loading={first ? "eager" : "lazy"}
          decoding="async"
        />
      )}
    </div>
  );
}

export function ProjectGallery({ project }: { project: Project }) {
  return (
    <section className={`project-story ${project.theme}`} aria-label={`${project.company} selected work`}>
      <div className="story-grid">
        {project.gallery.map((item, index) => (
          <Fragment key={`${item.src}-${item.title}`}>
            {item.chapter ? <h2 className="story-chapter">{item.chapter}</h2> : null}
            <figure className={`story-figure${item.half ? " half" : ""}`}>
              <ProjectMedia item={item} first={index === 0} />
              <figcaption className="story-caption">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </figcaption>
            </figure>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
