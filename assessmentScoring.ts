/**
 * AI Adoption Readiness Assessment - Scoring Engine
 * Version 2.0 (TypeScript)
 *
 * This module handles:
 * 1. Score calculation across all 7 dimensions
 * 2. Cross-dimensional validation (6 flags)
 * 3. Packaging all data for N8N webhook submission
 */

import {
  QuestionId,
  QuestionResponse,
  AssessmentResponses,
  DimensionId,
  DimensionScore,
  DimensionScores,
  ReadinessLevel,
  ReadinessLevelName,
  ValidationFlag,
  ValidationFlagType,
  ScoringResult,
  LeadData,
  N8NPayload,
  N8NPayloadMeta,
  FreeTextEntry,
  QuestionAnswerEntry,
  DIMENSION_WEIGHTS,
  READINESS_LEVELS,
  isMultiSelectResponse,
  isScaleResponse,
} from './assessmentTypes';

// =============================================================================
// SCORING MAPS
// =============================================================================

interface ScoringMaps {
  dataVolume: {
    employees: Record<string, number>;
    years: Record<string, number>;
  };
  teamSize: Record<string, number>;
  revenue: Record<string, number>;
  techAdoption: Record<string, number>;
  cloudUsage: Record<string, number>;
  dataStorage: Record<string, number>;
  customerSupport: Record<string, number>;
  monthlyBudget: Record<string, number>;
  itSupport: Record<string, number>;
  implementationApproach: Record<string, number>;
  aiFamiliarity: Record<string, number>;
  dataQuality: Record<string, number>;
  complianceAwareness: Record<string, number>;
  backupMaturity: Record<string, number>;
  timeline: Record<string, number>;
}

const SCORING: ScoringMaps = {
  // Business Profile
  dataVolume: {
    employees: { "1-5": 1, "6-15": 1.5, "16-50": 2, "51-100": 2.5, "100+": 3 },
    years: { "Less than 1 year": 0.5, "1-3 years": 1, "3-5 years": 1.5, "5-10 years": 2, "10+ years": 2.5 }
  },
  teamSize: { "1-5": 2, "6-15": 3, "16-50": 3, "51-100": 2.5, "100+": 2 },
  revenue: {
    "Under $100K": 1, "$100K-$500K": 2, "$500K-$1M": 2.5,
    "$1M-$5M": 3, "$5M+": 3, "Don't know/Prefer not to say": 2
  },

  // Technology Infrastructure
  techAdoption: {
    "Very Basic (paper/spreadsheets)": 1, "Moderate (some cloud tools)": 2.5,
    "Advanced (integrated systems)": 4, "Cutting-edge": 5, "Don't know": 2
  },
  cloudUsage: {
    "No - not interested": 1, "No - but interested": 1.5,
    "Yes - somewhat": 3, "Yes - extensively": 4
  },
  dataStorage: {
    "Paper records": 1, "Spreadsheets": 1.5, "Basic database": 2.5,
    "CRM system": 3.5, "Multiple integrated systems": 4, "Don't know": 2
  },

  // Process Maturity
  customerSupport: {
    "Phone only": 1, "Email only": 2, "Phone + Email": 3,
    "Chat widget": 4, "Social media DMs": 3, "Combination of multiple channels": 5
  },

  // Budget & Resources
  monthlyBudget: {
    "Under $100": 1, "$100-$500": 2, "$500-$1,000": 3,
    "$1,000-$2,500": 4, "$2,500+": 5, "Don't know": 2.5, "Don't have one": 1.5
  },
  itSupport: {
    "No dedicated IT support": 1, "Tech-savvy employee handles it": 2,
    "Contracted IT support": 3, "In-house IT staff": 4
  },
  implementationApproach: {
    "Avoid new technology": 1, "Never had to": 1.5,
    "Self-service/DIY": 2, "Vendor-provided training": 3, "Hire consultants": 3
  },

  // AI Knowledge
  aiFamiliarity: {
    "Never used them": 1, "Experimented briefly": 1.5,
    "Use occasionally": 2.5, "Use regularly": 3.5, "Power user": 4
  },

  // Data & Compliance
  dataQuality: {
    "Scattered/inconsistent": 1, "Somewhat organized": 2,
    "Well-organized": 4, "Highly structured and clean": 5, "Don't know": 2
  },
  complianceAwareness: {
    "Unsure": 1, "Minimal regulations": 1.5,
    "Yes - moderate requirements": 1.75, "Yes - strict compliance requirements": 2
  },
  backupMaturity: {
    "No backup system": 1, "Partial backup system": 1.5,
    "Yes - manual backups": 2.5, "Yes - automated cloud backup": 3
  },

  // Goals & Timeline
  timeline: {
    "No specific timeline": 1, "Within 1 year": 1.5,
    "Within 6 months": 2, "Within 3 months": 2.5, "Immediately": 3
  }
};

