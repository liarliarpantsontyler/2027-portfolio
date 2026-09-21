import type { Metadata } from "next";
import { EmailMeLink } from "@/components/email-me-link";
import { SiteFrame } from "@/components/site-frame";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.aboutLead,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <SiteFrame about>
      <main id="main" className="wrap about-layout">
        <div className="about-copy">
          <p className="kicker">Product · Growth · Brand · UX</p>
          <h1>13 years in, I’m still figuring it out.</h1>
          <p className="lead">{site.aboutLead}</p>
          <p className="body">{site.about}</p>
          <EmailMeLink />
          <div className="about-meta">
            <div>
              <p className="kicker">Recognition</p>
              <p>{site.recognition}</p>
            </div>
            <div>
              <p className="kicker">Education</p>
              <p>{site.education}</p>
            </div>
            <div>
              <p className="kicker">Currently</p>
              <p>{site.role}, remote from Dallas–Fort Worth.</p>
            </div>
          </div>
        </div>
        <div>
          <figure className="portrait">
            <img
              src="/tyler-portrait.webp"
              width={900}
              height={900}
              alt="Portrait of Tyler Hunter"
            />
          </figure>
          <div className="experience" style={{ marginTop: 36 }}>
            {site.experience.map((item) => {
              const paragraphs = Array.isArray(item.detail)
                ? item.detail
                : [item.detail];
              return (
                <article key={`${item.role}-${item.company}`}>
                  <h2>{item.role}</h2>
                  <p className="company">{item.company}</p>
                  {item.meta?.map((line) => (
                    <p className="experience-meta" key={line}>
                      {line}
                    </p>
                  ))}
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </article>
              );
            })}
          </div>
        </div>
      </main>
    </SiteFrame>
  );
}
