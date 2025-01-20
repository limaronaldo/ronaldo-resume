'use client';

import { useEffect, useState } from 'react';

export default function ResumeAI() {
  const [mounted, setMounted] = useState(false);

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

  if (!mounted) {
    return null;
  }

  const contactInfo = {
    name: 'Ronaldo Lima',
    role: 'Social Media Content Strategist - AI Trainer',
    email: 'ronaldo.lima.marketing@gmail.com',
    phone: '+55 11 93459-2736',
    location: 'São Paulo, Brazil',
  };

  const professionalSummary = `
    I am a Social Media Content Strategist and AI Trainer with proven experience
    in content creation, audience engagement, and advanced AI tools. My focus 
    is on leveraging AI-driven analytics to optimize social media strategies,
    improve brand visibility, and increase conversions in agile and fast-paced environments.
  `;

  const keyResponsibilities = [
    'Develop and implement innovative social media strategies leveraging AI for brand engagement.',
    'Train and fine-tune AI tools with relevant data to improve content recommendations and analytics.',
    'Provide structured feedback for continuous AI model improvement and enhanced accuracy.',
    'Stay updated on social media trends, platform algorithm changes, and AI advances.',
    'Analyze performance metrics to drive data-backed improvements and strategies.',
    'Work cross-functionally with data scientists, marketers, and creative teams to align AI solutions with business goals.',
  ];

  const requiredSkills = [
    'Proven experience in content creation and social media management.',
    'Strong understanding of major social media platforms and their algorithms.',
    'Familiarity with AI tools (e.g., ChatGPT) for audience segmentation and performance analytics.',
    'Excellent analytical skills to interpret social media performance data.',
    'Adaptable to emerging trends and technologies in social media marketing.',
    'Exceptional written and verbal communication skills.',
  ];

  const preferredQualifications = [
    'Experience in AI training or a related field.',
    'Knowledge of database management and optimization.',
    'Familiarity with SEO and its integration into social media strategies.',
    'Certification in AI-related courses or social media strategy.',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <main className="container mx-auto px-4 py-8 max-w-5xl">
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
              <a href={`mailto:${contactInfo.email}`} className="hover:text-slate-700 transition-colors">
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

          {/* Key Responsibilities */}
          <section className="mb-8">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Key Responsibilities
            </h3>
            <ul className="space-y-2 text-slate-600 font-light">
              {keyResponsibilities.map((resp, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-slate-400 mr-3">•</span>
                  <span className="text-base leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Required Skills & Qualifications */}
          <section className="mb-8">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Required Skills & Qualifications
            </h3>
            <ul className="space-y-2 text-slate-600 font-light">
              {requiredSkills.map((skill, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-slate-400 mr-3">•</span>
                  <span className="text-base leading-relaxed">{skill}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Preferred Qualifications */}
          <section className="mb-8">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">
              Preferred Qualifications
            </h3>
            <ul className="space-y-2 text-slate-600 font-light">
              {preferredQualifications.map((qual, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-slate-400 mr-3">•</span>
                  <span className="text-base leading-relaxed">{qual}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Additional Info */}
          <section className="border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-light text-slate-900 mb-6">
              Additional Information
            </h3>
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              This role is available on a full-time or part-time contract basis with remote flexibility.  
              At micro1, we connect skilled remote professionals with companies in Silicon Valley.  
              Our partners include Deel, Immutable, O&apos;Gara, and LegalSoft.  
              Enjoy a stable, competitive income, and unlock top industry opportunities in a flexible work setting.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
} 