// =============================================================================
// HELPER SCORING FUNCTIONS
// =============================================================================

function getStringResponse(r: AssessmentResponses, key: QuestionId): string {
  const val = r[key];
  return typeof val === 'string' ? val : '';
}

function getNumberResponse(r: AssessmentResponses, key: QuestionId): number {
  const val = r[key];
  return typeof val === 'number' ? val : 0;
}

function getArrayResponse(r: AssessmentResponses, key: QuestionId): string[] {
  const val = r[key];
  return Array.isArray(val) ? val : [];
}

/**
 * Calculate software stack diversity score based on number of tools used
 */
function scoreSoftwareStack(selectedTools: string[]): number {
  if (!Array.isArray(selectedTools)) return 1;
  const count = selectedTools.filter(t => t !== "None" && t !== "Other").length;
  if (count === 0) return 1;
  if (count <= 2) return 2;
  if (count <= 4) return 3;
  if (count <= 6) return 3.5;
  return 4;
}

/**
 * Calculate team software comfort score from 1-5 scale
 */
function scoreTeamComfort(rating: number): number {
  const r = Number(rating) || 1;
  if (r <= 2) return 1;
  if (r === 3) return 2;
  return 3;
}

/**
 * Calculate AI tools used score based on variety
 */
function scoreAIToolsUsed(selectedTools: string[]): number {
  if (!Array.isArray(selectedTools)) return 1;
  const validTools = selectedTools.filter(t => t !== "None" && t !== "Other");
  if (validTools.length === 0) return 1;
  if (validTools.length <= 2) return 1.5;
  if (validTools.length <= 4) return 2.5;
  return 3;
}

/**
 * Calculate concern level score - rewards thoughtful concerns over none
 */
function scoreConcernLevel(selectedConcerns: string[]): number {
  if (!Array.isArray(selectedConcerns)) return 2;
  const count = selectedConcerns.filter(c => c !== "None" && c !== "Other").length;
  if (count === 0) return 3;      // No concerns - possibly uninformed
  if (count === 1) return 4;      // Thoughtful, focused concern - BEST
  if (count === 2) return 3.5;    // Realistic awareness
  if (count === 3) return 2.5;    // Multiple concerns but manageable
  return 1.5;                     // Many concerns - needs education
}

/**
 * Calculate motivation score from 1-5 scale
 */
function scoreMotivation(rating: number): number {
  const r = Number(rating) || 1;
  if (r <= 2) return 1;
  if (r === 3) return 2;
  if (r === 4) return 3;
  return 4;
}

/**
 * Calculate staff supportiveness score from 1-5 scale
 */
function scoreStaffSupport(rating: number): number {
  const r = Number(rating) || 1;
  if (r <= 2) return 1;
  if (r === 3) return 2;
  if (r === 4) return 2.5;
  return 3;
}

/**
 * Calculate success metrics clarity score
 */
function scoreSuccessMetrics(selectedMetrics: string[]): number {
  if (!Array.isArray(selectedMetrics)) return 1;
  if (selectedMetrics.includes("All of the above")) return 2.5;
  if (selectedMetrics.length >= 2) return 2;
  if (selectedMetrics.length === 1) return 1.5;
  return 1;
}

// =============================================================================
// DIMENSION CALCULATORS
// =============================================================================

function calculateTechInfrastructure(r: AssessmentResponses): Omit<DimensionScore, 'normalized' | 'weight'> {
  let score = 0;
  score += SCORING.techAdoption[getStringResponse(r, 'TI01')] || 2;
  score += SCORING.cloudUsage[getStringResponse(r, 'TI02')] || 2;
  score += scoreSoftwareStack(getArrayResponse(r, 'TI03'));
  score += SCORING.dataStorage[getStringResponse(r, 'TI04')] || 2;
  score += scoreTeamComfort(getNumberResponse(r, 'TI05'));
  return { score, maxPoints: 20 };
}

