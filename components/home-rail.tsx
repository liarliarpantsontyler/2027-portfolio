import Link from "next/link";
import { Clock } from "@/components/clock";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

function ArrowRight() {
  return (
    <svg
      className="rail-away"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15.17 6a30.2 30.2 0 0 1 5.62 5.406c.14.174.21.384.21.594m-5.83 6a30.2 30.2 0 0 0 5.62-5.406A.95.95 0 0 0 21 12m0 0H3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeRail({
  activeSlug,
  about,
}: {
  activeSlug?: string;
  about?: boolean;
}) {
  return (
    <aside className="rail">
      <div className="rail-name">
        <Link href="/">{site.name}</Link>
      </div>
      <div className="rail-intro">
        <p>
          Product designer at <a href="https://www.oatsovernight.com">Oats Overnight</a> — I design
          customer experiences, growth systems, and the tools that keep people coming back.
          Originally from Texas, still based in Dallas–Fort Worth.
        </p>
        <div className="rail-actions">
          <a href={site.links.email}>
            Email me <span className="dot" aria-hidden="true" />
          </a>
          <Link href="/about/" aria-current={about ? "page" : undefined}>
            About <span className="dot" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <Clock />
      <div className="rail-lists">
        <section className="rail-group" aria-labelledby="rail-work">
          <h2 id="rail-work">Work</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}/`}
                  aria-current={activeSlug === project.slug ? "page" : undefined}
                >
                  {project.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="rail-group" aria-labelledby="rail-focus">
          <h2 id="rail-focus">Focus</h2>
          <ul>
            {site.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
        <nav className="rail-group" aria-labelledby="rail-elsewhere">
          <h2 id="rail-elsewhere">Elsewhere</h2>
          <ul>
            <li>
              <a className="rail-away-link" href={site.links.email}>
                Email <ArrowRight />
              </a>
            </li>
            <li>
              <a className="rail-away-link" href={site.links.linkedin}>
                LinkedIn <ArrowRight />
              </a>
            </li>
            <li>
              <a className="rail-away-link" href={site.links.github}>
                GitHub <ArrowRight />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
