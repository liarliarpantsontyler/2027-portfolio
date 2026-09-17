import { HomeRail } from "@/components/home-rail";
import { ProjectGrid } from "@/components/project-grid";

export default function HomePage() {
  return (
    <main id="main" className="home">
      <HomeRail />
      <ProjectGrid />
    </main>
  );
}
