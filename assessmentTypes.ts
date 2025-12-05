/**
 * AI Adoption Readiness Assessment - TypeScript Type Definitions
 * Version 2.0
 *
 * These types support the complete assessment flow:
 * 1. Lead capture
 * 2. 33 questions across 7 sections
 * 3. Scoring across 7 dimensions
 * 4. Validation flags
 * 5. N8N webhook payload
 */

// =============================================================================
// LEAD CAPTURE
// =============================================================================

export interface LeadData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  businessName: string;
  websiteUrl?: string;  // Optional
  consultationRequested?: boolean;
}

// =============================================================================
// QUESTION TYPES
// =============================================================================

export type QuestionType = 'single_select' | 'multi_select' | 'dropdown' | 'scale' | 'free_text';

export type QuestionId =
  // Business Profile (6 questions)
  | 'BP01' | 'BP02' | 'BP03' | 'BP04' | 'BP05' | 'BP06'
  // Technology Infrastructure (6 questions)
  | 'TI01' | 'TI02' | 'TI03' | 'TI04' | 'TI05' | 'TI06'
  // Business Processes (7 questions)
  | 'PP01' | 'PP02' | 'PP03' | 'PP04' | 'PP05' | 'PP06' | 'PP07'
  // Budget & Resources (4 questions)
  | 'BR01' | 'BR02' | 'BR03' | 'BR04'
  // AI Knowledge (6 questions)
  | 'AK01' | 'AK02' | 'AK03' | 'AK04' | 'AK05' | 'AK06'
  // Data & Compliance (5 questions)
  | 'DC01' | 'DC02' | 'DC03' | 'DC04' | 'DC05'
  // Goals & Timeline (4 questions)
  | 'GT01' | 'GT02' | 'GT03' | 'GT04';

export type SectionId = 'BP' | 'TI' | 'PP' | 'BR' | 'AK' | 'DC' | 'GT';

export interface ScaleLabels {
  [key: number]: string;
}

export interface AssessmentQuestion {
  id: QuestionId;
  section: SectionId;
  sectionName: string;
  question: string;
  type: QuestionType;
  options?: string[];
  required?: boolean;
  maxSelections?: number;      // For multi_select
  scaleMin?: number;           // For scale type (default 1)
  scaleMax?: number;           // For scale type (default 5)
  scaleLabels?: ScaleLabels;   // For scale type
  conditionalOn?: {            // For conditional questions
    questionId: QuestionId;
    showWhen: string[];        // Values that trigger showing this question
  };
}

export interface AssessmentSection {
  id: SectionId;
  name: string;
  description: string;
  questionIds: QuestionId[];
}

// =============================================================================
// RESPONSES
// =============================================================================

export type SingleSelectResponse = string;
export type MultiSelectResponse = string[];
export type DropdownResponse = string;
export type ScaleResponse = number;
export type FreeTextResponse = string;

export type QuestionResponse =
  | SingleSelectResponse
  | MultiSelectResponse
  | ScaleResponse
  | FreeTextResponse
  | null;

export type AssessmentResponses = Partial<Record<QuestionId, QuestionResponse>>;

// =============================================================================
// SCORING DIMENSIONS
// =============================================================================

export type DimensionId =
  | 'techInfrastructure'
  | 'processMaturity'
  | 'dataReadiness'
  | 'budgetResources'
  | 'aiKnowledge'
  | 'orgReadiness'
  | 'strategicAlignment';

export interface DimensionScore {
  score: number;
  maxPoints: number;
  normalized: number;  // 0-100 percentage
  weight: string;      // e.g., "20%"
}

export type DimensionScores = Record<DimensionId, DimensionScore>;

export const DIMENSION_WEIGHTS: Record<DimensionId, number> = {
  techInfrastructure: 20,
  processMaturity: 15,
  dataReadiness: 15,
  budgetResources: 15,
  aiKnowledge: 15,
  orgReadiness: 10,
  strategicAlignment: 10
};

export const DIMENSION_NAMES: Record<DimensionId, string> = {
  techInfrastructure: 'Technology Infrastructure',
  processMaturity: 'Process Maturity',
  dataReadiness: 'Data Readiness',
  budgetResources: 'Budget & Resources',
  aiKnowledge: 'AI Knowledge',
  orgReadiness: 'Organizational Readiness',
  strategicAlignment: 'Strategic Alignment'
};

// =============================================================================
// READINESS LEVELS
// =============================================================================

export type ReadinessLevelName =
  | 'Foundation Building'
  | 'Early Stage'
  | 'Developing'
  | 'Ready'
  | 'Advanced';

export interface ReadinessLevel {
  level: ReadinessLevelName;
  badge: string;       // Emoji badge
  color: string;       // Color identifier
  tier: 1 | 2 | 3 | 4 | 5;
  minScore: number;
  maxScore: number;
  description: string;
}

export const READINESS_LEVELS: ReadinessLevel[] = [
  {
    level: 'Foundation Building',
    badge: '🔴',
    color: 'red',
    tier: 1,
    minScore: 0,
    maxScore: 25,
    description: 'Building the foundation for AI adoption. Focus on basic technology infrastructure and data organization.'
  },
  {
    level: 'Early Stage',
    badge: '🟠',
    color: 'orange',
    tier: 2,
    minScore: 26,
    maxScore: 45,
    description: 'Early stages of AI readiness. Ready for initial automation and cloud tool adoption.'
  },
  {
    level: 'Developing',
    badge: '🟡',
    color: 'yellow',
    tier: 3,
    minScore: 46,
    maxScore: 65,
    description: 'Developing AI capabilities. Ready for targeted AI implementations with guidance.'
  },
  {
    level: 'Ready',
    badge: '🟢',
    color: 'green',
    tier: 4,
    minScore: 66,
    maxScore: 80,
    description: 'Ready for AI adoption. Well-positioned for comprehensive AI implementation.'
  },
  {
    level: 'Advanced',
    badge: '🌟',
    color: 'gold',
    tier: 5,
    minScore: 81,
    maxScore: 100,
    description: 'Advanced readiness. Prepared for sophisticated AI solutions and innovation.'
  }
];

