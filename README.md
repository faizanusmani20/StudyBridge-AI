<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=26&duration=3000&pause=1000&color=5B5CE2&center=true&vCenter=true&width=750&lines=AI-powered+learning+for+every+student;Grounded+tutoring+%E2%80%A2+Adaptive+practice+%E2%80%A2+Teacher+insight;Scholarship+discovery+for+equitable+education+access" alt="StudyBridge AI animated banner" />

<br/>

# StudyBridge AI

**A connected learning platform for tutoring, practice, teacher insight, and scholarship access.**

<br/>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open%20StudyBridge-5B5CE2?style=for-the-badge&logo=googlechrome&logoColor=white)](https://faizanusmani20.github.io/StudyBridge-AI/)
[![Hackathon](https://img.shields.io/badge/Hackathon-AI%20for%20Equitable%20Education-171827?style=for-the-badge)](#hackathon-alignment)
[![Focus](https://img.shields.io/badge/Focus-Personalized%20Learning-23A26D?style=for-the-badge)](#key-features)

<br/><br/>

<a href="#why-studybridge">Why StudyBridge</a> ·
<a href="#key-features">Features</a> ·
<a href="#how-it-works">How It Works</a> ·
<a href="#technical-structure">Architecture</a> ·
<a href="#hackathon-alignment">Hackathon Alignment</a> ·
<a href="#project-status">Status</a>

</div>

---

## Overview

**StudyBridge AI** is an AI-powered learning platform built around a single idea: students should be able to understand what they're learning, practice at the right level, get useful guidance from teachers, and discover education opportunities — all in one place.

Built for the **AI for Equitable Education Access** hackathon, StudyBridge brings together four connected experiences:

| Module | Purpose |
|---|---|
| 🧠 **Grounded Doubt Solver** | Ties answers to educational source material when relevant |
| 📈 **Adaptive Practice** | Adjusts difficulty and topic focus to student performance |
| 🧑‍🏫 **Teacher Insight Agent** | Surfaces students and topics that may need attention |
| 🎓 **Scholarship & Eligibility Matcher** | Transparent, rule-based matching for opportunities and eligibility |

The platform also supports **English, Hindi, and Hinglish** tutoring, and stores learning activity so that progress tracking and recommendations improve over time.

---

## Why StudyBridge?

Most students don't just need "an answer" — they need a learning journey:

<div align="center">

**Understand → Practice → Measure → Improve → Access Opportunities**

</div>

StudyBridge connects these steps instead of treating tutoring, assessment, teacher support, and scholarship discovery as separate, disconnected tools.

---

## Key Features

### 1. Grounded AI Tutoring

Students ask questions in natural language and receive a structured learning response, built around:

- Direct answer first
- Step-by-step explanation
- Illustrative examples
- A plain-language recap ("in simple words")
- Source evidence
- Follow-up actions — *Explain simpler*, *Give an example*, *Quiz me*, *Show the key rule*

When the source library has no relevant excerpt, the product clearly labels the response as a general explanation rather than a source-grounded one.

### 2. Conversational AI Tutor

StudyBridge behaves like an ongoing tutoring conversation rather than a single-question chatbot. The tutor keeps context so a student can naturally continue:

```text
"Explain refraction."
"I still don't understand."
"Give me a real-life example."
"Now quiz me."
"Why was my answer wrong?"
```

The frontend is also prepared for streaming tutor responses from the backend.

### 3. Adaptive Practice

Practice adjusts based on learner history, tracking:

- Quiz scores and accuracy (by subject and topic)
- Current difficulty level
- Weak topics
- Recent activity

Difficulty and topic focus shift automatically as performance data accumulates.

### 4. Personalized Progress

The dashboard translates learning activity into a clear progress view — overall accuracy, questions practiced, subject performance, weak areas, and recommended next actions — making personalization visible rather than hidden inside app logic.

### 5. Teacher Insight Agent

The teacher dashboard summarizes class-level signals and flags students who may need intervention: class accuracy, inactive students, weak topics, performance trends, and suggested interventions.

Instead of showing just a score, it aims to answer:

> **Why is this student struggling, and what should the teacher do next?**

### 6. Scholarship & Eligibility Matching

Students enter a short eligibility profile (class/year, category, gender, family income, stream, disability certificate status) and receive matches grouped into:

- **Strong matches**
- **Close / almost-eligible matches**
- **Other available schemes**

The matching logic is intentionally **rule-based and transparent** rather than left to model inference, and students are directed to verify current criteria and deadlines against official sources before applying.

### 7. Language Access

Tutoring is available in **English**, **Hindi**, and **Hinglish** — important for students who understand a concept better in a familiar language.

### 8. Demo Mode

For presentation and testing, StudyBridge includes a demo mode that populates realistic learning activity so the full product journey can be shown quickly:

```text
Onboarding → Student Dashboard → Ask a Doubt → Grounded Explanation
   → Adaptive Practice → Progress Update → Teacher Insight → Scholarship Discovery
```

---

## How It Works

```text
                         STUDENT
                            │
                            ▼
                     StudyBridge UI
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
        AI Tutor        Practice       Scholarships
            │               │               │
            ▼               ▼               ▼
    Source Retrieval   Student Data     Rule Engine
            │               │
            └──────► Profile ◄──────────────┘
                            │
                            ▼
                   Progress Signals
                            │
                            ▼
                   Teacher Insights
```

**Grounded tutoring flow**

```text
Student question → Subject/topic context → Source retrieval
   → Relevant excerpts → AI tutor → Structured response
   → Source evidence + follow-up actions
```

**Adaptive learning flow**

```text
Quiz performance → Topic/subject accuracy → Weak-area detection
   → Difficulty adjustment → Recommended practice
```

---

## Technical Structure

```text
StudyBridge_AI/
├── index.html
├── styles.css
├── app.js
└── README.md
```

The frontend is split into HTML, CSS, and JavaScript for maintainability. The intended production architecture keeps the AI provider key off the client:

```text
Codeberg Pages  →  StudyBridge frontend  →  Cloudflare Worker  →  Grok / xAI API
```

The API key is kept server-side in Cloudflare rather than exposed in the public frontend.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| AI backend / proxy | Cloudflare Workers |
| Conversational AI | Grok / xAI API |
| Persistence | Web Storage (student activity & profile) |
| Hosting | Codeberg Pages |

---

## Hackathon Alignment

| Challenge area | StudyBridge response |
|---|---|
| Grounded doubt solving | Source-based tutoring with visible evidence |
| Adaptive learning | Performance-driven quizzes and difficulty |
| Teacher support | Actionable class and student insights |
| Education opportunity access | Transparent scholarship matching |
| Language access | English, Hindi, Hinglish |
| Personalized learning | Student profile, history, weak areas, recommendations |

---

## Design Principles

1. **Explain, don't just answer.** The interface is built around understanding, not just returning text.
2. **Make trust visible.** When source material is available, show the evidence used.
3. **Personalization should be understandable.** Students should see *why* a recommendation was made.
4. **Teachers need actions, not just analytics.** Insights should lead to an intervention or next step.
5. **Access should be practical.** Scholarship information should move a student from "I may qualify" to "here's what I need to verify next."

---

## Live Demo

<div align="center">

### [Open StudyBridge AI →](https://relentlessumbra.codeberg.page/StudyBridge_AI/)

[![Open Live Demo](https://img.shields.io/badge/OPEN%20LIVE%20DEMO-StudyBridge%20AI-5B5CE2?style=for-the-badge)](https://faizanusmani20.github.io/StudyBridge-AI/)

</div>

---

## Project Status

StudyBridge is an evolving hackathon project. The current version focuses on product experience, adaptive learning flow, the grounded tutoring concept, teacher insights, and scholarship discovery. The AI backend is designed around a server-side API connection so the public frontend never exposes the Grok API key.

## Future Improvements

- Larger educational source corpus
- Stronger semantic retrieval
- More robust answer verification
- More detailed learning analytics
- Improved teacher interventions
- Expanded scholarship data with official-source synchronization
- Better multilingual coverage
- Production-grade authentication and privacy controls
- Expanded mobile experience

---

<div align="center">

## Built For

**AI for Equitable Education Access Hackathon**

StudyBridge AI is built on the belief that better learning support shouldn't depend on having the right teacher, the right language, or the right access to information at the right moment.

<br/>

[![Try StudyBridge AI](https://img.shields.io/badge/Try%20StudyBridge%20AI-Live%20Demo-5B5CE2?style=for-the-badge)](https://faizanusmani20.github.io/StudyBridge-AI/)

<sub>StudyBridge AI — Grounded tutoring, adaptive practice, teacher insight, and equitable education access.</sub>

</div>
