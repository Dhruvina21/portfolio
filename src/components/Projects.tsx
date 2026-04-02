import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// ── Types ──────────────────────────────────────────────────────────────────────

type FilterTab = 'All' | 'Python' | 'SQL' | 'ML' | 'Dashboard' | 'Web'

interface FeaturedStat {
  value: string
  label: string
}

interface Project {
  id: number
  title: string
  description: string
  impact: string
  accentClass: string
  accentBorderClass: string
  accentShadowClass: string
  tools: string[]
  filters: FilterTab[]
  github: string
  demo?: string
  featured?: boolean
  featuredStats?: FeaturedStat[]
}

// ── Data ──────────────────────────────────────────────────────────────────────

const TABS: FilterTab[] = ['All', 'Python', 'SQL', 'ML', 'Dashboard', 'Web']

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'IBM Data Analyst Capstone',
    description:
      'End-to-end analytics pipeline on 73,268 Stack Overflow developer responses — REST APIs, Python, SQL, and an interactive Looker Studio dashboard surfacing global tech trends.',
    impact: '73,268 records',
    accentClass: 'bg-[#67E8F9]',
    accentBorderClass: 'hover:border-[#67E8F9]/40',
    accentShadowClass: 'hover:shadow-[#67E8F9]/10',
    tools: ['Python', 'SQL', 'REST APIs', 'Looker Studio', 'BeautifulSoup'],
    filters: ['Python', 'SQL', 'Dashboard'],
    github: 'https://github.com/Dhruvina21/IBM-Data-Analytics-Capstone',
    featured: true,
    featuredStats: [
      { value: '73,268', label: 'records analyzed' },
      { value: '12', label: 'visualizations' },
      { value: '3-page', label: 'dashboard' },
    ],
  },
  {
    id: 2,
    title: 'Automobile Recession Analysis',
    description:
      'Analyzed automobile sales trends across recession periods using Python, Matplotlib, Seaborn, and Plotly — revealing patterns in consumer behavior during economic downturns.',
    impact: '5 recession periods',
    accentClass: 'bg-[#FCD34D]',
    accentBorderClass: 'hover:border-[#FCD34D]/40',
    accentShadowClass: 'hover:shadow-[#FCD34D]/10',
    tools: ['Python', 'Matplotlib', 'Seaborn', 'Plotly'],
    filters: ['Python', 'Dashboard'],
    github: 'https://github.com/Dhruvina21/automobile-recession-analysis',
  },
  {
    id: 3,
    title: 'King County House Sales',
    description:
      'Regression analysis on housing market data to predict sale prices using Python and statistical modeling techniques including feature engineering and cross-validation.',
    impact: '21,000+ homes',
    accentClass: 'bg-[#C4B5FD]',
    accentBorderClass: 'hover:border-[#C4B5FD]/40',
    accentShadowClass: 'hover:shadow-[#C4B5FD]/10',
    tools: ['Python', 'Pandas', 'scikit-learn', 'Regression'],
    filters: ['Python', 'ML'],
    github: 'https://github.com/Dhruvina21/king-county-house-sales',
  },
  {
    id: 4,
    title: 'Stock Data Dashboard',
    description:
      'Interactive stock data dashboard built with Python and Plotly for real-time financial trend visualization with REST API integration.',
    impact: 'Real-time insights',
    accentClass: 'bg-[#6EE7B7]',
    accentBorderClass: 'hover:border-[#6EE7B7]/40',
    accentShadowClass: 'hover:shadow-[#6EE7B7]/10',
    tools: ['Python', 'Plotly', 'REST APIs'],
    filters: ['Python', 'Dashboard'],
    github: 'https://github.com/Dhruvina21/Stock-Data-Dashboard',
  },
  {
    id: 5,
    title: 'Nutrition Tracker System',
    description:
      'Full PostgreSQL database with Python ETL pipeline extracting USDA nutritional data — desktop app with search, filtering, and category breakdowns across 8 food groups.',
    impact: '75+ records, 8 categories',
    accentClass: 'bg-[#FDA4AF]',
    accentBorderClass: 'hover:border-[#FDA4AF]/40',
    accentShadowClass: 'hover:shadow-[#FDA4AF]/10',
    tools: ['PostgreSQL', 'Python', 'ETL', 'Tkinter'],
    filters: ['Python', 'SQL'],
    github: 'https://github.com/Dhruvina21/nutrition-tracker',
  },
  {
    id: 6,
    title: 'AI Web Scraper',
    description:
      'AI-powered web scraper using LangChain and BeautifulSoup for automated data collection, parsing, and structured extraction at scale.',
    impact: 'Automated extraction',
    accentClass: 'bg-[#A78BFA]',
    accentBorderClass: 'hover:border-[#A78BFA]/40',
    accentShadowClass: 'hover:shadow-[#A78BFA]/10',
    tools: ['Python', 'LangChain', 'BeautifulSoup', 'AI'],
    filters: ['Python', 'ML'],
    github: 'https://github.com/Dhruvina21',
  },
  {
    id: 7,
    title: 'Weather Forecast App',
    description:
      'Weather application with REST API integration, React frontend and TypeScript for type-safe development, delivering live weather data with clean UI.',
    impact: 'Live weather data',
    accentClass: 'bg-[#7DD3FC]',
    accentBorderClass: 'hover:border-[#7DD3FC]/40',
    accentShadowClass: 'hover:shadow-[#7DD3FC]/10',
    tools: ['React', 'TypeScript', 'REST APIs', 'JavaScript'],
    filters: ['Web'],
    github: 'https://github.com/Dhruvina21',
  },
  {
    id: 8,
    title: 'JPMorgan Midas — Banking Microservice',
    description:
      'Spring Boot microservice integrating Kafka for high-volume transaction ingestion, Spring Data JPA with H2 for persistence, and a REST Incentive API — built during JPMorgan Chase Forage simulation.',
    impact: 'Full microservice pipeline',
    accentClass: 'bg-[#FDA4AF]',
    accentBorderClass: 'hover:border-[#FDA4AF]/40',
    accentShadowClass: 'hover:shadow-[#FDA4AF]/10',
    tools: ['Java', 'Spring Boot', 'Kafka', 'JPA', 'REST APIs'],
    filters: ['Web'],
    github: 'https://github.com/Dhruvina21/forage-midas',
  },
]

