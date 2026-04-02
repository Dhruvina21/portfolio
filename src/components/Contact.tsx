import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { Mail, Send, CheckCircle2 } from "lucide-react";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ── Types ──────────────────────────────────────────────────────────────────────

interface ContactCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  action?: "copy" | "link";
  borderClass: string;
  hoverBorderClass: string;
  hoverShadowClass: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const CONTACT_CARDS: ContactCard[] = [
  {
    icon: <Mail size={18} className="text-[#FCD34D]" />,
    label: "Email",
    value: "dhruvina21@gmail.com",
    action: "copy",
    borderClass: "border-[#FCD34D]/15",
    hoverBorderClass: "hover:border-[#FCD34D]/40",
    hoverShadowClass: "hover:shadow-[#FCD34D]/8",
  },
  {
    icon: <LinkedinIcon size={18} />,
    label: "LinkedIn",
    value: "linkedin.com/in/dhruvina-gujarati",
    href: "https://www.linkedin.com/in/dhruvina-gujarati-029a4b241/",
    action: "link",
    borderClass: "border-[#67E8F9]/15",
    hoverBorderClass: "hover:border-[#67E8F9]/40",
    hoverShadowClass: "hover:shadow-[#67E8F9]/8",
  },
  {
    icon: <GithubIcon size={18} />,
    label: "GitHub",
    value: "github.com/Dhruvina21",
    href: "https://github.com/Dhruvina21",
    action: "link",
    borderClass: "border-[#C4B5FD]/15",
    hoverBorderClass: "hover:border-[#C4B5FD]/40",
    hoverShadowClass: "hover:shadow-[#C4B5FD]/8",
  },
];

const SUBJECT_OPTIONS = [
  "Full-time Opportunity",
  "Internship Opportunity",
  "Freelance Project",
  "Just saying hi!",
];

// ── Contact card sub-component ────────────────────────────────────────────────

