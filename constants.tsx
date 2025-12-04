
import React from 'react';
import { BrainCircuit, ScanSearch, Hammer, TrendingUp, Users, ShieldCheck, Zap, Layers, BarChart3, MessageSquare, Briefcase, FileText, ShoppingBag, Gavel, Stethoscope, Scissors, GraduationCap, HeartHandshake, Plane, Smile } from 'lucide-react';
import { Service, Testimonial, FAQItem, Statistic, QuizQuestion, QuizResult, UseCaseCategory } from './types';

export const NAV_ITEMS = [
  { label: 'About', href: '#who-we-are' },
  { label: 'Services', href: '#what-we-do' },
  { label: 'How We Work', href: '#approach' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Why Us', href: '#why-us' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    headline: "AI Integration -> Competitive Differentiation",
    subheadline: "Becoming an AI powered business is fast becoming a default requisite for competitive positioning. We help you find the opportunities that directly impact your revenue trajectory.",
    cta: "Schedule a Discovery Call",
    ctaLink: "#contact",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    headline: "AI Strategy Development",
    subheadline: "Think of us as your Chief AI Officer, a strategic partner. We help you figure out where AI fits, what's on the horizon, and how to build strategic plans that grow with your business, not against it.",
    cta: "Schedule a Discovery Call",
    ctaLink: "#contact",
    image: "https://images.unsplash.com/photo-1507537362848-9c7e70b725c6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    headline: "Real Results, Real ROI.",
    subheadline: "Faster, cheaper, more efficient AI-powered business operations positively impacts growth & profitability potential.",
    cta: "Schedule a Discovery Call",
    ctaLink: "#contact",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: 4,
    headline: "Is your business AI ready?",
    subheadline: "Give our FREE [AI Adoption Readiness Assessment] a spin for a quick but in depth initial assessment delivered straight to your email.",
    cta: "Start Free Assessment",
    ctaLink: "#assessment",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  }
];

export const SERVICES: Service[] = [
  {
    id: 'consulting',
    title: 'AI Consulting & Advisory Services',
    description: 'Clear guidance to unlock AI adoption opportunities.',
    details: [
      'AI adoption suitability assessments',
      'AI adoption roadmap design & implementation',
      'Efficiency, opportunity & systems audits',
      'Technology training for staff'
    ],
    icon: <ScanSearch className="w-8 h-8" />,
    color: 'bg-pa-peach'
  },
  {
    id: 'implementation',
    title: 'AI Implementation',
    description: 'Bespoke, leading-edge AI and/or automation solutions tied directly to your bottom-line.',
    details: [
      'Business Intelligence (data analytics)',
      'Back-office operations (data processing & reporting)',
      'Branding & positioning strategy for solopreneurs',
      'CRM, lead generation, follow-up & engagement automations',
      'Social media & content publishing'
    ],
    icon: <Users className="w-8 h-8" />,
    color: 'bg-pa-blue'
  },
  {
    id: 'training',
    title: 'AI Training Workshops',
    description: 'Upskill your teams with hands-on training/workshops.',
    details: [
      'Prompt engineering',
      'Context engineering'
    ],
    icon: <GraduationCap className="w-8 h-8" />,
    color: 'bg-pa-sage'
  }
];

export const APPROACH_PHASES = [
  {
    id: 1,
    title: "Education & Alignment",
    subtitle: "Get leadership and staff united around a clear strategy.",
    steps: [
      "Leadership Workshop: Define what 'AI Adoption' means for you.",
      "Build Buy-In: Communicate urgency and use 'AI-first Org Charts'.",
      "Deliverable: A unified team bought into the AI-native vision."
    ]
  },
  {
    id: 2,
    title: "Business Discovery & Audit",
    subtitle: "Turn pain points into a prioritized roadmap.",
    steps: [
      "Deep-Dive Interviews: Capture bottlenecks from the front line.",
      "Process Mapping: Visual blueprints of your current operations.",
      "Opportunity Grading: Ranking by Impact vs. Ease.",
      "Deliverable: 50–100 page AI Adoption Strategy Roadmap."
    ]
  },
  {
    id: 3,
    title: "Execution & Growth",
    subtitle: "Turn strategic order into measurable ROI.",
    steps: [
      "Quick Wins: High impact, low difficulty projects first.",
      "Agile Development: Build efficiently, avoid bureaucracy.",
      "Tangible ROI: Early successes fund larger transformations."
    ]
  }
];

