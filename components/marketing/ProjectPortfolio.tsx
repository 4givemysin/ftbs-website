"use client";

import { useState, type ReactNode } from "react";
import { ProjectCard } from "@/components/marketing/ProjectCard";
import {
  projectCategories,
  projects,
  type ProjectCategory,
} from "@/lib/projects";

export function ProjectPortfolio() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">(
    "all",
  );

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        <FilterButton
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
        >
          All
        </FilterButton>
        {projectCategories.map((category) => (
          <FilterButton
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </FilterButton>
        ))}
      </div>

      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}

type FilterButtonProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`min-h-11 rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 ${
        active
          ? "bg-brand-navy text-white"
          : "bg-surface-alt text-brand-navy hover:bg-border"
      }`}
    >
      {children}
    </button>
  );
}
