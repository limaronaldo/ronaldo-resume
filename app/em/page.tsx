'use client';

import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Contact and header info
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'E-commerce Manager',
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
          `Resume of ${contactInfo.name} – E-commerce Manager with expertise in digital marketing, OMNI channel management, P&L oversight, commercial strategy, and team leadership. Fluent in English, experienced in building profitable e-commerce channels and overseeing digital transformation efforts.`
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
E-commerce Manager with over 10 years of experience leading comprehensive digital strategies, OMNI channel campaigns, and high-impact commercial plans. Skilled at leveraging market insights to define volume planning (BDG, SAF, PS) and investment frameworks that drive sustainable revenue growth. Adept at aligning cross-functional teams, managing P&L for pure-play and omnichannel clients, and implementing e-media strategies (SEO, Google Ads) that increase visibility, traffic, and conversion rates. Fluent in English, with a proven record of negotiating with B2B partners and executing innovative go-to-market solutions for large-scale e-commerce environments.
`;

  // Professional Experience (English)
  const professionalExperience = [
    {
      title: 'E-commerce Manager',
      company: 'IBVI',
      period: 'Aug 2022 – Present',
      location: 'São Paulo, Brazil',
      highlights: [
        'Lead the commercial strategy and action plan for multiple e-commerce clients (Pure Players, Last Milers, Quick Commerce), aligning with corporate guidelines to ensure sustainable channel growth.',
        'Manage the OMNI channel calendar and initiatives, coordinating with Direct and Indirect Sales teams to drive cohesive brand messaging and meet volume/financial targets.',
        'Oversee the P&L for the entire e-commerce channel, including B2B and omnichannel clients, defining pricing policies and investment allocations.',
        'Implemented SEO and Google Ads strategies to improve product findability and maximize conversion rates, increasing monthly online revenue by 25%.',
        'Cultivate partnerships with cross-functional teams (Marketing, Finance, Supply Chain) to align on portfolio actions, digital transformation initiatives, and brand consistency across online platforms.',
      ],
    },
    {
      title: 'E-commerce Supervisor',
      company: 'MBRAS',
      period: 'Oct 2021 – Aug 2022',
      location: 'São Paulo, Brazil',
      highlights: [
        'Developed comprehensive go-to-market plans for the E-commerce Channel, capturing market opportunities and overseeing investment budgets for performance marketing.',
        'Led cross-departmental initiatives to expand online retail presence, optimizing product listings, promotions, and marketing automation flows.',
        'Analyzed customer data to tailor product assortments and improve personalization strategies, driving a 20% increase in customer retention.',
        'Championed data-driven decision-making by introducing advanced analytics dashboards, enabling real-time tracking of sales performance and ROI.',
      ],
    },
    {
      title: 'Digital Marketing Lead',
      company: 'ConnectAD',
      period: 'Dec 2019 – Nov 2021',
      location: 'São Paulo, Brazil',
      highlights: [
        'Directed omnichannel digital campaigns focused on boosting brand presence in e-commerce marketplaces and the company’s own online store.',
        'Collaborated with sales, logistics, and finance teams to ensure inventory, pricing, and fulfillment strategies aligned with promotional calendars.',
        'Implemented new e-portfolio tactics and B2B retail initiatives, resulting in successful partnerships with large national distributors.',
        'Tracked key metrics such as CTR, AOV, and conversion rates to refine acquisition strategies and enhance user experience.',
      ],
    },
    {
      title: 'Marketing & E-commerce Specialist',
      company: 'Viva Linda',
      period: '2016 – Dec 2019',
      location: 'Sete Lagoas, Brazil',
      highlights: [
        'Managed the online product portfolio and pricing strategies to ensure market competitiveness and profitability.',
        'Coordinated with Marketing teams to run digital campaigns (SEO, SEM, Paid Social) focused on brand awareness and revenue growth.',
        'Executed e-commerce brand partnerships and joint promotions, increasing net sales by 15% year over year.',
        'Facilitated negotiation with external vendors and e-commerce enablers, securing cost-effective solutions for logistics and fulfillment.',
      ],
    },
  ];

  // Skills & Competencies (English)
  const skillsCompetencies = [
    'E-commerce Strategy & OMNI Channel Management',
    'Commercial Planning & Volume Forecasting (BDG, SAF, PS)',
    'P&L Management & Financial Indicator Tracking',
    'SEO, Google Ads & e-Media Execution',
    'Market Analysis & Negotiation with B2B Clients',
    'Cross-functional Team Leadership & Stakeholder Alignment',
    'Analytical Skills & Data-Driven Decision Making',
    'Digital Transformation & E-portfolio Implementation',
    'Paid Media Management (Google, Facebook, Instagram)',
    'Fluent in English; Experienced in Multicultural Projects',
  ];

  // Education (English)
  const education = [
    {
      degree: 'MBA in Marketing',
      school: 'Fundação Armando Alvares Penteado (FAAP)',
      period: '2024 – 2025',
    },
    {
      degree: "Bachelor's Degree in Business Administration",
      school: 'Ibmec',
      period: '2004 – 2008',
    },
  ];

  // Languages (English)
  const languages = [
    { language: 'Portuguese', level: 'Native' },
    { language: 'English', level: 'Fluent (Business & Negotiation)' },
    { language: 'Spanish', level: 'Intermediate Proficiency' },
  ];

  // Tools & Certifications (English)
  const toolsCertifications = [
    'Professional Scrum Master I (Scrum.org)',
    'Google Ads Search Certification',
    'SEO & Inbound Marketing Certifications',
    'Advanced SQL (LinkedIn Learning)',
    'Salesforce & HubSpot CRM Integration',
    'Experience with Jira, CI/CD, and E-commerce Platforms (Shopify, Magento, VTEX)',
  ];

  // Additional Information (English)
  const additionalInfo = `
• Passionate about driving digital innovation, aligning commercial tactics with broader corporate strategies, and fostering growth in online channels.
• Skilled in developing annual plans for e-commerce operations, including promotional calendars, investment roadmaps, and integrated marketing campaigns.
• Proven negotiation abilities with key industry partners, ensuring fair market share and profitable partnerships.
• Open to global or remote roles; experienced in leading and coordinating initiatives across multiple time zones and cultural contexts.
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
