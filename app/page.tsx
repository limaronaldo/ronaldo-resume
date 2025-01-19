// pages/index.js

'use client';

import Resume from './components/Resume';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/client';

export default function Home() {
  return (
    <I18nextProvider i18n={i18n}>
      <Resume />
    </I18nextProvider>
  );
}
