
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
  },
  payment: {
    integration: 'Banking & Open Finance Integration',
    description: 'Process payments through various payment methods and banking integrations',
    gateways: 'Payment Gateways',
    saBanks: 'SA Banks',
    globalRails: 'Global Rails',
    amount: 'Amount',
    selectGateway: 'Select Payment Gateway',
    selectGatewayPlaceholder: 'Select a payment gateway',
    complianceTitle: 'PCI-DSS 4.0 Compliant',
    complianceDescription: 'All payments are processed securely using PCI-DSS 4.0 compliant infrastructure.',
    processing: 'Processing...',
    processPayment: 'Process Payment',
    selectBank: 'Select Bank',
    selectBankPlaceholder: 'Select a bank',
    bankStandardsTitle: 'Bank Integration Standards',
    bankStandardsDescription: 'All bank integrations comply with HSM, PCI-DSS 4.0, SWIFT CSP, and ISO 27001 standards.',
    processBankPayment: 'Process Bank Payment',
    selectRail: 'Select Global Payment Rail',
    selectRailPlaceholder: 'Select a payment rail',
    globalSupportTitle: 'Global Payment Support',
    globalSupportDescription: 'We support UPI/IMPS (India), WeChat/Alipay (China), Pix/SPEI (Latin America), SEPA (EU), and ACH (US).',
    processGlobalPayment: 'Process Global Payment'
  },
  alerts: {
    latestNotifications: 'Latest notifications from your supply chain',
    severity: {
      high: 'high',
      medium: 'medium',
      low: 'low'
    },
    items: {
      1: {
        title: 'Low Stock Alert',
        description: 'Product XYZ-123 is below minimum threshold',
        time: '10 minutes ago'
      },
      2: {
        title: 'Shipment Delayed',
        description: 'Order #45678 delivery will be delayed by 2 days',
        time: '2 hours ago'
      },
      3: {
        title: 'Price Increase Notice',
        description: 'Supplier ABC Corp announced 5% price increase',
        time: '1 day ago'
      },
      4: {
        title: 'New Compliance Requirement',
        description: 'Update needed for new safety regulations',
        time: '2 days ago'
      }
    }
  },
  orders: {
    statusSummary: 'Order Status Summary',
    status: {
      delivered: 'Delivered',
      shipped: 'Shipped',
      processing: 'Processing',
      pending: 'Pending',
      cancelled: 'Cancelled'
    }
  }
});

i18n.addResources('zu', 'translation', {
  settings: {
    languageRegion: 'Ulimi Nesifunda',
    languageSettings: 'Izilungiselelo Zolimi',
    regionalSettings: 'Izilungiselelo Zesifunda'
  },
  payment: {
    integration: 'Ukuhlanganiswa Kwamabhange Nezezimali Ezivulekile',
    description: 'Yenza izinkokhelo ngezindlela ezahlukene zokukhokha nokuhlanganisa amabhange',
    gateways: 'Amasango Okukhokha',
    saBanks: 'Amabhange ase-SA',
    globalRails: 'Amabhange Omhlaba',
    amount: 'Inani',
    selectGateway: 'Khetha Isango Lokukhokha',
    selectGatewayPlaceholder: 'Khetha isango lokukhokha',
    complianceTitle: 'PCI-DSS 4.0 Ivumelana',
    complianceDescription: 'Zonke izinkokhelo zenziwa ngokuphephile kusetshenziswa ingqalasizinda evumelana ne-PCI-DSS 4.0.',
    processing: 'Iyacubungula...',
    processPayment: 'Yenza Inkokhelo',
    selectBank: 'Khetha Ibhange',
    selectBankPlaceholder: 'Khetha ibhange',
    bankStandardsTitle: 'Amazinga Wokuhlanganiswa Kwebhange',
    bankStandardsDescription: 'Zonke izinhlanganiso zamabhange zilandela amazinga e-HSM, i-PCI-DSS 4.0, i-SWIFT CSP, ne-ISO 27001.',
    processBankPayment: 'Yenza Inkokhelo Yebhange',
    selectRail: 'Khetha Umzila Wokukhokha Emhlabeni',
    selectRailPlaceholder: 'Khetha umzila wokukhokha',
    globalSupportTitle: 'Ukwesekwa Kwezinkokhelo Zomhlaba',
    globalSupportDescription: 'Sisekelekele i-UPI/IMPS (India), i-WeChat/Alipay (China), i-Pix/SPEI (Latin America), i-SEPA (EU), ne-ACH (US).',
    processGlobalPayment: 'Yenza Inkokhelo Yomhlaba'
  },
  alerts: {
    latestNotifications: 'Izaziso zakamuva kusuka ekuhlinzekeni kwakho',
    severity: {
      high: 'ephezulu',
      medium: 'maphakathi',
      low: 'phansi'
    },
    items: {
      1: {
        title: 'Isaziso Sempahla Ephansi',
        description: 'Umkhiqizo XYZ-123 uphansi kwesibalo esincane',
        time: 'imizuzu engu-10 edlule'
      },
      2: {
        title: 'Ukulethwa Kuyephuzile',
        description: 'I-order #45678 izophuzisa izinsuku ezingu-2',
        time: 'amahora amabili adlule'
      },
      3: {
        title: 'Isaziso Sokwenyuka Kwentengo',
        description: 'Imboni ABC Corp yazisa ngokwenyuka kwentengo ngo-5%',
        time: 'usuku olungu-1 oludlule'
      },
      4: {
        title: 'Isidingo Sokulandela Esisha',
        description: 'Kudingeka ukuvuselelwa kwemigomo emisha yokuphepha',
        time: 'izinsuku ezingu-2 ezidlule'
      }
    }
  },
  orders: {
    statusSummary: 'Isifinyezo Sesimo Se-oda',
    status: {
      delivered: 'Ilethiwe',
      shipped: 'Ithunyelwe',
      processing: 'Iyasesha',
      pending: 'Ilindile',
      cancelled: 'Ikhanseliwe'
    }
  }
});