export const IMPLEMENTATION_PHASES = [
  {
    id: 1,
    title: "Technical Discovery & Architecture",
    subtitle: "Understanding your systems and designing the solution.",
    steps: [
      "Technical infrastructure assessment",
      "System integration planning",
      "Solution architecture design"
    ]
  },
  {
    id: 2,
    title: "Development & Integration",
    subtitle: "Building and connecting your AI solutions.",
    steps: [
      "Custom AI solution development",
      "API integration and data pipelines",
      "Quality assurance and testing"
    ]
  },
  {
    id: 3,
    title: "Deployment & Optimization",
    subtitle: "Going live and fine-tuning for performance.",
    steps: [
      "Production deployment",
      "Performance monitoring and optimization",
      "Ongoing support and maintenance"
    ]
  }
];

export const TRAINING_PHASES = [
  {
    id: 1,
    title: "Needs Assessment & Design",
    subtitle: "Understanding your team's skill gaps and learning goals.",
    steps: [
      "Team skills assessment",
      "Custom curriculum development",
      "Learning objectives definition"
    ]
  },
  {
    id: 2,
    title: "Workshop Delivery",
    subtitle: "Hands-on training and practical exercises.",
    steps: [
      "Interactive training sessions",
      "Real-world practice scenarios",
      "Q&A and troubleshooting"
    ]
  },
  {
    id: 3,
    title: "Post-Training Support",
    subtitle: "Resources and guidance for continued learning.",
    steps: [
      "Training materials and documentation",
      "Follow-up support sessions",
      "Progress tracking and feedback"
    ]
  }
];

