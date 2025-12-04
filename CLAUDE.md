# Vantage Leap Website

AI consulting and implementation services website built with React, TypeScript, and Vite.

## Project Overview

Vantage Leap is an AI adoption partner website that helps small-to-medium businesses implement AI solutions. The site features:
- Marketing landing page with multiple sections
- AI Readiness Assessment quiz
- Virtual AI advisor (Gemini-powered chatbot)
- Contact form with N8N webhook integration

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (custom design system with `pa-` prefixed colors)
- **Icons**: Lucide React
- **AI Integration**: Google Gemini AI (`@google/genai`)
- **Webhooks**: N8N for form submissions

## Project Structure

```
vantage-leap/
├── index.tsx          # React entry point
├── App.tsx            # Main app with all page components
├── constants.tsx      # Configuration data (nav, services, quiz questions, etc.)
├── types.ts           # TypeScript interfaces
├── vite.config.ts     # Vite configuration
├── package.json       # Dependencies and scripts
└── .env.local         # Environment variables (GEMINI_API_KEY)
```

## Key Components (in App.tsx)

- `Header` - Fixed navigation with mobile menu
- `HeroSlider` - Rotating hero section with slides
- `GeminiDemo` - Virtual AI advisor chatbot (requires lead capture first)
- `WhoWeAre` - About section with Gemini demo
- `WhatWeDo` - Services grid
- `OurApproach` - Timeline of 3-phase approach
- `UseCases` - Tabbed industry use cases
- `WhyUs` - Values and FAQ accordion
- `AIReadinessAssessment` - Multi-step quiz with scoring
- `ClientSoundboard` - Testimonials
- `Contact` - Contact form
- `Footer` - Site footer

## Design System

Custom Tailwind colors (defined externally, referenced as `pa-` prefix):
- `pa-black` - Primary text/borders (#1a1a1a)
- `pa-peach` - Accent/CTA color
- `pa-sage` - Secondary accent (green tint)
- `pa-blue` - Tertiary accent
- `pa-paper` - Light background

Shared styles are defined as constants at the top of App.tsx:
- `SECTION_WRAPPER` - Standard section padding/styling
- `CARD_STYLE` - Card with border and shadow
- `BTN_PRIMARY` - Primary button style

## Development

```bash
npm install        # Install dependencies
npm run dev        # Start dev server on port 3000
npm run build      # Production build
npm run preview    # Preview production build
```

## Environment Variables

Required in `.env.local`:
- `GEMINI_API_KEY` - Google Gemini API key for the virtual advisor

## Webhook Configuration

Two N8N webhooks are used (currently placeholder URLs in App.tsx):
1. `N8N_CHAT_WEBHOOK` - Receives virtual advisor chat logs
2. `N8N_FORM_WEBHOOK` - Receives contact form submissions

## Important Notes

- The quiz has 16 questions with scoring (max 100 points)
- Quiz results are categorized: High (85+), Moderate (65-84), Developing (40-64), Low (0-39)
- The Gemini demo requires name/email before chat access (lead capture)
- All components are in a single App.tsx file
- Mobile responsive design throughout

---

## Claude Development Rules

1. **Plan First**: Think through the problem, read the codebase for relevant files, and write a plan to `tasks/todo.md`
2. **Create Checklist**: The plan should have a list of todo items that can be checked off as completed
3. **Get Approval**: Before beginning work, check in with the user to verify the plan
4. **Track Progress**: Work through todo items, marking them complete as you go
5. **Communicate Changes**: At every step, provide a high-level explanation of what changes were made
6. **Keep It Simple**: Make every task and code change as simple as possible. Avoid massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. **Document Results**: Add a review section to `tasks/todo.md` with a summary of changes and relevant information

### Critical Rules

8. **DO NOT BE LAZY. NEVER BE LAZY.** If there is a bug, find the root cause and fix it. No temporary fixes. You are a senior developer. NEVER BE LAZY.

9. **MAKE ALL FIXES AND CODE CHANGES AS SIMPLE AS HUMANLY POSSIBLE.** They should only impact necessary code relevant to the task and nothing else. It should impact as little code as possible. Your goal is to not introduce any bugs. IT'S ALL ABOUT SIMPLICITY.
