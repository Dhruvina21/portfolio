import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  BarChart2, Brain, Database, LineChart, PieChart,
  GitBranch, LayoutDashboard, ArrowLeftRight, Zap,
  ClipboardList, TrendingUp, Code,
} from 'lucide-react'
import { ExpandingCards, type CardItem } from './ui/expanding-cards'

// ── Data ──────────────────────────────────────────────────────────────────────

const IBM_CARDS: CardItem[] = [
  {
    id: 'ibm-capstone',
    title: 'Data Analyst Capstone',
    description: 'End-to-end analytics pipeline, 73,268 records, Looker Studio dashboard, REST APIs',
    imgSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    icon: <BarChart2 size={22} />,
    linkHref: 'https://coursera.org/share/d5c780a5ed4844b3aab9297ef9a0469a',
    gradientClass: 'bg-gradient-to-br from-[#FCD34D]/10 via-transparent to-[#F59E0B]/5',
  },
  {
    id: 'ibm-genai',
    title: 'Skills for Generative AI',
    description: 'AI-powered analytics, data storytelling, dashboards with generative AI tools',
    imgSrc: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800',
    icon: <Brain size={22} />,
    linkHref: 'https://coursera.org/share/85401bb94a1b14f0ee58a2f726387a97',
    gradientClass: 'bg-gradient-to-br from-[#FCD34D]/10 via-transparent to-[#F59E0B]/5',
  },
  {
    id: 'ibm-sql',
    title: 'Databases & SQL for Data Science',
    description: 'SQL queries, database design, Python integration for data science workflows',
    imgSrc: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
    icon: <Database size={22} />,
    linkHref: 'https://coursera.org/share/1832de36fa3d0cc8ada3ff261acd12ea',
    gradientClass: 'bg-gradient-to-br from-[#FCD34D]/10 via-transparent to-[#F59E0B]/5',
  },
  {
    id: 'ibm-python-analysis',
    title: 'Data Analysis with Python',
    description: 'Pandas, NumPy, statistical analysis, regression and data visualization',
    imgSrc: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    icon: <LineChart size={22} />,
    linkHref: 'https://coursera.org/share/2c781a7d49c4ca0b5aaab97f215bc691',
    gradientClass: 'bg-gradient-to-br from-[#FCD34D]/10 via-transparent to-[#F59E0B]/5',
  },
  {
    id: 'ibm-python-viz',
    title: 'Data Visualization with Python',
    description: 'Matplotlib, Seaborn, Plotly — visual storytelling with real datasets',
    imgSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    icon: <PieChart size={22} />,
    linkHref: 'https://coursera.org/share/1d5841eebb0583120594440a5dedcf75',
    gradientClass: 'bg-gradient-to-br from-[#FCD34D]/10 via-transparent to-[#F59E0B]/5',
  },
  {
    id: 'ibm-engineering',
    title: 'Python for Data Engineering',
    description: 'ETL pipelines, API integration, web scraping and data engineering with Python',
    imgSrc: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    icon: <GitBranch size={22} />,
    linkHref: 'https://coursera.org/share/873123af26d31cdfa6c8d77690970d9e',
    gradientClass: 'bg-gradient-to-br from-[#FCD34D]/10 via-transparent to-[#F59E0B]/5',
  },
]

