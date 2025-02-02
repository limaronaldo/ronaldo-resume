'use client';

import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Contact and header info
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Media & Performance Coordinator',
    email: 'ronaldomlima@gmail.com',
    phone: '+55 11 93459-2736',
    location: 'Alto de Pinheiros, São Paulo, SP',
  };

  // Handle side effects
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.title = contactInfo.role;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          'content',
          `Resume of ${contactInfo.name} – a Digital Marketing & Growth specialist for SaaS, experienced in paid media, ABM, and B2B global strategies. Fluent in English, proficient in Spanish.`
        );
      }
    }
  }, [mounted, contactInfo.role, contactInfo.name]);

  // PDF Download Handler
  const downloadPDF = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: `${window.location.origin}${window.location.pathname}`,
          jobTitle: contactInfo.role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      // Create initials from job title
      const initials = contactInfo.role
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();

      a.download = `RonaldoLima-${initials}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!mounted) return null;

  // Professional Summary (English)
  const professionalSummary = `
Marketing and Growth specialist with over 10 years of experience planning global digital strategies and leading cross-functional teams in technology (SaaS) companies. Skilled at designing data-driven acquisition and retention programs, optimizing ROI, and managing omnichannel campaigns (Google Ads, LinkedIn Ads, Meta, etc.). Adept at Account-Based Marketing (ABM) and advanced segmentation, unifying sales and marketing insights to boost pipeline and conversions for enterprise clients. Fluent in English, proficient in Spanish, with a track record of collaborating across borders to deliver high-impact digital marketing solutions.
`;

  // Professional Experience (English)
  const professionalExperience = [
    {
      title: 'Head of Marketing & Growth',
      company: 'IBVI',
      period: 'Aug 2022 – Present',
      location: 'São Paulo, Brazil',
      highlights: [
        'Oversee paid media initiatives (Google Ads, LinkedIn Ads, and remarketing channels), driving high-quality B2B lead generation and engagement.',
        'Implemented ABM-oriented approaches to target and personalize campaigns for key enterprise accounts, improving conversion rates by 25%.',
        'Coordinated with sales to align lead qualification criteria, integrating CRM data for pipeline optimization and detailed performance reporting.',
        'Managed multi-million dollar digital marketing budgets, tracking analytics through Google Tag Manager and Data Studio to refine strategies in real time.',
      ],
    },
    {
      title: 'Marketing Manager',
      company: 'MBRAS',
      period: 'Oct 2021 – Aug 2022',
      location: 'São Paulo, Brazil',
      highlights: [
        'Led the development of custom playbooks for strategic accounts, applying segmentation and personalization to address multiple decision-makers in large B2B deals.',
        'Analyzed performance metrics using Google Analytics and HubSpot, ensuring effective funnel management and consistent pipeline growth.',
        'Collaborated with product and content teams to produce integrated campaigns aligned with the SaaS buyer’s journey, resulting in 40% revenue growth in under a year.',
        'Drove advanced remarketing initiatives on LinkedIn and Facebook to engage key influencers, enhancing brand awareness and boosting lead nurture efforts.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'ConnectAD',
      period: 'Dec 2019 – Nov 2021',
      location: 'São Paulo, Brazil',
      highlights: [
        'Conceptualized data-driven inbound marketing campaigns for a variety of SaaS clients, integrating sales intelligence to optimize remarketing and lead scoring.',
        'Employed ABM tactics for high-value accounts and developed advanced segmentation strategies for more precise targeting across digital channels.',
        'Coordinated with technical teams to track engagement metrics (e.g., CTR, CPL, LTV) and refine buyer personas, boosting ROI in performance campaigns.',
        'Key projects: • Bebêmax: conversion funnel optimization with personalized drip campaigns and automation. • Ziro: multi-channel B2B lead strategy leveraging CRM workflows and analytics tools.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'Viva Linda',
      period: '2016 – Dec 2019',
      location: 'Sete Lagoas, Brazil',
      highlights: [
        'Ran full-funnel campaigns focusing on customer acquisition and retention, using Facebook Ads and Google Ads to expand audience reach by 20%.',
        'Partnered with sales on content roadmaps and account-based outreach, enhancing lead-to-opportunity conversions and sales alignment.',
        'Led a multidisciplinary team of 10, establishing KPIs and advanced reporting processes to optimize marketing spend.',
      ],
    },
  ];

  // Skills & Competencies (English)
  const skillsCompetencies = [
    'Paid Media Management (Google Ads, LinkedIn Ads, Facebook Ads)',
    'Account-Based Marketing (ABM) for Large B2B Accounts',
    'Advanced Segmentation, Personalization & Remarketing',
    'Data Analytics & Reporting (Google Analytics, Tag Manager, BI Tools)',
    'Marketing Automation & CRM Integration (HubSpot, Salesforce)',
    'Budget Planning & ROI Optimization for Performance Campaigns',
    'Collaboration with Sales, Content & Product Teams',
    'Multi-Channel Acquisition & Lead Nurturing (Inbound + Outbound)',
    'Fluent in English, Proficient in Spanish',
    'Knowledge of SEO & SEM Strategies (Nice to Have)',
  ];

  // Education (English)
  const education = [
    {
      degree: 'MBA in Marketing',
      school: 'Fundação Armando Alvares Penteado (FAAP)',
      period: '2024 – 2025',
    },
    {
      degree: 'Bachelor’s Degree in Business Administration',
      school: 'Ibmec',
      period: '2004 – 2008',
    },
  ];

  // Languages (English)
  const languages = [
    { language: 'Portuguese', level: 'Native' },
    { language: 'English', level: 'Fluent (International Study & Experience)' },
    { language: 'Spanish', level: 'Professional Proficiency' },
  ];

  // Tools & Certifications (English)
  const toolsCertifications = [
    'Professional Scrum Master I (Scrum.org)',
    'Google Ads Search Certification',
    'SEO & Inbound Marketing (Various Certifications)',
    'Advanced SQL (LinkedIn Learning)',
    'Experience with Jira, Git, CI/CD, and AI Platforms',
  ];

  // Additional Information (English)
  const additionalInfo = `
