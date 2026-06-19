"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";
import { useInView } from "@/hooks/useInView";

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const techTags = [...project.languages, ...project.frameworks];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl bg-linear-to-br from-white to-gray-50 text-left shadow-sm transition-all duration-500 hover:shadow-2xl dark:from-gray-900 dark:to-gray-800"
      >
        <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="relative z-10 p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {project.type}
            </span>
          </div>

          <h3 className="mb-4 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {project.title}
          </h3>

          <p className="mb-4 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {project.summary}
          </p>

          <div className="mb-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white/80 px-3 py-2 dark:border-gray-700 dark:bg-gray-800/70">
              <p className="mb-1 text-[11px] font-semibold tracking-wide text-gray-500 dark:text-gray-400">
                担当範囲
              </p>
              <p className="line-clamp-2 text-xs font-medium text-gray-800 dark:text-gray-200">
                {project.scope}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white/80 px-3 py-2 dark:border-gray-700 dark:bg-gray-800/70">
              <p className="mb-1 text-[11px] font-semibold tracking-wide text-gray-500 dark:text-gray-400">
                開発体制
              </p>
              <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                {project.team}
              </p>
            </div>
          </div>

          {techTags.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {techTags.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
                {techTags.length > 4 && (
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    +{techTags.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
            <span>詳細を見る</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </button>
    </div>
  );
}