function calculateProcessMaturity(r: AssessmentResponses): Omit<DimensionScore, 'normalized' | 'weight'> {
  let score = 0;
  score += SCORING.customerSupport[getStringResponse(r, 'PP02')] || 3;
  score += getNumberResponse(r, 'PP04') || 3;  // Direct 1-5 mapping
  score += getNumberResponse(r, 'PP05') || 3;  // Direct 1-5 mapping
  return { score, maxPoints: 15 };
}

function calculateDataReadiness(r: AssessmentResponses): Omit<DimensionScore, 'normalized' | 'weight'> {
  let score = 0;
  // Data quality
  score += SCORING.dataQuality[getStringResponse(r, 'DC01')] || 2;
  // Compliance awareness
  score += SCORING.complianceAwareness[getStringResponse(r, 'DC03')] || 1.5;
  // Backup maturity
  score += SCORING.backupMaturity[getStringResponse(r, 'DC04')] || 1.5;
  // Data volume (from employees + years)
  const empScore = SCORING.dataVolume.employees[getStringResponse(r, 'BP02')] || 1.5;
  const yearsScore = SCORING.dataVolume.years[getStringResponse(r, 'BP03')] || 1;
  const dataVolumeScore = Math.min((empScore + yearsScore) * (5 / 5.5), 5);
  score += dataVolumeScore;
  return { score, maxPoints: 15 };
}

function calculateBudgetResources(r: AssessmentResponses): Omit<DimensionScore, 'normalized' | 'weight'> {
  let score = 0;
  score += SCORING.monthlyBudget[getStringResponse(r, 'BR01')] || 2;
  score += SCORING.itSupport[getStringResponse(r, 'BR02')] || 2;
  score += SCORING.implementationApproach[getStringResponse(r, 'BR03')] || 2;
  score += SCORING.revenue[getStringResponse(r, 'BP04')] || 2;
  return { score, maxPoints: 15 };
}

function calculateAIKnowledge(r: AssessmentResponses): Omit<DimensionScore, 'normalized' | 'weight'> {
  let score = 0;
  score += SCORING.aiFamiliarity[getStringResponse(r, 'AK01')] || 2;
  score += scoreAIToolsUsed(getArrayResponse(r, 'AK02'));
  score += scoreConcernLevel(getArrayResponse(r, 'AK04'));
  score += scoreMotivation(getNumberResponse(r, 'AK05'));
  return { score, maxPoints: 15 };
}

function calculateOrgReadiness(r: AssessmentResponses): Omit<DimensionScore, 'normalized' | 'weight'> {
  let score = 0;
  // Team size (bell curve)
  score += SCORING.teamSize[getStringResponse(r, 'BP02')] || 2.5;
  // Team software comfort
  score += scoreTeamComfort(getNumberResponse(r, 'TI05'));
  // Staff supportiveness
  score += scoreStaffSupport(getNumberResponse(r, 'AK06'));
  // Bonus for implementation experience
  const approach = getStringResponse(r, 'BR03');
  if (["Vendor-provided training", "Hire consultants"].includes(approach)) {
    score += 1;
  }
  return { score: Math.min(score, 10), maxPoints: 10 };
}

function calculateStrategicAlignment(r: AssessmentResponses): Omit<DimensionScore, 'normalized' | 'weight'> {
  let score = 0;
  score += SCORING.timeline[getStringResponse(r, 'GT01')] || 1.5;
  score += scoreSuccessMetrics(getArrayResponse(r, 'GT03'));
  // GT04 (goal clarity) will be scored by AI on server - add placeholder
  score += 2.5; // Middle score placeholder - actual score comes from AI analysis
  return { score, maxPoints: 10 };
}

// =============================================================================
// CROSS-DIMENSIONAL VALIDATION
// =============================================================================

interface DimensionsWithOverall extends Record<DimensionId, DimensionScore> {
  overall?: number;
}

