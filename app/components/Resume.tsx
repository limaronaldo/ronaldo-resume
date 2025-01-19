'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

interface ExperienceRole {
  title: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

interface EducationItem {
  degree: string;
  school: string;
  period: string;
}

interface LanguageItem {
  language: string;
  level: string;
}

interface ResumeProps {
  customJobTitle?: string;
  hideControls?: boolean;
}

export default function Resume({ customJobTitle, hideControls = false }: ResumeProps) {
  const { t, ready } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && ready) {
      document.title = t('title');
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', t('meta_description'));
      }
    }
  }, [t, mounted, ready]);

  const downloadPDF = async () => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: window.location.href,
          jobTitle: customJobTitle,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'RonaldoLima.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  if (!mounted || !ready) {
    return null;
  }

  const competencies = t('sections.core_competencies.items', { returnObjects: true }) as string[];
  const roles = t('sections.experience.roles', { returnObjects: true }) as ExperienceRole[];
  const educationItems = t('sections.education.items', { returnObjects: true }) as EducationItem[];
  const languageItems = t('sections.languages.items', { returnObjects: true }) as LanguageItem[];
  const toolsCertifications = t('sections.tools_certifications.items', { returnObjects: true }) as string[];

  const whatsappNumber = t('contact.phone').replace(/[^0-9]/g, '');
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const jobTitle = customJobTitle || t('contact.role');

  return (
    <div className={`min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 ${hideControls ? 'pdf-version' : ''}`}>
      <div className={`absolute top-4 right-4 flex items-center gap-4 ${hideControls ? 'hidden' : ''}`}>
        <button
          onClick={downloadPDF}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-200 font-light disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Download PDF
        </button>
      </div>
      
      <main className={`max-w-[210mm] mx-auto px-4 py-16 sm:px-6 lg:px-8 ${hideControls ? 'pt-8' : ''}`}>
        <div id="resume-content" className="bg-white shadow-lg ring-1 ring-slate-100 rounded-2xl p-8 sm:p-10 print:shadow-none print:ring-0 print:rounded-none print:p-0">
          
          {/* Header / Contact Section */}
          <header className="text-center mb-12">
            <h1 className="text-6xl font-extralight text-slate-900 mb-4 tracking-wide">{t('contact.name')}</h1>
            <h2 className="text-2xl font-light text-slate-600 mb-6 tracking-wider">{jobTitle}</h2>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-slate-600 font-light">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 transition-colors duration-300"
              >
                {t('contact.phone')}
              </a>
              <a
                href={`mailto:${t('contact.email')}`}
                className="hover:text-slate-900 transition-colors duration-300"
              >
                {t('contact.email')}
              </a>
              <span>{t('contact.location')}</span>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mb-12">
            <h3 className="text-lg font-light text-slate-900 mb-4 tracking-wide uppercase">{t('sections.professional_summary.title')}</h3>
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              {t('sections.professional_summary.content').replace(t('contact.role'), jobTitle)}
            </p>
          </section>

          {/* Core Competencies */}
          <section className="mb-12">
            <h3 className="text-lg font-light text-slate-900 mb-4 tracking-wide uppercase">{t('sections.core_competencies.title')}</h3>
            <div className="grid grid-cols-2 gap-6 text-slate-600 font-light">
              {Array.isArray(competencies) && competencies.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-slate-400 mr-3">•</span>
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Professional Experience */}
          <section className="mb-12">
            <h3 className="text-2xl font-light text-slate-900 mb-8 tracking-wide uppercase">{t('sections.experience.title')}</h3>
            
            {Array.isArray(roles) && roles.map((role, index) => (
              <div key={index} className="mb-10 last:mb-0 relative pl-6">
                <div className="flex flex-col">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-xl text-slate-800 font-normal">
                      {role.title} <span className="text-slate-600">– {role.company}</span>
                    </h4>
                    <p className="text-sm text-slate-500 font-light whitespace-nowrap ml-4">{role.period}</p>
                  </div>
                  <p className="text-sm text-slate-500 font-light mb-3">{role.location}</p>
                  <ul className="space-y-2 text-slate-600 font-light">
                    {role.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-start">
                        <span className="text-slate-600 mr-2 mt-0">-</span>
                        <span className="text-base leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="mb-12">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">{t('sections.education.title')}</h3>
            <div className="space-y-4">
              {Array.isArray(educationItems) && educationItems.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-xl text-slate-800 font-normal">{item.degree}</h4>
                    <p className="text-sm text-slate-500 font-light whitespace-nowrap ml-4">{item.period}</p>
                  </div>
                  <p className="text-base text-slate-600 font-light">{item.school}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="mb-12">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">{t('sections.languages.title')}</h3>
            <div className="space-y-2">
              {Array.isArray(languageItems) && languageItems.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-lg text-slate-800 font-light">{item.language}</span>
                  <span className="text-slate-300 mx-3">•</span>
                  <span className="text-base text-slate-600 font-light">{item.level}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tools & Certifications */}
          <section className="mb-12">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">{t('sections.tools_certifications.title')}</h3>
            <div className="space-y-2">
              {Array.isArray(toolsCertifications) && toolsCertifications.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-slate-400 mr-3">•</span>
                  <span className="text-lg text-slate-600 font-light">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Information */}
          <section className="border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-light text-slate-900 mb-6">{t('sections.additional_info.title')}</h3>
            <p className="text-lg text-slate-600 font-light leading-relaxed">
              {t('sections.additional_info.content')}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
} 