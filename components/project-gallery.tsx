import { Fragment } from "react";
import type { Project } from "@/content/projects";
import { ProjectMedia } from "@/components/project-media";

function spanClass(span?: "half" | "third" | "quarter", half?: boolean) {
  if (span === "third") return " third";
  if (span === "quarter") return " quarter";
  if (span === "half" || half) return " half";
  return "";
}

export function ProjectGallery({ project }: { project: Project }) {
  return (
    <section className={`project-story ${project.theme}`} aria-label={`${project.company} selected work`}>
      <div className="story-grid">
        {project.gallery.map((item, index) => (
          <Fragment key={`${item.src}-${item.title}-${index}`}>
            {item.chapter ? <h2 className="story-chapter">{item.chapter}</h2> : null}
            <figure className={`story-figure${spanClass(item.span, item.half)}`}>
              <ProjectMedia item={item} first={index === 0} />
              {item.title || item.caption ? (
                <figcaption className="story-caption">
                  <div>
                    {item.title ? <h3>{item.title}</h3> : null}
                    {item.caption ? <p>{item.caption}</p> : null}
                  </div>
                </figcaption>
              ) : null}
            </figure>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
