'use client';

import { useState } from 'react';

export default function CoverLetterGenerator() {
  const [formData, setFormData] = useState({
    hiringManagerName: '',
    companyName: '',
    companyAddress: '',
    positionTitle: '',
    companyInitiatives: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const downloadPDF = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'cover-letter',
          url: window.location.href,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cover-letter-${formData.companyName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white shadow-lg ring-1 ring-slate-100 rounded-2xl p-8">
            <h2 className="text-2xl font-light text-slate-900 mb-6 tracking-wide">Cover Letter Generator</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-light text-slate-700 mb-2">Hiring Manager&apos;s Name</label>
                <input
                  type="text"
                  name="hiringManagerName"
                  value={formData.hiringManagerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none text-slate-600"
                  placeholder="e.g., John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-slate-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none text-slate-600"
                  placeholder="e.g., Acme Corporation"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-slate-700 mb-2">Company Address</label>
                <input
                  type="text"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none text-slate-600"
                  placeholder="e.g., 123 Business Street, City, State"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-slate-700 mb-2">Position Title</label>
                <input
                  type="text"
                  name="positionTitle"
                  value={formData.positionTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none text-slate-600"
                  placeholder="e.g., Senior Product Marketing Manager"
                />
              </div>
              <div>
                <label className="block text-sm font-light text-slate-700 mb-2">Company Initiatives/Values</label>
                <textarea
                  name="companyInitiatives"
                  value={formData.companyInitiatives}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none text-slate-600 h-32"
                  placeholder="e.g., innovative AI solutions, customer-centric approach"
                />
              </div>
              <button
                type="button"
                onClick={downloadPDF}
                disabled={isGenerating}
                className="w-full bg-slate-900 text-white py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors duration-200 font-light disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            </form>
          </div>

          {/* Preview Section */}
          <div className="bg-white shadow-lg ring-1 ring-slate-100 rounded-2xl p-8">
            <h2 className="text-2xl font-light text-slate-900 mb-6 tracking-wide">Preview</h2>
            <div id="cover-letter-content" className="prose prose-slate max-w-none text-slate-900">
              <p className="text-right mb-6 text-slate-900 font-normal">{today}</p>

              <div className="mb-8 text-slate-900 font-normal">
                <p>{formData.hiringManagerName || '[Hiring Manager Name]'}</p>
                <p>{formData.companyName || '[Company Name]'}</p>
                <p>{formData.companyAddress || '[Company Address]'}</p>
              </div>

              <p className="mb-4 text-slate-900 font-normal">Dear {formData.hiringManagerName || '[Hiring Manager Name]'},</p>

              <p className="mb-4 text-slate-900 font-normal">
                I am thrilled to submit my application for the {formData.positionTitle || '[Position Title]'} at {formData.companyName || '[Company Name]'}. With a proven track record in Product Marketing, Growth, and AI-driven solutions, I am confident that my blend of strategic insight, technical expertise, and collaborative leadership can drive significant impact for your organization.
              </p>

              <p className="mb-4 text-slate-900 font-normal">
                In my current role as a Growth Product Manager at IBVI, I have successfully integrated advanced Large Language Models&mdash;such as Google Gemini, ChatGPT, and Meta Llama&mdash;into marketing processes to enhance lead qualification and conversion. This experience has sharpened my ability to manage cross-functional teams and ensure every project not only meets but exceeds its objectives.
              </p>

              <p className="mb-4 text-slate-900 font-normal">
                I am particularly drawn to {formData.companyName || '[Company Name]'} for its focus on {formData.companyInitiatives || '[mention specific company initiatives or values]'}, as I believe the synergy between your team&apos;s forward-thinking culture and my passion for innovation would be a perfect match.
              </p>

              <p className="mb-4 text-slate-900 font-normal">
                I appreciate your time and consideration. I would welcome the chance to learn more about {formData.companyName || '[Company Name]'}&apos;s vision and discuss how my expertise could support your growth.
              </p>

              <p className="mb-8 text-slate-900 font-normal">Thank you for your consideration, and I look forward to the opportunity to speak with you further.</p>

              <div className="text-slate-900 font-normal">
                <p>Sincerely,</p>
                <p>Ronaldo Lima</p>
                <p>Product Marketing Manager</p>
                <p>Alto de Pinheiros, São Paulo, SP</p>
                <p>ronaldomlima@gmail.com | +55 11 93459-2736</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 