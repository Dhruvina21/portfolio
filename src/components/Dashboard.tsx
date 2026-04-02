import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'

// ── Types ──────────────────────────────────────────────────────────────────────

type TabId = 'tech' | 'projects' | 'market'

interface Tab {
  id: TabId
  label: string
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

const TABS: Tab[] = [
  { id: 'tech',     label: 'Tech Trends' },
  { id: 'projects', label: 'My Project Stats' },
  { id: 'market',   label: 'Job Market Pulse' },
]

// ── Chart data ────────────────────────────────────────────────────────────────

const LANG_USAGE = [
  { name: 'JavaScript', value: 62.3 },
  { name: 'HTML/CSS',   value: 52.9 },
  { name: 'SQL',        value: 51.4 },
  { name: 'Python',     value: 51.0 },
  { name: 'TypeScript', value: 38.5 },
  { name: 'Java',       value: 30.3 },
  { name: 'C#',         value: 27.1 },
  { name: 'C++',        value: 23.5 },
  { name: 'Go',         value: 13.5 },
  { name: 'Rust',       value: 12.2 },
]

const LANG_WANTED = [
  { name: 'Python',     value: 18.0 },
  { name: 'JavaScript', value: 14.5 },
  { name: 'TypeScript', value: 12.3 },
  { name: 'Rust',       value: 11.8 },
  { name: 'Go',         value: 9.7  },
  { name: 'SQL',        value: 8.9  },
  { name: 'Kotlin',     value: 7.2  },
  { name: 'Swift',      value: 6.8  },
]

const PROJECT_CATEGORIES = [
  { name: 'Python',    value: 6, color: '#6EE7B7' },
  { name: 'Dashboard', value: 4, color: '#FCD34D' },
  { name: 'SQL',       value: 3, color: '#67E8F9' },
  { name: 'ML/AI',     value: 3, color: '#C4B5FD' },
  { name: 'Web',       value: 2, color: '#FDA4AF' },
]

const IMPACT_METRICS = [
  { name: 'Developer Records',   value: 73268 },
  { name: 'Customer Records',    value: 50000 },
  { name: 'Performance Records', value: 50000 },
  { name: 'Student Records',     value: 500   },
  { name: 'Nutrition Records',   value: 75    },
]

const SKILLS_DEMAND = [
  { name: 'SQL',              value: 78 },
  { name: 'Python',           value: 72 },
  { name: 'Excel',            value: 67 },
  { name: 'Tableau/Power BI', value: 58 },
  { name: 'Statistics',       value: 45 },
  { name: 'Machine Learning', value: 38 },
  { name: 'Communication',    value: 35 },
  { name: 'R',                value: 28 },
]

const SALARY_DATA = [
  { name: 'Data Analyst',   min: 55,  max: 95  },
  { name: 'BI Analyst',     min: 60,  max: 100 },
  { name: 'Data Engineer',  min: 85,  max: 140 },
  { name: 'Data Scientist', min: 95,  max: 155 },
  { name: 'ML Engineer',    min: 110, max: 175 },
]

// ── Shared tooltip / axis styles ──────────────────────────────────────────────

const TOOLTIP_STYLE = {
  backgroundColor: '#111A14',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 10,
  color: '#F8FAFC',
  fontSize: 12,
}

const CURSOR_STYLE = { fill: 'rgba(110,231,183,0.05)' }
const GRID_PROPS   = { stroke: '#1A2A1A', strokeDasharray: '3 3' as const }
const AXIS_TICK    = { fill: '#9CA3AF', fontSize: 11 }

// ── Custom label components ───────────────────────────────────────────────────

interface LabelProps {
  x?: number
  y?: number
  width?: number
  value?: number
}

function PercentLabel({ x = 0, y = 0, width = 0, value = 0 }: LabelProps) {
  return (
    <text x={x + width + 6} y={y + 9} fill="#9CA3AF" fontSize={11} textAnchor="start">
      {value}%
    </text>
  )
}

function NumberLabel({ x = 0, y = 0, width = 0, value = 0 }: LabelProps) {
  return (
    <text x={x + width + 6} y={y + 9} fill="#9CA3AF" fontSize={11} textAnchor="start">
      {value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
    </text>
  )
}

// ── Legend label components ───────────────────────────────────────────────────

function LegendLabel({ value }: { value: string }) {
  return <span className="text-[#9CA3AF] text-xs">{value}</span>
}

function SalaryLegendLabel({ value }: { value: string }) {
  return (
    <span className="text-[#9CA3AF] text-xs">
      {value === 'min' ? 'Min salary' : 'Max salary'}
    </span>
  )
}

// ── Custom salary tooltip ─────────────────────────────────────────────────────

interface TooltipPayload {
  name: string
  value: number
}

interface SalaryTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}

function SalaryTooltip({ active, payload, label }: SalaryTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl bg-[#111A14] border border-white/8 px-3.5 py-2.5">
      <p className="text-[#F8FAFC] text-xs font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-[#9CA3AF] text-[11px]">
          {p.name === 'min' ? 'Min' : 'Max'}: <span className="text-[#F8FAFC] font-semibold">${p.value}k</span>
        </p>
      ))}
    </div>
  )
}

