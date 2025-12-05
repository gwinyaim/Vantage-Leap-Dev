/**
 * AI Adoption Readiness Assessment - Client-Side Scoring Engine
 * Version 2.0
 * 
 * This module handles:
 * 1. Score calculation across all dimensions
 * 2. Cross-dimensional validation
 * 3. Packaging all data for N8N webhook submission
 * 
 * Output is a complete payload ready for AI-powered report generation
 */

// =============================================================================
// QUESTION DEFINITIONS (for reference in N8N payload)
// =============================================================================

const QUESTIONS = {
  // Section 1: Business Profile & Foundation
  BP01: {
    id: "BP01",
    section: "Business Profile",
    question: "What industry are you in?",
    type: "dropdown",
    options: ["Retail", "Healthcare", "Finance", "Manufacturing", "Professional Services", "Food & Hospitality", "Construction", "Technology", "Other"]
  },
  BP02: {
    id: "BP02",
    section: "Business Profile",
    question: "How many employees do you have?",
    type: "single_select",
    options: ["1-5", "6-15", "16-50", "51-100", "100+"]
  },
  BP03: {
    id: "BP03",
    section: "Business Profile",
    question: "How long have you been running your business?",
    type: "single_select",
    options: ["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"]
  },
  BP04: {
    id: "BP04",
    section: "Business Profile",
    question: "What is your approximate annual revenue?",
    type: "single_select",
    options: ["Under $100K", "$100K-$500K", "$500K-$1M", "$1M-$5M", "$5M+", "Don't know/Prefer not to say"]
  },
  BP05: {
    id: "BP05",
    section: "Business Profile",
    question: "Please briefly describe your core business model and primary products/services.",
    type: "free_text"
  },
  BP06: {
    id: "BP06",
    section: "Business Profile",
    question: "Please briefly describe your business goals and objectives over the next 6, 12 & 18 months.",
    type: "free_text"
  },

  // Section 2: Technology Infrastructure
  TI01: {
    id: "TI01",
    section: "Technology Infrastructure",
    question: "How would you rate your current technology adoption?",
    type: "single_select",
    options: ["Very Basic (paper/spreadsheets)", "Moderate (some cloud tools)", "Advanced (integrated systems)", "Cutting-edge", "Don't know"]
  },
  TI02: {
    id: "TI02",
    section: "Technology Infrastructure",
    question: "Do you currently use any cloud-based software?",
    type: "single_select",
    options: ["Yes - extensively", "Yes - somewhat", "No - but interested", "No - not interested"]
  },
  TI03: {
    id: "TI03",
    section: "Technology Infrastructure",
    question: "What business software do you currently use?",
    type: "multi_select",
    options: ["CRM", "Accounting Software", "Project Management", "E-commerce Platform", "Marketing Automation", "Inventory Management", "HR/Payroll", "Other", "None"]
  },
  TI04: {
    id: "TI04",
    section: "Technology Infrastructure",
    question: "How is your business & customer data currently stored?",
    type: "single_select",
    options: ["Paper records", "Spreadsheets", "Basic database", "CRM system", "Multiple integrated systems", "Don't know"]
  },
  TI05: {
    id: "TI05",
    section: "Technology Infrastructure",
    question: "How comfortable is your team with learning new software?",
    type: "scale",
    scale_min: 1,
    scale_max: 5,
    scale_labels: { 1: "Very resistant", 5: "Eager adopters" }
  },
  TI06: {
    id: "TI06",
    section: "Technology Infrastructure",
    question: "Please describe any current technology frustrations or limitations causing bottlenecks.",
    type: "free_text",
    required: false
  },

  // Section 3: Business Processes & Pain Points
  PP01: {
    id: "PP01",
    section: "Business Processes",
    question: "Which types of tasks demand the most of your staff's time? (Select top 3)",
    type: "multi_select",
    max_selections: 3,
    options: ["Sales", "Customer inquiries", "Data entry", "Scheduling", "Invoicing/Billing", "Inventory tracking", "Report generation", "Email management", "Social media", "Lead follow-up", "Content creation", "Other"]
  },
  PP02: {
    id: "PP02",
    section: "Business Processes",
    question: "How do you currently handle customer support?",
    type: "single_select",
    options: ["Phone only", "Email only", "Phone + Email", "Chat widget", "Social media DMs", "Combination of multiple channels"]
  },
  PP03: {
    id: "PP03",
    section: "Business Processes",
    question: "What is your biggest operational challenge?",
    type: "single_select",
    options: ["Finding/retaining talent", "Scaling operations", "Customer acquisition", "Cash flow management", "Time management", "Competition", "Other"]
  },
  PP04: {
    id: "PP04",
    section: "Business Processes",
    question: "How repetitive are your daily business tasks?",
    type: "scale",
    scale_min: 1,
    scale_max: 5,
    scale_labels: { 1: "Mostly unique work", 5: "Highly repetitive" }
  },
  PP05: {
    id: "PP05",
    section: "Business Processes",
    question: "How much time does your team spend on manual data entry weekly?",
    type: "scale",
    scale_min: 1,
    scale_max: 5,
    scale_labels: { 1: "Minimal", 5: "Significant" }
  },
  PP06: {
    id: "PP06",
    section: "Business Processes",
    question: "What are your top 3 business challenges that you believe technology might help solve?",
    type: "free_text"
  },
  PP07: {
    id: "PP07",
    section: "Business Processes",
    question: "Please describe a typical workflow or business process that feels inefficient.",
    type: "free_text",
    required: false
  },

  // Section 4: Budget & Resources
  BR01: {
    id: "BR01",
    section: "Budget & Resources",
    question: "What is your monthly budget for software/technology tools?",
    type: "single_select",
    options: ["Under $100", "$100-$500", "$500-$1,000", "$1,000-$2,500", "$2,500+", "Don't know", "Don't have one"]
  },
  BR02: {
    id: "BR02",
    section: "Budget & Resources",
    question: "Do you have IT support available?",
    type: "single_select",
    options: ["In-house IT staff", "Contracted IT support", "Tech-savvy employee handles it", "No dedicated IT support"]
  },
  BR03: {
    id: "BR03",
    section: "Budget & Resources",
    question: "How have you typically implemented new technology in the past?",
    type: "single_select",
    options: ["Self-service/DIY", "Hire consultants", "Vendor-provided training", "Avoid new technology", "Never had to"]
  },
  BR04: {
    id: "BR04",
    section: "Budget & Resources",
    question: "Are you actively budgeting for AI implementation initiatives over the next 12 months?",
    type: "free_text",
    required: false
  },

  // Section 5: AI Knowledge & Expectations
  AK01: {
    id: "AK01",
    section: "AI Knowledge",
    question: "How familiar are you and your team with AI tools like ChatGPT, Claude, AI Agents, Automation Software, etc.?",
    type: "single_select",
    options: ["Never used them", "Experimented briefly", "Use occasionally", "Use regularly", "Power user"]
  },
  AK02: {
    id: "AK02",
    section: "AI Knowledge",
    question: "Have you or your team used any AI-powered tools?",
    type: "multi_select",
    options: ["ChatGPT/Claude", "AI writing assistants", "AI image generators", "Chatbots", "Automated scheduling", "Predictive analytics", "None", "Other"]
  },
  AK03: {
    id: "AK03",
    section: "AI Knowledge",
    question: "What is your primary goal for adopting AI?",
    type: "single_select",
    options: ["Reduce costs", "Save time", "Improve customer experience", "Scale operations", "Stay competitive", "Explore possibilities"]
  },
  AK04: {
    id: "AK04",
    section: "AI Knowledge",
    question: "What concerns do you have about adopting AI?",
    type: "multi_select",
    options: ["Cost", "Complexity", "Data privacy", "Job displacement", "Reliability", "Customer perception", "None", "Other"]
  },
  AK05: {
    id: "AK05",
    section: "AI Knowledge",
    question: "How motivated are you as a business owner to implement AI?",
    type: "scale",
    scale_min: 1,
    scale_max: 5,
    scale_labels: { 1: "Very hesitant", 5: "Very eager" }
  },
  AK06: {
    id: "AK06",
    section: "AI Knowledge",
    question: "How supportive/receptive do you believe your staff will be to AI adoption?",
    type: "scale",
    scale_min: 1,
    scale_max: 5,
    scale_labels: { 1: "Resistant", 5: "Enthusiastic" }
  },

  // Section 6: Data & Compliance
  DC01: {
    id: "DC01",
    section: "Data & Compliance",
    question: "How would you describe the quality of your business data?",
    type: "single_select",
    options: ["Scattered/inconsistent", "Somewhat organized", "Well-organized", "Highly structured and clean", "Don't know"]
  },
  DC02: {
    id: "DC02",
    section: "Data & Compliance",
    question: "Does your business handle sensitive customer data?",
    type: "single_select",
    options: ["Yes - highly regulated (HIPAA, PCI, etc.)", "Yes - standard PII", "Minimal customer data", "No sensitive data", "Not Sure"]
  },
  DC03: {
    id: "DC03",
    section: "Data & Compliance",
    question: "Are you subject to industry-specific regulations?",
    type: "single_select",
    options: ["Yes - strict compliance requirements", "Yes - moderate requirements", "Minimal regulations", "Unsure"]
  },
  DC04: {
    id: "DC04",
    section: "Data & Compliance",
    question: "Do you have a data backup system in place?",
    type: "single_select",
    options: ["Yes - automated cloud backup", "Yes - manual backups", "Partial backup system", "No backup system"]
  },
  DC05: {
    id: "DC05",
    section: "Data & Compliance",
    question: "Describe any compliance or data security concerns specific to your industry.",
    type: "free_text",
    required: false,
    conditional: {
      showIf: (responses) => {
        return responses.DC02 === "Yes - highly regulated (HIPAA, PCI, etc.)" ||
               responses.DC03 === "Yes - strict compliance requirements";
      }
    }
  },

  // Section 7: Goals & Timeline
  GT01: {
    id: "GT01",
    section: "Goals & Timeline",
    question: "When would you ideally like to start implementing AI tools?",
    type: "single_select",
    options: ["Immediately", "Within 3 months", "Within 6 months", "Within 1 year", "No specific timeline"]
  },
  GT02: {
    id: "GT02",
    section: "Goals & Timeline",
    question: "What level of involvement do you want in the implementation process?",
    type: "single_select",
    options: ["Hands-on (DIY)", "Guided with support", "Fully managed by experts", "Minimal involvement"]
  },
  GT03: {
    id: "GT03",
    section: "Goals & Timeline",
    question: "How would you measure AI implementation success?",
    type: "multi_select",
    options: ["Time saved", "Cost reduction", "Revenue increase", "Customer satisfaction", "Employee productivity", "All of the above"]
  },
  GT04: {
    id: "GT04",
    section: "Goals & Timeline",
    question: "What does successful AI adoption look like for your business in 1 year?",
    type: "free_text"
  },
  GT05: {
    id: "GT05",
    section: "Goals & Timeline",
    question: "Is there anything else about your business situation we should know?",
    type: "free_text",
    required: false
  }
};


