"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { getCategoryLabel } from "@/data/projects";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const techTags = [...project.languages, ...project.frameworks];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <button
        type="button"
        aria-label="閉じる"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 modal-animate-in flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl dark:bg-gray-900 sm:max-h-[90vh] sm:rounded-3xl">
        <div className="relative h-[19.5rem] shrink-0 overflow-hidden sm:h-96">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="モーダルを閉じる"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              {getCategoryLabel(project.categoryId)}
            </span>
            <h2
              id="project-modal-title"
              className="text-2xl font-bold text-white sm:text-3xl"
            >
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-white/80">{project.type}</p>
          </div>
        </div>

        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {project.overview}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: "担当範囲", value: project.scope },
              { label: "開発体制", value: project.team },
              { label: "開発期間", value: project.developmentPeriod },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/70"
              >
                <p className="mb-1 text-[11px] font-semibold tracking-wide text-gray-500 dark:text-gray-400">
                  {item.label}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {techTags.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                使用技術
              </p>
              <div className="flex flex-wrap gap-2">
                {techTags.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                取り組み内容
              </p>
              <ul className="space-y-2">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                成果・効果
              </p>
              <ul className="space-y-2">
                {project.results.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {project.url && (
            <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                サイトを見る
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                閉じる
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
