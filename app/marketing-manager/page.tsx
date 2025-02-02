'use client';

import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Contact and header info
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Marketing Manager',
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
          `Resume of ${contactInfo.name} – a Digital Marketing & Growth specialist for SaaS, experienced in ROI measurement, B2B global strategies, fluent in English, and proficient in Spanish.`
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
          url: `${window.location.origin}/omie`,
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
Marketing and Growth professional with over 10 years of experience planning global digital strategies and managing teams in technology (SaaS) companies. Strong ability to define KPIs, measure ROI, and optimize budgets for customer acquisition and retention. Familiar with marketing for streaming solutions (OTT/IPTV), as well as mobile and web applications. Experienced in user behavior analysis, advanced segmentation, and marketing automation, including the integration of tools like Google Analytics, HubSpot, and Generative AI models (ChatGPT, Claude, Google Gemini). Fluent in English, proficient in Spanish, and with international exposure, enabling efficient cross-border projects and team collaboration.
`;

  // Professional Experience (English)
  const professionalExperience = [
    {
      title: 'Head of Marketing & Growth',
      company: 'IBVI',
      period: 'Aug 2022 – Present',
      location: 'São Paulo, Brazil',
      highlights: [
        'Manage the global digital marketing budget (focused on B2B SaaS) with an emphasis on ROI measurement and KPI optimization in performance campaigns (Google Ads, LinkedIn Ads, etc.).',
        'Implemented a funnel analysis framework, identifying bottlenecks and reducing CAC (Customer Acquisition Cost) by 25%.',
        'Coordinate retention and up/cross-sell strategies, boosting LTV (Lifetime Value) by 30% and strengthening customer satisfaction through NPS surveys.',
        'Lead cross-functional meetings with Product Owners and marketing teams, ensuring alignment between product roadmap and market demands.',
      ],
    },
    {
      title: 'Marketing Manager',
      company: 'MBRAS',
      period: 'Oct 2021 – Aug 2022',
      location: 'São Paulo, Brazil',
      highlights: [
        'Defined and managed the company’s digital expansion strategy, prioritizing key markets and increasing revenue by 40% in 8 months.',
        'Established user-behavior KPIs for segmentation, resulting in retention rate improvements and churn reduction.',
        'Analyzed global competition in streaming and SaaS solutions, proposing new product lines and competitive differentiators.',
        'Collaborated with technical teams to monitor engagement metrics on mobile apps and TV apps, generating insights on user experience (UX).',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'ConnectAD',
      period: 'Dec 2019 – Nov 2021',
      location: 'São Paulo, Brazil',
      highlights: [
        'Developed inbound marketing campaigns and funnels for SaaS clients in various sectors, including video on demand (VOD) and OTT platforms.',
        'Implemented BI dashboards (Power BI, Google Data Studio) integrated with HubSpot/GA4, analyzing engagement and ROI metrics to optimize media budgets.',
        'Leveraged Python and SQL for data extraction, conducting A/B tests and personalizing offers across multiple digital marketing channels.',
        'Key projects: • Bebêmax: Automated workflows converting e-commerce leads into recurring subscriptions. • Ziro: AI-based content personalization for SEO in the retail market.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'Viva Linda',
      period: '2016 – Dec 2019',
      location: 'Sete Lagoas, Brazil',
      highlights: [
        'Transitioned traditional marketing processes into digital strategies, integrating streaming and videoconferencing platforms for product launch campaigns.',
        'Focused on multilingual content marketing (Portuguese/Spanish) and omnichannel approaches, increasing conversion by 20% and enhancing global brand engagement.',
        'Led teams of up to 10 professionals, setting goals, executing plans, and managing crises in highly competitive markets.',
      ],
    },
  ];

  // Skills & Competencies (English)
  const skillsCompetencies = [
    'Defining and Tracking KPIs and ROI in Digital Campaigns',
    '360° Marketing Management (Branding, Performance, Content)',
    'Experience with SaaS and Streaming Services (OTT/IPTV)',
    'Developing Retention Strategies and Reducing Churn',
    'Marketing Automation Tools: HubSpot, Google Analytics, Google Ads',
    'Generative AI Integration (ChatGPT, Claude, Google Gemini)',
    'Data Analytics & Advanced Segmentation (Python, SQL, BI Tools)',
    'Managing Cross-Functional Teams and Agile Projects (Scrum, Kanban)',
    'Fluent English & Proficient Spanish for Global Projects',
    'Planning and Managing Digital Marketing Budgets',
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
• As a leader in Digital Marketing, I prioritize ROI metrics and engagement KPIs to inform global budget allocation decisions.
• Specialized in analyzing market trends and user behavior to design acquisition and retention plans that deliver above-average results.
• Skilled at fostering synergy between Product and Marketing teams, ensuring cohesive strategies that strengthen customer satisfaction and competitiveness in the SaaS streaming sector.
• Open to new challenges at globally oriented companies with a focus on innovation and a vision to lead the market.
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
          <section className="mb-12 pt-4">
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
          <section className="mb-12">
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
            <p className="text-lg text-slate-600 font-light leading-relaxed whitespace-pre-line">
              {additionalInfo}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
