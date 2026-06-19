"use client";

import { useState } from "react";
import {
  categories,
  getProjectsByCategory,
  type CategoryId,
  type Project,
} from "@/data/projects";
import { FadeInSection } from "@/components/FadeInSection";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { scrollToSection } from "@/hooks/useInView";

export function Works() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("corporate");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCategoryClick = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    scrollToSection(categoryId);
  };

  return (
    <>
      <section id="works" className="relative scroll-mt-20 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInSection className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Works
          </h2>
        </FadeInSection>

        <div className="sticky top-20 z-20 -mx-6 mb-12 border-y border-gray-200/70 bg-white/60 px-6 py-4 backdrop-blur-md dark:border-gray-800/70 dark:bg-gray-950/60">
          <div className="flex gap-3 overflow-x-auto">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryClick(category.id)}
                  aria-pressed={isActive}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm dark:border-blue-500 dark:bg-blue-500"
                      : "border-gray-200 bg-white text-gray-700 hover:border-blue-200 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-500/60 dark:hover:text-blue-400"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-20">
          {categories.map((category) => {
            const categoryProjects = getProjectsByCategory(category.id);
            return (
              <section
                key={category.id}
                id={category.id}
                className="mb-20 scroll-mt-36"
              >
                <FadeInSection className="mb-8">
                  <div className="mb-3 flex items-center gap-4">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {category.label}
                    </h3>
                    <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {categoryProjects.length}件
                    </span>
                  </div>
                </FadeInSection>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onSelect={setSelectedProject}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