// =============================================================================
// VALIDATION FLAGS
// =============================================================================

export type ValidationFlagType =
  | 'EXPECTATION_MANAGEMENT'
  | 'MANAGED_SERVICES_CANDIDATE'
  | 'TIMELINE_ADJUSTMENT'
  | 'QUICK_WIN_OPPORTUNITY'
  | 'COMPLIANCE_FIRST'
  | 'CHANGE_MANAGEMENT_CRITICAL';

export type ValidationSeverity = 'INFO' | 'WARNING' | 'CAUTION' | 'POSITIVE';

export interface ValidationFlagAdjustment {
  addPhase?: string;
  phaseDuration?: string;
  recommendedFirstSteps?: string[];
  emphasizeService?: string;
  recommendVendorSupport?: boolean;
  recommendedTimeline?: string;
  addMilestones?: string[];
  emphasize?: string;
  recommendedTools?: string[];
  includeTraining?: boolean;
  excludeTools?: string[];
  recommendedActions?: string[];
}

export interface ValidationFlag {
  flag: ValidationFlagType;
  severity: ValidationSeverity;
  message: string;
  adjustment?: ValidationFlagAdjustment;
}

// =============================================================================
// SCORING RESULT
// =============================================================================

export interface ScoringResult {
  overallScore: number;
  readinessLevel: ReadinessLevel;
  dimensions: DimensionScores;
  validationFlags: ValidationFlag[];
}

// =============================================================================
// N8N PAYLOAD STRUCTURE
// =============================================================================

export interface N8NPayloadMeta {
  assessmentVersion: string;
  submittedAt: string;
  source: 'website';
  assessmentType: 'standard';
  userAgent: string;
  sessionId: string;
  completionTimeSeconds: number;
}

export interface N8NPayloadLead {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
  websiteUrl?: string;
  consultationRequested: boolean;
}

export interface N8NPayloadBusinessProfile {
  industry: string;
  employeeCount: string;
  yearsInBusiness: string;
  annualRevenue: string;
  businessModel: string;
  businessGoals: string;
  primaryAIGoal: string;
  implementationTimeline: string;
  involvementPreference: string;
  successMetrics: string[];
}

export interface N8NPayloadPainPoints {
  timeConsumingTasks: string[];
  biggestChallenge: string;
  taskRepetitiveness: number;
  manualDataEntryLevel: number;
  techChallenges: string;
  inefficientWorkflow: string;
  techFrustrations: string;
  aiConcerns: string[];
}

export interface N8NPayloadCurrentState {
  techAdoptionLevel: string;
  cloudUsage: string;
  softwareStack: string[];
  dataStorage: string;
  teamTechComfort: number;
  itSupport: string;
  monthlyTechBudget: string;
  pastImplementationApproach: string;
  aiBudgetPlanning: string;
  aiFamiliarity: string;
  aiToolsUsed: string[];
  ownerMotivation: number;
  staffReceptiveness: number;
  dataQuality: string;
  sensitiveData: string;
  industryRegulations: string;
  backupSystem: string;
  complianceConcerns: string | null;
}

export interface N8NPayloadGoals {
  timeline: string;
  involvementLevel: string;
  successMetrics: string[];
  oneYearVision: string;
  additionalContext: string;
}

export interface FreeTextEntry {
  questionId: QuestionId;
  question: string;
  response: string;
}

export interface QuestionAnswerEntry {
  questionId: QuestionId;
  question: string;
  answer: QuestionResponse;
  answerFormatted: string;
}

export interface N8NPayload {
  meta: N8NPayloadMeta;
  lead: N8NPayloadLead;
  scoring: ScoringResult;
  businessProfile: N8NPayloadBusinessProfile;
  painPointsAndOpportunities: N8NPayloadPainPoints;
  currentState: N8NPayloadCurrentState;
  goals: N8NPayloadGoals;
  freeTextForAIAnalysis: FreeTextEntry[];
  completeQuestionsAndAnswers: QuestionAnswerEntry[];
  rawResponses: AssessmentResponses;
}

// =============================================================================
// COMPONENT STATE
// =============================================================================

export type AssessmentStage = 'landing' | 'lead-capture' | 'questions' | 'submitting' | 'results';

export interface AssessmentState {
  stage: AssessmentStage;
  leadData: LeadData | null;
  currentSectionIndex: number;
  currentQuestionIndex: number;
  responses: AssessmentResponses;
  startTime: number | null;
  scoringResult: ScoringResult | null;
  error: string | null;
}

// =============================================================================
// HELPER TYPE GUARDS
// =============================================================================

export function isMultiSelectResponse(response: QuestionResponse): response is string[] {
  return Array.isArray(response);
}

export function isScaleResponse(response: QuestionResponse): response is number {
  return typeof response === 'number';
}

export function isFreeTextResponse(response: QuestionResponse): response is string {
  return typeof response === 'string';
}
