import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'

// ── Types ──────────────────────────────────────────────────────────────────────

interface ExperienceEntry {
  role: string
  company: string
  date: string
  badge: string
  badgeClass: string
  dotClass: string
  dotShadowClass: string
  borderClass: string
  bullets: string[]
  tools: string[]
  github?: string
  cert?: string
  side: 'left' | 'right'
}

// ── Data ──────────────────────────────────────────────────────────────────────

const ENTRIES: ExperienceEntry[] = [
  {
    role: 'Associate Data Analyst',
    company: 'Arizona State University, Tempe, AZ',
    date: '2023 — Present',
    badge: 'CURRENT ROLE',
    badgeClass: 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30',
    dotClass: 'bg-[#6EE7B7]',
    dotShadowClass: 'shadow-[0_0_10px_rgba(110,231,183,0.7)]',
    borderClass: 'border-[#6EE7B7]/20',
    bullets: [
      'Engineered SQL-based ETL workflows consolidating 500+ student records, improving data accuracy by 78% by eliminating duplicate entries causing reporting inconsistencies.',
      'Built interactive dashboards tracking enrollment trends and student performance metrics, improving retention visibility by 40% for academic leadership teams.',
      'Automated monthly reporting pipelines reducing manual effort by 35% and delivering insights to 10+ stakeholders.',
    ],
    tools: ['SQL', 'ETL', 'Dashboards', 'Python', 'Reporting'],
    side: 'left',
  },
  {
    role: 'Data Analyst Capstone Project',
    company: 'IBM / Coursera',
    date: 'Spring 2026',
    badge: 'CAPSTONE',
    badgeClass: 'bg-[#FCD34D]/15 text-[#FCD34D] border border-[#FCD34D]/30',
    dotClass: 'bg-[#FCD34D]',
    dotShadowClass: 'shadow-[0_0_10px_rgba(252,211,77,0.7)]',
    borderClass: 'border-[#FCD34D]/20',
    bullets: [
      'Engineered end-to-end analytics pipeline on 73,268 Stack Overflow survey responses via REST APIs and web scraping.',
      'Designed 3-page interactive dashboard in Google Looker Studio with 12 visualizations surfacing global developer trends.',
      'Delivered data-driven findings identifying JavaScript as #1 language and fastest-growing skills (Rust, Go) for stakeholders.',
    ],
    tools: ['Python', 'SQL', 'REST APIs', 'Looker Studio', 'BeautifulSoup'],
    github: 'https://github.com/Dhruvina21/IBM-Data-Analytics-Capstone',
    cert: 'https://coursera.org/share/d5c780a5ed4844b3aab9297ef9a0469a',
    side: 'right',
  },
  {
    role: 'Data Analytics Intern',
    company: 'IT Quick Solutions, India',
    date: 'Summer 2025',
    badge: 'INTERNSHIP',
    badgeClass: 'bg-[#C4B5FD]/15 text-[#C4B5FD] border border-[#C4B5FD]/30',
    dotClass: 'bg-[#C4B5FD]',
    dotShadowClass: 'shadow-[0_0_10px_rgba(196,181,253,0.7)]',
    borderClass: 'border-[#C4B5FD]/20',
    bullets: [
      'Built Python & SQL ETL pipelines processing 50K+ customer records, reducing processing time by 40%.',
      'Developed scikit-learn segmentation models at 80% accuracy via feature engineering.',
      'Created Power BI dashboards tracking KPIs across customer trends, pricing, and utilization patterns.',
    ],
    tools: ['Python', 'SQL', 'Power BI', 'scikit-learn', 'Pandas'],
    side: 'left',
  },
  {
    role: 'Data Analytics Virtual Intern',
    company: 'Deloitte Australia (Forage)',
    date: 'Summer 2025',
    badge: 'VIRTUAL INTERN',
    badgeClass: 'bg-[#67E8F9]/15 text-[#67E8F9] border border-[#67E8F9]/30',
    dotClass: 'bg-[#67E8F9]',
    dotShadowClass: 'shadow-[0_0_10px_rgba(103,232,249,0.7)]',
    borderClass: 'border-[#67E8F9]/20',
    bullets: [
      'Developed Tableau dashboards analyzing 50,000+ performance records from 4 facilities, reducing failures by 15%.',
      'Conducted competitive analysis on 5,000+ compensation records using advanced Excel (pivot tables, regression).',
      'Collaborated with cross-functional teams building SharePoint workflows, improving reporting accuracy by 25%.',
    ],
    tools: ['Tableau', 'Excel', 'SQL', 'SharePoint', 'Cross-functional'],
    cert: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_RRBtkZTgnp87kW2kC_1752682718054_completion_certificate.pdf',
    side: 'right',
  },
]

// ── Sub-components ─────────────────────────────────────────────────────────────

