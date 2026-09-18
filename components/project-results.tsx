import type { Project } from "@/content/projects";

export function ProjectResults({ project }: { project: Project }) {
  if (!project.outcomes?.length) return null;

  return (
    <div className="project-results">
      <dl className="result-grid">
        {project.outcomes.map((metric) => (
          <div className="result-cell" key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
            <p>{metric.context}</p>
          </div>
        ))}
      </dl>
      {project.resultNote ? <p className="result-note">{project.resultNote}</p> : null}
    </div>
  );
}
