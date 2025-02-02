'use client';

import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Contact and header info
  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Marketing Coordinator',
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
          `Resume of ${contactInfo.name} – Marketing Coordinator with expertise in internal communication, content strategy, and cross-functional team leadership. Experience in technology and innovation-driven environments, proficient in English and Spanish.`
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
Marketing Coordinator with 10+ years of experience leading internal communication, brand positioning, and digital marketing initiatives in technology-driven environments (SaaS, fintech, and enterprise). Skilled at engaging cross-functional teams and driving organizational culture, while leveraging content creation to highlight technological innovation. Proven track record of delivering high-impact strategies in employee engagement, global event coordination, and change management to foster an inclusive and dynamic work culture. Fluent in English and proficient in Spanish, adept at collaborating in multicultural settings.
`;

  // Professional Experience (English)
  const professionalExperience = [
    {
      title: 'Marketing Coordinator',
      company: 'IBVI',
      period: 'Aug 2022 – Present',
      location: 'São Paulo, Brazil',
      highlights: [
        'Oversee multi-channel marketing initiatives, including internal communication campaigns and corporate events to drive company-wide engagement.',
        'Collaborate with Product and HR teams to highlight the company’s innovative projects, ensuring employees understand and embrace new technologies.',
        'Implemented consistent messaging frameworks that streamlined change management efforts, improving organizational alignment by 30%.',
        'Led a small global team focusing on both internal and external brand positioning, integrating feedback from cross-located stakeholders.',
      ],
    },
    {
      title: 'Marketing Manager',
      company: 'MBRAS',
      period: 'Oct 2021 – Aug 2022',
      location: 'São Paulo, Brazil',
      highlights: [
        'Managed corporate branding and events, reinforcing company culture through targeted internal communication channels and organizational workshops.',
        'Developed content strategies to showcase R&D innovations, increasing employee awareness of new product lines and boosting cross-department collaboration.',
        'Introduced project management frameworks for large-scale internal initiatives, ensuring synchronized execution across multiple teams.',
        'Incorporated advanced analytics and feedback loops to measure the effectiveness of internal campaigns, guiding incremental improvements.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'ConnectAD',
      period: 'Dec 2019 – Nov 2021',
      location: 'São Paulo, Brazil',
      highlights: [
        'Rolled out strategic internal communication programs to accompany product launches, aligning teams on core messages and technical innovations.',
        'Coordinated branding updates, from messaging to visual identity, fostering a unified, innovation-centric corporate culture.',
        'Spearheaded efforts to integrate communication channels (email, intranet, Slack) and measure engagement metrics, leading to a 20% increase in participation.',
        'Supported cross-department knowledge-sharing sessions, highlighting technology-forward solutions and sustaining a learning-focused environment.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'Viva Linda',
      period: '2016 – Dec 2019',
      location: 'Sete Lagoas, Brazil',
      highlights: [
        'Oversaw internal and external branding strategies, executing campaigns to enhance corporate identity and spark employee involvement.',
        'Promoted synergy between Marketing and Operations teams through interactive events and targeted communication, boosting collaboration by 25%.',
        'Introduced new digital channels for workplace engagement, significantly improving the reach of cultural and training initiatives.',
      ],
    },
  ];

  // Skills & Competencies (English)
  const skillsCompetencies = [
    'Internal Communication & Corporate Events Coordination',
    'Strategic Content Creation Focused on Technology & Innovation',
    'Change Management & Organizational Culture Building',
    'Leadership of Cross-Functional & Multicultural Teams',
    'Paid Media & Demand Generation (Google Ads, LinkedIn Ads)',
    'ABM and Advanced Segmentation for B2B Markets',
    'Data Analytics & Reporting (GA, Tag Manager, BI Tools)',
    'Marketing Automation & CRM (HubSpot, Salesforce)',
    'Fluent in English, Proficient in Spanish',
    'Collaboration with Sales, HR & Product Teams',
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
    'Corporate Communication Tools (Teams, Slack, Intranet Platforms)',
    'Experience with Jira, Git, CI/CD, and AI Platforms',
  ];

  // Additional Information (English)
  const additionalInfo = `
• Passionate about cultivating inclusive, tech-savvy workplaces through clear communication, corporate events, and effective knowledge sharing.
• Adept at engaging diverse teams, ensuring that each member understands and embraces the organization's evolving vision and technological breakthroughs.
• Track record in driving brand awareness both internally and externally, aligning marketing objectives with broader company culture.
• Open to global or remote roles; experienced in leading multicultural projects and overseeing communication initiatives across multiple time zones.
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