function TimelineDot({ entry, inView }: { entry: ExperienceEntry; inView: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22, delay: 0.15 }}
      className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center"
    >
      {/* Outer glow ring */}
      <motion.div
        className={`absolute w-7 h-7 rounded-full ${entry.dotClass} opacity-20`}
        animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      />
      {/* Core dot */}
      <div className={`w-4 h-4 rounded-full ${entry.dotClass} ${entry.dotShadowClass} relative z-10`} />
    </motion.div>
  )
}

function ExperienceCard({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const isLeft = entry.side === 'left'

  const cubicEase = [0.22, 1, 0.36, 1] as const
  const cardVariant: Variants = {
    hidden: { opacity: 0, x: isLeft ? -60 : 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.65, ease: cubicEase },
    },
  }

  const toolVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.3 },
    },
  }

  const toolItem: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  return (
    <div ref={ref} className="relative grid md:grid-cols-2 gap-0 items-center mb-16 last:mb-0">

      {/* Timeline dot — centered on the dividing line */}
      <TimelineDot entry={entry} inView={inView} />

      {/* LEFT slot */}
      <div className={`md:pr-12 ${isLeft ? '' : 'md:order-first'}`}>
        {isLeft ? (
          <motion.div
            variants={cardVariant}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <CardInner entry={entry} inView={inView} toolVariants={toolVariants} toolItem={toolItem} index={index} />
          </motion.div>
        ) : (
          /* spacer on left when card is on right */
          <div />
        )}
      </div>

      {/* RIGHT slot */}
      <div className={`md:pl-12 ${isLeft ? '' : ''}`}>
        {!isLeft ? (
          <motion.div
            variants={cardVariant}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <CardInner entry={entry} inView={inView} toolVariants={toolVariants} toolItem={toolItem} index={index} />
          </motion.div>
        ) : (
          <div />
        )}
      </div>

    </div>
  )
}

interface CardInnerProps {
  entry: ExperienceEntry
  inView: boolean
  toolVariants: Variants
  toolItem: Variants
  index: number
}

function CardInner({ entry, inView, toolVariants, toolItem }: CardInnerProps) {
  return (
    <div
      className={`relative rounded-2xl bg-[#111A14] border ${entry.borderClass} p-6 hover:shadow-lg transition-shadow duration-300`}
    >
      {/* Badge */}
      <span className={`absolute top-4 right-4 text-[10px] font-bold tracking-[0.15em] px-2.5 py-1 rounded-full ${entry.badgeClass}`}>
        {entry.badge}
      </span>

      {/* Role */}
      <h3 className="text-lg font-bold text-[#F8FAFC] pr-28 mb-0.5">{entry.role}</h3>

      {/* Company */}
      <p className="text-[#67E8F9] text-sm font-medium mb-1">{entry.company}</p>

      {/* Date */}
      <p className="text-[#FCD34D] text-xs font-semibold mb-4">{entry.date}</p>

      {/* Divider */}
      <div className="h-px bg-white/5 mb-4" />

      {/* Bullets */}
      <ul className="space-y-2.5 mb-5">
        {entry.bullets.map((b) => (
          <li key={b} className="flex gap-2.5 text-sm text-[#CBD5E1] leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#10B981] flex-shrink-0" />
            {b}
          </li>
        ))}
      </ul>

      {/* Tool tags */}
      <motion.div
        variants={toolVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="flex flex-wrap gap-2 mb-4"
      >
        {entry.tools.map((tool) => (
          <motion.span
            key={tool}
            variants={toolItem}
            className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-[#9CA3AF] border border-white/8"
          >
            {tool}
          </motion.span>
        ))}
      </motion.div>

      {/* GitHub / Cert buttons */}
      {(entry.github || entry.cert) && (
        <div className="flex gap-2 flex-wrap">
          {entry.github && (
            <a
              href={entry.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-[#9CA3AF] text-xs font-medium hover:border-[#6EE7B7]/40 hover:text-[#6EE7B7] transition-colors duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          )}
          {entry.cert && (
            <a
              href={entry.cert}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-[#9CA3AF] text-xs font-medium hover:border-[#FCD34D]/40 hover:text-[#FCD34D] transition-colors duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
              Certificate
            </a>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: i * 0.08, ease: 'easeOut' as const },
    }),
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 px-4 overflow-hidden bg-[#0A0F0A]"
    >
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(16,185,129,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-20 text-center"
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#10B981] block mb-4">
            Journey
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            <span className="text-[#F8FAFC]">Professional </span>
            <span className="text-[#67E8F9]">Experience</span>
          </h2>
          <p className="text-[#9CA3AF] text-base sm:text-lg max-w-lg mx-auto">
            Where I've applied my data skills
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Vertical line — hidden on mobile, shown md+ */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#6EE7B7]/10 hidden md:block" />

          {/* Animated pulse traveling down */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, #6EE7B7, transparent)', height: 120 }}
            animate={{ top: ['-10%', '110%'] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
          />

          {/* Entries */}
          {ENTRIES.map((entry, i) => (
            <ExperienceCard key={entry.role} entry={entry} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
