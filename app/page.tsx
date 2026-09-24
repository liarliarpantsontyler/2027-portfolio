import { HomeRail } from "@/components/home-rail";
import { ProjectGrid } from "@/components/project-grid";

export default function HomePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/home/klocky-signal-poster.webp"
        fetchPriority="high"
      />
      <main id="main" className="home">
        <HomeRail />
        <ProjectGrid />
      </main>
    </>
  );
}
