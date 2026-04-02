import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

type Category =
  | "All"
  | "Languages"
  | "BI & Viz"
  | "ML & AI"
  | "Databases"
  | "Cloud";

interface Skill {
  name: string;
  category: Exclude<Category, "All">;
}

const TABS: Category[] = [
  "All",
  "Languages",
  "BI & Viz",
  "ML & AI",
  "Databases",
  "Cloud",
];

const SKILLS: Skill[] = [
  // Languages
  { name: "Python", category: "Languages" },
  { name: "R", category: "Languages" },
  { name: "SQL", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "TypeScript", category: "Languages" },
  // BI & Viz
  { name: "Power BI", category: "BI & Viz" },
  { name: "Tableau", category: "BI & Viz" },
  { name: "SAS", category: "BI & Viz" },
  { name: "Looker Studio", category: "BI & Viz" },
  { name: "IBM Cognos", category: "BI & Viz" },
  { name: "Excel", category: "BI & Viz" },
  { name: "Matplotlib", category: "BI & Viz" },
  { name: "Seaborn", category: "BI & Viz" },
  { name: "Plotly", category: "BI & Viz" },

  // ML & AI
  { name: "scikit-learn", category: "ML & AI" },
  { name: "Pandas", category: "ML & AI" },
  { name: "NumPy", category: "ML & AI" },
  { name: "LangChain", category: "ML & AI" },
  { name: "Generative AI", category: "ML & AI" },
  { name: "A/B Testing", category: "ML & AI" },
  // Databases
  { name: "PostgreSQL", category: "Databases" },
  { name: "MySQL", category: "Databases" },
  { name: "SQLite", category: "Databases" },
  { name: "ETL Pipelines", category: "Databases" },
  { name: "REST APIs", category: "Databases" },
  { name: "Apache Kafka", category: "Databases" },
  // Cloud
  { name: "AWS", category: "Cloud" },
  { name: "Git", category: "Cloud" },
  { name: "GitHub", category: "Cloud" },
  { name: "Jira", category: "Cloud" },
  { name: "SharePoint", category: "Cloud" },
];

// Tailwind class pairs for each category dot — bg + glow shadow
const DOT_CLASS: Record<Exclude<Category, "All">, string> = {
  Languages: "bg-[#FCD34D] shadow-[0_0_6px_rgba(252,211,77,0.50)]",
  "BI & Viz": "bg-[#67E8F9] shadow-[0_0_6px_rgba(103,232,249,0.50)]",
  "ML & AI": "bg-[#C4B5FD] shadow-[0_0_6px_rgba(196,181,253,0.50)]",
  Databases: "bg-[#6EE7B7] shadow-[0_0_6px_rgba(110,231,183,0.50)]",
  Cloud: "bg-[#FDA4AF] shadow-[0_0_6px_rgba(253,164,175,0.50)]",
};

// Tailwind class pairs for featured-card icon badges — bg tint + text colour
const FEATURED = [
  { name: "Python", iconClass: "bg-[#FCD34D]/10 text-[#FCD34D]" },
  { name: "SQL", iconClass: "bg-[#FCD34D]/10 text-[#FCD34D]" },
  { name: "Power BI", iconClass: "bg-[#67E8F9]/10 text-[#67E8F9]" },
  { name: "Tableau", iconClass: "bg-[#67E8F9]/10 text-[#67E8F9]" },
  { name: "SAS", iconClass: "bg-[#C4B5FD]/10 text-[#C4B5FD]" },
//  { name: "scikit-learn", iconClass: "bg-[#C4B5FD]/10 text-[#C4B5FD]" },
  { name: "Looker Studio", iconClass:"bg-[#C4B5FD]/10 text-[#C4B5FD]" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function FeaturedCard({
  name,
  iconClass,
  index,
}: {
  name: string;
  iconClass: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{
        y: -6,
        scale: 1.03,
        transition: { type: "spring", stiffness: 340, damping: 20 },
      }}
      className="group flex flex-col items-center gap-2 px-5 py-4 rounded-xl bg-[#111A14] border border-white/5 hover:border-[#6EE7B7]/40 hover:shadow-lg hover:shadow-[#6EE7B7]/8 transition-colors duration-200 cursor-default select-none"
    >
      {/* Coloured dot as icon proxy */}
      <span
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${iconClass}`}
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
      <span className="text-xs font-semibold text-[#F8FAFC] text-center leading-tight">
        {name}
      </span>
    </motion.div>
  );
}

function SkillPill({ skill, index }: { skill: Skill; index: number }) {
  const dotClass = DOT_CLASS[skill.category];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25, delay: index * 0.04, ease: "easeOut" }}
      whileHover={{
        y: -3,
        transition: { type: "spring", stiffness: 400, damping: 22 },
      }}
      className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111A14] border border-white/5 hover:border-[#6EE7B7]/35 hover:shadow-md hover:shadow-[#6EE7B7]/10 transition-colors duration-200 cursor-default select-none"
    >
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotClass}`} />
      <span className="text-sm font-medium text-[#F8FAFC]">{skill.name}</span>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Category>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered =
    activeTab === "All"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeTab);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: i * 0.08, ease: "easeOut" as const },
    }),
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-4 overflow-hidden bg-[#0A0F0A]"
    >
      {/* Subtle cyan tint on right side */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(103,232,249,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* ── Section header ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#10B981] block mb-4">
            Expertise
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            <span className="text-[#F8FAFC]">Skills &amp; </span>
            <span className="text-[#67E8F9]">Tools</span>
          </h2>
          <p className="text-[#9CA3AF] text-base sm:text-lg max-w-lg mx-auto">
            Technologies I use to turn data into insights
          </p>
        </motion.div>

        {/* ── Featured tools ── */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12"
        >
          <p className="text-[#C4B5FD] text-xs font-semibold tracking-[0.18em] uppercase mb-4 text-center">
            Featured Tools
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {FEATURED.map((f, i) => (
              <FeaturedCard
                key={f.name}
                name={f.name}
                iconClass={f.iconClass}
                index={i}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Tab bar ── */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {TABS.map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none"
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="active-tab"
                  className="absolute inset-0 rounded-full bg-[#10B981]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${activeTab === tab ? "text-white" : "text-[#9CA3AF] hover:text-[#F8FAFC]"}`}
              >
                {tab}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── Skill pills ── */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {filtered.map((skill, i) => (
                <SkillPill key={skill.name} skill={skill} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
