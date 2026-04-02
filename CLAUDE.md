# Portfolio Website — Dhruvina Gujarati

# Stack: React + TypeScript + Tailwind CSS + Framer Motion + 21st.dev Magic

## ============================================================

## ABOUT THIS PROJECT

## ============================================================

This is a personal portfolio website for Dhruvina Gujarati,
a Data Analyst / CS grad from Arizona State University.
Target audience: recruiters and hiring managers at tech,
consulting, healthcare, finance, and analytics companies.

## ============================================================

## PERSONAL INFO

## ============================================================

Name: Dhruvina Gujarati
Title: Data Analyst | BI Analyst | Junior Data Scientist
Location: Tempe, AZ (open to remote + relocation)
Email: dhruvina21@gmail.com
LinkedIn: https://www.linkedin.com/in/dhruvina-gujarati-029a4b241/
GitHub: https://github.com/Dhruvina21
University: Arizona State University, BS Computer Science, May 2026

Bio (use this verbatim):
"I'm a data analyst and CS student at Arizona State University
who turns messy datasets into decisions that matter. From
engineering ETL pipelines processing 50K+ records to building
interactive dashboards for executive stakeholders, I bring
both technical depth and business thinking to every problem.
Currently working as an Associate Data Analyst at ASU while
completing my degree. Open to full-time data roles starting
May 2026."

## ============================================================

## DESIGN SYSTEM

## ============================================================

Primary color: #10B981 (emerald green) — CTAs, key UI
Mint highlight: #6EE7B7 — name accent, key highlights
Cyan/teal: #67E8F9 — typewriter, headings, link hovers
Amber/gold: #FCD34D — stat numbers, Download Resume button
Soft lavender: #C4B5FD — scroll indicators, subtle accents
Background: #0A0F0A (very dark green-black)
Surface: #111A14 (dark green surface)
Text primary: #F8FAFC (near-white for names, greetings)
Text body: #CBD5E1 (soft white for taglines, paragraphs)
Text secondary: #9CA3AF (muted gray for sublabels)
Hero neural network: purple #6C63FF / violet #7C3AED / #8B5CF6
Font: Inter (Google Fonts)

Style: Dark modern — clean, minimal, professional but creative.
Think: a senior data analyst who can also design.
Primary mint green CTAs. Cyan for headings/typewriter.
Amber for standout numbers. Lavender for subtle decorative text.
Purple neural network background in Hero.
Every section has subtle gradient accents.
Smooth scroll between sections.
Mobile responsive — must look perfect on phone.

## ============================================================

## SECTIONS & COMPONENTS

## ============================================================

### NAVBAR

- Logo: "DG" monogram left side
- Links: About, Skills, Experience, Projects, Dashboard, Contact
- Sticky on scroll with blur backdrop
- Resume download button (right side, purple outline)
- Mobile: hamburger menu

### HERO SECTION

- Animated greeting: "Hi, I'm Dhruvina 👋"
- Typewriter rotating titles:
  "Data Analyst" | "BI Developer" | "Data Scientist" | "ETL Engineer"
- Tagline: "Turning raw data into decisions that matter."
- Two CTAs: "View My Work" (purple filled) + "Download Resume" (outline)
- Subtle animated background: floating data particles or grid
- Framer Motion: fade up on load

### ABOUT SECTION

- Left: animated avatar/initials circle "DG" with purple glow
- Right: bio paragraph + 3 highlight cards:
  Card 1: "4 Projects" with real-world impact
  Card 2: "73,268 Records" analyzed in IBM Capstone
  Card 3: "13 Certifications" from IBM, Microsoft, Google
- Currently: ASU Associate Data Analyst (2023–Present)
- Framer Motion: slide in from sides on scroll

### SKILLS SECTION

