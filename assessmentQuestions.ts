/**
 * AI Adoption Readiness Assessment - Questions Data
 * Version 2.0
 *
 * 33 questions across 7 sections
 */

import { AssessmentQuestion, AssessmentSection, SectionId, QuestionId } from './assessmentTypes';

// =============================================================================
// SECTION DEFINITIONS
// =============================================================================

export const ASSESSMENT_SECTIONS: AssessmentSection[] = [
  {
    id: 'BP',
    name: 'Business Profile',
    description: 'Tell us about your business foundation and goals.',
    questionIds: ['BP01', 'BP02', 'BP03', 'BP04', 'BP05', 'BP06']
  },
  {
    id: 'TI',
    name: 'Technology Infrastructure',
    description: 'Help us understand your current technology setup.',
    questionIds: ['TI01', 'TI02', 'TI03', 'TI04', 'TI05', 'TI06']
  },
  {
    id: 'PP',
    name: 'Business Processes',
    description: 'Tell us about your day-to-day operations and challenges.',
    questionIds: ['PP01', 'PP02', 'PP03', 'PP04', 'PP05', 'PP06', 'PP07']
  },
  {
    id: 'BR',
    name: 'Budget & Resources',
    description: 'Help us understand your technology investment capacity.',
    questionIds: ['BR01', 'BR02', 'BR03', 'BR04']
  },
  {
    id: 'AK',
    name: 'AI Knowledge',
    description: 'Tell us about your AI experience and expectations.',
    questionIds: ['AK01', 'AK02', 'AK03', 'AK04', 'AK05', 'AK06']
  },
  {
    id: 'DC',
    name: 'Data & Compliance',
    description: 'Help us understand your data situation and any regulatory requirements.',
    questionIds: ['DC01', 'DC02', 'DC03', 'DC04', 'DC05']
  },
  {
    id: 'GT',
    name: 'Goals & Timeline',
    description: 'Share your vision for AI adoption.',
    questionIds: ['GT01', 'GT02', 'GT03', 'GT04']
  }
];

// =============================================================================
// QUESTIONS DATA
// =============================================================================

