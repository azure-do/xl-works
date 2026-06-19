"use client";

import { skillGroups } from "@/data/skills";
import { FadeInSection } from "@/components/FadeInSection";
import { useInView } from "@/hooks/useInView";

function SkillCard({
  group,
  index,
}: {
  group: (typeof skillGroups)[number];
  index: number;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const Icon = group.icon;

  return (
    <div
      ref={ref}
      className={`rounded-2xl bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-700 dark:bg-gray-900/75 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-3 dark:bg-blue-900/50">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {group.title}
        </h3>
      </div>
      <ul className="space-y-2">
        {group.items.map((item) => (
          <li
            key={item}
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-20 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeInSection className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400">
            Tech Stack
          </p>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Skills
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            フルスタック開発で使用してきた技術スタックです
          </p>
        </FadeInSection>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <SkillCard key={group.title} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