• Skilled in creating holistic digital strategies that integrate ABM, inbound marketing, and automation, ensuring seamless collaboration between marketing and sales.
• Adept at converting data into actionable insights, managing multi-channel budgets, and adapting quickly to evolving market trends.
• Passionate about empowering teams to innovate, while driving high-impact campaigns aligned with business objectives and the customer journey.
• Open to remote or hybrid work, with experience leading international teams and coordinating cross-functional projects in fast-paced environments.
`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* PDF Download Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={downloadPDF}
            disabled={isGenerating}
            className={`px-6 py-2 rounded-lg bg-slate-900 text-white transition-colors ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800'
            }`}
          >
            {isGenerating ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>

        {/* Main Resume Card */}
        <div className="bg-white shadow-xl rounded-xl p-8 md:p-12">
          {/* Header */}
          <header className="text-center mb-0">
            <h1 className="text-4xl font-light text-slate-900 mb-2">
              {contactInfo.name}
            </h1>
            <h2 className="text-2xl text-slate-600 font-light mb-6">
              {contactInfo.role}
            </h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-slate-500 font-light mb-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:text-slate-700 transition-colors"
              >
                {contactInfo.email}
              </a>
              <a
                href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-700 transition-colors"
              >
                {contactInfo.phone}
              </a>
              <span>{contactInfo.location}</span>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mb-2">
            <h3 className="text-2xl font-light text-slate-900 tracking-wide uppercase mt-2">
              Professional Summary
            </h3>
            <p className="text-md text-slate-600 font-light leading-relaxed whitespace-pre-line mb-2">
              {professionalSummary}
            </p>
          </section>

          {/* Professional Experience */}
          <section className="mb-1 pt-2">
            <h3 className="text-2xl font-light text-slate-900 mb-2 tracking-wide uppercase">
              Professional Experience
            </h3>
            {professionalExperience.map((exp, idx) => (
              <div key={idx} className="mb-6 pt-2">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-xl text-slate-800 font-normal">
                    {exp.title} – {exp.company}
                  </h4>
                  <p className="text-sm text-slate-500 font-light whitespace-nowrap ml-2">
                    {exp.period}
                  </p>
                </div>
                <p className="text-sm text-slate-500 font-light mb-2">
                  {exp.location}
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600 font-light">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-base leading-relaxed">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Skills & Competencies */}
          <section className="mb-12 pt-4">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Skills & Competencies
            </h3>
            <ul className="grid grid-cols-2 gap-4 text-slate-600 font-light list-inside list-disc">
              {skillsCompetencies.map((skill, idx) => (
                <li key={idx} className="text-base leading-relaxed">
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          {/* Education */}
          <section className="mb-4 pt-12">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Education
            </h3>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-xl text-slate-800 font-normal">
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-slate-500 font-light whitespace-nowrap ml-4">
                    {edu.period}
                  </p>
                </div>
                <p className="text-base text-slate-600 font-light">
                  {edu.school}
                </p>
              </div>
            ))}
          </section>

          {/* Languages */}
          <section className="mb-8">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Languages
            </h3>
            <ul className="space-y-2 text-slate-600 font-light">
              {languages.map((lang, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="text-slate-800 font-light text-lg">
                    {lang.language}
                  </span>
                  <span className="text-slate-300 mx-3">•</span>
                  <span className="text-base text-slate-600 font-light">
                    {lang.level}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tools & Certifications */}
          <section className="mb-8">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Tools & Certifications
            </h3>
            <ul className="list-disc list-inside space-y-2 text-slate-600 font-light">
              {toolsCertifications.map((cert, idx) => (
                <li key={idx} className="text-base leading-relaxed">
                  {cert}
                </li>
              ))}
            </ul>
          </section>

          {/* Additional Information */}
          <section className="border-t border-slate-200 pt-4">
            <h3 className="text-2xl font-light text-slate-900 mb-2">
              Additional Information
            </h3>
            <p className="text-md text-slate-600 font-light leading-relaxed whitespace-pre-line">
              {additionalInfo}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
