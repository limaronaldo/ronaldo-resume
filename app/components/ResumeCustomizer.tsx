//app/components/ResumeCustomizer.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Resume from './Resume';

export default function ResumeCustomizer() {
  const { t, i18n } = useTranslation();
  const [jobTitle, setJobTitle] = useState(t('contact.role'));
  const [isGenerating, setIsGenerating] = useState(false);

  // Update job title when language changes
  useEffect(() => {
    setJobTitle(t('contact.role'));
  }, [t, i18n.language]);

  const downloadPDF = async () => {
    try {
      setIsGenerating(true);
      const pdfUrl = `${window.location.origin}/resume?lng=${i18n.language}`;

      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: pdfUrl,
          jobTitle,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Create initials from job title
      const initials = jobTitle
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();
      
      a.download = `RonaldoLima-${initials}-${i18n.language}.pdf`;
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

  const handleLanguageChange = async (lang: string) => {
    await i18n.changeLanguage(lang);
    // Force a re-render by updating the URL without navigation
    const url = new URL(window.location.href);
    url.searchParams.set('lng', lang);
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 print:hidden">
        <div className="max-w-[210mm] mx-auto p-4">
          <div className="bg-white shadow-lg rounded-2xl p-4 mb-2">
            <div className="mb-8">
              <label htmlFor="jobTitle" className="block text-lg font-light text-slate-900 mb-1">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-1 text-lg text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Enter job title..."
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    i18n.language === 'en'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange('pt')}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    i18n.language === 'pt'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Português
                </button>
                <button
                  onClick={() => handleLanguageChange('es')}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    i18n.language === 'es'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Español
                </button>
              </div>
              
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
          </div>

          <Resume customJobTitle={jobTitle} hideControls />
        </div>
      </div>
    </>
  );
} 