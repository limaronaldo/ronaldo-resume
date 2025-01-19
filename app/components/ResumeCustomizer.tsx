'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Resume from './Resume';

export default function ResumeCustomizer() {
  const { t, i18n } = useTranslation();
  const [jobTitle, setJobTitle] = useState(t('contact.role'));
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'resume',
          url: window.location.href,
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
              <div className="flex gap-4">
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    i18n.language === 'en' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => i18n.changeLanguage('pt')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    i18n.language === 'pt' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Português
                </button>
                <button
                  onClick={() => i18n.changeLanguage('es')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    i18n.language === 'es' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Español
                </button>
              </div>
              
              <button
                onClick={downloadPDF}
                disabled={isGenerating}
                className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  'Download PDF'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="print:block" id="pdf-content">
        <Resume customJobTitle={jobTitle} hideControls />
      </div>
    </>
  );
} 