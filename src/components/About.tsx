import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

interface StatConfig {
  end: number;
  suffix: string;
  label: string;
  textClass: string;
  shadowClass: string;
  display: string; // raw display if not a simple integer (e.g. "73,268")
}

const stats: StatConfig[] = [
  {
    end: 2,
    suffix: "+",
    label: "Years of Experience",
    textClass: "text-[#FCD34D]",
    shadowClass: "shadow-[0_0_20px_rgba(252,211,77,0.06)]",
    display: "",
  },
  {
    end: 73268,
    suffix: "",
    label: "Records Analyzed",
    textClass: "text-[#67E8F9]",
    shadowClass: "shadow-[0_0_20px_rgba(103,232,249,0.06)]",
    display: "73,268",
  },
  {
    end: 13,
    suffix: "",
    label: "Certifications",
    textClass: "text-[#C4B5FD]",
    shadowClass: "shadow-[0_0_20px_rgba(196,181,253,0.06)]",
    display: "",
  },
];

function formatNumber(n: number, cfg: StatConfig): string {
  if (cfg.display) {
    // For 73,268 we animate the raw integer and format with comma
    return n >= cfg.end ? cfg.display : n.toLocaleString();
  }
  return String(Math.round(n));
}

function AnimatedStat({ cfg, inView }: { cfg: StatConfig; inView: boolean }) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 1600; // ms

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * cfg.end));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };

    startRef.current = null;
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [inView, cfg.end]);

  return (
    <span className={cfg.textClass}>
      {formatNumber(count, cfg)}
      {cfg.suffix}
    </span>
  );
}

const cubicEase = [0.22, 1, 0.36, 1] as const

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: cubicEase },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: cubicEase },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-4 overflow-hidden"
    >
      {/* Subtle radial background to break from hero */}
      <div className="absolute inset-0 bg-[#0A1A0F] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(16,185,129,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* ── LEFT COLUMN: Avatar + stat cards ── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col items-center gap-10"
          >
            {/* Avatar with pulsing glow ring */}
            <div className="relative flex items-center justify-center">
              {/* Outer pulse ring — sized for 200px avatar */}
              <motion.div
                className="absolute rounded-full border border-[#6EE7B7]/20"
                animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.0, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                style={{ width: 264, height: 264 }}
              />
              {/* Middle glow ring */}
              <motion.div
                className="absolute rounded-full border border-[#6EE7B7]/30"
                animate={{ scale: [1, 1.07, 1], opacity: [0.6, 0.15, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 0.4 }}
                style={{ width: 232, height: 232 }}
              />
              {/* Static glow backdrop */}
              <div className="absolute rounded-full w-[220px] h-[220px] about-avatar-glow" />
              {/* Photo circle — w-36 mobile (144px), w-48 desktop (192px) */}
              <div className="relative rounded-full overflow-hidden flex items-center justify-center w-36 h-36 md:w-48 md:h-48 about-avatar-circle">
                {imgError ? (
                  <span className="text-4xl font-extrabold text-[#6EE7B7] tracking-tight select-none">
                    DG
                  </span>
                ) : (
                  <img
                    src="/images/profile.jpg"
                    alt="Dhruvina Gujarati"
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
              {stats.map((cfg, i) => (
                <motion.div
                  key={cfg.label}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className={`rounded-xl p-4 text-center border border-white/5 bg-[#111A14]/80 backdrop-blur-sm ${cfg.shadowClass}`}
                >
                  <div className="text-2xl font-extrabold mb-1 leading-none">
                    <AnimatedStat cfg={cfg} inView={inView} />
                  </div>
                  <div className="text-[10px] font-medium text-[#9CA3AF] leading-tight">
                    {cfg.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Bio content ── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            {/* Section tag */}
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.25em] uppercase text-[#10B981]"
            >
              About Me
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.18 }}
              className="text-4xl sm:text-5xl font-extrabold leading-tight"
            >
              <span className="text-[#F8FAFC]">Turning Data Into </span>
              <span className="text-[#6EE7B7]">Decisions</span>
            </motion.h2>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.26 }}
              className="text-[#CBD5E1] text-base sm:text-lg leading-relaxed"
            >
              I'm a Data analyst and CS student at Arizona State University who
              turns messy datasets into decisions that matter. From engineering
              ETL pipelines processing 50K+ records to building interactive
              dashboards for executive stakeholders, I bring both technical
              depth and business thinking to every problem. Currently working as
              an Associate Data Analyst at ASU while completing my degree. Open
              to full-time data roles.
            </motion.p>

            {/* Highlight pills */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.34 }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#10B981]/25 bg-[#10B981]/8 text-sm font-medium text-[#F8FAFC]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-sm shadow-[#10B981]/60 animate-pulse" />
                Currently @ ASU
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#FCD34D]/25 bg-[#FCD34D]/8 text-sm font-medium text-[#F8FAFC]">
                <span className="w-2 h-2 rounded-full bg-[#FCD34D] shadow-sm shadow-[#FCD34D]/60" />
                Open to Work — May 2026
              </div>
            </motion.div>

            {/* Download Resume button */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.42 }}
            >
              <a
                href="/resume.pdf"
                download="Dhruvina_Gujarati_Resume.pdf"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border border-[#6EE7B7] text-[#6EE7B7] font-semibold text-sm hover:bg-[#6EE7B7] hover:text-[#0A0F0A] transition-all duration-200 hover:-translate-y-0.5"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 1v9M4.5 7l3.5 3.5L11.5 7M2 13h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
