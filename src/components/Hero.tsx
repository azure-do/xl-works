"use client";

import { scrollToSection } from "@/hooks/useInView";

const heroTags = [
  "コーポレート / CMS",
  "Shopify / EC",
  "WordPress",
  "LP / プロモーション",
];

const heroButtons = [
  { label: "制作実績を見る", target: "works", variant: "primary" as const },
  { label: "プロフィール", target: "about", variant: "secondary" as const },
  { label: "技術スタック", target: "skills", variant: "ghost" as const },
];

export function Hero() {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-20">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center animate-fade-in-up">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400 md:text-base">
            Full Stack Engineer
          </p>
          <h1 className="mb-4 xl:mb-8 text-5xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl">
            向坪 涼
          </h1>
          <p className="mb-6 text-2xl font-semibold leading-snug tracking-tight text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
            コーポレートサイト・ECサイトを中心に、
            <br className="hidden sm:block" />
            設計から実装・運用まで。
          </p>
          <div className="mx-auto mb-8 mt-10 max-w-3xl space-y-4">
            <p
              className="animate-fade-in-up-delayed text-lg leading-relaxed text-gray-700 dark:text-gray-200 md:text-xl"
              style={{ animationDelay: "0.3s" }}
            >
              企業サイト、EC・ブランドサイト、LP・プロモーションサイトなど、
              これまでの
              <span className="font-semibold text-gray-900 dark:text-white">
                制作実績
              </span>
              で培った情報設計力と実装力で、要件整理から公開・改善まで伴走します。
            </p>
            <p
              className="animate-fade-in-up-delayed text-base leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg"
              style={{ animationDelay: "0.6s" }}
            >
              WordPress / CMS構築、問い合わせ導線、SEO内部対策、
              レスポンシブUI、HTML/CSS/JavaScript・React/Astroによるフロント実装まで。
              更新しやすく、公開後も運用しやすいWebサイトづくりを支援します。
            </p>
          </div>
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {heroTags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-gray-200/80 bg-white/75 px-3 py-1.5 text-xs font-medium text-gray-700 backdrop-blur-sm dark:border-gray-700/80 dark:bg-gray-900/65 dark:text-gray-300 md:text-sm md:px-4 md:py-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {heroButtons.map((button) => {
              if (button.variant === "primary") {
                return (
                  <button
                    key={button.label}
                    type="button"
                    onClick={() => scrollToSection(button.target)}
                    className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    {button.label}
                  </button>
                );
              }
              if (button.variant === "secondary") {
                return (
                  <button
                    key={button.label}
                    type="button"
                    onClick={() => scrollToSection(button.target)}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white/80 px-5 py-2.5 text-sm font-medium text-gray-700 backdrop-blur-sm transition hover:bg-white dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {button.label}
                  </button>
                );
              }
              return (
                <button
                  key={button.label}
                  type="button"
                  onClick={() => scrollToSection(button.target)}
                  className="inline-flex items-center px-2 py-2.5 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  {button.label} →
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
