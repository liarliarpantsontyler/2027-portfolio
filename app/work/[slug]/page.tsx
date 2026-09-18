import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNextProject, getProject, projects } from "@/content/projects";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectResults } from "@/components/project-results";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const image = project.gallery.find((item) => item.kind !== "video")?.src || project.gallery[0]?.poster;

  return {
    title: project.name,
    description: project.intro,
    alternates: { canonical: `/work/${slug}/` },
    openGraph: {
      title: `${project.name} — Tyler Hunter`,
      description: project.intro,
      url: `/work/${slug}/`,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Tyler Hunter`,
      description: project.intro,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(project.slug);

  return (
    <main id="main">
      <div className="wrap">
        <header className="project-header">
          <p className="kicker">
            {project.company} / {project.name}
          </p>
          <h1>{project.headline}</h1>
          <div className="project-deck">
            <p>{project.intro}</p>
            <span>{project.capabilities}</span>
          </div>
        </header>
        <ProjectResults project={project} />
        <ProjectGallery project={project} />
        {project.problem || project.made ? (
          <section className="case-brief" aria-label="The story">
            {project.problem ? (
              <div>
                <p className="kicker">The problem</p>
                <h2>What needed to change.</h2>
                <p>{project.problem}</p>
              </div>
            ) : null}
            {project.made ? (
              <div>
                <p className="kicker">The work</p>
                <h2>What I made better.</h2>
                <p>{project.made}</p>
              </div>
            ) : null}
          </section>
        ) : null}
        <div className="case-credit">
          <div>
            <p className="kicker">Contribution</p>
            <p>{project.role}</p>
          </div>
        </div>
        <Link className="next-project" href={`/work/${next.slug}/`}>
          <span className="kicker">Next / {next.company}</span>
          <h2>
            {next.name}
            <span aria-hidden="true">↗</span>
          </h2>
        </Link>
      </div>
    </main>
  );
}