// =============================================================================
// SCORING MAPS (Simple object lookups - O(1) performance)
// =============================================================================

const SCORING = {
  // Section 1: Business Profile
  dataVolume: {
    employees: { "1-5": 1, "6-15": 1.5, "16-50": 2, "51-100": 2.5, "100+": 3 },
    years: { "Less than 1 year": 0.5, "1-3 years": 1, "3-5 years": 1.5, "5-10 years": 2, "10+ years": 2.5 }
  },
  teamSize: { "1-5": 2, "6-15": 3, "16-50": 3, "51-100": 2.5, "100+": 2 },
  revenue: {
    "Under $100K": 1, "$100K-$500K": 2, "$500K-$1M": 2.5,
    "$1M-$5M": 3, "$5M+": 3, "Don't know/Prefer not to say": 2
  },

  // Section 2: Technology Infrastructure
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

  // Section 3: Process Maturity
  customerSupport: {
    "Phone only": 1, "Email only": 2, "Phone + Email": 3,
    "Chat widget": 4, "Social media DMs": 3, "Combination of multiple channels": 5
  },

  // Section 4: Budget & Resources
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

  // Section 5: AI Knowledge
  aiFamiliarity: {
    "Never used them": 1, "Experimented briefly": 1.5,
    "Use occasionally": 2.5, "Use regularly": 3.5, "Power user": 4
  },

  // Section 6: Data & Compliance
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

  // Section 7: Goals & Timeline
  timeline: {
    "No specific timeline": 1, "Within 1 year": 1.5,
    "Within 6 months": 2, "Within 3 months": 2.5, "Immediately": 3
  }
};


