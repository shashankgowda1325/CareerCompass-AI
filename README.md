# CareerCompass AI — The Smart Career Navigator 🧭

> **Hackathon MVP Edition** — A centralized AI-powered career navigator for job seekers and fresh graduates. Discover fitting roles with transparent skill matching, uncover skill gaps with actionable reasoning, optimize resumes with a client-side ATS engine, follow personalized 4-week learning roadmaps, track applications, and identify employment scams.

---

## 🚀 Quick Start Guide

### 1. Requirements
- Node.js (v18+)
- npm

### 2. Run Locally
Open a terminal in this directory:
```bash
# 1. Install dependencies (already completed in environment)
npm install

# 2. Start the Vite development server
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## ✨ Key Features & Innovation

1. **Smart Candidate Dashboard**
   - Real-time profile completion gauge.
   - Recommended jobs count, resume match score, and prioritized skill gaps.
   - Dynamic "Recommended Next Action" banner.
   - Recent activity feed.

2. **Candidate Profile Engine**
   - Complete profile management: Degree, branch, graduation year, target role, location, experience level.
   - Interactive skills inventory with tag search, quick-add, and custom skill input.
   - Zero-backend local persistence in `localStorage`.

3. **Transparent Job Matching (8+ Fresher Jobs)**
   - Mathematical, transparent match formula: `(Matching Skills / Required Skills) * 100`.
   - Distinct green (matched) and amber (missing) skill badges.
   - Natural language "Why this job fits you" reasoning.
   - Clear **DEMO DATA** labels for academic/hackathon integrity.
   - One-click actions: View full job specs, Bookmark, Track Application, and Run Resume Match against this posting.

4. **100% Client-Side Resume ATS Analyzer**
   - In-browser keyword extraction and frequency analysis against target job description.
   - Matched vs Missing technical skills breakdown with one-click copy.
   - Concrete improvement recommendations (quantifiable metrics, action verbs, project links).
   - ATS structural checklist (email, phone, projects, metrics, keyword density).
   - Zero external APIs or paid keys required; your resume data never leaves your browser.

5. **In-Depth Skill Gap Analysis**
   - Compares profile skills directly against target fresher requirements.
   - Prioritized missing competencies: P0 Critical, P1 High Demand, P2 Bonus.
   - Industry context: Why each skill matters and typical interview topics.
   - Direct button to launch a customized learning roadmap.

6. **Personalized 4-Week Learning Roadmap**
   - Structured weekly milestones for Frontend, Full Stack Software Engineer, Java/Spring Boot, and Data Analyst.
   - Daily actionable tasks with estimated completion time.
   - Direct curated links to free learning resources (MDN, freeCodeCamp, roadmap.sh, Kaggle).
   - Interactive checkboxes with persistent state and celebratory confetti!

7. **Application Pipeline Tracker**
   - Statuses: Saved, Applied, Assessment, Interview, Offer, Rejected.
   - Modal to add custom jobs, edit status, and track interview notes.
   - Real-time status counts and filter tabs.

8. **Job Scam Awareness & Risk Scanner**
   - 6-point educational checklist for freshers (upfront fees, fake domains, unrealistic pay, OTP requests).
   - Interactive Heuristic Text Scanner to test recruiter messages or suspicious offers.
   - Transparent disclaimer regarding educational warning signs.

9. **Demo & Presentation Mode**
   - One-click **"Load Demo Data"** to populate realistic candidate data, applications, and roadmap milestones for immediate presentation.
   - One-click **"Reset"** to return to a clean slate.

---

## 🛠️ Technology Stack
- **Frontend Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS with custom Indigo/Slate palette & responsive layouts
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **State & Storage**: React State + `localStorage`
- **NLP / Matching**: Deterministic client-side regex tokenization & set similarity algorithm
