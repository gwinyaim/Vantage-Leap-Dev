
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ArrowUpRight, Mail, MapPin, Phone, RefreshCw, Bot, Sparkles, Send, ChevronRight, ChevronDown, CheckCircle2, ShieldCheck, PlayCircle, ArrowLeft, Cpu, Database, Settings } from 'lucide-react';
import { NAV_ITEMS, HERO_SLIDES, SERVICES, APPROACH_PHASES, IMPLEMENTATION_PHASES, TRAINING_PHASES, USE_CASES, WHY_US_VALUES, BARRIERS, TESTIMONIALS, QUIZ_QUESTIONS, QUIZ_RESULTS } from './constants';
import { LeadInfo } from './types';

// Shared style constants
const SECTION_WRAPPER = "py-20 px-4 bg-white border-b border-pa-black/10";
const CARD_STYLE = "bg-stone-50 border-2 border-pa-black rounded-xl shadow-[12px_12px_0px_0px_#1a1a1a] overflow-hidden";
const CARD_PADDING = "p-8 md:p-12";
const BTN_PRIMARY = "inline-flex items-center justify-center gap-2 bg-pa-black text-white px-8 py-4 rounded-lg font-display font-bold uppercase tracking-wider hover:bg-pa-peach hover:text-pa-black border-2 border-transparent hover:border-pa-black transition-colors";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-pa-black bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <span className="font-display font-bold text-2xl tracking-tighter uppercase border-2 border-pa-black p-1 bg-pa-black text-white shadow-[4px_4px_0px_0px_#1a1a1a]">
              Vantage Leap
            </span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-display font-medium text-pa-black hover:underline decoration-2 underline-offset-4 text-sm uppercase tracking-wide"
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className="bg-pa-peach text-pa-black px-6 py-2 font-mono font-bold text-sm border-2 border-pa-black rounded-md shadow-[4px_4px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1a1a1a] transition-all">
              Schedule a Call
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-pa-black p-2 border-2 border-pa-black rounded bg-white shadow-[4px_4px_0px_0px_#1a1a1a]">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t-2 border-pa-black bg-white absolute w-full shadow-[0px_4px_0px_0px_#1a1a1a]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-4 font-display font-bold text-xl border-b border-pa-black last:border-0 hover:bg-pa-peach transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
             <a
                href="#contact"
                className="block mx-3 my-2 px-3 py-4 font-mono font-bold text-xl bg-pa-peach text-pa-black border-2 border-pa-black rounded-md shadow-[4px_4px_0px_0px_#1a1a1a] text-center"
                onClick={() => setIsOpen(false)}
              >
                Schedule a Call
              </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-white">
      <div className="max-w-7xl mx-auto">
        <div className={CARD_STYLE}>
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            {/* Text Content */}
            <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-pa-black bg-white relative">
               
               <div className="mt-4 animate-fade-in">
                  <div className="flex justify-between items-start mb-8">
                     <div className="inline-block bg-pa-sage border-2 border-pa-black px-8 py-3 font-mono text-3xl font-bold shadow-[4px_4px_0px_0px_#1a1a1a]">
                        AI Adoption Partner
                     </div>
                     <div className="font-mono font-bold text-2xl border-2 border-pa-black px-3 py-1 bg-stone-100 shadow-[2px_2px_0px_0px_#1a1a1a]">
                        0{currentSlide + 1} / 0{HERO_SLIDES.length}
                     </div>
                  </div>
                  
                  <h1 className="font-display font-bold text-3xl md:text-4xl leading-[0.9] text-pa-black mb-8">
                    {HERO_SLIDES[currentSlide].headline}
                  </h1>
                  <p className="font-sans text-lg md:text-xl text-pa-black max-w-lg mb-10 leading-relaxed font-medium" style={{ fontSize: '16px' }}>
                    {HERO_SLIDES[currentSlide].subheadline.split(/(\[.*?\])/g).map((part, idx) =>
                      part.match(/\[.*?\]/) ? (
                        <span key={idx} className="font-bold italic">{part}</span>
                      ) : (
                        <span key={idx}>{part}</span>
                      )
                    )}
                  </p>
                  <a href={HERO_SLIDES[currentSlide].ctaLink || "#contact"} className={BTN_PRIMARY}>
                    {HERO_SLIDES[currentSlide].cta} <ArrowRight size={20} />
                  </a>

                  {/* Navigation Arrows */}
                  <div className="flex gap-4 mt-12">
                     <button 
                       onClick={prevSlide}
                       className="p-3 border-2 border-pa-black hover:bg-pa-black hover:text-white transition-colors rounded-lg shadow-[4px_4px_0px_0px_#1a1a1a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1a1a1a]"
                       aria-label="Previous Slide"
                     >
                        <ArrowLeft size={24} />
                     </button>
                     <button 
                       onClick={nextSlide}
                       className="p-3 border-2 border-pa-black hover:bg-pa-black hover:text-white transition-colors rounded-lg shadow-[4px_4px_0px_0px_#1a1a1a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1a1a1a]"
                       aria-label="Next Slide"
                     >
                        <ArrowRight size={24} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Image Content */}
            <div className="lg:col-span-5 relative bg-pa-black overflow-hidden group">
               <img 
                 key={currentSlide}
                 src={HERO_SLIDES[currentSlide].image}
                 alt="Architectural Abstract" 
                 className="object-cover w-full h-full opacity-70 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 animate-fade-in"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-pa-black via-transparent to-transparent opacity-80"></div>
               <div className="absolute bottom-0 left-0 p-8 w-full border-t-2 border-pa-black/20 backdrop-blur-sm bg-pa-black/30">
                 <div className="flex justify-between items-end text-white">
                    <div>
                      <div className="text-3xl font-display font-bold">ROI</div>
                      <div className="text-xs opacity-70 font-mono">FOCUSED</div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-display font-bold">100%</div>
                      <div className="text-xs opacity-70 font-mono">STRATEGY DRIVEN</div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple input sanitization to prevent XSS
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 1000); // Limit length
};