function runValidation(dimensions: DimensionsWithOverall, r: AssessmentResponses): ValidationFlag[] {
  const flags: ValidationFlag[] = [];

  // Rule 1: High enthusiasm + Low infrastructure
  if ((getNumberResponse(r, 'AK05') >= 4 && getStringResponse(r, 'GT01') === "Immediately") &&
      dimensions.techInfrastructure.normalized < 40) {
    flags.push({
      flag: "EXPECTATION_MANAGEMENT",
      severity: "WARNING",
      message: "High enthusiasm detected with limited technology foundation. Recommend starting with infrastructure basics before AI implementation.",
      adjustment: {
        addPhase: "Foundation Building",
        phaseDuration: "60-90 days",
        recommendedFirstSteps: ["Cloud tool migration", "Data organization", "Basic automation (Zapier/Make)"]
      }
    });
  }

  // Rule 2: High budget + No IT support
  const budget = getStringResponse(r, 'BR01');
  if (["$1,000-$2,500", "$2,500+"].includes(budget) &&
      getStringResponse(r, 'BR02') === "No dedicated IT support") {
    flags.push({
      flag: "MANAGED_SERVICES_CANDIDATE",
      severity: "INFO",
      message: "Budget available but no IT support. Strong candidate for fully managed AI implementation services.",
      adjustment: {
        emphasizeService: "Fully Managed Implementation",
        recommendVendorSupport: true
      }
    });
  }

  // Rule 3: Immediate timeline + Foundation-level readiness
  const timeline = getStringResponse(r, 'GT01');
  if (["Immediately", "Within 3 months"].includes(timeline) &&
      (dimensions.overall || 0) < 35) {
    flags.push({
      flag: "TIMELINE_ADJUSTMENT",
      severity: "WARNING",
      message: "Aggressive timeline with foundational readiness level. Recommend extending timeline and setting intermediate milestones.",
      adjustment: {
        recommendedTimeline: "6-12 months",
        addMilestones: [
          "30 days: Data audit and organization",
          "60 days: Cloud tool adoption",
          "90 days: First automation pilot",
          "180 days: First AI tool implementation"
        ]
      }
    });
  }

  // Rule 4: High data quality + Low AI knowledge
  if (dimensions.dataReadiness.normalized >= 70 &&
      dimensions.aiKnowledge.normalized < 40) {
    flags.push({
      flag: "QUICK_WIN_OPPORTUNITY",
      severity: "POSITIVE",
      message: "Strong data foundation with AI knowledge gap. High potential for quick wins with user-friendly AI tools.",
      adjustment: {
        emphasize: "Education + Simple Tools",
        recommendedTools: ["ChatGPT/Claude for business writing", "AI-powered CRM features", "Automated reporting tools"],
        includeTraining: true
      }
    });
  }

  // Rule 5: Regulated industry + High enthusiasm
  const sensitiveData = getStringResponse(r, 'DC02');
  const regulations = getStringResponse(r, 'DC03');
  if ((sensitiveData === "Yes - highly regulated (HIPAA, PCI, etc.)" ||
       regulations === "Yes - strict compliance requirements") &&
      getNumberResponse(r, 'AK05') >= 4) {
    flags.push({
      flag: "COMPLIANCE_FIRST",
      severity: "CAUTION",
      message: "Regulated industry with strong AI interest. Must prioritize compliance-approved AI solutions.",
      adjustment: {
        addPhase: "Compliance Review",
        phaseDuration: "30-45 days",
        recommendedTools: ["Enterprise-grade, SOC2/HIPAA compliant only"],
        excludeTools: ["Consumer AI tools", "Free-tier solutions"]
      }
    });
  }

  // Rule 6: Large team + Low staff supportiveness
  const employees = getStringResponse(r, 'BP02');
  if (["51-100", "100+"].includes(employees) && getNumberResponse(r, 'AK06') <= 2) {
    flags.push({
      flag: "CHANGE_MANAGEMENT_CRITICAL",
      severity: "WARNING",
      message: "Larger organization with anticipated staff resistance. Change management must be central to implementation.",
      adjustment: {
        addPhase: "Change Management Program",
        recommendedActions: [
          "Executive sponsorship communication",
          "Pilot team selection",
          "Success story documentation",
          "Phased rollout by department"
        ]
      }
    });
  }

  return flags;
}

// =============================================================================
// READINESS LEVEL DETERMINATION
// =============================================================================

export function getReadinessLevel(score: number): ReadinessLevel {
  const level = READINESS_LEVELS.find(l => score >= l.minScore && score <= l.maxScore);
  return level || READINESS_LEVELS[0]; // Default to Foundation Building
}

// =============================================================================
// MAIN SCORING FUNCTION
// =============================================================================

/**
 * Calculate complete assessment score from user responses
 */
