import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  details: string[];
}

export interface Statistic {
  value: string;
  label: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface QuizOption {
  label: string;
  points: number;
}

export interface QuizQuestion {
  id: number;
  section: string;
  question: string;
  options?: QuizOption[];
  isQualitative?: boolean;
}

export interface QuizResult {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
  action: string;
}

export interface UseCaseCategory {
  id: string;
  title: string;
  sectors: string[];
  implementations: string[];
  icon: React.ReactNode;
}

export interface LeadInfo {
  name: string;
  email: string;
  businessName: string;
  role: string;
  isDecisionMaker: string;
}