const OTHER_CARDS: CardItem[] = [
  {
    id: 'ms-modeling',
    title: 'Data Modeling in Power BI',
    description: 'DAX, data modeling, relationships and Power BI report design',
    imgSrc: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    icon: <LayoutDashboard size={22} />,
    linkHref: 'https://coursera.org/share/8994f42853e9f64d068e5cdb53690947',
    gradientClass: 'bg-gradient-to-br from-[#67E8F9]/10 via-transparent to-[#0891B2]/5',
  },
  {
    id: 'ms-etl',
    title: 'ETL in Power BI',
    description: 'Extract, transform and load workflows in Power BI for business intelligence',
    imgSrc: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800',
    icon: <ArrowLeftRight size={22} />,
    linkHref: 'https://coursera.org/share/0877b1ddf56e4f067cdb93d1a2237578',
    gradientClass: 'bg-gradient-to-br from-[#67E8F9]/10 via-transparent to-[#0891B2]/5',
  },
  {
    id: 'ms-powerbi',
    title: 'Harnessing Power BI',
    description: 'Advanced Power BI features, interactive dashboards and data storytelling',
    imgSrc: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=800',
    icon: <Zap size={22} />,
    linkHref: 'https://coursera.org/share/04c7171a2f97834e1e889e9b9d0593ec',
    gradientClass: 'bg-gradient-to-br from-[#67E8F9]/10 via-transparent to-[#0891B2]/5',
  },
  {
    id: 'google-pm',
    title: 'Professional Project Management',
    description: 'Agile methodologies, stakeholder management, project planning and execution',
    imgSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    icon: <ClipboardList size={22} />,
    linkHref: 'https://coursera.org/share/d5869e5acb0defc7d3bcec1610629aaa',
    gradientClass: 'bg-gradient-to-br from-[#6EE7B7]/10 via-transparent to-[#059669]/5',
  },
  {
    id: 'deloitte-sim',
    title: 'Data Analytics Simulation — Deloitte',
    description: 'Real-world Tableau dashboards, Excel analysis and executive stakeholder reporting',
    imgSrc: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800',
    icon: <TrendingUp size={22} />,
    linkHref: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_RRBtkZTgnp87kW2kC_1752682718054_completion_certificate.pdf',
    gradientClass: 'bg-gradient-to-br from-[#C4B5FD]/10 via-transparent to-[#7C3AED]/5',
  },
  {
    id: 'jpmorgan-sim',
    title: 'Software Engineering Simulation — JPMorgan Chase',
    description: 'Spring Boot, Kafka, financial technology and enterprise software engineering',
    imgSrc: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
    icon: <Code size={22} />,
    linkHref: 'https://www.theforage.com/completion-certificates/Sj7temL583QAYpHXD/E6McHJDKsQYh79moz_Sj7temL583QAYpHXD_RRBtkZTgnp87kW2kC_1748043310936_completion_certificate.pdf',
    gradientClass: 'bg-gradient-to-br from-[#FDA4AF]/10 via-transparent to-[#F43F5E]/5',
  },
]

// ── Main component ─────────────────────────────────────────────────────────────

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: i * 0.12, ease: 'easeOut' as const },
    }),
  }

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-28 px-4 overflow-hidden bg-[#0A0F0A]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_25%_55%,rgba(252,211,77,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#10B981] block mb-4">
            Credentials
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            <span className="text-[#F8FAFC]">Licenses &amp; </span>
            <span className="text-[#67E8F9]">Certifications</span>
          </h2>
          <p className="text-[#9CA3AF] text-base sm:text-lg max-w-lg mx-auto mb-5">
            Verified credentials from world-class institutions
          </p>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FCD34D]/15 text-[#FCD34D] border border-[#FCD34D]/30 text-sm font-bold">
            14 Certifications
          </span>
        </motion.div>

        {/* ── Group 1: IBM ── */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-10"
        >
          {/* Group label */}
          <div className="flex items-center gap-4 mb-5">
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#FCD34D]">
              IBM / Coursera
            </span>
            <div className="flex-1 h-px bg-[#FCD34D]/15" />
            <span className="text-[11px] text-[#9CA3AF]">6 certifications</span>
          </div>
          <ExpandingCards items={IBM_CARDS} defaultActiveIndex={0} />
        </motion.div>

        {/* ── Group 2: Microsoft · Google · Simulations ── */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Group label */}
          <div className="flex items-center gap-4 mb-5">
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#67E8F9]">
              Microsoft · Google · Industry Simulations
            </span>
            <div className="flex-1 h-px bg-[#67E8F9]/15" />
            <span className="text-[11px] text-[#9CA3AF]">6 certifications + 2 simulations</span>
          </div>
          <ExpandingCards items={OTHER_CARDS} defaultActiveIndex={0} />
        </motion.div>

      </div>
    </section>
  )
}
