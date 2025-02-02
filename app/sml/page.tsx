'use client';

import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Contact and header info
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Senior Marketing Lead',
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
          `Resume of ${contactInfo.name} – a senior marketing leader with extensive experience in integrated campaigns, global strategy, and ROI-driven initiatives.`
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

  // Professional Summary (English) - Updated for Airbnb alignment
  const professionalSummary = `
Senior marketing professional with over 12 years of experience leading global strategies, building high-performing teams, and driving growth through integrated, ROI-focused campaigns. Adept at localizing brand narratives, nurturing communities, and leveraging data insights to improve engagement and profitability. Proven ability to orchestrate paid, owned, and earned channels at scale. Fluent in English and proficient in Spanish, with a strong background in cross-border collaboration, large-scale budgeting, and brand innovation. Eager to apply strategic leadership and community-centric marketing approaches to deliver impactful results.
`;

  // Professional Experience (English) - Updated to reflect deeper leadership scope
  const professionalExperience = [
    {
      title: 'Head of Marketing & Growth',
      company: 'IBVI',
      period: 'Aug 2022 – Present',
      location: 'São Paulo, Brazil',
      highlights: [
        'Oversaw global brand and performance marketing initiatives (B2B SaaS focus), managing annual budgets of over $5M to maximize ROI and optimize KPI performance across paid, owned, and earned channels.',
        'Reduced Customer Acquisition Cost (CAC) by 25% via data-driven funnel analyses, while simultaneously improving marketing efficiency and allocation through advanced segmentation.',
        'Led a cross-functional marketing organization of 15+ professionals, aligning brand strategy, PR, and customer experience teams to deliver cohesive campaigns.',
        'Spearheaded international expansion strategies, implementing locally relevant marketing and unlocking revenue growth across North America, Europe, and LATAM.',
      ],
    },
    {
      title: 'Marketing Manager, LATAM',
      company: 'MBRAS',
      period: 'Oct 2021 – Aug 2022',
      location: 'São Paulo, Brazil',
      highlights: [
        'Developed go-to-market strategies tailored to distinct LATAM audiences, achieving a 40% increase in revenue within 8 months through hyper-localized branding and multi-channel outreach.',
        'Managed agency relationships and internal creative teams, ensuring on-time execution of regional campaigns while maintaining brand consistency and messaging clarity.',
        'Partnered with product and engineering teams to design user-centric flows, employing A/B testing and agile marketing methodologies to enhance customer retention and reduce churn.',
        'Drove integrated marketing campaigns across paid search, social media, and influencer partnerships, amplifying brand presence and community engagement.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'ConnectAD',
      period: 'Dec 2019 – Nov 2021',
      location: 'São Paulo, Brazil',
      highlights: [
        'Architected end-to-end inbound marketing funnels for SaaS and streaming solutions, elevating brand visibility and capturing high-quality leads in international markets.',
        'Deployed BI dashboards integrating Google Analytics (GA4) and HubSpot data, improving reporting accuracy and enabling fast decision-making on media investments.',
        'Introduced advanced personalization via Python-based analyses, leading to higher conversion rates across targeted campaigns in email, social media, and in-app channels.',
        'Collaborated with internal teams to adopt scrum and kanban practices, accelerating campaign delivery and improving cross-departmental alignment.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'Viva Linda',
      period: '2016 – Dec 2019',
      location: 'Sete Lagoas, Brazil',
      highlights: [
        'Led a transformative shift from traditional to digital marketing, implementing global brand guidelines and omnichannel strategies that boosted sales by 20%.',
        'Established localized marketing campaigns in Portuguese and Spanish, creating closer community ties and enhancing global brand engagement.',
        'Supervised a team of 10 marketing specialists, setting performance targets, analyzing market trends, and refining campaign tactics to remain competitive in the region.',
        'Enhanced brand storytelling through innovative content formats (live streaming, webinars, and social media series), fostering meaningful connections with audiences.',
      ],
    },
  ];

  // Skills & Competencies (English) - Updated to include Airbnb-relevant points
  const skillsCompetencies = [
    'Over 12 Years in Strategic Marketing Leadership',
    'Integrated Campaign Planning (Paid, Owned, Earned)',
    'Global Brand Expansion & Localization Strategies',
    'Community-Centric Marketing & Customer Engagement',
    'Data Analytics & KPI-Driven Decision Making (ROI, CAC, LTV)',
    'Budget Management & Financial Forecasting',
    'Managing Cross-Functional Teams & Agency Partnerships',
    'Generative AI Integration (ChatGPT, Claude, Google Gemini)',
    'Scrum, Kanban & Agile Project Leadership',
    'Fluent English & Proficient Spanish for Global Collaboration',
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

  // Tools & Certifications (English) - Add mention of integrated marketing/finance
  const toolsCertifications = [
    'Professional Scrum Master I (Scrum.org)',
    'Google Ads Search Certification',
    'SEO & Inbound Marketing (Various Certifications)',
    'Advanced SQL (LinkedIn Learning)',
    'Expertise with Jira, Git, CI/CD, and AI Platforms',
    'Financial & Budget Management Tools (SAP, Oracle)',
  ];

  // Additional Information (English) - Add references to role fit and travel
  const additionalInfo = `
• Committed to delivering strong community-focused and culturally relevant marketing, fostering authentic connections that drive growth.
• Skilled in managing complex, multi-million dollar marketing budgets and aligning financial processes with strategic objectives.
• Passionate about collaborating with diverse, cross-functional teams; open to frequent international travel to drive strategic initiatives and ensure local market alignment.
• Excited to apply proven leadership, creativity, and operational acumen to help Airbnb continue innovating in the travel and hospitality space.
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
              <div key={idx} className="mb-4 pt-2">
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
          <section className="mb-6 pt-4">
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
          <section className="mb-8 pt-4">
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
          <section className="mb-6">
            <h3 className="text-2xl font-light text-slate-900 mb-2 tracking-wide uppercase">
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
