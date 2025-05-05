
// Global payment rails integration

export interface PaymentRail {
  id: string;
  name: string;
  countryCode: string;
  currency: string;
  isAvailable: boolean;
  processorFunction: (amount: number, recipient: string, metadata?: Record<string, string>) => Promise<RailPaymentResult>;
}

export interface RailPaymentResult {
  success: boolean;
  transactionId?: string;
  estimatedTimeHours?: number;
  fees?: {
    amount: number;
    currency: string;
  };
  message?: string;
  status?: 'processing' | 'completed' | 'failed';
}

// Available global payment rails
export const globalPaymentRails: PaymentRail[] = [
  {
    id: 'upi_imps',
    name: 'UPI/IMPS',
    countryCode: 'IN',
    currency: 'INR',
    isAvailable: true,
    processorFunction: async (amount, recipient, metadata) => {
      console.log(`Processing UPI/IMPS payment: ${amount} INR to ${recipient}`, metadata);
      await new Promise(resolve => setTimeout(resolve, 1200));
      return {
        success: true,
        transactionId: `upi_${Date.now()}`,
        estimatedTimeHours: 0.1, // Near instant
        fees: {
          amount: 0,
          currency: 'INR'
        },
        status: 'completed',
        message: 'UPI payment processed successfully'
      };
    }
  },
  {
    id: 'wechat_alipay',
    name: 'WeChat/Alipay',
    countryCode: 'CN',
    currency: 'CNY',
    isAvailable: true,
    processorFunction: async (amount, recipient, metadata) => {
      console.log(`Processing WeChat/Alipay payment: ${amount} CNY to ${recipient}`, metadata);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        success: true,
        transactionId: `wechat_${Date.now()}`,
        estimatedTimeHours: 0.1, // Near instant
        fees: {
          amount: amount * 0.01,
          currency: 'CNY'
        },
        status: 'completed',
        message: 'WeChat/Alipay payment processed successfully'
      };
    }
  },
  {
    id: 'pix_spei',
    name: 'Pix/SPEI',
    countryCode: 'BR',
    currency: 'BRL',
    isAvailable: true,
    processorFunction: async (amount, recipient, metadata) => {
      console.log(`Processing Pix/SPEI payment: ${amount} BRL to ${recipient}`, metadata);
      await new Promise(resolve => setTimeout(resolve, 900));
      return {
        success: true,
        transactionId: `pix_${Date.now()}`,
        estimatedTimeHours: 0.1, // Near instant
        fees: {
          amount: 0,
          currency: 'BRL'
        },
        status: 'completed',
        message: 'Pix payment processed successfully'
      };
    }
  },
  {
    id: 'sepa',
    name: 'SEPA',
    countryCode: 'EU',
    currency: 'EUR',
    isAvailable: true,
    processorFunction: async (amount, recipient, metadata) => {
      console.log(`Processing SEPA payment: ${amount} EUR to ${recipient}`, metadata);
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        success: true,
        transactionId: `sepa_${Date.now()}`,
        estimatedTimeHours: 24, // Usually within 24 hours
        fees: {
          amount: 0.5,
          currency: 'EUR'
        },
        status: 'processing',
        message: 'SEPA payment initiated and being processed'
      };
    }
  },
  {
    id: 'ach',
    name: 'ACH',
    countryCode: 'US',
    currency: 'USD',
    isAvailable: true,
    processorFunction: async (amount, recipient, metadata) => {
      console.log(`Processing ACH payment: ${amount} USD to ${recipient}`, metadata);
      await new Promise(resolve => setTimeout(resolve, 1300));
      return {
        success: true,
        transactionId: `ach_${Date.now()}`,
        estimatedTimeHours: 72, // 1-3 business days
        fees: {
          amount: 0.25,
          currency: 'USD'
        },
        status: 'processing',
        message: 'ACH payment initiated and being processed'
      };
    }
  }
];

// Get a payment rail by ID
export const getPaymentRail = (railId: string): PaymentRail | undefined => {
  return globalPaymentRails.find(rail => rail.id === railId);
};

// Get available payment rails for a specific country or currency
export const getAvailableRailsForCountry = (countryCode: string): PaymentRail[] => {
  return globalPaymentRails.filter(rail => 
    rail.countryCode === countryCode && rail.isAvailable
  );
};

export const getAvailableRailsForCurrency = (currency: string): PaymentRail[] => {
  return globalPaymentRails.filter(rail => 
    rail.currency === currency && rail.isAvailable
  );
};