export const ASSESSMENT_QUESTIONS: Record<QuestionId, AssessmentQuestion> = {
  // =========================================================================
  // Section 1: Business Profile (6 questions)
  // =========================================================================
  BP01: {
    id: 'BP01',
    section: 'BP',
    sectionName: 'Business Profile',
    question: 'What industry are you in?',
    type: 'dropdown',
    options: [
      'Retail',
      'Healthcare',
      'Finance',
      'Manufacturing',
      'Professional Services',
      'Food & Hospitality',
      'Construction',
      'Technology',
      'Other'
    ],
    required: true
  },
  BP02: {
    id: 'BP02',
    section: 'BP',
    sectionName: 'Business Profile',
    question: 'How many employees do you have?',
    type: 'single_select',
    options: ['1-5', '6-15', '16-50', '51-100', '100+'],
    required: true
  },
  BP03: {
    id: 'BP03',
    section: 'BP',
    sectionName: 'Business Profile',
    question: 'How long have you been running your business?',
    type: 'single_select',
    options: ['Less than 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'],
    required: true
  },
  BP04: {
    id: 'BP04',
    section: 'BP',
    sectionName: 'Business Profile',
    question: 'What is your approximate annual revenue?',
    type: 'single_select',
    options: ['Under $100K', '$100K-$500K', '$500K-$1M', '$1M-$5M', '$5M+', "Don't know/Prefer not to say"],
    required: true
  },
  BP05: {
    id: 'BP05',
    section: 'BP',
    sectionName: 'Business Profile',
    question: 'Please briefly describe your core business model and primary products/services.',
    type: 'free_text',
    required: true
  },
  BP06: {
    id: 'BP06',
    section: 'BP',
    sectionName: 'Business Profile',
    question: 'Please briefly describe your business goals and objectives over the next 6, 12 & 18 months.',
    type: 'free_text',
    required: true
  },

  // =========================================================================
  // Section 2: Technology Infrastructure (6 questions)
  // =========================================================================
  TI01: {
    id: 'TI01',
    section: 'TI',
    sectionName: 'Technology Infrastructure',
    question: 'How would you rate your current technology adoption?',
    type: 'single_select',
    options: [
      'Very Basic (paper/spreadsheets)',
      'Moderate (some cloud tools)',
      'Advanced (integrated systems)',
      'Cutting-edge',
      "Don't know"
    ],
    required: true
  },
  TI02: {
    id: 'TI02',
    section: 'TI',
    sectionName: 'Technology Infrastructure',
    question: 'Do you currently use any cloud-based software?',
    type: 'single_select',
    options: ['Yes - extensively', 'Yes - somewhat', 'No - but interested', 'No - not interested'],
    required: true
  },
  TI03: {
    id: 'TI03',
    section: 'TI',
    sectionName: 'Technology Infrastructure',
    question: 'What business software do you currently use?',
    type: 'multi_select',
    options: [
      'CRM',
      'Accounting Software',
      'Project Management',
      'E-commerce Platform',
      'Marketing Automation',
      'Inventory Management',
      'HR/Payroll',
      'Other',
      'None'
    ],
    required: true
  },
  TI04: {
    id: 'TI04',
    section: 'TI',
    sectionName: 'Technology Infrastructure',
    question: 'How is your business & customer data currently stored?',
    type: 'single_select',
    options: [
      'Paper records',
      'Spreadsheets',
      'Basic database',
      'CRM system',
      'Multiple integrated systems',
      "Don't know"
    ],
    required: true
  },
  TI05: {
    id: 'TI05',
    section: 'TI',
    sectionName: 'Technology Infrastructure',
    question: 'How comfortable is your team with learning new software?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { 1: 'Very resistant', 5: 'Eager adopters' },
    required: true
  },
  TI06: {
    id: 'TI06',
    section: 'TI',
    sectionName: 'Technology Infrastructure',
    question: 'Please describe any current technology frustrations or limitations causing bottlenecks.',
    type: 'free_text',
    required: false
  },

  // =========================================================================
  // Section 3: Business Processes (7 questions)
  // =========================================================================
  PP01: {
    id: 'PP01',
    section: 'PP',
    sectionName: 'Business Processes',
    question: "Which types of tasks demand the most of your staff's time? (Select top 3)",
    type: 'multi_select',
    maxSelections: 3,
    options: [
      'Sales',
      'Customer inquiries',
      'Data entry',
      'Scheduling',
      'Invoicing/Billing',
      'Inventory tracking',
      'Report generation',
      'Email management',
      'Social media',
      'Lead follow-up',
      'Content creation',
      'Other'
    ],
    required: true
  },
  PP02: {
    id: 'PP02',
    section: 'PP',
    sectionName: 'Business Processes',
    question: 'How do you currently handle customer support?',
    type: 'single_select',
    options: [
      'Phone only',
      'Email only',
      'Phone + Email',
      'Chat widget',
      'Social media DMs',
      'Combination of multiple channels'
    ],
    required: true
  },
  PP03: {
    id: 'PP03',
    section: 'PP',
    sectionName: 'Business Processes',
    question: 'What is your biggest operational challenge?',
    type: 'single_select',
    options: [
      'Finding/retaining talent',
      'Scaling operations',
      'Customer acquisition',
      'Cash flow management',
      'Time management',
      'Competition',
      'Other'
    ],
    required: true
  },
  PP04: {
    id: 'PP04',
    section: 'PP',
    sectionName: 'Business Processes',
    question: 'How repetitive are your daily business tasks?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { 1: 'Mostly unique work', 5: 'Highly repetitive' },
    required: true
  },
  PP05: {
    id: 'PP05',
    section: 'PP',
    sectionName: 'Business Processes',
    question: 'How much time does your team spend on manual data entry weekly?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { 1: 'Minimal', 5: 'Significant' },
    required: true
  },
  PP06: {
    id: 'PP06',
    section: 'PP',
    sectionName: 'Business Processes',
    question: 'What are your top 3 business challenges that you believe technology might help solve?',
    type: 'free_text',
    required: true
  },
  PP07: {
    id: 'PP07',
    section: 'PP',
    sectionName: 'Business Processes',
    question: 'Please describe a typical workflow or business process that feels inefficient.',
    type: 'free_text',
    required: false
  },

  // =========================================================================
  // Section 4: Budget & Resources (4 questions)
  // =========================================================================
  BR01: {
    id: 'BR01',
    section: 'BR',
    sectionName: 'Budget & Resources',
    question: 'What is your monthly budget for software/technology tools?',
    type: 'single_select',
    options: [
      'Under $100',
      '$100-$500',
      '$500-$1,000',
      '$1,000-$2,500',
      '$2,500+',
      "Don't know",
      "Don't have one"
    ],
    required: true
  },
  BR02: {
    id: 'BR02',
    section: 'BR',
    sectionName: 'Budget & Resources',
    question: 'Do you have IT support available?',
    type: 'single_select',
    options: [
      'In-house IT staff',
      'Contracted IT support',
      'Tech-savvy employee handles it',
      'No dedicated IT support'
    ],
    required: true
  },
  BR03: {
    id: 'BR03',
    section: 'BR',
    sectionName: 'Budget & Resources',
    question: 'How have you typically implemented new technology in the past?',
    type: 'single_select',
    options: [
      'Self-service/DIY',
      'Hire consultants',
      'Vendor-provided training',
      'Avoid new technology',
      'Never had to'
    ],
    required: true
  },
  BR04: {
    id: 'BR04',
    section: 'BR',
    sectionName: 'Budget & Resources',
    question: 'Are you actively budgeting for AI implementation initiatives over the next 12 months?',
    type: 'free_text',
    required: false
  },

  // =========================================================================
  // Section 5: AI Knowledge (6 questions)
  // =========================================================================
  AK01: {
    id: 'AK01',
    section: 'AK',
    sectionName: 'AI Knowledge',
    question: 'How familiar are you and your team with AI tools like ChatGPT, Claude, AI Agents, Automation Software, etc.?',
    type: 'single_select',
    options: ['Never used them', 'Experimented briefly', 'Use occasionally', 'Use regularly', 'Power user'],
    required: true
  },
  AK02: {
    id: 'AK02',
    section: 'AK',
    sectionName: 'AI Knowledge',
    question: 'Have you or your team used any AI-powered tools?',
    type: 'multi_select',
    options: [
      'ChatGPT/Claude',
      'AI writing assistants',
      'AI image generators',
      'Chatbots',
      'Automated scheduling',
      'Predictive analytics',
      'None',
      'Other'
    ],
    required: true
  },
  AK03: {
    id: 'AK03',
    section: 'AK',
    sectionName: 'AI Knowledge',
    question: 'What is your primary goal for adopting AI?',
    type: 'single_select',
    options: [
      'Reduce costs',
      'Save time',
      'Improve customer experience',
      'Scale operations',
      'Stay competitive',
      'Explore possibilities'
    ],
    required: true
  },
  AK04: {
    id: 'AK04',
    section: 'AK',
    sectionName: 'AI Knowledge',
    question: 'What concerns do you have about adopting AI?',
    type: 'multi_select',
    options: [
      'Cost',
      'Complexity',
      'Data privacy',
      'Job displacement',
      'Reliability',
      'Customer perception',
      'None',
      'Other'
    ],
    required: true
  },
  AK05: {
    id: 'AK05',
    section: 'AK',
    sectionName: 'AI Knowledge',
    question: 'How motivated are you as a business owner to implement AI?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { 1: 'Very hesitant', 5: 'Very eager' },
    required: true
  },
  AK06: {
    id: 'AK06',
    section: 'AK',
    sectionName: 'AI Knowledge',
    question: 'How supportive/receptive do you believe your staff will be to AI adoption?',
    type: 'scale',
    scaleMin: 1,
    scaleMax: 5,
    scaleLabels: { 1: 'Resistant', 5: 'Enthusiastic' },
    required: true
  },

  // =========================================================================
  // Section 6: Data & Compliance (5 questions)
  // =========================================================================
  DC01: {
    id: 'DC01',
    section: 'DC',
    sectionName: 'Data & Compliance',
    question: 'How would you describe the quality of your business data?',
    type: 'single_select',
    options: [
      'Scattered/inconsistent',
      'Somewhat organized',
      'Well-organized',
      'Highly structured and clean',
      "Don't know"
    ],
    required: true
  },
  DC02: {
    id: 'DC02',
    section: 'DC',
    sectionName: 'Data & Compliance',
    question: 'Does your business handle sensitive customer data?',
    type: 'single_select',
    options: [
      'Yes - highly regulated (HIPAA, PCI, etc.)',
      'Yes - standard PII',
      'Minimal customer data',
      'No sensitive data',
      'Not Sure'
    ],
    required: true
  },
  DC03: {
    id: 'DC03',
    section: 'DC',
    sectionName: 'Data & Compliance',
    question: 'Are you subject to industry-specific regulations?',
    type: 'single_select',
    options: [
      'Yes - strict compliance requirements',
      'Yes - moderate requirements',
      'Minimal regulations',
      'Unsure'
    ],
    required: true
  },
  DC04: {
    id: 'DC04',
    section: 'DC',
    sectionName: 'Data & Compliance',
    question: 'Do you have a data backup system in place?',
    type: 'single_select',
    options: [
      'Yes - automated cloud backup',
      'Yes - manual backups',
      'Partial backup system',
      'No backup system'
    ],
    required: true
  },
  DC05: {
    id: 'DC05',
    section: 'DC',
    sectionName: 'Data & Compliance',
    question: 'Describe any compliance or data security concerns specific to your industry.',
    type: 'free_text',
    required: false,
    conditionalOn: {
      questionId: 'DC02',
      showWhen: ['Yes - highly regulated (HIPAA, PCI, etc.)']
    }
  },

  // =========================================================================
  // Section 7: Goals & Timeline (4 questions)
  // =========================================================================
  GT01: {
    id: 'GT01',
    section: 'GT',
    sectionName: 'Goals & Timeline',
    question: 'When would you ideally like to start implementing AI tools?',
    type: 'single_select',
    options: [
      'Immediately',
      'Within 3 months',
      'Within 6 months',
      'Within 1 year',
      'No specific timeline'
    ],
    required: true
  },
  GT02: {
    id: 'GT02',
    section: 'GT',
    sectionName: 'Goals & Timeline',
    question: 'What level of involvement do you want in the implementation process?',
    type: 'single_select',
    options: [
      'Hands-on (DIY)',
      'Guided with support',
      'Fully managed by experts',
      'Minimal involvement'
    ],
    required: true
  },
  GT03: {
    id: 'GT03',
    section: 'GT',
    sectionName: 'Goals & Timeline',
    question: 'How would you measure AI implementation success?',
    type: 'multi_select',
    options: [
      'Time saved',
      'Cost reduction',
      'Revenue increase',
      'Customer satisfaction',
      'Employee productivity',
      'All of the above'
    ],
    required: true
  },
  GT04: {
    id: 'GT04',
    section: 'GT',
    sectionName: 'Goals & Timeline',
    question: 'What does successful AI adoption look like for your business in 1 year?',
    type: 'free_text',
    required: true
  }
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get all questions for a section
 */
export function getQuestionsForSection(sectionId: SectionId): AssessmentQuestion[] {
  const section = ASSESSMENT_SECTIONS.find(s => s.id === sectionId);
  if (!section) return [];
  return section.questionIds.map(qId => ASSESSMENT_QUESTIONS[qId]);
}

/**
 * Get a flat list of all questions in order
 */
export function getAllQuestionsInOrder(): AssessmentQuestion[] {
  return ASSESSMENT_SECTIONS.flatMap(section =>
    section.questionIds.map(qId => ASSESSMENT_QUESTIONS[qId])
  );
}

/**
 * Check if a conditional question should be shown based on responses
 */
export function shouldShowQuestion(
  question: AssessmentQuestion,
  responses: Record<string, unknown>
): boolean {
  if (!question.conditionalOn) return true;

  const { questionId, showWhen } = question.conditionalOn;
  const response = responses[questionId];

  if (typeof response === 'string') {
    return showWhen.includes(response);
  }

  return true;
}

/**
 * Get total question count (excluding conditional)
 */
export function getTotalQuestionCount(): number {
  return Object.keys(ASSESSMENT_QUESTIONS).length;
}

/**
 * Get section by ID
 */
export function getSectionById(sectionId: SectionId): AssessmentSection | undefined {
  return ASSESSMENT_SECTIONS.find(s => s.id === sectionId);
}