// ── Tab panels ────────────────────────────────────────────────────────────────

function TechTrendsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#0D1810] rounded-2xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1">Most Used Programming Languages</h3>
        <p className="text-[10px] text-[#9CA3AF] mb-4">Stack Overflow 2024 · % currently using</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={LANG_USAGE} layout="vertical" margin={{ left: 8, right: 52, top: 4, bottom: 4 }}>
            <CartesianGrid horizontal={false} {...GRID_PROPS} />
            <XAxis type="number" domain={[0, 70]} tick={AXIS_TICK} tickFormatter={(v: number) => `${v}%`} />
            <YAxis type="category" dataKey="name" tick={AXIS_TICK} width={72} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={CURSOR_STYLE} formatter={(v) => [`${v}%`, 'Usage']} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} label={<PercentLabel />}>
              {LANG_USAGE.map((_, i) => (
                <Cell key={i} fill={`hsl(${170 + i * 4}, 70%, ${62 - i * 2}%)`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#0D1810] rounded-2xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1">Most Desired Technologies 2024</h3>
        <p className="text-[10px] text-[#9CA3AF] mb-4">% developers want to learn next year</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={LANG_WANTED} layout="vertical" margin={{ left: 8, right: 52, top: 4, bottom: 4 }}>
            <CartesianGrid horizontal={false} {...GRID_PROPS} />
            <XAxis type="number" domain={[0, 22]} tick={AXIS_TICK} tickFormatter={(v: number) => `${v}%`} />
            <YAxis type="category" dataKey="name" tick={AXIS_TICK} width={72} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={CURSOR_STYLE} formatter={(v) => [`${v}%`, 'Desired']} />
            <Bar dataKey="value" fill="#FCD34D" radius={[0, 4, 4, 0]} label={<PercentLabel />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function ProjectStatsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#0D1810] rounded-2xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1">My Projects by Technology</h3>
        <p className="text-[10px] text-[#9CA3AF] mb-4">Distribution across 8 projects</p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={PROJECT_CATEGORIES}
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={105}
              paddingAngle={3}
              dataKey="value"
            >
              {PROJECT_CATEGORIES.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [v, 'Projects']} />
            <Legend formatter={(value: string) => <LegendLabel value={value} />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#0D1810] rounded-2xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1">Quantified Impact Across Projects</h3>
        <p className="text-[10px] text-[#9CA3AF] mb-4">Records processed / analyzed per project</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={IMPACT_METRICS} layout="vertical" margin={{ left: 8, right: 52, top: 4, bottom: 4 }}>
            <CartesianGrid horizontal={false} {...GRID_PROPS} />
            <XAxis type="number" tick={AXIS_TICK} tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)} />
            <YAxis type="category" dataKey="name" tick={AXIS_TICK} width={118} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={CURSOR_STYLE} formatter={(v) => [typeof v === 'number' ? v.toLocaleString() : v, 'Records']} />
            <Bar dataKey="value" fill="#6EE7B7" radius={[0, 4, 4, 0]} label={<NumberLabel />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function JobMarketTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-[#0D1810] rounded-2xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1">Most In-Demand Skills for Data Analysts</h3>
        <p className="text-[10px] text-[#9CA3AF] mb-4">% of job postings requiring each skill · 2024</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={SKILLS_DEMAND} layout="vertical" margin={{ left: 8, right: 52, top: 4, bottom: 4 }}>
            <CartesianGrid horizontal={false} {...GRID_PROPS} />
            <XAxis type="number" domain={[0, 90]} tick={AXIS_TICK} tickFormatter={(v: number) => `${v}%`} />
            <YAxis type="category" dataKey="name" tick={AXIS_TICK} width={100} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={CURSOR_STYLE} formatter={(v) => [`${v}%`, 'Job postings']} />
            <Bar dataKey="value" fill="#C4B5FD" radius={[0, 4, 4, 0]} label={<PercentLabel />} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#0D1810] rounded-2xl p-5 border border-white/5">
        <h3 className="text-sm font-semibold text-[#F8FAFC] mb-1">Average Salary Range by Data Role (USD)</h3>
        <p className="text-[10px] text-[#9CA3AF] mb-4">Min / Max annual salary · thousands</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={SALARY_DATA} margin={{ left: 8, right: 12, top: 4, bottom: 4 }}>
            <CartesianGrid {...GRID_PROPS} />
            <XAxis dataKey="name" tick={{ ...AXIS_TICK, fontSize: 10 }} />
            <YAxis tick={AXIS_TICK} tickFormatter={(v: number) => `$${v}k`} />
            <Tooltip content={<SalaryTooltip />} cursor={CURSOR_STYLE} />
            <Legend formatter={(value: string) => <SalaryLegendLabel value={value} />} />
            <Bar dataKey="min" name="min" fill="#6EE7B7" radius={[4, 4, 0, 0]} />
            <Bar dataKey="max" name="max" fill="#FCD34D" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('tech')
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
      id="dashboard"
      ref={sectionRef}
      className="relative py-28 px-4 overflow-hidden bg-[#0A0F0A]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(16,185,129,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#10B981] block mb-4">
                Live Data
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-3">
                <span className="text-[#F8FAFC]">Data in </span>
                <span className="text-[#67E8F9]">Action</span>
              </h2>
              <p className="text-[#9CA3AF] text-base sm:text-lg max-w-lg">
                Real datasets. Interactive charts. This is what I do.
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FCD34D]/15 border border-[#FCD34D]/30 text-[#FCD34D] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FCD34D]" />
                Stack Overflow Developer Survey 2024 · 73,268 Responses
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Tab bar ── */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex gap-2 flex-wrap mb-8"
        >
          {TABS.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 focus:outline-none"
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="dashboard-active-tab"
                  className="absolute inset-0 rounded-xl bg-[#10B981]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${activeTab === tab.id ? 'text-white' : 'text-[#9CA3AF] hover:text-[#F8FAFC]'}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── Charts ── */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
            >
              {activeTab === 'tech'     && <TechTrendsTab />}
              {activeTab === 'projects' && <ProjectStatsTab />}
              {activeTab === 'market'   && <JobMarketTab />}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Recruiter callout ── */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-10 rounded-2xl bg-[#111A14] border border-white/5 border-l-[3px] border-l-[#6EE7B7] px-6 py-5"
        >
          <p className="text-[#CBD5E1] text-sm sm:text-base leading-relaxed italic">
            "I built this dashboard with real data from my IBM Capstone project analyzing{' '}
            <span className="text-[#67E8F9] font-semibold not-italic">73,268 developer responses</span>.
            Every chart here represents skills I use daily as a data analyst."
          </p>
        </motion.div>

      </div>
    </section>
  )
}
