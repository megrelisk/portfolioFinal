"use client";

import { useTranslations } from "./I18nProvider";

export default function SkillsSection() {
  const { dict } = useTranslations();
  const { eyebrow, title, categories } = dict.skills;

  return (
    <section id="skills" className="pb-32 md:pb-48">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            {eyebrow}
          </span>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((col) => (
            <div
              key={col.title}
              className="glass rounded-2xl p-6 transition-colors duration-300 hover:border-cyan-400/30"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-cyan-dot" />
                <h3 className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                  {col.title}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {col.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-200"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