export function calculateAssessmentScore(responses: AssessmentResponses): ScoringResult {
  // Calculate each dimension
  const rawDimensions = {
    techInfrastructure: calculateTechInfrastructure(responses),
    processMaturity: calculateProcessMaturity(responses),
    dataReadiness: calculateDataReadiness(responses),
    budgetResources: calculateBudgetResources(responses),
    aiKnowledge: calculateAIKnowledge(responses),
    orgReadiness: calculateOrgReadiness(responses),
    strategicAlignment: calculateStrategicAlignment(responses)
  };

  // Calculate normalized scores and weighted total
  let totalScore = 0;
  const dimensions: Record<string, DimensionScore> = {};

  for (const [key, dim] of Object.entries(rawDimensions)) {
    const dimId = key as DimensionId;
    const normalized = Math.round((dim.score / dim.maxPoints) * 100);
    const weight = DIMENSION_WEIGHTS[dimId];
    const weightedContribution = normalized * (weight / 100);
    totalScore += weightedContribution;

    dimensions[dimId] = {
      score: dim.score,
      maxPoints: dim.maxPoints,
      normalized,
      weight: `${weight}%`
    };
  }

  const overallScore = Math.round(totalScore);

  // Create dimensions object with overall score for validation
  const dimensionsWithOverall: DimensionsWithOverall = {
    ...(dimensions as Record<DimensionId, DimensionScore>),
    overall: overallScore
  };

  // Run cross-dimensional validation
  const validationFlags = runValidation(dimensionsWithOverall, responses);

  // Get readiness level
  const readinessLevel = getReadinessLevel(overallScore);

  return {
    overallScore,
    readinessLevel,
    dimensions: dimensions as DimensionScores,
    validationFlags
  };
}

// =============================================================================
// N8N PAYLOAD BUILDER
// =============================================================================

// Question definitions for payload building (minimal subset needed)
const QUESTION_TEXT: Record<QuestionId, string> = {
  BP01: "What industry are you in?",
  BP02: "How many employees do you have?",
  BP03: "How long have you been running your business?",
  BP04: "What is your approximate annual revenue?",
  BP05: "Please briefly describe your core business model and primary products/services.",
  BP06: "Please briefly describe your business goals and objectives over the next 6, 12 & 18 months.",
  TI01: "How would you rate your current technology adoption?",
  TI02: "Do you currently use any cloud-based software?",
  TI03: "What business software do you currently use?",
  TI04: "How is your business & customer data currently stored?",
  TI05: "How comfortable is your team with learning new software?",
  TI06: "Please describe any current technology frustrations or limitations causing bottlenecks.",
  PP01: "Which types of tasks demand the most of your staff's time?",
  PP02: "How do you currently handle customer support?",
  PP03: "What is your biggest operational challenge?",
  PP04: "How repetitive are your daily business tasks?",
  PP05: "How much time does your team spend on manual data entry weekly?",
  PP06: "What are your top 3 business challenges that you believe technology might help solve?",
  PP07: "Please describe a typical workflow or business process that feels inefficient.",
  BR01: "What is your monthly budget for software/technology tools?",
  BR02: "Do you have IT support available?",
  BR03: "How have you typically implemented new technology in the past?",
  BR04: "Are you actively budgeting for AI implementation initiatives over the next 12 months?",
  AK01: "How familiar are you and your team with AI tools like ChatGPT, Claude, AI Agents, Automation Software, etc.?",
  AK02: "Have you or your team used any AI-powered tools?",
  AK03: "What is your primary goal for adopting AI?",
  AK04: "What concerns do you have about adopting AI?",
  AK05: "How motivated are you as a business owner to implement AI?",
  AK06: "How supportive/receptive do you believe your staff will be to AI adoption?",
  DC01: "How would you describe the quality of your business data?",
  DC02: "Does your business handle sensitive customer data?",
  DC03: "Are you subject to industry-specific regulations?",
  DC04: "Do you have a data backup system in place?",
  DC05: "Describe any compliance or data security concerns specific to your industry.",
  GT01: "When would you ideally like to start implementing AI tools?",
  GT02: "What level of involvement do you want in the implementation process?",
  GT03: "How would you measure AI implementation success?",
  GT04: "What does successful AI adoption look like for your business in 1 year?"
};

const FREE_TEXT_QUESTIONS: QuestionId[] = ['BP05', 'BP06', 'TI06', 'PP06', 'PP07', 'BR04', 'DC05', 'GT04'];

function formatResponse(response: QuestionResponse): string {
  if (response === null || response === undefined) return '';
  if (Array.isArray(response)) return response.join(', ');
  return String(response);
}

interface PayloadMetadata {
  source?: string;
  assessmentType?: string;
  userAgent?: string;
  sessionId?: string;
  completionTime?: number;
}

/**
 * Build complete payload for N8N webhook
 */