export const USE_CASES: UseCaseCategory[] = [
  {
    id: "biz-ops",
    title: "Business Ops & Support",
    icon: <Briefcase />,
    sectors: [
      "Marketing & Advertising",
      "IT Support & Managed Services",
      "HR & Recruitment Agencies",
      "Customer Service",
      "Business Process Outsourcing"
    ],
    implementations: [
      "Content Generation at Scale",
      "Audience Segmentation & Targeting",
      "Reporting & Analytics Automation",
      "Automated Resume Screening",
      "Skills Mapping & Analytics",
      "Conversational AI Agents",
      "Post-Interaction Summaries",
      "Document Analysis",
      "Automated Data Entry & Reconciliation",
      "Data Cleansing",
      "Automated Quality Assurance"
    ]
  },
  {
    id: "finance",
    title: "Financial Services",
    icon: <BarChart3 />,
    sectors: [
      "Accounting & Bookkeeping",
      "Financial Planning",
      "Insurance Agencies",
      "Real Estate Agencies",
      "Tax Advisories",
      "Legal Services"
    ],
    implementations: [
      "Automated Data Entry & Reconciliation",
      "Predictive Cash Flow Forecasting",
      "AI-Powered Client Dashboards",
      "Client Data Integration",
      "Chatbots for Claims & Support",
      "Contract Analysis & Review",
      "Automated Legal Research",
      "Knowledge Management",
      "Automated Marketing",
      "Document Digitization & Data Extraction",
      "AI Audit Assistants",
      "Client Advisory Bots"
    ]
  },
  {
    id: "health",
    title: "Health & Wellness",
    icon: <Stethoscope />,
    sectors: [
      "Wellness & Fitness Centers",
      "Dental Clinics",
      "Chiropractors & Physical Therapy",
      "Private Medical Practices",
      "Mental Health & Therapy"
    ],
    implementations: [
      "AI-Powered Client/Patient Scheduling",
      "Automated Billing & Coding",
      "Client/Patient Follow-Up Automation",
      "Voice-to-Note Documentation",
      "Automated Intake & Assessment Forms",
      "Inventory & Staffing Forecasts",
      "Wellness Chatbots",
      "Social Media Automation",
      "Virtual Consultation Bots",
      "Subscription Management"
    ]
  },
  {
    id: "consumer",
    title: "Consumer & Lifestyle",
    icon: <Scissors />,
    sectors: [
      "Hair & Beauty Salons",
      "Spas & Wellness Studios",
      "Cleaning & Home Services",
      "Pet Care & Grooming Services",
      "Event Planning & Concierge"
    ],
    implementations: [
      "Smart Appointment Scheduling",
      "Automated Client Follow-Up",
      "Virtual Consultation Bots",
      "Vendor Matching & Negotiation Support",
      "Personalized Service Recommendations",
      "Dynamic Staff Assignment",
      "Outcome Tracking & Predictive Insights",
      "Session Analysis / Recap",
      "Personalized Treatment /Care Plans",
      "AI-Powered Diagnostics"
    ]
  },
  {
    id: "education",
    title: "Educational & Training",
    icon: <GraduationCap />,
    sectors: [
      "Online Learning Platforms",
      "Coaching & Consulting",
      "Corporate Training",
      "Colleges & Universities",
      "Vocational & Trade Schools",
      "Tutoring & Test Prep Services",
      "Educational Publishing"
    ],
    implementations: [
      "Administrative Task Automation",
      "AI-Powered Tutoring Systems",
      "Research Assistance Tools",
      "Adaptive Learning Delivery",
      "Dynamic Course Creation",
      "Voice & Chat Tutors",
      "AI Content Curation",
      "AI Study Companions",
      "Localization & Translation",
      "Predictive Lead Scoring"
    ]
  },
  {
    id: "cx",
    title: "Customer Experience",
    icon: <Smile />,
    sectors: [
      "Customer Support",
      "Sales & Lead Nurturing",
      "Customer Feedback",
      "Customer Retention",
      "Loyalty & Rewards",
      "Customer Journey",
      "CRM Data Management"
    ],
    implementations: [
      "Predictive Customer Care",
      "Conversational AI & Chatbots",
      "Smart Knowledge Bases",
      "Automated Outreach",
      "CRM Intelligence",
      "Predictive Sales Forecasting",
      "Customer Feedback Analysis",
      "Customer Lifetime Value Prediction",
      "Engagement Prediction",
      "Customer Journey Management",
      "Data Enrichment",
      "Proactive Notifications"
    ]
  },
  {
    id: "nonprofit",
    title: "Nonprofit & Community",
    icon: <HeartHandshake />,
    sectors: [
      "Fundraising & Donor Management",
      "Proposal & Grant Writing",
      "Community Initiatives",
      "Volunteer Management",
      "Program Monitoring & Evaluation",
      "Nonprofit Admin & Ops",
      "Advocacy & Awareness Campaigns",
      "Impact Storytelling",
      "Crisis & Humanitarian Ops"
    ],
    implementations: [
      "Donor Segmentation",
      "Predictive Donor Scoring",
      "Automated Campaign Outreach",
      "Chatbots for Donations",
      "Proposal Drafting",
      "Needs Assessment Analytics",
      "Automated Data Collection",
      "Accounting & Expense Tracking",
      "Content Generation",
      "Real-Time Data Mapping",
      "Data Driven Storytelling"
    ]
  },
  {
    id: "hospitality",
    title: "Hospitality & Leisure",
    icon: <Plane />,
    sectors: [
      "Hotels, Resorts & Vacation Rentals",
      "Restaurants, Cafés & Bars",
      "Travel & Tourism Agencies",
      "Event Management & Venues",
      "Gyms, Fitness Clubs & Spas",
      "Casinos, Theme Parks & Entertainment Centers"
    ],
    implementations: [
      "Dynamic Pricing Engines",
      "Smart Booking Assistants",
      "Reputation Management",
      "Automated Ordering Systems",
      "Smart Scheduling",
      "Automated Customer Support",
      "Virtual Coaching",
      "Visitor Flow Optimization",
      "Guest Segmentation",
      "Predictive Lifetime Value Modeling",
      "Automated Social Media & Content",
      "Personalized Offers"
    ]
  }
];

