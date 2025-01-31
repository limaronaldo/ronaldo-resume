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
          `Resume for ${contactInfo.role} – highlighting generative AI and Spanish fluency.`
        );
      }
    }
  }, [mounted, contactInfo.role]);

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
          url: `${window.location.origin}/resume-tiktok`, // Changed from resume-ai to resume-tiktok
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

  // Professional Summary: highlight advanced GenAI & Spanish
  const professionalSummary = `
I am a Product Marketing Manager and Sales Strategist with professional-level Spanish fluency and a deep background in Generative AI. Having led cross-functional marketing and product teams, I excel at leveraging advanced large language models (ChatGPT, Claude, Google Gemini, etc.) to streamline global marketing strategies, lower acquisition costs, and increase conversion. My experience unites data science, product marketing, and content creation, ensuring that AI-driven initiatives are deployed effectively across diverse channels.
`;

  // Professional Experience: highlight GenAI achievements
  const professionalExperience = [
    {
      title: 'Growth Product Manager',
      company: 'IBVI',
      period: 'Aug 2022 – Present',
      location: 'São Paulo, Brazil',
      highlights: [
        'Led the integration of cutting-edge LLMs into marketing and sales workflows, enabling personalized campaign optimization at scale.',
        'Collaborated with Product and Sales teams to refine customer journeys based on AI-powered insights, improving lead quality and conversion rates.',
        <>
          Spearheaded prompt-engineering best practices, guiding teams on how to harness{' '}
          <span className="font-bold underline">Gen AI</span>
          {' '}for targeted ad copies and audience segmentation.
        </>,
      ],
    },
    {
      title: 'Marketing Manager',
      company: 'MBRAS Real Estate Solutions',
      period: 'Oct 2021 – Present',
      location: 'São Paulo, Brazil',
      highlights: [
        'Elevated global brand presence via multilingual content (English & Spanish), resonating with cross-border audiences.',
        <>
          Established a robust marketing framework that unifies paid media (Meta, Google, LinkedIn) with{' '}
          <span className="font-bold underline">generative AI</span>
          -driven content creation.
        </>,
        <>
          Trained the internal marketing team on{' '}
          <span className="font-bold underline">Gen AI</span>
          {' '}adoption, boosting campaign turnaround times and efficiency for international projects.
        </>,
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'ConnectAD',
      period: 'Dec 2019 – Nov 2021',
      location: 'São Paulo, Brazil',
      highlights: [
        'Built advanced email marketing automations and lead-nurturing funnels, leveraging AI-based A/B testing and analytics to enhance campaign ROI.',
        'Employed Python scripts, SQL, and generative AI to scale content production, reduce costs, and refine user targeting.',
        'Key Projects:',
        '• Bebêmax: Drove e-commerce growth with integrated paid media strategies, chatbots, and AI-enhanced landing pages.',
        '• Ziro (Vesti): Deployed CRM automation and generative AI tools for SEO, content creation, and brand amplification.',
      ],
    },
    {
      title: 'Marketing Coordinator',
      company: 'Viva Linda',
      period: '2016 – Dec 2019',
      location: 'Sete Lagoas, Brazil',
      highlights: [
        'Rolled out a digital transformation grounded in AI and Spanish-friendly strategies, tripling the customer base in cross-border markets.',
        'Integrated social media campaigns with retail touchpoints, improving conversions across multilingual channels.',
        'Formed a data-centric marketing team proficient in AI tools to quickly test, learn, and scale high-converting ad sets.',
      ],
    },
  ];

  // Skills & Competencies
  const skillsCompetencies = [
    'Generative AI Integration (ChatGPT, Claude, Google Gemini, Meta Llama)',
    'Spanish (Professional) & English (Fluent)',
    'Prompt Engineering & AI-driven Content Strategy',
    'Growth Marketing & Conversion Rate Optimization (CRO)',
    'CRM Implementation & Marketing Automation',
    'Media Buying (Meta Ads, Google Ads, LinkedIn Ads, TikTok Ads)',
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

  // Languages: highlight Spanish
  const languages = [
    { language: 'Portuguese', level: 'Native' },
    { language: 'English', level: 'Fluent' },
    { language: 'Spanish', level: 'Professional' },
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
I’m excited to apply my advanced Generative AI expertise and professional Spanish fluency to elevate brand positioning and customer engagement. From designing AI-enhanced funnels to crafting multilingual campaigns, I ensure businesses stay at the cutting edge of marketing innovation. Let’s collaborate to expand your global reach and outpace the competition through AI-powered strategies.
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
            {isGenerating ? 'Generating...' : 'Download PDF'}
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
            <h3 className="text-2xl font-light text-slate-900 tracking-wide uppercase mt-4">
              Professional Summary
            </h3>
            <p className="text-md text-slate-600 font-light leading-relaxed whitespace-pre-line mb-6">
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
                      {typeof highlight === 'string' ? highlight : highlight}
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
                <li
                  key={idx}
                  className={`flex items-center ${
                    // Highlight Spanish
                    lang.language === 'Spanish' ? 'bg-slate-100 p-2 rounded' : ''
                  }`}
                >
                  {/* Language */}
                  <span
                    className={
                      lang.language === 'Spanish'
                        ? 'font-bold text-xl text-slate-800'
                        : 'text-slate-800 font-light text-lg'
                    }
                  >
                    {lang.language}
                  </span>
                  <span className="text-slate-300 mx-3">•</span>
                  {/* Level */}
                  <span
                    className={
                      lang.language === 'Spanish'
                        ? 'font-extrabold text-xl text-slate-800'
                        : 'text-base text-slate-600 font-light'
                    }
                  >
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
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              {additionalInfo}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}