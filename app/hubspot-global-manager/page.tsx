'use client';

import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Contact and header info
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Global HubSpot Manager',
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
          `Resume of ${contactInfo.name} – an experienced ${contactInfo.role} specializing in CRM automation, integration oversight, and data-driven process optimization.`
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
Global HubSpot Manager with over 5 years of experience optimizing end-to-end CRM implementations. Adept at analyzing data, devising marketing automation solutions, and aligning cross-functional teams to achieve impactful results. Skilled in building scalable workflows, improving data quality, and delivering user-friendly processes that elevate business outcomes for international markets.
`;

  // Professional Experience
  const professionalExperience = [
    {
      title: 'Global HubSpot Manager',
      company: 'Base.com',
      period: 'Aug 2022 – Present',
      location: 'São Paulo, Brazil (Remote Collaboration)',
      highlights: [
        'Oversee HubSpot implementation across multiple markets, ensuring platform integrity and security.',
        'Collaborate with marketing and sales to streamline cross-channel campaigns, boosting customer engagement.',
        'Design and automate crucial processes, reducing manual tasks by 40% and improving data accuracy.',
        'Optimize integrations (1300+ global partners) with emphasis on Amazon, eBay, Etsy, and Shopify.',
        'Track new HubSpot features, propose data-driven process improvements, and introduce innovative solutions.',
      ],
    },
    {
      title: 'Marketing Automation Specialist',
      company: 'MCloud Solutions',
      period: 'Oct 2021 – Aug 2022',
      location: 'São Paulo, Brazil',
      highlights: [
        'Led a CRM overhaul project focusing on HubSpot’s automation capabilities to enhance lead nurturing.',
        'Established cross-functional procedures to align marketing with product teams on key strategic initiatives.',
        'Improved data consistency across all client-facing channels by implementing robust validation rules.',
        'Trained over 60 team members on HubSpot best practices and data-driven reporting techniques.',
      ],
    },
    {
      title: 'CRM & Data Coordinator',
      company: 'BloomX Digital',
      period: 'Dec 2019 – Nov 2021',
      location: 'São Paulo, Brazil',
      highlights: [
        'Developed advanced segmentation strategies, increasing conversion rates by 25%.',
        'Collaborated with marketing leads to refine customer journeys, focusing on both automated and manual touchpoints.',
        'Enhanced reporting dashboards, enabling real-time insights into marketing campaign performance.',
        'Pioneered efficient user onboarding flows in HubSpot to boost adoption of new product lines.',
      ],
    },
    {
      title: 'Junior CRM Associate',
      company: 'NovaPrime Marketing',
      period: '2016 – Dec 2019',
      location: 'Sete Lagoas, Brazil',
      highlights: [
        'Assisted in HubSpot configurations for regional clients, standardizing lead management processes.',
        'Managed multi-channel engagement campaigns, ensuring consistent and targeted communications.',
        'Partnered with sales teams to integrate qualitative feedback into CRM strategies.',
      ],
    },
  ];

  // Skills & Competencies
  const skillsCompetencies = [
    'HubSpot Administration & Process Automation',
    'CRM Optimization & Integration (Salesforce, Magento, Shopify)',
    'Data Analysis & Reporting (KPIs, CRM Metrics, ROI)',
    'User Onboarding & Training Programs',
    'Multi-Market Implementation & Best Practices',
    'Marketing Automation & Lead Management',
    'Cross-functional Collaboration (Sales, Marketing, IT)',
    'Excellent Organization & Self-Management',
    'Fluent in English (C1+), Proactive Problem-Solving Mindset',
    'Outstanding Communication & Stakeholder Alignment',
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
    { language: 'English', level: 'Fluent (C1+)' },
    { language: 'Spanish', level: 'Professional Proficiency' },
  ];

  // Tools & Certifications
  const toolsCertifications = [
    'HubSpot Marketing Software Certification',
    'Professional Scrum Master I (Scrum.org)',
    'Google Analytics Certified',
    'Advanced SQL (LinkedIn Learning)',
    'Inbound Marketing & CRM Strategy (Various Trainings)',
    'Experience with Jira, Git, CI/CD, and AI Platforms',
    'Data Management & Security (GDPR, ISO concepts)',
  ];

  // Additional Information
  const additionalInfo = `
• Deep understanding of marketing automation and CRM best practices, with a strong emphasis on data integrity.
• Hands-on experience in user account management, multi-channel platform integrations, and global Enterprise contracts.
• Passionate about driving scalable solutions that align technical capabilities with strategic business goals.
• Proven ability to communicate complex processes in clear, actionable terms to diverse, cross-functional teams.
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
