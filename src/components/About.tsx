"use client";

import { aboutExpertise, aboutParagraphs } from "@/data/skills";
import { FadeInSection } from "@/components/FadeInSection";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-20">
      <div className="absolute inset-0 z-0 bg-linear-to-br from-white/25 via-transparent to-white/20 dark:from-gray-950/30 dark:via-transparent dark:to-gray-950/25" />
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <FadeInSection className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400">
            Profile
          </p>
          <h2 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">
            About
          </h2>
          <p className="mx-auto mb-2 max-w-2xl text-xl font-semibold text-gray-900 dark:text-white">
            向坪 涼
          </p>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            フルスタックエンジニア — コーポレート / EC / CMS
          </p>
        </FadeInSection>

        <FadeInSection
          className="mb-12 grid gap-4 sm:grid-cols-2"
          delay={100}
        >
          {aboutExpertise.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80"
            >
              <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </FadeInSection>

        <FadeInSection
          className="space-y-6 rounded-2xl border border-gray-200 bg-white/70 p-8 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/70"
          delay={200}
        >
          {aboutParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-base leading-relaxed md:text-lg ${
                index === aboutParagraphs.length - 1
                  ? "border-t border-gray-200 pt-6 font-medium text-gray-900 dark:border-gray-700 dark:text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </FadeInSection>
      </div>
    </section>
  );
}