// Simple email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const GeminiDemo = () => {
  const [step, setStep] = useState<'form' | 'chat'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [error, setError] = useState('');

  const RATE_LIMIT_MS = 3000; // 3 seconds between requests

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);

    if (!sanitizedName || sanitizedName.length < 2) {
      setError('Please enter a valid name');
      return;
    }

    if (!isValidEmail(sanitizedEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setName(sanitizedName);
    setEmail(sanitizedEmail);
    setStep('chat');
  };

  const handleAsk = async () => {
    const sanitizedPrompt = sanitizeInput(prompt);
    if (!sanitizedPrompt) return;

    // Rate limiting
    const now = Date.now();
    if (now - lastRequestTime < RATE_LIMIT_MS) {
      setError('Please wait a moment before sending another message');
      return;
    }

    setLastRequestTime(now);
    setLoading(true);
    setError('');
    setPrompt('');

    // Add user message to chat
    const userMessage: ChatMessage = { role: 'user', content: sanitizedPrompt };
    setMessages(prev => [...prev, userMessage]);

    const webhookUrl = process.env.N8N_CHAT_WEBHOOK;

    try {
        let aiResponse = '';

        // Check if n8n webhook is configured
        if (!webhookUrl || webhookUrl === 'undefined' || webhookUrl === '') {
            // Demo mode - simulate AI response
            await new Promise(resolve => setTimeout(resolve, 1500));
            aiResponse = "I'm currently in demo mode. To enable live AI responses, please configure the N8N_CHAT_WEBHOOK in your environment. Based on your question, I'd recommend scheduling a discovery call to discuss how AI can transform your business operations.";
        } else {
            // Send to n8n webhook and get AI response
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: sanitizeInput(name),
                    email: sanitizeInput(email),
                    question: sanitizedPrompt,
                    conversationHistory: messages,
                    timestamp: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();

            // n8n should return { response: "AI response text" }
            aiResponse = data.response || data.message || data.text || 'I apologize, but I encountered an issue processing your request. Please try again.';
        }

        // Add assistant message to chat
        const assistantMessage: ChatMessage = { role: 'assistant', content: aiResponse };
        setMessages(prev => [...prev, assistantMessage]);

    } catch {
        setError('Unable to connect to our AI advisor. Please try again later.');
        // Remove the user message if we failed to get a response
        setMessages(prev => prev.slice(0, -1));
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-lg border-2 border-pa-black relative overflow-hidden shadow-[8px_8px_0px_0px_#1a1a1a]">
        <div className="flex items-center gap-2 mb-4">
            <div className="bg-pa-sage p-2 rounded-full border border-pa-black">
                <Bot size={24} className="text-pa-black" />
            </div>
            <h3 className="font-display text-xl font-bold">Virtual Advisor</h3>
        </div>

        <p className="font-sans text-sm text-pa-black font-medium mb-6">
            Ask our virtual consultant about how AI can transform your specific industry.
        </p>

        {step === 'form' ? (
            <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                {error && (
                    <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm font-medium">
                        {error}
                    </div>
                )}
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                        maxLength={100}
                        className="w-full bg-stone-50 border-2 border-pa-black rounded-lg px-4 py-3 text-pa-black focus:outline-none focus:bg-white transition-colors placeholder:text-gray-500"
                    />
                </div>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                        required
                        maxLength={254}
                        className="w-full bg-stone-50 border-2 border-pa-black rounded-lg px-4 py-3 text-pa-black focus:outline-none focus:bg-white transition-colors placeholder:text-gray-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-pa-black text-white px-6 py-3 rounded-lg hover:bg-pa-peach hover:text-pa-black border-2 border-transparent hover:border-pa-black transition-all font-display font-bold"
                >
                    Start Chat
                </button>
            </form>
        ) : (
            <div className="flex flex-col gap-4">
                {error && (
                    <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm font-medium">
                        {error}
                    </div>
                )}

                {/* Chat Messages */}
                {messages.length > 0 && (
                    <div className="max-h-64 overflow-y-auto space-y-3 p-2 bg-stone-50 rounded-lg border border-pa-black/20">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`p-3 rounded-lg ${
                                    msg.role === 'user'
                                        ? 'bg-pa-blue/30 ml-8 border-l-4 border-pa-blue'
                                        : 'bg-pa-paper mr-8 border-l-4 border-pa-peach'
                                }`}
                            >
                                <div className="flex gap-2 items-start">
                                    {msg.role === 'assistant' && (
                                        <Sparkles size={14} className="mt-1 text-pa-black flex-shrink-0" />
                                    )}
                                    <p className="font-mono text-sm leading-relaxed text-pa-black font-medium">
                                        {msg.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="bg-pa-paper mr-8 p-3 rounded-lg border-l-4 border-pa-peach">
                                <div className="flex gap-2 items-center">
                                    <RefreshCw size={14} className="animate-spin text-pa-black" />
                                    <p className="font-mono text-sm text-pa-black/60 italic">Thinking...</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Input Area */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={messages.length === 0 ? "e.g., How can AI help a law firm?" : "Ask a follow-up question..."}
                        maxLength={500}
                        className="flex-1 bg-stone-50 border-2 border-pa-black rounded-lg px-4 py-3 text-pa-black focus:outline-none focus:bg-white transition-colors placeholder:text-gray-500"
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && !loading && handleAsk()}
                        disabled={loading}
                    />
                    <button
                        onClick={handleAsk}
                        disabled={loading || !prompt.trim()}
                        className="bg-pa-black text-white px-4 py-3 rounded-lg hover:bg-pa-peach hover:text-pa-black border-2 border-transparent hover:border-pa-black transition-all disabled:opacity-50"
                    >
                       {loading ? <RefreshCw className="animate-spin" /> : <Send size={20} />}
                    </button>
                </div>

                {/* Prompt suggestions for new chats */}
                {messages.length === 0 && !loading && (
                    <div className="flex flex-wrap gap-2">
                        {['How can AI help my business?', 'What are quick wins for AI adoption?', 'How do I get started?'].map((suggestion) => (
                            <button
                                key={suggestion}
                                onClick={() => setPrompt(suggestion)}
                                className="text-xs bg-stone-100 hover:bg-pa-sage/50 border border-pa-black/20 px-3 py-1.5 rounded-full font-mono text-pa-black transition-colors"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        )}
    </div>
  );
};

const WhoWeAre = () => {
    return (
        <section id="who-we-are" className={SECTION_WRAPPER}>
            <div className="max-w-7xl mx-auto">
                <div className={CARD_STYLE}>
                    <div className={CARD_PADDING}>
                        <div className="flex flex-col md:flex-row gap-16">
                            <div className="md:w-1/2">
                                <div className="inline-block bg-pa-sage border-2 border-pa-black px-8 py-3 font-mono text-3xl font-bold mb-6 shadow-[4px_4px_0px_0px_#1a1a1a]">
                                    What We Do
                                </div>
                                <h2 className="font-display font-bold text-4xl mb-6 leading-tight">
                                    We Uncover the Value You're Leaving on the Table.
                                </h2>
                                <p className="text-sm text-pa-black font-medium font-sans mb-6" style={{ lineHeight: '20px', fontSize: '14px', fontWeight: 500, color: 'rgb(26, 26, 26)' }}>
                                    Every business has hidden and costly inefficiencies - manual processes that drain time, disconnected systems that create errors, and repetitive tasks that burn out your best people. We identify those inefficiencies and turn them into revenue optimization opportunities.
                                </p>
                                <p className="text-sm text-pa-black font-medium font-sans mb-8" style={{ lineHeight: '20px', fontSize: '14px', fontWeight: 500, color: 'rgb(26, 26, 26)' }}>
                                    Ask our virtual advisor about how adopting AI into your business can potentially help you optimize and grow.
                                </p>
                            </div>
                            <div className="md:w-1/2 flex flex-col justify-center">
                                <GeminiDemo />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const WhatWeDo = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (serviceId: string) => {
    setExpandedService(prev => prev === serviceId ? null : serviceId);
  };

  const getApproachPhases = (serviceId: string) => {
    if (serviceId === 'consulting') return APPROACH_PHASES;
    if (serviceId === 'implementation') return IMPLEMENTATION_PHASES;
    if (serviceId === 'training') return TRAINING_PHASES;
    return [];
  };

  return (
    <section id="what-we-do" className={SECTION_WRAPPER}>
      <div className="max-w-7xl mx-auto">
        <div className={`${CARD_STYLE} ${CARD_PADDING} bg-stone-50`}>
            <div className="mb-12 text-center">
                <div className="inline-block bg-pa-sage border-2 border-pa-black px-8 py-3 font-mono text-3xl font-bold mb-4 shadow-[4px_4px_0px_0px_#1a1a1a]">
                    Our Services
                </div>
            </div>

            {/* Services Grid - stays intact, cards remain in row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
                <div
                    key={service.id}
                    className={`${expandedService === service.id ? 'bg-pa-sage' : 'bg-white'} p-6 md:p-8 border-2 border-pa-black rounded-xl flex flex-col shadow-[12px_12px_0px_0px_#1a1a1a] transition-colors`}
                >
                    <h3 className="font-display text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="font-serif italic text-pa-black mb-4 font-medium">
                        {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                        {service.details.map((detail, idx) => (
                            <li key={idx} className="text-sm font-sans border-l-2 border-pa-black pl-3 py-1 text-pa-black font-medium">
                                {detail}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => toggleService(service.id)}
                        aria-expanded={expandedService === service.id}
                        className="mt-auto flex items-center justify-center gap-2 bg-pa-black text-white px-6 py-3 rounded-lg font-display font-bold text-sm border-2 border-pa-black hover:bg-pa-peach hover:text-pa-black transition-all"
                    >
                        {expandedService === service.id ? (
                            <>
                                Close <ChevronDown size={16} className="rotate-180 transition-transform" />
                            </>
                        ) : (
                            <>
                                How We Work <ChevronDown size={16} className="transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            ))}
            </div>

            {/* Approach Section - appears OUTSIDE grid, below all service cards */}
            {expandedService && (
                <div className="mt-8 animate-fade-in">
                    <div className="bg-white p-6 md:p-8 border-2 border-pa-black rounded-xl shadow-[8px_8px_0px_0px_#1a1a1a]">
                        <div className="mb-6">
                            <h4 className="font-display font-bold text-2xl mb-2">
                                Our Approach: {SERVICES.find(s => s.id === expandedService)?.title}
                            </h4>
                            <p className="font-sans text-sm text-pa-black/70 font-medium">
                                Our proven 3-phase methodology for delivering results
                            </p>
                        </div>

                        {/* Phase cards with green background - supports multiple rows automatically */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {getApproachPhases(expandedService).map((phase) => (
                                <div key={phase.id} className="bg-pa-sage p-6 border-2 border-pa-black rounded-lg">
                                    <div className="font-mono text-xs text-pa-black font-bold mb-2 uppercase tracking-widest">
                                        Phase {phase.id}
                                    </div>
                                    <h5 className="font-display font-bold text-lg mb-2">{phase.title}</h5>
                                    <p className="font-serif italic text-pa-black mb-4 text-sm font-medium">
                                        {phase.subtitle}
                                    </p>
                                    <ul className="space-y-2">
                                        {phase.steps.map((step, idx) => (
                                            <li key={idx} className="text-xs font-sans border-l-2 border-pa-black pl-3 py-1 text-pa-black font-medium">
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

const UseCases = () => {
    const [activeTab, setActiveTab] = useState(USE_CASES[0].id);
    const activeData = USE_CASES.find(uc => uc.id === activeTab) || USE_CASES[0];

    return (
        <section id="use-cases" className={SECTION_WRAPPER}>
            <div className="max-w-7xl mx-auto">
                <div className={`${CARD_STYLE} ${CARD_PADDING} bg-stone-50`}>
                    <div className="mb-12">
                        <div className="inline-block bg-pa-sage border-2 border-pa-black px-8 py-3 font-mono text-3xl font-bold mb-4 shadow-[4px_4px_0px_0px_#1a1a1a]">
                            Use Cases
                        </div>
                        <p className="font-sans text-pa-black font-medium text-lg max-w-2xl">
                            Many small businesses are already transforming themselves into AI-first powerhouses. Here's a snapshot of what's possible across different industries and verticals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Navigation Tabs */}
                    <div className="lg:col-span-4 flex flex-col gap-2">
                        {USE_CASES.map((uc) => (
                            <button
                                key={uc.id}
                                onClick={() => {
                                    setActiveTab(uc.id);
                                    // Scroll to show the industries section on mobile
                                    if (window.innerWidth < 1024) {
                                        setTimeout(() => {
                                            const rightColumn = document.querySelector('[data-use-cases-right]');
                                            if (rightColumn) {
                                                rightColumn.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }
                                        }, 50);
                                    }
                                }}
                                className={`text-left p-4 rounded-lg font-display font-bold text-lg border-2 transition-all flex items-center justify-between group ${
                                    activeTab === uc.id
                                    ? 'bg-pa-sage text-pa-black border-pa-black shadow-[4px_4px_0px_0px_#1a1a1a]'
                                    : 'bg-white text-pa-black border-pa-black shadow-[4px_4px_0px_0px_#1a1a1a] hover:bg-stone-50'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    {React.cloneElement(uc.icon as React.ReactElement<any>, {
                                        size: 20,
                                        className: "text-pa-black"
                                    })}
                                    <span>{uc.title}</span>
                                </div>
                                {activeTab === uc.id && <ArrowRight size={16} />}
                            </button>
                        ))}
                    </div>

                    {/* Right Column: Blueprint Card */}
                    <div className="lg:col-span-8" data-use-cases-right>
                        <div className="bg-white border-2 border-pa-black rounded-xl shadow-[8px_8px_0px_0px_#1a1a1a] min-h-[600px] flex flex-col relative overflow-hidden animate-fade-in">
                            
                            {/* Card Body */}
                            <div className="p-6 md:p-8 flex-1">
                                
                                {/* Sectors Section */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Database size={18} className="text-pa-black" />
                                        <h4 className="font-bold text-sm uppercase tracking-wider text-pa-black">Industries</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {activeData.sectors.map((sector, idx) => (
                                            <span key={idx} className="inline-block bg-pa-blue/20 border border-pa-black px-3 py-1 rounded text-xs font-bold text-pa-black">
                                                {sector}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <hr className="border-pa-black/10 my-6 border-dashed" />

                                {/* Implementations Section */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Settings size={18} className="text-pa-black" />
                                        <h4 className="font-bold text-sm uppercase tracking-wider text-pa-black">Potential Revenue Growth & Efficiency Opportunities</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {activeData.implementations.map((impl, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3 bg-stone-50 border border-pa-black/20 rounded hover:border-pa-black transition-colors">
                                                <div className="mt-1 w-2 h-2 rounded-full bg-pa-black flex-shrink-0" />
                                                <span className="text-sm font-medium text-pa-black leading-tight">{impl}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Card Footer */}
                            <div className="bg-pa-paper p-4 border-t-2 border-pa-black text-center text-xs font-mono text-pa-black">
                                // NOTE: Strategies are tailored to your specific business goals & objectives.
                            </div>

                        </div>
                    </div>
                    </div>

                    <div className="mt-8 text-center font-mono text-sm bg-pa-black text-white p-4 rounded border-2 border-pa-black lg:hidden">
                        Scroll up to select different industries
                    </div>
                </div>
            </div>
        </section>
    );
};

const WhyUs = () => {
    return (
        <section id="why-us" className={SECTION_WRAPPER}>
            <div className="max-w-7xl mx-auto">
                <div className={`${CARD_STYLE} bg-white`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        
                        {/* Values Column */}
                        <div className="p-8 md:p-12 border-b-2 lg:border-b-0 lg:border-r-2 border-pa-black bg-stone-50">
                            <div className="inline-block bg-pa-sage border-2 border-pa-black px-8 py-3 font-mono text-3xl font-bold mb-8 shadow-[4px_4px_0px_0px_#1a1a1a]">
                                Why Work With Us?
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                {WHY_US_VALUES.map((val, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="font-mono font-bold text-pa-black text-xl">0{idx + 1}</div>
                                        <div>
                                            <h4 className="font-display font-bold text-lg mb-1">{val.title}</h4>
                                            <p className="font-sans text-sm text-pa-black font-medium">{val.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Barriers Column (Accordion) */}
                        <div className="p-8 md:p-12">
                            <h3 className="font-display font-bold text-2xl mb-8 flex items-center gap-2">
                                <ShieldCheck className="text-pa-black"/> Barriers We've Overcome
                            </h3>
                            <div className="space-y-4">
                                {BARRIERS.map((barrier, idx) => (
                                    <div key={idx} className="border-2 border-pa-black rounded-lg overflow-hidden bg-white">
                                        <details className="group">
                                            <summary className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-stone-100 font-bold font-sans text-sm text-pa-black">
                                                "{barrier.question}"
                                                <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                                            </summary>
                                            <div className="px-4 py-4 border-t-2 border-pa-black bg-pa-sage/20 text-sm leading-relaxed text-pa-black font-medium">
                                                {barrier.answer}
                                            </div>
                                        </details>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

const ClientSoundboard = () => {
    return (
        <section className={SECTION_WRAPPER}>
             <div className="max-w-7xl mx-auto">
                <div className={`${CARD_STYLE} ${CARD_PADDING} bg-pa-blue/20`}>
                    <div className="text-center mb-12">
                        <div className="inline-block bg-pa-sage border-2 border-pa-black px-8 py-3 font-mono text-3xl font-bold mb-4 shadow-[4px_4px_0px_0px_#1a1a1a] text-pa-black">
                            What Our Clients Say
                        </div>
                        <p className="font-sans text-pa-black font-medium">Results from businesses like yours.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((t) => (
                            <div key={t.id} className="bg-white p-8 border-2 border-pa-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between hover:-translate-y-1 transition-transform">
                                <div>
                                    <div className="mb-4 text-pa-peach flex space-x-1">
                                        {[1,2,3,4,5].map(i => <span key={i} className="text-pa-black">★</span>)}
                                    </div>
                                    <p className="font-serif italic text-lg mb-6 text-pa-black font-medium">"{t.quote}"</p>
                                </div>
                                <div className="border-t-2 border-gray-100 pt-4">
                                    <div className="font-display font-bold text-sm uppercase text-pa-black">
                                        {t.author}
                                    </div>
                                    <div className="font-mono text-xs text-pa-black font-bold opacity-80">{t.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
        </section>
    )
}

const AIReadinessAssessment = () => {
  const [step, setStep] = useState<'quiz' | 'result'>('quiz');
  const [hasStarted, setHasStarted] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{questionId: number, points: number, text?: string}[]>([]);
  const [qualitativeAnswers, setQualitativeAnswers] = useState<{[key: number]: string}>({});

  const handleOptionSelect = (points: number) => {
    const newAnswers = [...answers, { questionId: QUIZ_QUESTIONS[currentQuestion].id, points }];
    setAnswers(newAnswers);
    moveToNext();
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For qualitative questions, points are 0 or handled differently, here just stored
    const text = qualitativeAnswers[QUIZ_QUESTIONS[currentQuestion].id];
    const newAnswers = [...answers, { questionId: QUIZ_QUESTIONS[currentQuestion].id, points: 0, text }];
    setAnswers(newAnswers);
    moveToNext();
  };

  const moveToNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('result');
    }
  };

  const calculateTotalScore = () => {
    return answers.reduce((acc, curr) => acc + curr.points, 0);
  };

  const getResult = () => {
    const totalScore = calculateTotalScore();
    return QUIZ_RESULTS.find(r => totalScore >= r.minScore && totalScore <= r.maxScore) || QUIZ_RESULTS[0];
  };

  const resetQuiz = () => {
    setStep('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
    setQualitativeAnswers({});
  };

  const result = step === 'result' ? getResult() : null;
  const currentQ = QUIZ_QUESTIONS[currentQuestion];

  return (
    <section id="assessment" className={SECTION_WRAPPER}>
      <div className="max-w-7xl mx-auto">
        <div className={`${CARD_STYLE} bg-white`}>
            
            {/* Header */}
            <div className="p-8 md:p-12 bg-stone-50 border-b-2 border-pa-black">
                <div className="inline-block bg-pa-sage border-2 border-pa-black px-8 py-3 font-mono text-3xl font-bold mb-6 shadow-[4px_4px_0px_0px_#1a1a1a] text-pa-black">
                    Complimentary AI Readiness Check
                </div>
                <p className="text-pa-black text-lg max-w-2xl leading-relaxed mb-6 font-medium">
                    Curious if your business is ready to adopt AI? Complete this assessment for an in depth analysis and actionable recommendations delivered to your email. <span className="italic">*Please note*</span> that this will require a time commitment of approximately 15-20 minutes to complete.
                </p>
                <button onClick={() => setHasStarted(true)} className="bg-pa-sage text-pa-black px-6 py-2 font-mono font-bold text-sm border-2 border-pa-black rounded-md shadow-[4px_4px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1a1a1a] transition-all">
                    Start Assessment
                </button>
            </div>
            
            <div className="p-8 md:p-12">
                
                {/* Step 2: Quiz */}
                {step === 'quiz' && hasStarted && (
                    <div className="animate-fade-in max-w-3xl mx-auto">
                        <div className="mb-6">
                            <div className="flex justify-between font-mono mb-2 font-bold uppercase text-pa-black">
                                <span className="text-lg">{currentQ.section}</span>
                                <div className="flex gap-4">
                                    <span className="text-gray-500">Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</span>
                                    <span>{Math.round(((currentQuestion) / QUIZ_QUESTIONS.length) * 100)}%</span>
                                </div>
                            </div>
                            <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden border-2 border-pa-black">
                                <div 
                                    className="bg-pa-peach h-full transition-all duration-500 ease-out border-r-2 border-pa-black"
                                    style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <h3 className="font-display font-bold text-2xl mb-8 leading-snug text-pa-black min-h-[64px]">
                            {currentQ.question}
                        </h3>

                        {currentQ.isQualitative ? (
                            <form onSubmit={handleTextSubmit}>
                                <textarea 
                                    required
                                    className="w-full h-32 bg-stone-50 border-2 border-pa-black p-4 rounded-lg mb-4 focus:outline-none focus:bg-white"
                                    placeholder="Type your answer here..."
                                    value={qualitativeAnswers[currentQ.id] || ''}
                                    onChange={(e) => setQualitativeAnswers({...qualitativeAnswers, [currentQ.id]: e.target.value})}
                                ></textarea>
                                <button type="submit" className={BTN_PRIMARY}>
                                    Next Question
                                </button>
                            </form>
                        ) : (
                            <div className="grid gap-4">
                                {currentQ.options?.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(option.points)}
                                        className="w-full text-left p-5 border-2 border-pa-black rounded-lg hover:bg-pa-blue hover:shadow-[4px_4px_0px_0px_#1a1a1a] transition-all font-sans font-medium flex justify-between items-center group text-pa-black"
                                    >
                                        {option.label}
                                        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Step 3: Confirmation */}
                {step === 'result' && (
                    <div className="text-center animate-fade-in max-w-4xl mx-auto">
                        <div className="flex justify-center mb-6">
                            <div className="w-32 h-32 rounded-full border-4 border-pa-black flex items-center justify-center bg-pa-sage shadow-[4px_4px_0px_0px_#1a1a1a]">
                                <CheckCircle2 className="w-16 h-16 text-pa-black" />
                            </div>
                        </div>

                        <h3 className="font-display font-bold text-4xl mb-4 text-pa-black">Thank You!</h3>
                        <p className="text-xl text-pa-black font-medium mb-4">Your assessment has been received.</p>

                        <div className="bg-stone-100 p-6 rounded-lg border-2 border-pa-black mb-8 inline-block text-left shadow-[6px_6px_0px_0px_#1a1a1a] max-w-xl w-full">
                            <p className="font-bold text-xs uppercase mb-2 text-gray-500 tracking-wider">What Happens Next</p>
                            <div className="flex items-start gap-3">
                                <Mail className="text-pa-black mt-1 flex-shrink-0" />
                                <span className="font-medium text-lg text-pa-black leading-tight">
                                    We're putting together your personalized AI Readiness Assessment. Please check your email for your detailed results and recommendations.
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <a href="#contact" className="bg-pa-peach text-pa-black px-8 py-3 rounded-lg font-mono font-bold border-2 border-pa-black shadow-[4px_4px_0px_0px_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1a1a1a] transition-all">
                                Schedule Discovery Call
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        businessName: '',
        industry: '',
        websiteUrl: '',
        service: 'AI Consulting & Advisory Services',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formError, setFormError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = (): boolean => {
        // Validate required fields
        if (!formData.firstName.trim() || formData.firstName.length < 2) {
            setFormError('Please enter a valid first name');
            return false;
        }
        if (!formData.lastName.trim() || formData.lastName.length < 2) {
            setFormError('Please enter a valid last name');
            return false;
        }
        if (!isValidEmail(formData.email)) {
            setFormError('Please enter a valid email address');
            return false;
        }
        if (!formData.phoneNumber.trim()) {
            setFormError('Please enter a phone number');
            return false;
        }
        if (!formData.businessName.trim()) {
            setFormError('Please enter your business name');
            return false;
        }
        if (!formData.industry.trim()) {
            setFormError('Please enter your industry');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        // Sanitize all form data before sending
        const sanitizedData = {
            firstName: sanitizeInput(formData.firstName),
            lastName: sanitizeInput(formData.lastName),
            email: sanitizeInput(formData.email),
            phoneNumber: sanitizeInput(formData.phoneNumber),
            businessName: sanitizeInput(formData.businessName),
            industry: sanitizeInput(formData.industry),
            websiteUrl: sanitizeInput(formData.websiteUrl),
            service: formData.service, // Select field - already constrained
            message: sanitizeInput(formData.message),
            timestamp: new Date().toISOString()
        };

        const webhookUrl = process.env.N8N_FORM_WEBHOOK;

        // Check if webhook is configured
        if (!webhookUrl || webhookUrl === 'undefined') {
            // For development/demo: simulate success
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitted(true);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                businessName: '',
                industry: '',
                websiteUrl: '',
                service: 'AI Consulting & Advisory Services',
                message: ''
            });
            setSubmitting(false);
            return;
        }

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sanitizedData)
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    businessName: '',
                    industry: '',
                    websiteUrl: '',
                    service: 'AI Consulting & Advisory Services',
                    message: ''
                });
            } else {
                setFormError('There was an error submitting the form. Please try again.');
            }
        } catch {
            setFormError('There was an error submitting the form. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className={`${SECTION_WRAPPER} bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]`}>
            <div className="max-w-7xl mx-auto">
                 <div className={`${CARD_STYLE} bg-white`}>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Info Side */}
                        <div className="p-8 md:p-16 bg-pa-black text-white flex flex-col justify-center">
                            <div>
                                <h2 className="font-display font-bold text-5xl mb-6 text-pa-sage">SCHEDULE YOUR<br/>DISCOVERY CALL</h2>
                                <p className="font-sans text-white text-lg leading-relaxed">
                                    We'll identify your biggest opportunities for AI Adoption and show you exactly where and how to start. No pitch. No pressure. Just clarity.
                                </p>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="p-8 md:p-16 bg-white">
                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="flex justify-center mb-6">
                                        <div className="w-24 h-24 rounded-full border-4 border-pa-black flex items-center justify-center bg-pa-sage">
                                            <CheckCircle2 className="w-12 h-12 text-pa-black" />
                                        </div>
                                    </div>
                                    <h3 className="font-display font-bold text-3xl mb-4 text-pa-black">Thank You!</h3>
                                    <p className="text-lg text-pa-black font-medium mb-6">
                                        We've received your request and will be in touch shortly to schedule your discovery call.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-pa-black hover:text-pa-peach transition-colors font-display font-bold underline"
                                    >
                                        Submit Another Request
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {formError && (
                                        <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                                            {formError}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block font-bold text-xs mb-2 uppercase tracking-wide text-pa-black">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                                maxLength={50}
                                                className="w-full bg-stone-50 border-2 border-pa-black p-3 rounded-lg outline-none transition-colors font-sans text-pa-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-bold text-xs mb-2 uppercase tracking-wide text-pa-black">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                                maxLength={50}
                                                className="w-full bg-stone-50 border-2 border-pa-black p-3 rounded-lg outline-none transition-colors font-sans text-pa-black"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-bold text-xs mb-2 uppercase tracking-wide text-pa-black">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            maxLength={254}
                                            className="w-full bg-stone-50 border-2 border-pa-black p-3 rounded-lg outline-none transition-colors font-sans text-pa-black"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-xs mb-2 uppercase tracking-wide text-pa-black">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                            maxLength={20}
                                            className="w-full bg-stone-50 border-2 border-pa-black p-3 rounded-lg outline-none transition-colors font-sans text-pa-black"
                                            placeholder="(555) 123-4567"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-xs mb-2 uppercase tracking-wide text-pa-black">Business Name</label>
                                        <input
                                            type="text"
                                            name="businessName"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            required
                                            maxLength={100}
                                            className="w-full bg-stone-50 border-2 border-pa-black p-3 rounded-lg outline-none transition-colors font-sans text-pa-black"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-xs mb-2 uppercase tracking-wide text-pa-black">Industry</label>
                                        <input
                                            type="text"
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleChange}
                                            required
                                            maxLength={100}
                                            className="w-full bg-stone-50 border-2 border-pa-black p-3 rounded-lg outline-none transition-colors font-sans text-pa-black"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-xs mb-2 uppercase tracking-wide text-pa-black">Website URL <span className="text-gray-400 font-normal">(Optional)</span></label>
                                        <input
                                            type="url"
                                            name="websiteUrl"
                                            value={formData.websiteUrl}
                                            onChange={handleChange}
                                            maxLength={200}
                                            className="w-full bg-stone-50 border-2 border-pa-black p-3 rounded-lg outline-none transition-colors font-sans text-pa-black"
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-xs mb-2 uppercase tracking-wide text-pa-black">How can we help?</label>
                                        <div className="relative">
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                className="w-full bg-stone-50 border-2 border-pa-black p-3 rounded-lg outline-none transition-colors font-sans appearance-none text-pa-black"
                                            >
                                                <option>AI Consulting & Advisory Services</option>
                                                <option>AI Implementation</option>
                                                <option>AI Training Workshops</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-pa-black">▼</div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-bold text-xs mb-2 uppercase tracking-wide text-pa-black">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={4}
                                            maxLength={2000}
                                            className="w-full bg-stone-50 border-2 border-pa-black p-3 rounded-lg outline-none transition-colors font-sans text-pa-black"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-pa-peach text-pa-black font-display font-bold uppercase py-4 rounded-lg hover:translate-x-[2px] hover:translate-y-[2px] transition-all border-2 border-pa-black shadow-[4px_4px_0px_0px_#1a1a1a] hover:shadow-[2px_2px_0px_0px_#1a1a1a] disabled:opacity-50"
                                    >
                                        {submitting ? 'Submitting...' : 'Schedule Discovery Call'}
                                    </button>
                                    <p className="text-center text-sm text-gray-500 mt-4">
                                        Join the businesses that have discovered six-figure savings through our process.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const Footer = () => (
    <footer className="bg-pa-black text-stone-400 py-12 px-4 border-t border-stone-800 text-sm font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p>&copy; 2025 VANTAGE LEAP. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">TERMS</a>
                <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
                <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
            </div>
            <p className="opacity-50">DESIGNED BY MEMORABLE AGENCY</p>
        </div>
    </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-pa-black selection:bg-pa-peach selection:text-pa-black font-sans">
      <Header />
      <main>
        <HeroSlider />
        <WhoWeAre />
        <WhatWeDo />
        <WhyUs />
        <UseCases />
        <AIReadinessAssessment />
        <ClientSoundboard />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