- Title: "Skills & Tools"
- Tab filter buttons: All | Languages | BI & Viz | ML & AI | Databases | Cloud
- Skill pills with icons from SVGL (use /ui for this)
- Languages: Python, R, SQL, Java, JavaScript, TypeScript
- BI & Viz: Power BI, Tableau, Looker Studio, IBM Cognos, Excel, Matplotlib, Seaborn, Plotly
- ML & AI: scikit-learn, Pandas, NumPy, LangChain, Generative AI, A/B Testing
- Databases: PostgreSQL, MySQL, SQLite, ETL Pipelines, REST APIs, Apache Kafka
- Cloud: AWS, Git, GitHub, Jira, SharePoint
- Framer Motion: stagger animation, pills fade in one by one

### EXPERIENCE SECTION

- Title: "Professional Experience"
- Vertical timeline layout — alternating left/right
- Each card: role title, company, date, 3 bullet points, tool tags
- Entries in this order:

Entry 1 — Associate Data Analyst
Company: Arizona State University, Tempe, AZ
Date: 2023 — Present
Bullets:

- Engineered SQL-based ETL workflows consolidating 500+ student
  records, improving data accuracy by 78% by eliminating
  duplicate entries causing reporting inconsistencies.
- Built interactive dashboards tracking enrollment trends and
  student performance metrics, improving retention visibility
  by 40% for academic leadership teams.
- Automated monthly reporting pipelines reducing manual effort
  by 35% and delivering insights to 10+ stakeholders.
  Tools: SQL, ETL, Dashboards, Reporting, Python

Entry 2 — Data Analyst Capstone Project
Company: IBM / Coursera
Date: Spring 2026
GitHub: https://github.com/Dhruvina21/IBM-Data-Analytics-Capstone
Cert: https://coursera.org/share/d5c780a5ed4844b3aab9297ef9a0469a
Bullets:

- Engineered end-to-end analytics pipeline on 73,268 Stack
  Overflow survey responses via REST APIs and web scraping.
- Designed 3-page interactive dashboard in Google Looker Studio
  with 12 visualizations surfacing global developer trends.
- Delivered data-driven findings identifying JavaScript as #1
  language and fastest-growing skills (Rust, Go) for stakeholders.
  Tools: Python, SQL, REST APIs, Looker Studio, BeautifulSoup

Entry 3 — Data Analytics Intern
Company: IT Quick Solutions, India
Date: Summer 2025
Bullets:

- Built Python & SQL ETL pipelines processing 50K+ customer
  records, reducing processing time by 40%.
- Developed scikit-learn segmentation models at 80% accuracy
  via feature engineering.
- Created Power BI dashboards tracking KPIs across customer
  trends, pricing, and utilization patterns.
  Tools: Python, SQL, Power BI, scikit-learn, Pandas, PostgreSQL

Entry 4 — Data Analytics Virtual Intern
Company: Deloitte Australia (Forage)
Date: Summer 2025
Cert: (Forage link)
Bullets:

- Developed Tableau dashboards analyzing 50,000+ performance
  records from 4 facilities, reducing failures by 15%.
- Conducted competitive analysis on 5,000+ compensation records
  using advanced Excel (pivot tables, regression).
- Collaborated with cross-functional teams building SharePoint
  workflows, improving reporting accuracy by 25%.
  Tools: Tableau, Excel, SQL, SharePoint, Cross-functional

- Framer Motion: cards slide in from left/right alternating

### PROJECTS SECTION

- Title: "Projects"
- Filter tabs: All | Python | SQL | ML | Dashboard | Web
- 3-column responsive grid (2 on tablet, 1 on mobile)
- Each card: title, description, impact number badge,
  tool tags, GitHub link button, live demo if available
- Projects:

Project 1: IBM Data Analyst Capstone
Description: End-to-end analytics on 73,268 Stack Overflow
developer responses — APIs, Python, SQL, Looker Studio dashboard.
Impact: 73,268 records analyzed
Tools: Python, SQL, REST APIs, Looker Studio
GitHub: https://github.com/Dhruvina21/IBM-Data-Analytics-Capstone
Filter: Python, SQL, Dashboard

