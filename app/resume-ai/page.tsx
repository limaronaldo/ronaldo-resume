// pages/resume-ai.tsx
'use client';

import { useEffect, useState } from 'react';

/**
 * This page is based on the structure of Resume.tsx,
 * but customized to display a resume geared toward
 * a "Social Media Content Strategist – AI Trainer" role,
 * using your real professional experience.
 */

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.title = 'Social Media Content Strategist - AI Trainer';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Resume for Social Media Content Strategist - AI Trainer');
      }
    }
  }, [mounted]);

  const downloadPDF = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: `${window.location.origin}/resume-ai`,
          jobTitle: contactInfo.role,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Create initials from job title
      const initials = contactInfo.role
        .split(' ')
        .map(word => word[0])
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

  if (!mounted) {
    return null;
  }

  // Contact and header info
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Social Media Content Strategist - AI Trainer',
    email: 'ronaldomlima@gmail.com',
    phone: '+55 11 93459-2736',
    location: 'Alto de Pinheiros, São Paulo, SP',
  };

  // Professional Summary updated to emphasize social media + AI training
  const professionalSummary = `
    Product Marketing Manager with 12+ years of experience in growth marketing, product strategy,
    and AI-driven solutions. Known for bridging Product, Sales, and Data teams to deliver market-leading
    campaigns, optimize customer journeys, and drive measurable outcomes. Expert in implementing Large
    Language Models (LLMs) such as Google Gemini, ChatGPT, Claude, and Meta Llama to streamline social
    media strategies, reduce acquisition costs, and accelerate conversions. Passionate about mentoring teams,
    leveraging AI analytics, and crafting high-impact content that resonates in global markets.
  `;

  // Professional Experience mapped to highlight social media/AI impact
  const professionalExperience = [
    {
      title: 'Growth Product Manager',
      company: 'IBVI',
      period: 'Aug 2022 – Present',
      location: 'São Paulo, Brazil',
      highlights: [
        'Led a digital transformation initiative with Google for Startups support, integrating advanced AI models in key business processes.',
        'Refined customer journeys alongside Product, Sales, and Data teams—achieving significant improvements in lead quality and conversion rates.',
        'Implemented LLM-based segmentation strategies to boost retention and upselling opportunities, including social-media-driven outreach.',
      ],
    },
    {
      title: 'Marketing Manager',
      company: 'MBRAS Real Estate Solutions',
      period: 'Oct 2021 – Present',
      location: 'São Paulo, Brazil',
      highlights: [
        'Elevated MBRAS brand in the premium real estate market with data-driven content across social media channels and paid platforms (Google Ads, Meta Ads, LinkedIn Ads).',
        'Unified brand communication across offline and digital mediums, maximizing ROI and engagement among high-value audiences.',
        'Mentored a high-performance marketing team, fostering experimentation in AI, advanced analytics, and continuous learning—leading to impactful social media campaigns.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'ConnectAD',
      period: 'Dec 2019 – Nov 2021',
      location: 'São Paulo, Brazil',
      highlights: [
        'Launched sophisticated email marketing and lead-nurturing funnels, significantly enhancing lead qualification for social campaigns.',
        'Utilized Python scripts and SQL for A/B testing, funnel analytics, and performance optimization of targeted ads across multiple social channels.',
        'Key Projects:',
        '• Bebêmax: Drove online sales growth via integrated paid media strategies, social chatbots, and optimized landing pages.',
        '• Ziro (Vesti): Combined CRM automation, SEO, and strategic partnerships to bolster brand recognition and social media presence.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'Viva Linda',
      period: '2016 – Dec 2019',
      location: 'Sete Lagoas, Brazil',
      highlights: [
        'Directed a marketing overhaul to align with a fast-fashion model, tripling the customer base through social media and offline synergy.',
        'Integrated digital campaigns with physical promotions, significantly improving brand experience and conversion across all customer touchpoints.',
        'Built a data-focused marketing team that rapidly tested, iterated, and scaled successful social campaigns.',
      ],
    },
  ];

  // Skills & Competencies
  const skillsCompetencies = [
    'Product Marketing & Go-to-Market Strategy',
    'Growth Hacking & Conversion Rate Optimization (CRO)',
    'AI Integration (Google Gemini, ChatGPT, Claude, Meta Llama)',
    'Media Buying (Meta Ads, Google Ads, LinkedIn Ads, TikTok Ads)',
    'CRM Implementation & Marketing Automation',
    'Full-Stack Development (Python, Node.js, React, Rust, Go)',
    'Data Analytics (SQL, Data Studio, Advanced Excel)',
    'Agile Project Management (Scrum, Jira)',
    'Team Leadership & Cross-functional Collaboration',
  ];

  // Education
  const education = [
    {
      degree: 'MBA in Marketing',
      school: 'Fundação Armando Alvares Penteado (FAAP)',
      period: '2024 – 2025',
    },
    {
      degree: "Bachelor's in Business Administration",
      school: 'Ibmec',
      period: '2004 – 2008',
    },
  ];

  // Languages
  const languages = [
    {
      language: 'Portuguese',
      level: 'Native',
    },
    {
      language: 'English',
      level: 'Fluent',
    },
  ];

  // Tools & Certifications
  const toolsCertifications = [
    'Professional Scrum Master I (Scrum.org)',
    'Google Ads Search Certification (Google)',
    'Advanced SQL (LinkedIn)',
    'Experience with Jira, Git, CI/CD pipelines, and various AI platforms',
  ];

  // Additional info describing your interests & availability
  const additionalInfo = `
    Passionate about leveraging AI and data analytics in marketing, with a strong track record of
    building cross-functional teams and cultivating stakeholder buy-in. Expert at tying social media
    content strategies to measurable business outcomes and adopting cutting-edge AI solutions to
    enhance targeting and engagement.
  `;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex justify-end mb-4">
          <button
            onClick={downloadPDF}
            disabled={isGenerating}
            className={`px-6 py-2 rounded-lg bg-slate-900 text-white transition-colors ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800'
            }`}
          >
            {isGenerating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
        
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
          <section className="mb-8">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Professional Summary
            </h3>
            <p className="text-md text-slate-600 font-light leading-relaxed">
              {professionalSummary}
            </p>
          </section>

          {/* Professional Experience */}
          <section className="mb-8">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Professional Experience
            </h3>
            {professionalExperience.map((exp, idx) => (
              <div key={idx} className="mb-8">
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
          <section className="mb-12">
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
          <section className="mb-12">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Education
            </h3>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-xl text-slate-800 font-normal">{edu.degree}</h4>
                  <p className="text-sm text-slate-500 font-light whitespace-nowrap ml-4">{edu.period}</p>
                </div>
                <p className="text-base text-slate-600 font-light">{edu.school}</p>
              </div>
            ))}
          </section>

          {/* Languages */}
          <section className="mb-12">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Languages
            </h3>
            <ul className="space-y-2 text-slate-600 font-light">
              {languages.map((lang, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="text-lg text-slate-800 font-light">{lang.language}</span>
                  <span className="text-slate-300 mx-3">•</span>
                  <span className="text-base text-slate-600 font-light">{lang.level}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tools & Certifications */}
          <section className="mb-12">
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
          <section className="border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-light text-slate-900 mb-6">
              Additional Information
            </h3>
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              {additionalInfo}
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}