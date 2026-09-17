import { HomeRail } from "@/components/home-rail";
import { PageBar } from "@/components/page-bar";
import { SiteFooter } from "@/components/site-footer";

export function SiteFrame({
  children,
  activeSlug,
  about,
}: {
  children: React.ReactNode;
  activeSlug?: string;
  about?: boolean;
}) {
  return (
    <div className="site-frame">
      <HomeRail activeSlug={activeSlug} about={about} />
      <div className="site-body">
        <PageBar />
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}
