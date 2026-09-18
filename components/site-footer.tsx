import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} {site.name}</span>
    </footer>
  );
}
