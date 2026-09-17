import Link from "next/link";
import { PageBar } from "@/components/page-bar";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <div className="page">
      <PageBar />
      <main id="main" className="wrap not-found">
        <p className="kicker">404</p>
        <h1>This page isn’t here.</h1>
        <p>The work is on the homepage. Case studies live under /work.</p>
        <Link className="inline-link" href="/">
          Back home <span className="dot" aria-hidden="true" />
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
