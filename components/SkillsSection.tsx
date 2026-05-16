interface SkillColumn {
  title: string;
  skills: string[];
}

const columns: SkillColumn[] = [
  {
    title: "Data & Analytics",
    skills: ["SQL", "Power BI", "Reporting", "BI Development"],
  },
  {
    title: "Operations & Management",
    skills: ["JIRA", "Agile", "Compliance", "Process Design"],
  },
  {
    title: "Strategy & Leadership",
    skills: ["Investor Relations", "Partnerships", "Vision", "Decision-Making"],
  },
  {
    title: "AI & Modern Tools",
    skills: [
      "Claude Code",
      "Claude",
      "Gemini",
      "Cursor",
      "ChatGPT",
      "Midjourney",
      "Perplexity",
      "Notion AI",
      "GitHub Copilot",
      "Make.com",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            What I do
          </span>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            EXPERTISE
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {columns.map((col) => (
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
                {col.skills.map((s) => (
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