function InfoCard({
  card,
  index,
  inView,
}: {
  card: ContactCard;
  index: number;
  inView: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (card.action === "copy") {
      navigator.clipboard.writeText(card.value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const inner = (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.2 + index * 0.1, ease: "easeOut" }}
      whileHover={{
        y: -3,
        transition: { type: "spring", stiffness: 340, damping: 22 },
      }}
      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl bg-[#111A14] border ${card.borderClass} ${card.hoverBorderClass} hover:shadow-md ${card.hoverShadowClass} transition-all duration-200 cursor-pointer select-none`}
      onClick={card.action === "copy" ? handleClick : undefined}
    >
      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
        {card.icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold tracking-wider uppercase text-[#9CA3AF] mb-0.5">
          {card.label}
        </p>
        <p className="text-sm font-medium text-[#F8FAFC] truncate">
          {card.value}
        </p>
      </div>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[10px] font-bold text-[#6EE7B7] bg-[#6EE7B7]/10 px-2 py-0.5 rounded-full flex-shrink-0"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (card.action === "link" && card.href) {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {inner}
      </a>
    );
  }
  return inner;
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email";
    if (!message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const body = encodeURIComponent(
      `Hi Dhruvina,\n\n${message}\n\nFrom: ${name}`,
    );
    const mailtoUrl = `mailto:dhruvina21@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const cubicEase = [0.22, 1, 0.36, 1] as const;
  const slideLeft: Variants = {
    hidden: { opacity: 0, x: -48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.65, ease: cubicEase },
    },
  };
  const slideRight: Variants = {
    hidden: { opacity: 0, x: 48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.65, ease: cubicEase },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
    }),
  };

  const inputBase =
    "w-full px-4 py-3 rounded-lg bg-[#111A14] border border-white/8 text-[#F8FAFC] placeholder-[#4B5563] text-sm focus:outline-none focus:border-[#6EE7B7]/50 focus:shadow-[0_0_0_3px_rgba(110,231,183,0.08)] transition-all duration-200";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 px-4 overflow-hidden bg-[#0A1A0F]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />

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
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            <span className="text-[#F8FAFC]">Let's </span>
            <span className="text-[#67E8F9]">Connect</span>
          </h2>
          <p className="text-[#9CA3AF] text-base sm:text-lg max-w-lg mx-auto">
            Open to full-time Data Analyst roles. Let's talk!
          </p>
        </motion.div>

        {/* ── Two columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* ── LEFT: Contact info ── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-5"
          >
            {/* Contact cards */}
            <div className="flex flex-col gap-3">
              {CONTACT_CARDS.map((card, i) => (
                <InfoCard
                  key={card.label}
                  card={card}
                  index={i}
                  inView={inView}
                />
              ))}
            </div>

            {/* Availability callout */}
            <div className="rounded-xl bg-[#111A14] border border-[#6EE7B7]/15 border-l-[3px] border-l-[#6EE7B7] px-5 py-4">
              <p className="text-[#CBD5E1] text-sm leading-relaxed">
                Currently completing BS Computer Science at Arizona State
                University. Actively seeking full-time{" "}
                <span className="text-[#6EE7B7] font-semibold">
                  Data Analyst
                </span>
                ,{" "}
                <span className="text-[#6EE7B7] font-semibold">BI Analyst</span>
                , or{" "}
                <span className="text-[#6EE7B7] font-semibold">
                  Junior Data Scientist
                </span>{" "}
                roles.
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT: Contact form ── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                /* Success state */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="h-full min-h-[360px] flex flex-col items-center justify-center gap-5 rounded-2xl bg-[#111A14] border border-[#6EE7B7]/20 p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 18,
                      delay: 0.1,
                    }}
                  >
                    <CheckCircle2 size={52} className="text-[#6EE7B7]" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-[#F8FAFC]">
                    Message sent!
                  </h3>
                  <p className="text-[#9CA3AF] text-sm">
                    Thanks! I'll get back to you soon 🎉
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setMessage("");
                      setSubject(SUBJECT_OPTIONS[0]);
                    }}
                    className="text-xs text-[#9CA3AF] hover:text-[#6EE7B7] transition-colors underline underline-offset-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Name */}
                  <motion.div
                    custom={0}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    <label className="block text-xs font-semibold text-[#9CA3AF] mb-1.5 tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputBase}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-[#FDA4AF]">
                        {errors.name}
                      </p>
                    )}
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    custom={1}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    <label className="block text-xs font-semibold text-[#9CA3AF] mb-1.5 tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputBase}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-[#FDA4AF]">
                        {errors.email}
                      </p>
                    )}
                  </motion.div>

                  {/* Subject */}
                  <motion.div
                    custom={2}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    <label className="block text-xs font-semibold text-[#9CA3AF] mb-1.5 tracking-wide">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      title="Subject"
                      aria-label="Subject"
                      className={`${inputBase} cursor-pointer`}
                    >
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#111A14]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    custom={3}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    <label className="block text-xs font-semibold text-[#9CA3AF] mb-1.5 tracking-wide">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about the role or project..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${inputBase} resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-[#FDA4AF]">
                        {errors.message}
                      </p>
                    )}
                  </motion.div>

                  {/* Submit */}
                  <motion.div
                    custom={4}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 24px rgba(16,185,129,0.35)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 340,
                        damping: 22,
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-sm transition-colors duration-200 shadow-lg shadow-[#10B981]/25"
                    >
                      <Send size={15} />
                      Send Message
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Bottom social bar ── */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <p className="text-[#9CA3AF] text-xs font-medium tracking-wider uppercase">
            Find me on
          </p>
          <div className="flex gap-4">
            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/dhruvina-gujarati-029a4b241/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.18,
                boxShadow: "0 0 16px rgba(103,232,249,0.4)",
              }}
              transition={{ type: "spring", stiffness: 360, damping: 18 }}
              className="w-11 h-11 rounded-xl bg-[#111A14] border border-[#67E8F9]/20 flex items-center justify-center text-[#67E8F9] hover:bg-[#67E8F9]/10 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </motion.a>
            {/* GitHub */}
            <motion.a
              href="https://github.com/Dhruvina21"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.18,
                boxShadow: "0 0 16px rgba(196,181,253,0.4)",
              }}
              transition={{ type: "spring", stiffness: 360, damping: 18 }}
              className="w-11 h-11 rounded-xl bg-[#111A14] border border-[#C4B5FD]/20 flex items-center justify-center text-[#C4B5FD] hover:bg-[#C4B5FD]/10 transition-colors duration-200"
              aria-label="GitHub"
            >
              <GithubIcon size={18} />
            </motion.a>
            {/* Email */}
            <motion.a
              href="mailto:dhruvina21@gmail.com"
              whileHover={{
                scale: 1.18,
                boxShadow: "0 0 16px rgba(252,211,77,0.4)",
              }}
              transition={{ type: "spring", stiffness: 360, damping: 18 }}
              className="w-11 h-11 rounded-xl bg-[#111A14] border border-[#FCD34D]/20 flex items-center justify-center text-[#FCD34D] hover:bg-[#FCD34D]/10 transition-colors duration-200"
              aria-label="Email"
            >
              <Mail size={18} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
