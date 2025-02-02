'use client';

import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Contact and header info
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Product Marketing Manager',
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
          `Resume of ${contactInfo.name} – an experienced Product Marketing Manager specialized in translating complex financial solutions into clear, data-driven messaging for market success.`
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

  // Professional Summary
  const professionalSummary = `
Dynamic Product Marketing Manager with over 10 years of experience crafting compelling product narratives and executing go-to-market strategies within technology-driven environments. Adept at bridging product development and market needs, I specialize in performance marketing and data analysis to drive user acquisition and revenue growth. Skilled at refining product positioning in competitive markets and collaborating across product, sales, and analytics teams to optimize campaigns and enhance market adoption.
`;

  // Professional Experience
  const professionalExperience = [
    {
      title: 'Product Marketing Manager',
      company: 'IBVI',
      period: 'Aug 2022 – Present',
      location: 'São Paulo, Brazil',
      highlights: [
        'Spearheaded go-to-market strategies for innovative credit solutions, aligning product positioning with evolving market trends.',
        'Optimized performance marketing campaigns across Google Ads, LinkedIn Ads, and Facebook Ads—boosting user acquisition by 25%.',
        'Collaborated with product, sales, and analytics teams to refine key messages and adjust campaign tactics based on performance data.',
        'Leveraged detailed insights from metrics (CPC, CPA, CTR, ROI) to continuously improve campaign outcomes and revenue targets.',
      ],
    },
    {
      title: 'Marketing Manager',
      company: 'MBRAS',
      period: 'Oct 2021 – Aug 2022',
      location: 'São Paulo, Brazil',
      highlights: [
        'Developed integrated marketing strategies that emphasized competitive product positioning and clear value propositions.',
        'Utilized advanced analytics and market segmentation to optimize digital campaigns, resulting in a 40% increase in conversion rates.',
        'Coordinated cross-functional product launch playbooks, ensuring cohesive messaging from planning to execution.',
        'Enhanced multi-channel engagement through targeted messaging and performance-focused adjustments.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'ConnectAD',
      period: 'Dec 2019 – Nov 2021',
      location: 'São Paulo, Brazil',
      highlights: [
        'Supported the creation of data-driven campaigns that highlighted product benefits and market differentiation.',
        'Worked closely with product teams to integrate customer feedback into marketing strategies, refining campaign messaging.',
        'Implemented targeted digital initiatives using advanced segmentation to boost lead generation and conversion.',
        'Key projects: • Bebêmax – streamlined product messaging across digital channels. • Ziro – improved campaign performance through precise audience targeting.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'Viva Linda',
      period: '2016 – Dec 2019',
      location: 'Sete Lagoas, Brazil',
      highlights: [
        'Managed comprehensive marketing campaigns focused on elevating product awareness and driving user acquisition.',
        'Collaborated with sales teams to ensure marketing communications clearly conveyed product benefits.',
        'Oversaw multi-channel advertising efforts that increased market reach and engagement by 20%.',
      ],
    },
  ];

  // Skills & Competencies
  const skillsCompetencies = [
    'Product Marketing Strategy & Go-to-Market Execution',
    'Performance Marketing Optimization (Google Ads, Facebook Ads, LinkedIn Ads)',
    'Data Analytics & Performance Measurement (CPC, CPA, CTR, ROI)',
    'Cross-functional Collaboration (Product, Sales & Analytics)',
    'Market Research & Competitive Analysis',
    'Strategic Messaging & Product Positioning',
    'CRM & Marketing Automation (HubSpot, Salesforce)',
    'Budget Planning & ROI Optimization',
    'Fluent in English, Proficient in Spanish',
    'Understanding of Fintech & Credit Markets',
  ];

  // Education
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

  // Languages
  const languages = [
    { language: 'Portuguese', level: 'Native' },
    { language: 'English', level: 'Fluent (International Study & Experience)' },
    { language: 'Spanish', level: 'Professional Proficiency' },
  ];

  // Tools & Certifications
  const toolsCertifications = [
    'Professional Scrum Master I (Scrum.org)',
    'Google Ads Search Certification',
    'SEO & Inbound Marketing (Various Certifications)',
    'Advanced SQL (LinkedIn Learning)',
    'Experience with Jira, Git, CI/CD, and AI Platforms',
    'HubSpot Marketing Software',
    'Google Analytics Certified',
  ];

  // Additional Information
  const additionalInfo = `
• Adept at developing product narratives that transform complex financial solutions into clear market benefits.
• Proven experience in driving product adoption and revenue growth through data-driven performance marketing strategies.
• Skilled in synthesizing market insights and customer feedback to fine-tune product positioning and go-to-market initiatives.
• Passionate about collaborating with cross-functional teams to deliver integrated campaigns that support business objectives.
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
          <section className="mb-6">
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
          <section className="mb-6">
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
          <section className="border-t border-slate-200 pt-2">
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