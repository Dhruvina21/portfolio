import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Mail } from 'lucide-react'

const exploreLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

const projectLinks = [
  { label: 'IBM Capstone', href: 'https://github.com/Dhruvina21/IBM-Data-Analytics-Capstone' },
  { label: 'Automobile Analysis', href: 'https://github.com/Dhruvina21/automobile-recession-analysis' },
  { label: 'King County House Sales', href: 'https://github.com/Dhruvina21/king-county-house-sales' },
  { label: 'Stock Dashboard', href: 'https://github.com/Dhruvina21/Stock-Data-Dashboard' },
  { label: 'Nutrition Tracker', href: 'https://github.com/Dhruvina21/nutrition-tracker' },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <footer className="bg-[#050A05] border-t border-[#6EE7B7]/10 py-16 px-4">
      <motion.div
        ref={ref}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-6xl mx-auto"
      >
        {/* TOP */}
        <div className="flex flex-col items-center gap-4 mb-12">
          {/* Monogram */}
          <div className="w-10 h-10 rounded-lg bg-[#10B981] flex items-center justify-center font-bold text-white text-lg">
            DG
          </div>
          <p className="text-white font-bold text-lg">Dhruvina Gujarati</p>
          <p className="text-[#9CA3AF] text-sm text-center">
            Turning raw data into decisions that matter.
          </p>

          {/* Social row */}
          <div className="flex items-center gap-3 mt-1">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/dhruvina-gujarati-029a4b241/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl bg-[#111A14] border border-white/10 flex items-center justify-center hover:scale-110 transition-all duration-200"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-[#67E8F9]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Dhruvina21"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-xl bg-[#111A14] border border-white/10 flex items-center justify-center hover:scale-110 transition-all duration-200"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-[#C4B5FD]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:dhruvina21@gmail.com"
              aria-label="Email"
              className="w-9 h-9 rounded-xl bg-[#111A14] border border-white/10 flex items-center justify-center hover:scale-110 transition-all duration-200"
            >
              <Mail className="w-4 h-4 text-[#FCD34D]" />
            </a>
          </div>
        </div>

        {/* MIDDLE — three columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {/* Column 1: Explore */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#10B981] mb-3">
              Explore
            </p>
            <ul className="flex flex-col gap-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#9CA3AF] hover:text-[#6EE7B7] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Projects */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#67E8F9] mb-3">
              Projects
            </p>
            <ul className="flex flex-col gap-2">
              {projectLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#9CA3AF] hover:text-[#67E8F9] transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    <span className="text-xs">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#FCD34D] mb-3">
              Contact
            </p>
            <ul className="flex flex-col gap-2">
              <li className="text-sm text-[#9CA3AF]">dhruvina21@gmail.com</li>
              <li className="text-sm text-[#9CA3AF]">Tempe, AZ, USA</li>
              <li className="text-sm text-[#9CA3AF]">Open to Remote/ Hybrid/ In-Person</li>
              <li className="mt-2">
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#6EE7B7]/20 to-transparent mb-8" />

        {/* BOTTOM */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#4B5563] text-xs text-center sm:text-left">
            © 2026 Dhruvina Gujarati · Built with React, Framer Motion &amp; Tailwind CSS
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
            </span>
            <span className="text-xs text-[#6EE7B7]">Available for Full-time Roles</span>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