// ── Sub-components ─────────────────────────────────────────────────────────────

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const cardVariant = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: index * 0.1, ease: 'easeOut' as const },
    },
  }

  return (
    <motion.div
      layout
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
      whileHover={{ y: -8, scale: 1.01, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className={`col-span-1 md:col-span-2 rounded-2xl bg-[#111A14] border border-white/8 ${project.accentBorderClass} hover:shadow-xl ${project.accentShadowClass} transition-colors duration-300 overflow-hidden group cursor-default`}
    >
      {/* Accent bar */}
      <div className={`h-1 w-full ${project.accentClass}`} />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">

          {/* Left: text content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-[10px] font-bold tracking-[0.2em] px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                FEATURED
              </span>
              {/* Impact badge */}
              <motion.span
                whileHover={{ scale: 1.08 }}
                className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FCD34D]/15 text-[#FCD34D] border border-[#FCD34D]/30"
              >
                {project.impact}
              </motion.span>
            </div>

            <h3 className="text-xl font-bold text-[#F8FAFC] mb-2">{project.title}</h3>
            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5">{project.description}</p>

            {/* Mini stat row */}
            {project.featuredStats && (
              <div className="flex gap-4 mb-5 flex-wrap">
                {project.featuredStats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-lg font-extrabold text-[#67E8F9]">{s.value}</div>
                    <div className="text-[10px] text-[#9CA3AF] font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tools */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tools.map((tool) => (
                <span key={tool} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-[#9CA3AF] border border-white/8">
                  {tool}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-2 flex-wrap">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#6EE7B7]/40 text-[#6EE7B7] text-xs font-semibold hover:bg-[#6EE7B7] hover:text-[#0A0F0A] transition-all duration-200"
              >
                <GitHubIcon />
                GitHub
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#67E8F9]/40 text-[#67E8F9] text-xs font-semibold hover:bg-[#67E8F9] hover:text-[#0A0F0A] transition-all duration-200"
                >
                  <ExternalIcon />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardVariant = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1, ease: 'easeOut' as const },
    },
  }

  return (
    <motion.div
      layout
      variants={cardVariant}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
      whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className={`rounded-2xl bg-[#111A14] border border-white/8 ${project.accentBorderClass} hover:shadow-xl ${project.accentShadowClass} transition-colors duration-300 overflow-hidden flex flex-col group cursor-default`}
    >
      {/* Accent bar */}
      <div className={`h-1 w-full ${project.accentClass}`} />

      <div className="p-5 flex flex-col flex-1">
        {/* Impact badge */}
        <div className="mb-3">
          <motion.span
            whileHover={{ scale: 1.08 }}
            className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FCD34D]/15 text-[#FCD34D] border border-[#FCD34D]/30"
          >
            {project.impact}
          </motion.span>
        </div>

        <h3 className="text-base font-bold text-[#F8FAFC] mb-2 leading-snug">{project.title}</h3>
        <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

        {/* Tools */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tools.map((tool) => (
            <span key={tool} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-[#9CA3AF] border border-white/8">
              {tool}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 flex-wrap mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#6EE7B7]/40 text-[#6EE7B7] text-xs font-semibold hover:bg-[#6EE7B7] hover:text-[#0A0F0A] transition-all duration-200"
          >
            <GitHubIcon />
            GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#67E8F9]/40 text-[#67E8F9] text-xs font-semibold hover:bg-[#67E8F9] hover:text-[#0A0F0A] transition-all duration-200"
            >
              <ExternalIcon />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── Icon helpers ───────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All')
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const filtered = activeTab === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.filters.includes(activeTab))

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
      id="projects"
      ref={sectionRef}
      className="relative py-28 px-4 overflow-hidden bg-[#0A1A0F]"
    >
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_40%,rgba(103,232,249,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12 text-center"
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#10B981] block mb-4">
            Work
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            <span className="text-[#F8FAFC]">Featured </span>
            <span className="text-[#67E8F9]">Projects</span>
          </h2>
          <p className="text-[#9CA3AF] text-base sm:text-lg max-w-lg mx-auto">
            Real data. Real impact. Real results.
          </p>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap gap-2 justify-center mb-10"
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
                  layoutId="projects-active-tab"
                  className="absolute inset-0 rounded-full bg-[#10B981]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${activeTab === tab ? 'text-white' : 'text-[#9CA3AF] hover:text-[#F8FAFC]'}`}>
                {tab}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── Project grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) =>
              project.featured ? (
                <FeaturedCard key={project.id} project={project} index={i} />
              ) : (
                <ProjectCard key={project.id} project={project} index={i} />
              )
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
