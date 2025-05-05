
// Localized payment methods including EFT, USSD, and QR code payments

export type PaymentMethodType = 'eft' | 'ussd' | 'qr' | 'card' | 'wallet';

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  name: string;
  description: string;
  isAvailable: boolean;
  handlerFunction: (amount: number, reference: string) => Promise<PaymentMethodResult>;
  icon?: string;
}

export interface PaymentMethodResult {
  success: boolean;
  transactionId?: string;
  message?: string;
  redirectUrl?: string;
  qrCodeData?: string;
  ussdString?: string;
}

// Generate a dynamic QR code for payments
export const generatePaymentQR = async (
  amount: number,
  reference: string,
  type: 'snapscan' | 'zapper' | 'universal' = 'universal'
): Promise<string> => {
  // In a real implementation, this would generate an actual QR code using a library
  // For this demo, we'll just return a placeholder URL
  const qrData = `${type}://pay?amount=${amount}&reference=${reference}&timestamp=${Date.now()}`;
  console.log(`Generated QR code data: ${qrData}`);
  
  // Return a base64 encoded QR code placeholder
  return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==`;
};

// Generate USSD code for mobile payments
export const generateUSSDCode = (
  amount: number,
  reference: string,
  provider: 'vodacom' | 'mtn' | 'telkom' | 'cellc' = 'vodacom'
): string => {
  const providerCodes = {
    vodacom: '*134*',
    mtn: '*136*',
    telkom: '*180*',
    cellc: '*147*'
  };
  
  // Format the USSD code based on provider standards
  const ussdCode = `${providerCodes[provider]}${amount}*${reference}#`;
  console.log(`Generated USSD code: ${ussdCode}`);
  
  return ussdCode;
};

// Available payment methods with handlers
export const getAvailablePaymentMethods = (): PaymentMethod[] => {
  return [
    {
      id: 'eft_standard',
      type: 'eft',
      name: 'Bank Transfer (EFT)',
      description: 'Pay directly from your bank account',
      isAvailable: true,
      handlerFunction: async (amount, reference) => {
        console.log(`Processing EFT payment: R${amount}, ref: ${reference}`);
        await new Promise(resolve => setTimeout(resolve, 800));
        return {
          success: true,
          transactionId: `eft_${Date.now()}`,
          message: 'Please use the banking details provided to complete the transfer'
        };
      }
    },
    {
      id: 'ussd_payment',
      type: 'ussd',
      name: 'USSD Payment',
      description: 'Pay using your mobile phone',
      isAvailable: true,
      handlerFunction: async (amount, reference) => {
        const ussdCode = generateUSSDCode(amount, reference);
        return {
          success: true,
          message: 'Dial the USSD code on your phone to complete payment',
          ussdString: ussdCode
        };
      }
    },
    {
      id: 'qr_payment',
      type: 'qr',
      name: 'Scan to Pay',
      description: 'Pay by scanning a QR code',
      isAvailable: true,
      handlerFunction: async (amount, reference) => {
        const qrCodeData = await generatePaymentQR(amount, reference);
        return {
          success: true,
          message: 'Scan the QR code with your banking app to pay',
          qrCodeData
        };
      }
    },
    {
      id: 'card_payment',
      type: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay with your card (supports 3DS)',
      isAvailable: true,
      handlerFunction: async (amount, reference) => {
        console.log(`Processing card payment: R${amount}, ref: ${reference}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
          success: true,
          transactionId: `card_${Date.now()}`,
          redirectUrl: '/payment/3ds-verification'
        };
      }
    }
  ];
};