Project 2: Automobile Recession Analysis
Description: Analyzed automobile sales trends during recession
periods using Python, Matplotlib, Seaborn, and Plotly.
Impact: 5 recession periods analyzed
Tools: Python, Matplotlib, Seaborn, Plotly
GitHub: https://github.com/Dhruvina21/automobile-recession-analysis
Filter: Python, Dashboard

Project 3: King County House Sales
Description: Regression analysis on housing data to predict
sale prices using Python and statistical modeling.
Impact: 21,000+ homes analyzed
Tools: Python, Pandas, scikit-learn, Regression
GitHub: https://github.com/Dhruvina21/king-county-house-sales
Filter: Python, ML

Project 4: Stock Data Dashboard
Description: Interactive stock data dashboard built with
Python and Plotly for financial trend visualization.
Impact: Real-time financial insights
Tools: Python, Plotly, REST APIs
GitHub: https://github.com/Dhruvina21/Stock-Data-Dashboard
Filter: Python, Dashboard

Project 5: Nutrition Tracker System
Description: Full PostgreSQL database with Python ETL pipeline
extracting USDA data — desktop app with search and filtering.
Impact: 75+ records, 8 food categories
Tools: PostgreSQL, Python, ETL, Tkinter
GitHub: https://github.com/Dhruvina21/nutrition-tracker
Filter: Python, SQL

Project 6: AI Web Scraper
Description: AI-powered web scraper using LangChain and
BeautifulSoup for automated data collection and parsing.
Impact: Automated data extraction
Tools: Python, LangChain, BeautifulSoup, AI
GitHub: https://github.com/Dhruvina21
Filter: Python, ML

Project 7: Weather Forecast App
Description: Weather application with REST API integration,
React frontend and TypeScript for type-safe development.
Impact: Live weather data
Tools: React, TypeScript, REST APIs, JavaScript
GitHub: https://github.com/Dhruvina21
Filter: Web

- Framer Motion: card hover lift + scale, filter fade transition

### CERTIFICATIONS SECTION

- Title: "Certifications"
- Badge cards in responsive grid
- Each badge: issuer logo, cert name, date, verify button

Certifications list:

1. Data Analyst Capstone — IBM (Spring 2026)
   Link: https://coursera.org/share/d5c780a5ed4844b3aab9297ef9a0469a
2. Skills for Generative AI — IBM (Mar 2026)
   Link: https://coursera.org/share/85401bb94a1b14f0ee58a2f726387a97
3. Data Modeling in Power BI — Microsoft (Feb 2026)
   Link: https://coursera.org/share/8994f42853e9f64d068e5cdb53690947
4. ETL in Power BI — Microsoft (Oct 2025)
   Link: https://coursera.org/share/0877b1ddf56e4f067cdb93d1a2237578
5. Harnessing Power BI — Microsoft (Oct 2025)
   Link: https://coursera.org/share/04c7171a2f97834e1e889e9b9d0593ec
6. Professional Project Management — Google (Aug 2025)
   Link: https://coursera.org/share/d5869e5acb0defc7d3bcec1610629aaa
7. Agile Project Management — Google (Aug 2025)
   Link: https://coursera.org/share/67YCGSN1KPK3
8. Databases & SQL for Data Science — IBM (Mar 2026)
   Link: https://coursera.org/share/1832de36fa3d0cc8ada3ff261acd12ea
9. Data Analysis with Python — IBM (Mar 2026)
   Link: https://coursera.org/share/2c781a7d49c4ca0b5aaab97f215bc691
10. Data Visualization with Python — IBM (Mar 2026)
    Link: https://coursera.org/share/1d5841eebb0583120594440a5dedcf75
