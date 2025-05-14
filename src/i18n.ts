
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
    
    // Missing translations should fall back to English
    saveMissing: true,
    saveMissingTo: 'fallback',
    
    react: {
      useSuspense: true,
    },
    
    // Add a retry mechanism for loading translation files
    load: 'currentOnly',
    
    // Prevent error spam in console for missing translations
    parseMissingKeyHandler: (key) => {
      return key;
    }
  });

// Add new translation keys
i18n.addResources('en', 'translation', {
  settings: {
    languageRegion: 'Language & Region',
    languageSettings: 'Language Settings',
    regionalSettings: 'Regional Settings'
  }
});

i18n.addResources('zu', 'translation', {
  settings: {
    languageRegion: 'Ulimi Nesifunda',
    languageSettings: 'Izilungiselelo Zolimi',
    regionalSettings: 'Izilungiselelo Zesifunda'
  }
});

i18n.addResources('af', 'translation', {
  settings: {
    languageRegion: 'Taal & Streek',
    languageSettings: 'Taalinstellings',
    regionalSettings: 'Streeksinstellings'
  }
});

i18n.addResources('xh', 'translation', {
  settings: {
    languageRegion: 'Ulwimi Nommandla',
    languageSettings: 'Iisethingi Zolwimi',
    regionalSettings: 'Iisethingi Zommandla'
  }
});

export default i18n;
