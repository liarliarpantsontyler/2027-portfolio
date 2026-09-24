"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { HomeProjectTile } from "@/components/home-project-tile";
import type { MiniProjectModalHandle } from "@/components/mini-project-modal";

const MiniProjectModal = dynamic(
  () =>
    import("@/components/mini-project-modal").then((mod) => mod.MiniProjectModal),
  { ssr: false },
);
import {
  homeLayoutRows,
  homeTileLayout,
  homeTiles,
  type HomeModalTile,
  type MiniProject,
} from "@/content/home";

const tileById = new Map(homeTiles.map((tile) => [tile.id, tile]));

export function ProjectGrid() {
  const [openProject, setOpenProject] = useState<MiniProject | null>(null);
  const modalRef = useRef<MiniProjectModalHandle>(null);

  useEffect(() => {
    const syncProjectFromUrl = () => {
      const slug = new URL(window.location.href).searchParams.get("project");
      const tile = homeTiles.find(
        (item): item is HomeModalTile =>
          item.destination.type === "modal" && item.destination.project.slug === slug,
      );
      setOpenProject(tile?.destination.project || null);
    };

    syncProjectFromUrl();
    window.addEventListener("popstate", syncProjectFromUrl);
    return () => window.removeEventListener("popstate", syncProjectFromUrl);
  }, []);

  const openModal = (tile: HomeModalTile) => {
    const project = tile.destination.project;
    const url = new URL(window.location.href);
    url.searchParams.set("project", project.slug);
    window.history.pushState(
      { ...window.history.state, miniProject: project.slug },
      "",
      url,
    );
    flushSync(() => setOpenProject(project));
    modalRef.current?.show();
  };

  const closeModal = () => {
    const state = window.history.state as { miniProject?: string } | null;
    setOpenProject(null);

    if (state?.miniProject) {
      window.history.back();
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.delete("project");
    window.history.replaceState(window.history.state, "", url);
  };

  return (
    <>
      <section className="home-project-grid" aria-label="Projects">
        {homeLayoutRows.map((row, rowIndex) => (
          <div
            className={`home-row home-row--${row.size}`}
            key={`${row.size}-${rowIndex}`}
          >
            {row.tileIds.map((id) => {
              const tile = tileById.get(id);
              if (!tile) return null;
              return (
                <HomeProjectTile
                  key={id}
                  tile={tile}
                  layout={homeTileLayout[id]}
                  rowSize={row.size}
                  onOpen={openModal}
                />
              );
            })}
          </div>
        ))}
      </section>
      <MiniProjectModal ref={modalRef} project={openProject} onRequestClose={closeModal} />
    </>
  );
}
