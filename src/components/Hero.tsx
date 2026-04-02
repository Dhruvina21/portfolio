import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const titles = [
  "Data Analyst",
  "BI Developer",
  "Data Scientist",
  "ETL Engineer",
];

const stats = [
  {
    number: "73,268",
    label: "Developer Records Analyzed",
    sublabel: "IBM Data Analyst Capstone 2026",
  },
  {
    number: "78%",
    label: "Data Accuracy Improved",
    sublabel: "ASU Associate Data Analyst",
  },
  {
    number: "40%",
    label: "Processing Time Reduced",
    sublabel: "IT Quick Solutions ETL Pipeline",
  },
];

// Vibrant purple/violet palette for the neural network nodes
const NODE_COLORS: [number, number, number][] = [
  [124, 58, 237], // #7C3AED
  [109, 40, 217], // #6D28D9
  [139, 92, 246], // #8B5CF6
  [167, 139, 250], // #A78BFA
];

// Line color — deep violet #6D28D9
const LINE_COLOR: [number, number, number] = [109, 40, 217];

interface NetNode {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  baseOpacity: number;
  colorIdx: number;
  phase: number;
}

function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const nodes: NetNode[] = Array.from({ length: 98 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 2.5,
      speedX: (Math.random() - 0.5) * 0.42,
      speedY: (Math.random() - 0.5) * 0.42,
      baseOpacity: Math.random() * 0.12 + 0.7,
      colorIdx: Math.floor(Math.random() * NODE_COLORS.length),
      phase: Math.random() * Math.PI * 2,
    }));

    const CONNECTION_DIST = 220;
    let t = 0;
    let animId: number;

    const draw = () => {
      t += 0.013;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first (behind nodes)
      const [lr, lg, lb] = LINE_COLOR;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            // Each connection pulses at its own phase
            const connPhase =
              (nodes[i].id * 1.73 + nodes[j].id * 2.31) % (Math.PI * 2);
            const pulse = 0.5 + 0.5 * Math.sin(t * 1.2 + connPhase);
            const baseAlpha = 0.45 * (1 - dist / CONNECTION_DIST);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${lr},${lg},${lb},${baseAlpha * pulse})`;
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes with glow
      for (const p of nodes) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const nodePulse = 0.85 + 0.15 * Math.sin(t * 0.9 + p.phase);
        const [r, g, b] = NODE_COLORS[p.colorIdx];
        const alpha = p.baseOpacity * nodePulse;

        // Glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.18})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * nodePulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Typewriter
  useEffect(() => {
    const target = titles[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(
        () => setDisplayed(target.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIndex]);

  // GSAP cinematic scroll — 200vh section = ~100vh scroll range (60% faster than 500vh)
  useEffect(() => {
    const section = sectionRef.current;
    const heroText = heroTextRef.current;
    const card = cardRef.current;
    if (!section || !heroText || !card) return;

    let prevStats = false;

    const ctx = gsap.context(() => {
      card.style.visibility = "visible";
      gsap.set(card, { yPercent: 120 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            // Trigger as soon as card starts expanding (timeline 0.52),
            // so spring animations are mid-flight when the card fills the screen.
            const next = p > 0.5 && p < 0.86;
            if (next !== prevStats) {
              prevStats = next;
              setStatsVisible(next);
            }
          },
        },
      });

      // Phase 1 (0 → 0.28): hero text blurs, scales, fades
      tl.to(
        heroText,
        {
          opacity: 0,
          filter: "blur(12px)",
          scale: 1.06,
          duration: 0.28,
          ease: "power2.in",
        },
        0,
      );

      // Phase 2 (0.20 → 0.52): card slides up from below
      tl.to(
        card,
        {
          yPercent: 0,
          duration: 0.32,
          ease: "power3.out",
        },
        0.2,
      );

      // Phase 3 (0.52 → 0.72): card expands to fill screen
      tl.to(
        card,
        {
          left: "0%",
          width: "100%",
          height: "100%",
          borderRadius: 0,
          duration: 0.2,
          ease: "power2.inOut",
        },
        0.52,
      );

      // Phase 4 (0.88 → 0.93): card shrinks back
      tl.to(
        card,
        {
          left: "5%",
          width: "90%",
          height: "60%",
          borderRadius: "1.5rem",
          duration: 0.05,
          ease: "power2.in",
        },
        0.88,
      );

      // Phase 5 (0.93 → 1.0): card exits downward
      tl.to(
        card,
        {
          yPercent: 120,
          duration: 0.07,
          ease: "power2.in",
        },
        0.93,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const cubicEase = [0.22, 1, 0.36, 1] as const;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: cubicEase },
    },
  };

  return (
    // 200vh = ~100vh of scroll — 60% snappier than the original 500vh
    <section ref={sectionRef} className="relative h-[200vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Purple/blue neural network background */}
        <NeuralNetwork />

        {/* Radial depth glow at center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(108,99,255,0.05)_0%,transparent_70%)] pointer-events-none" />

        {/* Directional ambient gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/8 via-transparent to-[#7C3AED]/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0F0A] to-transparent pointer-events-none" />

        {/* ── Hero text ── */}
        <div
          ref={heroTextRef}
          className="relative z-10 flex items-center justify-center h-full"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center px-4 max-w-4xl mx-auto"
          >
            {/* Greeting */}
            <motion.p
              variants={itemVariants}
              className="text-[#F8FAFC] text-lg font-medium mb-4 tracking-wide"
            >
              Hi, I'm Dhruvina 👋
            </motion.p>

            {/* Name with pulsing glow ring */}
            <motion.div
              variants={itemVariants}
              className="mb-6 flex justify-center"
            >
              <div className="relative inline-block">
                {/* Cyan glow ring — matches the expanded color palette */}
                <motion.div
                  className="absolute inset-[-14px] rounded-2xl pointer-events-none border"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(103,232,249,0)",
                      "0 0 28px rgba(103,232,249,0.16), 0 0 60px rgba(108,99,255,0.08)",
                      "0 0 0px rgba(103,232,249,0)",
                    ],
                    borderColor: [
                      "rgba(103,232,249,0.08)",
                      "rgba(103,232,249,0.30)",
                      "rgba(103,232,249,0.08)",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.4,
                    ease: "easeInOut",
                  }}
                />
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
                  <span className="text-[#F8FAFC]">Dhruvina </span>
                  <span className="text-[#6EE7B7]">Gujarati</span>
                </h1>
              </div>
            </motion.div>

            {/* Typewriter rotating titles — cyan */}
            <motion.div
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-semibold text-[#67E8F9] mb-6 h-10 flex items-center justify-center"
            >
              <span>{displayed}</span>
              <span className="ml-0.5 inline-block w-0.5 h-8 bg-[#67E8F9] animate-pulse" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-[#CBD5E1] text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Turning raw data into decisions that matter.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-row gap-4 justify-center"
            >
              {/* Mint green filled */}
              <a
                href="#projects"
                className="px-8 py-3 rounded-lg bg-[#10B981] text-white font-semibold text-base hover:bg-[#059669] transition-all duration-200 shadow-lg shadow-[#10B981]/30 hover:shadow-[#10B981]/50 hover:-translate-y-0.5"
              >
                View My Work
              </a>
              {/* Amber/gold outline */}
              <a
                href="/resume.pdf"
                download="Dhruvina_Gujarati_Resume.pdf"
                className="px-8 py-3 rounded-lg border border-[#FCD34D] text-[#FCD34D] font-semibold text-base hover:bg-[#FCD34D] hover:text-[#0A0F0A] transition-all duration-200 hover:-translate-y-0.5"
              >
                Download Resume
              </a>
            </motion.div>

            {/* Scroll indicator — lavender */}
            <motion.div
              variants={itemVariants}
              className="mt-16 flex flex-col items-center gap-2 text-[#C4B5FD] text-xs"
            >
              <span>Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="w-5 h-8 border border-[#C4B5FD]/30 rounded-full flex items-start justify-center pt-1.5"
              >
                <div className="w-1 h-2 bg-[#C4B5FD] rounded-full" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Cinematic expanding card ── */}
        <div
          ref={cardRef}
          className="absolute z-20 overflow-hidden bg-[#111A14] invisible hero-card"
        >
          <div className="h-full w-full flex flex-col items-center justify-center px-4 sm:px-8 py-8 sm:py-14">
            <AnimatePresence mode="wait">
              {statsVisible && (
                <motion.div
                  key="stats-block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.25 } }}
                  exit={{ opacity: 0, transition: { duration: 0.18 } }}
                  className="w-full max-w-5xl"
                >
                  {/* Label */}
                  <motion.p
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-center text-[#C4B5FD] text-xs font-semibold tracking-[0.2em] uppercase mb-8"
                  >
                    Impact by the Numbers
                  </motion.p>

                  {/* Stat cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
                    {stats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 52, scale: 0.86 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                          delay: i * 0.16,
                        }}
                        className="bg-[#0A0F0A] rounded-2xl p-6 sm:p-8 border border-[#10B981]/20 hover:border-[#6EE7B7]/50 hover:shadow-xl hover:shadow-[#10B981]/10 transition-all duration-300 text-center group cursor-default"
                      >
                        {/* Amber/gold number for visual pop */}
                        <div className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-[#FCD34D] mb-2.5 group-hover:scale-105 transition-transform duration-300 origin-center">
                          {stat.number}
                        </div>
                        <div className="text-[#F8FAFC] font-semibold text-sm sm:text-base mb-1.5">
                          {stat.label}
                        </div>
                        <div className="text-[#9CA3AF] text-xs sm:text-sm leading-relaxed">
                          {stat.sublabel}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tagline + buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.54 }}
                    className="text-center"
                  >
                    <p className="text-[#CBD5E1] text-base sm:text-lg mb-6 leading-relaxed">
                      Turning raw data into decisions that matter.
                    </p>
                    <div className="flex flex-row gap-3 sm:gap-4 justify-center">
                      <a
                        href="#about"
                        className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-[#10B981] text-white font-semibold text-sm sm:text-base hover:bg-[#059669] transition-all duration-200 shadow-lg shadow-[#10B981]/30 hover:-translate-y-0.5"
                      >
                        See My Work
                      </a>
                      <a
                        href="#projects"
                        className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg border border-[#67E8F9] text-[#67E8F9] font-semibold text-sm sm:text-base hover:bg-[#67E8F9] hover:text-[#0A0F0A] transition-all duration-200 hover:-translate-y-0.5"
                      >
                        View Projects
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