// =============================================================================
// SCORING FUNCTIONS
// =============================================================================

/**
 * Calculate software stack diversity score based on number of tools used
 */
function scoreSoftwareStack(selectedTools) {
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
function scoreTeamComfort(rating) {
  const r = Number(rating) || 1;
  if (r <= 2) return 1;
  if (r === 3) return 2;
  return 3;
}

/**
 * Calculate AI tools used score based on variety
 */
function scoreAIToolsUsed(selectedTools) {
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
function scoreConcernLevel(selectedConcerns) {
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
function scoreMotivation(rating) {
  const r = Number(rating) || 1;
  if (r <= 2) return 1;
  if (r === 3) return 2;
  if (r === 4) return 3;
  return 4;
}

/**
 * Calculate staff supportiveness score from 1-5 scale
 */
function scoreStaffSupport(rating) {
  const r = Number(rating) || 1;
  if (r <= 2) return 1;
  if (r === 3) return 2;
  if (r === 4) return 2.5;
  return 3;
}

/**
 * Calculate success metrics clarity score
 */
function scoreSuccessMetrics(selectedMetrics) {
  if (!Array.isArray(selectedMetrics)) return 1;
  if (selectedMetrics.includes("All of the above")) return 2.5;
  if (selectedMetrics.length >= 2) return 2;
  if (selectedMetrics.length === 1) return 1.5;
  return 1;
}


// =============================================================================
// DIMENSION CALCULATORS
// =============================================================================

function calculateTechInfrastructure(r) {
  let score = 0;
  score += SCORING.techAdoption[r.TI01] || 2;
  score += SCORING.cloudUsage[r.TI02] || 2;
  score += scoreSoftwareStack(r.TI03);
  score += SCORING.dataStorage[r.TI04] || 2;
  score += scoreTeamComfort(r.TI05);
  return { score, maxPoints: 20 };
}

function calculateProcessMaturity(r) {
  let score = 0;
  score += SCORING.customerSupport[r.PP02] || 3;
  score += Number(r.PP04) || 3;  // Direct 1-5 mapping
  score += Number(r.PP05) || 3;  // Direct 1-5 mapping
  return { score, maxPoints: 15 };
}

function calculateDataReadiness(r) {
  let score = 0;
  // Data quality
  score += SCORING.dataQuality[r.DC01] || 2;
  // Compliance awareness
  score += SCORING.complianceAwareness[r.DC03] || 1.5;
  // Backup maturity
  score += SCORING.backupMaturity[r.DC04] || 1.5;
  // Data volume (from employees + years)
  const empScore = SCORING.dataVolume.employees[r.BP02] || 1.5;
  const yearsScore = SCORING.dataVolume.years[r.BP03] || 1;
  const dataVolumeScore = Math.min((empScore + yearsScore) * (5 / 5.5), 5); // Normalize to max 5
  score += dataVolumeScore;
  return { score, maxPoints: 15 };
}

function calculateBudgetResources(r) {
  let score = 0;
  score += SCORING.monthlyBudget[r.BR01] || 2;
  score += SCORING.itSupport[r.BR02] || 2;
  score += SCORING.implementationApproach[r.BR03] || 2;
  score += SCORING.revenue[r.BP04] || 2;
  return { score, maxPoints: 15 };
}

function calculateAIKnowledge(r) {
  let score = 0;
  score += SCORING.aiFamiliarity[r.AK01] || 2;
  score += scoreAIToolsUsed(r.AK02);
  score += scoreConcernLevel(r.AK04);
  score += scoreMotivation(r.AK05);
  return { score, maxPoints: 15 };
}

function calculateOrgReadiness(r) {
  let score = 0;
  // Team size (bell curve)
  score += SCORING.teamSize[r.BP02] || 2.5;
  // Team software comfort
  score += scoreTeamComfort(r.TI05);
  // Staff supportiveness
  score += scoreStaffSupport(r.AK06);
  // Bonus for implementation experience
  if (["Vendor-provided training", "Hire consultants"].includes(r.BR03)) {
    score += 1;
  }
  return { score: Math.min(score, 10), maxPoints: 10 };
}

function calculateStrategicAlignment(r) {
  let score = 0;
  score += SCORING.timeline[r.GT01] || 1.5;
  score += scoreSuccessMetrics(r.GT03);
  // GT04 (goal clarity) will be scored by AI on server - add placeholder
  score += 2.5; // Middle score placeholder - actual score comes from AI analysis
  return { score, maxPoints: 10 };
}


// =============================================================================
// CROSS-DIMENSIONAL VALIDATION
// =============================================================================

function runValidation(dimensions, r) {
  const flags = [];
  
  // Rule 1: High enthusiasm + Low infrastructure
  if ((Number(r.AK05) >= 4 && r.GT01 === "Immediately") && 
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
  if (["$1,000-$2,500", "$2,500+"].includes(r.BR01) && 
      r.BR02 === "No dedicated IT support") {
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
  if (["Immediately", "Within 3 months"].includes(r.GT01) && 
      dimensions.overall < 35) {
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
  if ((r.DC02 === "Yes - highly regulated (HIPAA, PCI, etc.)" || 
       r.DC03 === "Yes - strict compliance requirements") && 
      Number(r.AK05) >= 4) {
    flags.push({
      flag: "COMPLIANCE_FIRST",
      severity: "CAUTION",
      message: "Regulated industry with strong AI interest. Must prioritize compliance-approved AI solutions.",
      adjustment: {
        addPhase: "Compliance Review",
        phaseDuration: "30-45 days",
        recommendedTools: "Enterprise-grade, SOC2/HIPAA compliant only",
        excludeTools: ["Consumer AI tools", "Free-tier solutions"]
      }
    });
  }
  
  // Rule 6: Large team + Low staff supportiveness
  if (["51-100", "100+"].includes(r.BP02) && Number(r.AK06) <= 2) {
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

function getReadinessLevel(score) {
  if (score >= 81) return { level: "Advanced", badge: "🌟", color: "gold", tier: 5 };
  if (score >= 66) return { level: "Ready", badge: "🟢", color: "green", tier: 4 };
  if (score >= 46) return { level: "Developing", badge: "🟡", color: "yellow", tier: 3 };
  if (score >= 26) return { level: "Early Stage", badge: "🟠", color: "orange", tier: 2 };
  return { level: "Foundation Building", badge: "🔴", color: "red", tier: 1 };
}


// =============================================================================
// MAIN SCORING FUNCTION
// =============================================================================

/**
 * Calculate complete assessment score from user responses
 * @param {Object} responses - User's answers keyed by question ID
 * @returns {Object} Complete scoring results with all data for N8N
 */
function calculateAssessmentScore(responses) {
  // Calculate each dimension
  const dimensions = {
    techInfrastructure: calculateTechInfrastructure(responses),
    processMaturity: calculateProcessMaturity(responses),
    dataReadiness: calculateDataReadiness(responses),
    budgetResources: calculateBudgetResources(responses),
    aiKnowledge: calculateAIKnowledge(responses),
    orgReadiness: calculateOrgReadiness(responses),
    strategicAlignment: calculateStrategicAlignment(responses)
  };
  
  // Define weights
  const weights = {
    techInfrastructure: 0.20,
    processMaturity: 0.15,
    dataReadiness: 0.15,
    budgetResources: 0.15,
    aiKnowledge: 0.15,
    orgReadiness: 0.10,
    strategicAlignment: 0.10
  };
  
  // Calculate normalized scores and weighted total
  let totalScore = 0;
  for (const [key, dim] of Object.entries(dimensions)) {
    dim.normalized = Math.round((dim.score / dim.maxPoints) * 100);
    dim.weight = weights[key];
    dim.weightedContribution = dim.normalized * weights[key];
    totalScore += dim.weightedContribution;
  }
  
  const overallScore = Math.round(totalScore);
  dimensions.overall = overallScore;
  
  // Run cross-dimensional validation
  const validationFlags = runValidation(dimensions, responses);
  
  // Get readiness level
  const readinessLevel = getReadinessLevel(overallScore);
  
  return {
    overallScore,
    readinessLevel,
    dimensions,
    validationFlags
  };
}


// =============================================================================
// N8N PAYLOAD BUILDER
// =============================================================================

/**
 * Build complete payload for N8N webhook
 * Includes all data needed for AI-powered report generation
 * 
 * @param {Object} responses - User's answers
 * @param {Object} leadData - Lead capture form data
 * @param {Object} metadata - Additional metadata (source, timestamp, etc.)
 * @returns {Object} Complete payload ready for N8N
 */
function buildN8NPayload(responses, leadData, metadata = {}) {
  // Calculate scores
  const scoring = calculateAssessmentScore(responses);
  
  // Build questions with responses for AI context
  const questionsWithResponses = Object.entries(responses).map(([questionId, answer]) => {
    const questionDef = QUESTIONS[questionId];
    if (!questionDef) return null;
    
    return {
      id: questionId,
      section: questionDef.section,
      question: questionDef.question,
      questionType: questionDef.type,
      answer: answer,
      // Include options for context if applicable
      ...(questionDef.options && { availableOptions: questionDef.options }),
      ...(questionDef.scale_labels && { scaleLabels: questionDef.scale_labels })
    };
  }).filter(Boolean);
  
  // Identify free-text responses for AI analysis
  const freeTextResponses = questionsWithResponses
    .filter(q => q.questionType === "free_text" && q.answer)
    .map(q => ({
      questionId: q.id,
      question: q.question,
      response: q.answer
    }));
  
  // Build the complete payload
  return {
    // Metadata
    meta: {
      assessmentVersion: "2.0",
      submittedAt: new Date().toISOString(),
      source: metadata.source || "web",
      assessmentType: metadata.assessmentType || "standard",
      userAgent: metadata.userAgent || null,
      sessionId: metadata.sessionId || null,
      completionTimeSeconds: metadata.completionTime || null
    },
    
    // Lead information
    lead: {
      email: leadData.email,
      firstName: leadData.firstName,
      lastName: leadData.lastName || null,
      companyName: leadData.companyName,
      phone: leadData.phone || null,
      consultationRequested: leadData.consultationRequested || false
    },
    
    // Scoring results
    scoring: {
      overallScore: scoring.overallScore,
      readinessLevel: scoring.readinessLevel,
      dimensions: {
        techInfrastructure: {
          score: scoring.dimensions.techInfrastructure.score,
          maxPoints: scoring.dimensions.techInfrastructure.maxPoints,
          normalized: scoring.dimensions.techInfrastructure.normalized,
          weight: "20%"
        },
        processMaturity: {
          score: scoring.dimensions.processMaturity.score,
          maxPoints: scoring.dimensions.processMaturity.maxPoints,
          normalized: scoring.dimensions.processMaturity.normalized,
          weight: "15%"
        },
        dataReadiness: {
          score: scoring.dimensions.dataReadiness.score,
          maxPoints: scoring.dimensions.dataReadiness.maxPoints,
          normalized: scoring.dimensions.dataReadiness.normalized,
          weight: "15%"
        },
        budgetResources: {
          score: scoring.dimensions.budgetResources.score,
          maxPoints: scoring.dimensions.budgetResources.maxPoints,
          normalized: scoring.dimensions.budgetResources.normalized,
          weight: "15%"
        },
        aiKnowledge: {
          score: scoring.dimensions.aiKnowledge.score,
          maxPoints: scoring.dimensions.aiKnowledge.maxPoints,
          normalized: scoring.dimensions.aiKnowledge.normalized,
          weight: "15%"
        },
        orgReadiness: {
          score: scoring.dimensions.orgReadiness.score,
          maxPoints: scoring.dimensions.orgReadiness.maxPoints,
          normalized: scoring.dimensions.orgReadiness.normalized,
          weight: "10%"
        },
        strategicAlignment: {
          score: scoring.dimensions.strategicAlignment.score,
          maxPoints: scoring.dimensions.strategicAlignment.maxPoints,
          normalized: scoring.dimensions.strategicAlignment.normalized,
          weight: "10%"
        }
      },
      validationFlags: scoring.validationFlags
    },
    
    // Business profile summary (for AI prompt context)
    businessProfile: {
      industry: responses.BP01,
      employeeCount: responses.BP02,
      yearsInBusiness: responses.BP03,
      annualRevenue: responses.BP04,
      businessModel: responses.BP05,
      businessGoals: responses.BP06,
      primaryAIGoal: responses.AK03,
      implementationTimeline: responses.GT01,
      involvementPreference: responses.GT02,
      successMetrics: responses.GT03
    },
    
    // Pain points & opportunities (for AI prompt context)
    painPointsAndOpportunities: {
      timeConsumingTasks: responses.PP01,
      biggestChallenge: responses.PP03,
      taskRepetitiveness: responses.PP04,
      manualDataEntryLevel: responses.PP05,
      techChallenges: responses.PP06,
      inefficientWorkflow: responses.PP07,
      techFrustrations: responses.TI06,
      aiConcerns: responses.AK04
    },
    
    // Current state (for AI prompt context)
    currentState: {
      techAdoptionLevel: responses.TI01,
      cloudUsage: responses.TI02,
      softwareStack: responses.TI03,
      dataStorage: responses.TI04,
      teamTechComfort: responses.TI05,
      itSupport: responses.BR02,
      monthlyTechBudget: responses.BR01,
      pastImplementationApproach: responses.BR03,
      aiBudgetPlanning: responses.BR04,
      aiFamiliarity: responses.AK01,
      aiToolsUsed: responses.AK02,
      ownerMotivation: responses.AK05,
      staffReceptiveness: responses.AK06,
      dataQuality: responses.DC01,
      sensitiveData: responses.DC02,
      industryRegulations: responses.DC03,
      backupSystem: responses.DC04,
      complianceConcerns: responses.DC05
    },
    
    // Goals (for AI prompt context)
    goals: {
      timeline: responses.GT01,
      involvementLevel: responses.GT02,
      successMetrics: responses.GT03,
      oneYearVision: responses.GT04,
      additionalContext: responses.GT05
    },
    
    // Free-text responses (for AI analysis)
    freeTextForAIAnalysis: freeTextResponses,
    
    // Complete Q&A (full reference)
    completeQuestionsAndAnswers: questionsWithResponses,
    
    // Raw responses (for data storage)
    rawResponses: responses
  };
}


// =============================================================================
// EXPORTS
// =============================================================================

// For ES Modules
export {
  QUESTIONS,
  SCORING,
  calculateAssessmentScore,
  buildN8NPayload,
  getReadinessLevel
};

// For CommonJS (Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    QUESTIONS,
    SCORING,
    calculateAssessmentScore,
    buildN8NPayload,
    getReadinessLevel
  };
}


// =============================================================================
// USAGE EXAMPLE
// =============================================================================

/*
// Example usage in your frontend:

import { calculateAssessmentScore, buildN8NPayload } from './scoring-engine.js';

// When user completes assessment:
const userResponses = {
  BP01: "Professional Services",
  BP02: "6-15",
  BP03: "3-5 years",
  BP04: "$500K-$1M",
  BP05: "We provide marketing consulting services to mid-sized businesses...",
  BP06: "Expand client base by 30%, launch new service line, hire 3 staff...",
  TI01: "Moderate (some cloud tools)",
  TI02: "Yes - somewhat",
  TI03: ["CRM", "Accounting Software", "Project Management"],
  TI04: "CRM system",
  TI05: 4,
  TI06: "Our CRM doesn't integrate well with our email marketing tool...",
  PP01: ["Customer inquiries", "Report generation", "Email management"],
  PP02: "Phone + Email",
  PP03: "Time management",
  PP04: 4,
  PP05: 3,
  PP06: "Automating client reporting, streamlining onboarding, better lead tracking...",
  PP07: "Every month we manually compile reports from 3 different systems...",
  BR01: "$500-$1,000",
  BR02: "Tech-savvy employee handles it",
  BR03: "Vendor-provided training",
  BR04: "Yes, we've allocated $10K for AI tools next year",
  AK01: "Use occasionally",
  AK02: ["ChatGPT/Claude", "AI writing assistants"],
  AK03: "Save time",
  AK04: ["Complexity", "Reliability"],
  AK05: 4,
  AK06: 3,
  DC01: "Somewhat organized",
  DC02: "Yes - standard PII",
  DC03: "Minimal regulations",
  DC04: "Yes - automated cloud backup",
  DC05: null,
  GT01: "Within 3 months",
  GT02: "Guided with support",
  GT03: ["Time saved", "Employee productivity"],
  GT04: "We want AI handling 50% of our client reporting and all initial email responses...",
  GT05: "We're a small team but growing fast and need to scale efficiently..."
};

const leadData = {
  email: "sarah@example.com",
  firstName: "Sarah",
  companyName: "Growth Marketing Co",
  phone: "555-123-4567",
  consultationRequested: true
};

const metadata = {
  source: "website",
  assessmentType: "standard",
  completionTime: 847, // seconds
  sessionId: "sess_abc123"
};

// Calculate score (instant - can show to user immediately)
const scoreResults = calculateAssessmentScore(userResponses);
console.log(`Your score: ${scoreResults.overallScore}/100 (${scoreResults.readinessLevel.level})`);

// Build full payload for N8N
const payload = buildN8NPayload(userResponses, leadData, metadata);

// Send to N8N webhook
fetch('https://your-n8n-instance.com/webhook/ai-assessment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});
*/