11. Python for Data Engineering — IBM (Mar 2026)
    Link: https://coursera.org/share/873123af26d31cdfa6c8d77690970d9e
12. Preparing Data with Excel — Microsoft (May 2025)
    Link: https://coursera.org/share/fd8a212967e9902c1977c914774643e4
13. Data Analytics Job Simulation — Deloitte (Jul 2025)

- Framer Motion: spring pop animation on scroll

### LIVE DASHBOARD SECTION

- Title: "Data in Action — Live Analytics Dashboard"
- Subtitle: "Real data. Real insights. Built to show what I do."
- Three tabs:
  Tab 1 — Tech Trends (Stack Overflow 2024 data from IBM Capstone)
  - Top 10 programming languages bar chart
  - Most wanted technologies horizontal bar chart
  - Data source badge: "Stack Overflow Developer Survey 2024"
    Tab 2 — My Project Stats
  - Projects by category donut chart
  - Technologies used across all projects bubble/bar chart
  - Timeline of my data journey
    Tab 3 — Job Market Pulse
  - Top skills in demand for data roles bar chart
  - Salary ranges by role title
  - Data source: public datasets
- Built with: Recharts (React charts library)
- Dark themed charts matching portfolio design
- Interactive: hover tooltips, clickable legends
- This section PROVES data skills to recruiters

### CONTACT SECTION

- Title: "Let's Connect"
- Subtitle: "Open to full-time data analyst roles starting May 2026"
- Left: contact info cards (email, LinkedIn, GitHub, location)
- Right: contact form (Name, Email, Message, Send button)
- Send button: purple gradient, hover animation
- Success state: animated checkmark
- Framer Motion: fade in on scroll

### FOOTER

- "Built by Dhruvina Gujarati © 2026"
- Social icons row
- "Open to work" green badge

## ============================================================

## TECHNICAL RULES

## ============================================================

- Use TypeScript for all components (.tsx files)
- All components go in src/components/
- Each section is its own component file
- Use Framer Motion for ALL animations:
  - useInView for scroll-triggered animations
  - variants for stagger animations
  - whileHover for card interactions
- Use 21st.dev /ui commands for complex components
- Tailwind CSS only for styling — no inline styles
- Mobile-first responsive design
- No external UI libraries except what's listed
- Keep all data in src/data/ as TypeScript files
- Images go in public/images/

## ============================================================

## ANIMATION RULES (Framer Motion)

## ============================================================

Standard fade-up (use on all sections):
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: "easeOut" }}

Stagger children (use on skill pills, project cards):
variants={{
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 }}
}}

Card hover:
whileHover={{ y: -8, scale: 1.02 }}
transition={{ type: "spring", stiffness: 300 }}

## ============================================================

## FILE STRUCTURE

## ============================================================

src/
├── components/
│ ├── Navbar.tsx
│ ├── Hero.tsx
│ ├── About.tsx
│ ├── Skills.tsx
│ ├── Experience.tsx
│ ├── Projects.tsx
│ ├── Certifications.tsx
│ ├── Dashboard.tsx
│ ├── Contact.tsx
│ └── Footer.tsx
├── data/
│ ├── skills.ts
│ ├── experience.ts
│ ├── projects.ts
│ └── certifications.ts
├── App.tsx
├── main.tsx
└── index.css

## ============================================================

## HOW TO BUILD — SECTION BY SECTION

## ============================================================

Build in this exact order. One section at a time.
Test in browser after each section before moving on.

1. App.tsx — main layout shell with all sections imported
2. Navbar.tsx — sticky nav with links
3. Hero.tsx — typewriter + CTAs
4. About.tsx — bio + stat cards
5. Skills.tsx — tabbed skill pills
6. Experience.tsx — timeline
7. Projects.tsx — filter grid
8. Certifications.tsx — badge grid
9. Dashboard.tsx — live charts (Recharts)
10. Contact.tsx — form
11. Footer.tsx — simple footer