export function buildN8NPayload(
  responses: AssessmentResponses,
  leadData: LeadData,
  metadata: PayloadMetadata = {}
): N8NPayload {
  // Calculate scores
  const scoring = calculateAssessmentScore(responses);

  // Build questions with responses for AI context
  const completeQuestionsAndAnswers: QuestionAnswerEntry[] = Object.entries(responses)
    .filter(([_, answer]) => answer !== null && answer !== undefined)
    .map(([questionId, answer]) => {
      const qId = questionId as QuestionId;
      return {
        questionId: qId,
        question: QUESTION_TEXT[qId] || questionId,
        answer: answer as QuestionResponse,
        answerFormatted: formatResponse(answer as QuestionResponse)
      };
    });

  // Identify free-text responses for AI analysis
  const freeTextForAIAnalysis: FreeTextEntry[] = FREE_TEXT_QUESTIONS
    .filter(qId => responses[qId] && typeof responses[qId] === 'string')
    .map(qId => ({
      questionId: qId,
      question: QUESTION_TEXT[qId],
      response: responses[qId] as string
    }));

  // Build the complete payload
  return {
    meta: {
      assessmentVersion: "2.0",
      submittedAt: new Date().toISOString(),
      source: "website",
      assessmentType: "standard",
      userAgent: metadata.userAgent || '',
      sessionId: metadata.sessionId || '',
      completionTimeSeconds: metadata.completionTime || 0
    },

    lead: {
      email: leadData.email,
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      companyName: leadData.businessName,
      phone: leadData.phone,
      websiteUrl: leadData.websiteUrl,
      consultationRequested: leadData.consultationRequested || false
    },

    scoring,

    businessProfile: {
      industry: getStringResponse(responses, 'BP01'),
      employeeCount: getStringResponse(responses, 'BP02'),
      yearsInBusiness: getStringResponse(responses, 'BP03'),
      annualRevenue: getStringResponse(responses, 'BP04'),
      businessModel: getStringResponse(responses, 'BP05'),
      businessGoals: getStringResponse(responses, 'BP06'),
      primaryAIGoal: getStringResponse(responses, 'AK03'),
      implementationTimeline: getStringResponse(responses, 'GT01'),
      involvementPreference: getStringResponse(responses, 'GT02'),
      successMetrics: getArrayResponse(responses, 'GT03')
    },

    painPointsAndOpportunities: {
      timeConsumingTasks: getArrayResponse(responses, 'PP01'),
      biggestChallenge: getStringResponse(responses, 'PP03'),
      taskRepetitiveness: getNumberResponse(responses, 'PP04'),
      manualDataEntryLevel: getNumberResponse(responses, 'PP05'),
      techChallenges: getStringResponse(responses, 'PP06'),
      inefficientWorkflow: getStringResponse(responses, 'PP07'),
      techFrustrations: getStringResponse(responses, 'TI06'),
      aiConcerns: getArrayResponse(responses, 'AK04')
    },

    currentState: {
      techAdoptionLevel: getStringResponse(responses, 'TI01'),
      cloudUsage: getStringResponse(responses, 'TI02'),
      softwareStack: getArrayResponse(responses, 'TI03'),
      dataStorage: getStringResponse(responses, 'TI04'),
      teamTechComfort: getNumberResponse(responses, 'TI05'),
      itSupport: getStringResponse(responses, 'BR02'),
      monthlyTechBudget: getStringResponse(responses, 'BR01'),
      pastImplementationApproach: getStringResponse(responses, 'BR03'),
      aiBudgetPlanning: getStringResponse(responses, 'BR04'),
      aiFamiliarity: getStringResponse(responses, 'AK01'),
      aiToolsUsed: getArrayResponse(responses, 'AK02'),
      ownerMotivation: getNumberResponse(responses, 'AK05'),
      staffReceptiveness: getNumberResponse(responses, 'AK06'),
      dataQuality: getStringResponse(responses, 'DC01'),
      sensitiveData: getStringResponse(responses, 'DC02'),
      industryRegulations: getStringResponse(responses, 'DC03'),
      backupSystem: getStringResponse(responses, 'DC04'),
      complianceConcerns: getStringResponse(responses, 'DC05') || null
    },

    goals: {
      timeline: getStringResponse(responses, 'GT01'),
      involvementLevel: getStringResponse(responses, 'GT02'),
      successMetrics: getArrayResponse(responses, 'GT03'),
      oneYearVision: getStringResponse(responses, 'GT04'),
      additionalContext: '' // GT05 not in original spec but could be added
    },

    freeTextForAIAnalysis,
    completeQuestionsAndAnswers,
    rawResponses: responses
  };
}
