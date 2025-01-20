//app/resume/page.tsx
'use client';

import ResumeCustomizer from '../components/ResumeCustomizer';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/client';

export default function ResumePage() {
  return (
    <I18nextProvider i18n={i18n}>
      <ResumeCustomizer />
    </I18nextProvider>
  );
} 