export const WHY_US_VALUES = [
  {
    title: "We Live & Breathe Small Business",
    description: "We bypass corporate jargon and one-size-fits-all solutions. Our team understands your unique constraints and opportunities because we come from your world."
  },
  {
    title: "ROI in Weeks, Not Months",
    description: "We prioritize high-impact, low-complexity solutions first. These deliver measurable results and cash flow quickly, we then build momentum followed by scaling."
  },
  {
    title: "Your Tech, Our Expertise",
    description: "We integrate seamlessly with your existing tools. If a better solution exists, we'll suggest it, always aligning with your specific goals."
  },
  {
    title: "No Surprises, Just Clarity",
    description: "Expect clear project scopes, consistent communication, and upfront expectations. We value transparency as much as you do."
  }
];

export const BARRIERS = [
  {
    question: "We can't afford to disrupt our current operations.",
    answer: "We start with non-critical, high-ROI processes, ensuring your business runs smoothly while we build your AI capabilities."
  },
  {
    question: "We don't have the technical skills.",
    answer: "That's precisely our role. You focus on your core business; we expertly handle all the technical implementation."
  },
  {
    question: "We're not sure which tools to use.",
    answer: "We conduct a thorough assessment to recommend the ideal solutions, perfectly matched to your specific use case, budget, and existing technology."
  },
  {
    question: "We tried AI/automation before, and it didn't work.",
    answer: "Past failures often stem from poor planning. Our refined process, built on years of successful implementations, ensures you get it right this time."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "Vantage Leap didn't just give us a tool; they gave us a new way to think. The viral content generator they engineered is nothing short of alchemy.",
    author: "Mark S.",
    role: "Content Director"
  },
  {
    id: '2',
    quote: "Professionalism that bridges the gap between technical complexity and business reality. The roadmap they built is our north star.",
    author: "Sarah J.",
    role: "CTO, FinTech Start"
  },
  {
    id: '3',
    quote: "The most high-leverage 30 minutes of my career. Their audit revealed inefficiencies we didn't know were costing us six figures annually.",
    author: "David R.",
    role: "Operations Lead"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Strategy & Goals (20 points)
  {
    id: 1,
    section: "Strategy & Goals",
    question: "Do you have a specific business problem you want AI to solve?",
    options: [
      { label: "Yes", points: 10 },
      { label: "Somewhat", points: 5 },
      { label: "No", points: 0 }
    ]
  },
  {
    id: 2,
    section: "Strategy & Goals",
    question: "Do you have leadership support for AI initiatives?",
    options: [
      { label: "Yes", points: 10 },
      { label: "In Progress", points: 5 },
      { label: "No", points: 0 }
    ]
  },
  // Data Readiness (25 points)
  {
    id: 3,
    section: "Data Readiness",
    question: "Is your business data stored digitally and accessible?",
    options: [
      { label: "Yes", points: 10 },
      { label: "Partially", points: 5 },
      { label: "No", points: 0 }
    ]
  },
  {
    id: 4,
    section: "Data Readiness",
    question: "How would you rate your data quality?",
    options: [
      { label: "Good", points: 10 },
      { label: "Fair", points: 5 },
      { label: "Poor/Unknown", points: 0 }
    ]
  },
  {
    id: 5,
    section: "Data Readiness",
    question: "How much historical data do you have?",
    options: [
      { label: "3+ years", points: 5 },
      { label: "1-3 years", points: 3 },
      { label: "< 1 year", points: 1 }
    ]
  },
  // Technical Infrastructure (20 points)
  {
    id: 6,
    section: "Technical Infrastructure",
    question: "Do you use cloud services?",
    options: [
      { label: "Yes", points: 10 },
      { label: "Planning to", points: 5 },
      { label: "No", points: 0 }
    ]
  },
  {
    id: 7,
    section: "Technical Infrastructure",
    question: "Can your systems integrate with third-party tools?",
    options: [
      { label: "Yes", points: 10 },
      { label: "Partially", points: 5 },
      { label: "No/Unsure", points: 0 }
    ]
  },
  // People & Skills (15 points)
  {
    id: 8,
    section: "People & Skills",
    question: "Do you have technical staff or data expertise in-house?",
    options: [
      { label: "Yes", points: 8 },
      { label: "Limited", points: 4 },
      { label: "No", points: 0 }
    ]
  },
  {
    id: 9,
    section: "People & Skills",
    question: "Are you open to hiring consultants or upskilling staff?",
    options: [
      { label: "Yes", points: 7 },
      { label: "Maybe", points: 3 },
      { label: "No", points: 0 }
    ]
  },
  // Budget (10 points)
  {
    id: 10,
    section: "Budget",
    question: "Do you have budget allocated for AI or digital projects?",
    options: [
      { label: "Yes", points: 6 },
      { label: "Planning to", points: 3 },
      { label: "No", points: 0 }
    ]
  },
  {
    id: 11,
    section: "Budget",
    question: "Are you prepared for ongoing costs?",
    options: [
      { label: "Yes", points: 4 },
      { label: "Somewhat", points: 2 },
      { label: "No", points: 0 }
    ]
  },
  // Culture & Change (5 points)
  {
    id: 12,
    section: "Culture & Change",
    question: "How open is your organization to new technology?",
    options: [
      { label: "Very", points: 3 },
      { label: "Somewhat", points: 2 },
      { label: "Resistant", points: 0 }
    ]
  },
  {
    id: 13,
    section: "Culture & Change",
    question: "Have you successfully implemented new technology before?",
    options: [
      { label: "Yes", points: 2 },
      { label: "No", points: 0 }
    ]
  },
  // Compliance (5 points)
  {
    id: 14,
    section: "Compliance",
    question: "Is your industry regulated in ways affecting data/AI?",
    options: [
      { label: "No", points: 5 },
      { label: "Somewhat", points: 3 },
      { label: "Yes", points: 2 },
      { label: "Unsure", points: 0 }
    ]
  },
  // Qualitative Inputs (No points)
  {
    id: 15,
    section: "Context",
    question: "What tasks or processes take the most time in your business?",
    isQualitative: true
  },
  {
    id: 16,
    section: "Context",
    question: "What does AI success look like for your organization?",
    isQualitative: true
  }
];

export const QUIZ_RESULTS: QuizResult[] = [
  {
    minScore: 85,
    maxScore: 100,
    title: "High Readiness",
    description: "You're prepared to implement AI solutions now.",
    action: "Move directly to strategic implementation and scaling."
  },
  {
    minScore: 65,
    maxScore: 84,
    title: "Moderate Readiness",
    description: "Address 1-2 gap areas before starting.",
    action: "Focus on closing specific gaps in data or skills while piloting smaller projects."
  },
  {
    minScore: 40,
    maxScore: 64,
    title: "Developing Readiness",
    description: "Focus on foundational improvements.",
    action: "Prioritize digital transformation basics and data hygiene."
  },
  {
    minScore: 0,
    maxScore: 39,
    title: "Low Readiness",
    description: "Prioritize digital transformation basics first.",
    action: "Build a digital foundation before attempting AI integration."
  }
];
