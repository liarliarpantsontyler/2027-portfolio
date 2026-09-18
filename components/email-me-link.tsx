"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

function ArrowRight() {
  return (
    <svg className="email-me-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

export function EmailMeLink() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const copyEmail = () => {
    void navigator.clipboard.writeText(site.email).then(() => {
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="about-email-actions">
      <a className="email-me-link email-me-link-fill" href={site.links.email}>
        Email Me
        <ArrowRight />
      </a>
      <button
        type="button"
        className="email-me-link email-me-link-outline email-me-link-copy"
        onClick={copyEmail}
      >
        <span className="email-me-link-copy-label" aria-live="polite">
          <span>{copied ? "Copied!" : "Copy Email Address"}</span>
          <span aria-hidden="true">Copy Email Address</span>
        </span>
        <ArrowRight />
      </button>
    </div>
  );
}
