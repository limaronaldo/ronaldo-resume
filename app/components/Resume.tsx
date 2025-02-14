//app/components/Resume.tsx
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
  const { t, i18n, ready } = useTranslation();
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

  // Add effect to handle language from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lng = params.get('lng');
    if (lng && ['en', 'pt', 'es'].includes(lng)) {
      i18n.changeLanguage(lng);
    }
  }, [i18n]);

  if (!mounted || !ready) {
    return null;
  }

  const competencies = t('sections.skills_competencies.items', { returnObjects: true }) as string[];
  const roles = t('sections.experience.roles', { returnObjects: true }) as ExperienceRole[];
  const educationItems = t('sections.education.items', { returnObjects: true }) as EducationItem[];
  const languageItems = t('sections.languages.items', { returnObjects: true }) as LanguageItem[];
  const toolsCertifications = t('sections.tools_certifications.items', { returnObjects: true }) as string[];

  const whatsappNumber = t('contact.phone').replace(/[^0-9]/g, '');
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const jobTitle = customJobTitle || t('contact.role');

  return (
    <div className={`min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 ${hideControls ? 'pdf-version' : ''}`}>
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white shadow-xl rounded-xl p-8 md:p-12">
          {/* Header */}
          <header className="text-center mb-0">
            <h1 className="text-4xl font-light text-slate-900 mb-2">{t('contact.name')}</h1>
            <h2 className="text-2xl text-slate-600 font-light mb-6">{jobTitle}</h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-slate-500 font-light mb-4">
              <a href={`mailto:${t('contact.email')}`} className="hover:text-slate-700 transition-colors">
                {t('contact.email')}
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors">
                {t('contact.phone')}
              </a>
              <span>{t('contact.location')}</span>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mb-8">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">{t('sections.professional_summary.title')}</h3>
            <p className="text-md text-slate-600 font-light leading-relaxed">
              {t('sections.professional_summary.content').replace(t('contact.role'), jobTitle)}
            </p>
          </section>

          {/* Professional Experience */}
          <section className="mb-8">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">{t('sections.experience.title')}</h3>
            
            {Array.isArray(roles) && roles.map((role, index) => (
              <div key={index} className="mt-3 mb-10 last:mb-0 relative pl-4">
                <div className="flex flex-col">
                  <div className="flex justify-between items-baseline mb-2">
                    <h4 className="text-xl text-slate-800 font-normal">
                      {role.title} <span className="text-slate-600">– {role.company}</span>
                    </h4>
                    <p className="text-sm text-slate-500 font-light whitespace-nowrap ml-2">{role.period}</p>
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

          {/* Skills & Competencies */}
          <section className="mb-12">
            <h3 className="text-2xl font-light text-slate-900 mb-6 tracking-wide uppercase">{t('sections.skills_competencies.title')}</h3>
            <div className="grid grid-cols-2 gap-6 text-slate-600 font-light">
              {Array.isArray(competencies) && competencies.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-slate-400 mr-3">•</span>
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mt-24 mb-12">
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