i18n.addResources('af', 'translation', {
  settings: {
    languageRegion: 'Taal & Streek',
    languageSettings: 'Taalinstellings',
    regionalSettings: 'Streeksinstellings'
  },
  payment: {
    integration: 'Bank- en Oop Finansies-integrasie',
    description: 'Verwerk betalings deur verskeie betaalmetodes en bankintegrasies',
    gateways: 'Betaalhekke',
    saBanks: 'SA Banke',
    globalRails: 'Globale Spore',
    amount: 'Bedrag',
    selectGateway: 'Kies Betaalhek',
    selectGatewayPlaceholder: 'Kies ʼn betaalhek',
    complianceTitle: 'PCI-DSS 4.0 Voldoen',
    complianceDescription: 'Alle betalings word veilig verwerk met behulp van PCI-DSS 4.0-voldoende infrastruktuur.',
    processing: 'Verwerking...',
    processPayment: 'Verwerk Betaling',
    selectBank: 'Kies Bank',
    selectBankPlaceholder: 'Kies ʼn bank',
    bankStandardsTitle: 'Bankintegrasiestandaarde',
    bankStandardsDescription: 'Alle bankintegrasies voldoen aan HSM, PCI-DSS 4.0, SWIFT CSP en ISO 27001 standaarde.',
    processBankPayment: 'Verwerk Bankbetaling',
    selectRail: 'Kies Globale Betaalspoor',
    selectRailPlaceholder: 'Kies ʼn betaalspoor',
    globalSupportTitle: 'Globale Betalingsondersteuning',
    globalSupportDescription: 'Ons ondersteun UPI/IMPS (Indië), WeChat/Alipay (China), Pix/SPEI (Latyns-Amerika), SEPA (EU) en ACH (VSA).',
    processGlobalPayment: 'Verwerk Globale Betaling'
  },
  alerts: {
    latestNotifications: 'Nuutste kennisgewings van jou voorsieningsketting',
    severity: {
      high: 'hoog',
      medium: 'medium',
      low: 'laag'
    },
    items: {
      1: {
        title: 'Lae Voorraad Waarskuwing',
        description: 'Produk XYZ-123 is onder minimum drempel',
        time: '10 minute gelede'
      },
      2: {
        title: 'Verskeping Vertraag',
        description: 'Bestelling #45678 aflewering sal met 2 dae vertraag word',
        time: '2 uur gelede'
      },
      3: {
        title: 'Prysverhoging Kennisgewing',
        description: 'Verskaffer ABC Corp het 5% prysverhoging aangekondig',
        time: '1 dag gelede'
      },
      4: {
        title: 'Nuwe Nakomingsvereiste',
        description: 'Opdatering benodig vir nuwe veiligheidsregulasies',
        time: '2 dae gelede'
      }
    }
  },
  orders: {
    statusSummary: 'Bestelstatus Opsomming',
    status: {
      delivered: 'Afgelewer',
      shipped: 'Verskeep',
      processing: 'Verwerking',
      pending: 'Hangende',
      cancelled: 'Gekanselleer'
    }
  }
});

