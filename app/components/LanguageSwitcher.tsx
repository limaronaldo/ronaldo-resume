//app/components/LanguageSwitcher.tsx
'use client';

import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
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
  );
} 