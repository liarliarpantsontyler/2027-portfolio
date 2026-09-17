import Link from "next/link";
import { Clock } from "@/components/clock";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export function HomeRail() {
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
          <Link href="/about/">
            About <span className="dot" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <Clock />
      <div className="rail-lists">
        <div>
          <h2>Work</h2>
          <ul>
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}/`}>{project.shortName}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Focus</h2>
          <ul>
            {site.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Elsewhere</h2>
          <ul>
            <li>
              <a href={site.links.email}>Email</a>
            </li>
            <li>
              <a href={site.links.linkedin}>LinkedIn</a>
            </li>
            <li>
              <a href={site.links.github}>GitHub</a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