i18n.addResources('xh', 'translation', {
  settings: {
    languageRegion: 'Ulwimi Nommandla',
    languageSettings: 'Iisethingi Zolwimi',
    regionalSettings: 'Iisethingi Zommandla'
  },
  payment: {
    integration: 'Ukudibanisa Iibhanki Nezemali Ezivulekileyo',
    description: 'Sebenzisa iintlawulo ngeendlela ezahlukeneyo zokuhlawula nokudibana neebhanki',
    gateways: 'Amasango Okuhlawula',
    saBanks: 'Iibhanki zase-SA',
    globalRails: 'Iimeko Zehlabathi',
    amount: 'Isixa',
    selectGateway: 'Khetha Isango Lokuhlawula',
    selectGatewayPlaceholder: 'Khetha isango lokuhlawula',
    complianceTitle: 'PCI-DSS 4.0 Iyavumelana',
    complianceDescription: 'Zonke iintlawulo zenziwa ngokukhuselekileyo kusetyenziswa iziseko ezivumelana ne-PCI-DSS 4.0.',
    processing: 'Iyaqhubeka...',
    processPayment: 'Yenza Intlawulo',
    selectBank: 'Khetha Ibhanki',
    selectBankPlaceholder: 'Khetha ibhanki',
    bankStandardsTitle: 'Imigangatho Yokudibana Nebhanki',
    bankStandardsDescription: 'Zonke iintlanganiso zeebhanki zithobela imigangatho ye-HSM, i-PCI-DSS 4.0, i-SWIFT CSP, ne-ISO 27001.',
    processBankPayment: 'Yenza Intlawulo Yebhanki',
    selectRail: 'Khetha Umgaqo Wokuhlawula Wehlabathi',
    selectRailPlaceholder: 'Khetha umgaqo wokuhlawula',
    globalSupportTitle: 'Inkxaso Yeentlawulo Zehlabathi',
    globalSupportDescription: 'Sinkxasa i-UPI/IMPS (India), i-WeChat/Alipay (China), i-Pix/SPEI (Latin America), i-SEPA (EU), ne-ACH (US).',
    processGlobalPayment: 'Yenza Intlawulo Yehlabathi'
  },
  alerts: {
    latestNotifications: 'Izaziso zakutsha kwiindlela zakho zokubonelela',
    severity: {
      high: 'ephezulu',
      medium: 'phakathi',
      low: 'phantsi'
    },
    items: {
      1: {
        title: 'Isilumkiso Sempahla Ephantsi',
        description: 'Imveliso XYZ-123 ingaphantsi komlinganiselo osezantsi',
        time: 'imizuzu eli-10 edluleyo'
      },
      2: {
        title: 'Ukuthunyelwa Kuyalibaziseka',
        description: 'Umyalelo #45678 ukulethwa kuza kulibaziseka ngeentsuku ezi-2',
        time: 'iiyure ezi-2 ezidluleyo'
      },
      3: {
        title: 'Isaziso Sokunyuka Kwexabiso',
        description: 'Inkampani ABC Corp yazise ukunyuka kwexabiso nge-5%',
        time: 'usuku olu-1 oludluleyo'
      },
      4: {
        title: 'Imfuneko Entsha Yokuthobela',
        description: 'Kufuneka uhlaziyo lwemithetho emitsha yokhuseleko',
        time: 'iintsuku ezi-2 ezidluleyo'
      }
    }
  },
  orders: {
    statusSummary: 'Isishwankathelo Sebango Lomyalelo',
    status: {
      delivered: 'Ilethiwe',
      shipped: 'Ithunyelwe',
      processing: 'Iyenzeka',
      pending: 'Ilindile',
      cancelled: 'Irhoxisiwe'
    }
  }
});

export default i18n;
