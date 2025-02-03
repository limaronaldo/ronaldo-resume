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
          `Resume of ${contactInfo.name} – a Product Marketing Manager with deep expertise in driving digital transformations and go-to-market strategies.`
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

  // Professional Summary (Updated)
  const professionalSummary = `
Dynamic Product Marketing Manager with over 10 years of experience driving digital transformations in the technology and telecom spaces. Skilled in crafting compelling go-to-market strategies, leading cross-functional teams, and bridging product vision with market demands. Strong background in BSS (Billing, Sales, and Customer Care) solutions, performance marketing, and data analytics. Adept at delivering impactful pre-sales materials, product positioning, and growth-focused campaigns in collaboration with Sales, Presales, R&D, and Product teams.
`;

  // Professional Experience (Updated)
  const professionalExperience = [
    {
      title: 'Product Marketing Manager',
      company: 'IBVI (Fintech & Telecom Division)',
      period: 'Aug 2022 – Present',
      location: 'São Paulo, Brazil',
      highlights: [
        'Led digital transformation initiatives by aligning product positioning with BSS solution demands, ensuring consistent messaging across marketing and sales materials.',
        'Spearheaded global go-to-market strategies for credit and charging products, increasing user acquisition by 25% through performance marketing and advanced analytics.',
        'Created and delivered pre-sales content (presentations, white papers, ROI models) in collaboration with sales and presales teams, securing key enterprise accounts.',
        'Utilized KPI-driven insights (CPC, CPA, CTR, ROI) to refine marketing tactics, culminating in improved revenue and higher product adoption rates.',
      ],
    },
    {
      title: 'Marketing Manager',
      company: 'MBRAS (IT & Telecom Solutions)',
      period: 'Oct 2021 – Aug 2022',
      location: 'São Paulo, Brazil',
      highlights: [
        'Developed integrated marketing strategies that positioned complex network and billing solutions as unique selling propositions in competitive telecom markets.',
        'Drove product roadmap alignment with market trends by collaborating closely with R&D and Product teams, boosting conversion rates by 40%.',
        'Coordinated end-to-end launches for next-gen BSS features, ensuring cohesive messaging and on-time release in multiple global regions.',
        'Partnered with top analytical agencies for deeper market insights, refining product storytelling and marketing content to resonate with diverse client segments.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'ConnectAD (Emerging Tech)',
      period: 'Dec 2019 – Nov 2021',
      location: 'São Paulo, Brazil',
      highlights: [
        'Managed data-driven campaigns emphasizing product differentiation for telecom and fintech products, leading to significant lead generation growth.',
        'Liaised with product and sales teams to integrate real-time customer feedback into go-to-market strategies, accelerating market penetration.',
        'Developed robust digital content (case studies, webinars, blog posts) to showcase product value, targeting key decision-makers in IT and telecom.',
        'Key Projects: • Bebêmax – streamlined product messaging across digital channels. • Ziro – improved campaign performance and engagement via targeted paid ads.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'Viva Linda (Software & Services)',
      period: '2016 – Dec 2019',
      location: 'Sete Lagoas, Brazil',
      highlights: [
        'Implemented comprehensive marketing campaigns that elevated brand awareness within the SaaS segment, driving 20% increased engagement.',
        'Collaborated with cross-department teams (sales, R&D, product) to highlight key differentiators for cloud-based solutions.',
        'Established performance metrics and reporting protocols to optimize spend across multi-channel advertising campaigns.',
      ],
    },
  ];

  // Skills & Competencies (Updated)
  const skillsCompetencies = [
    'Product Marketing Strategy & Go-to-Market Execution',
    'Expertise in BSS Solutions (Marketing, Sales, Billing, Customer Care)',
    'Performance Marketing & Data Analytics (CPC, CPA, CTR, ROI)',
    'Pre-Sales Content Creation (Whitepapers, Case Studies, Presentations)',
    'Cross-functional Collaboration (Sales, Presales, R&D, Product Management)',
    'Market Research, Competitive Analysis & Analyst Relations (Gartner, IDC, etc.)',
    'Strategic Messaging & Product Positioning in Telecom/IT',
    'CRM & Marketing Automation (HubSpot, Salesforce)',
    'Budget Planning & ROI Optimization',
    'Fluent in English, Proficient in Spanish',
  ];

  // Education (Updated if needed)
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

  // Tools & Certifications (Updated)
  const toolsCertifications = [
    'Professional Scrum Master I (Scrum.org)',
    'Google Ads Search Certification',
    'SEO & Inbound Marketing Certifications',
    'Advanced SQL (LinkedIn Learning)',
    'Expertise with Jira, Git, CI/CD, and AI Platforms',
    'HubSpot Marketing Software',
    'Google Analytics Certified',
  ];

  // Additional Information (Updated)
  const additionalInfo = `
• Passionate about pioneering next-generation technology solutions and driving large-scale digital transformations.
• Demonstrated success in leading and mentoring product marketing teams to exceed targets and optimize workflows.
• Skilled at forging strategic partnerships with sales, presales, and industry analysts to amplify market visibility.
• Advanced proficiency in English; experienced with global, cross-cultural teams in hybrid or distributed environments.
• Open to hybrid work arrangements from local offices and eager to tackle complex technical solutions in a dynamic environment.
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
