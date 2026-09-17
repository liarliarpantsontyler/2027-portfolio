import Link from "next/link";
import { site } from "@/content/site";

export function PageBar() {
  return (
    <header className="page-bar">
      <Link className="page-name" href="/">
        {site.name}
      </Link>
      <nav>
        <Link href="/">Work</Link>
        <Link href="/about/">About</Link>
        <a href={site.links.email}>Email</a>
      </nav>
    </header>
  );
}
