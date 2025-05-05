
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// South African official languages ISO codes
export const supportedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'zu', name: 'isiZulu' },
  { code: 'xh', name: 'isiXhosa' },
  { code: 'nso', name: 'Sesotho sa Leboa' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'st', name: 'Sesotho' },
  { code: 'tn', name: 'Setswana' },
  { code: 'ts', name: 'Xitsonga' },
  { code: 'ss', name: 'siSwati' },
  { code: 've', name: 'Tshivenda' },
  { code: 'nr', name: 'isiNdebele' }
];

// Cultural sensitivity scoring threshold
export const CULTURAL_SENSITIVITY_THRESHOLD = 90;

// Initialize i18n
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    // Load translations from the public/locales/{language}/translation.json
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // BLEU score metrics information for evaluation
    // Target: 98% linguistic accuracy
    saveMissing: true,
    saveMissingTo: 'fallback',
    
    react: {
      useSuspense: true,
    },
  });

export default i18n;
