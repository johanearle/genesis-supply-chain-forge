
import { toast } from "sonner";

// Global payment rail interface
export interface GlobalPaymentRail {
  id: string;
  name: string;
  country: string;
  currency: string;
  processorFunction: (amount: number, recipient: string, options?: Record<string, any>) => Promise<GlobalPaymentResult>;
}

export interface GlobalPaymentResult {
  success: boolean;
  transactionId?: string;
  message?: string;
  localReference?: string;
}

// Global payment rails
export const globalPaymentRails: GlobalPaymentRail[] = [
  {
    id: 'upi',
    name: 'UPI',
    country: 'India',
    currency: 'INR',
    processorFunction: async (amount, recipient, options) => {
      console.log(`Processing UPI payment: ${amount} INR to ${recipient}`, options);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success(`UPI payment initiated`, {
        description: `Payment of ${amount} INR to ${recipient} is being processed`,
      });
      
      return {
        success: true,
        transactionId: `upi_${Date.now()}`,
        message: 'UPI payment initiated'
      };
    }
  },
  {
    id: 'wechat',
    name: 'WeChat Pay',
    country: 'China',
    currency: 'CNY',
    processorFunction: async (amount, recipient, options) => {
      console.log(`Processing WeChat payment: ${amount} CNY to ${recipient}`, options);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success(`WeChat Pay payment initiated`, {
        description: `Payment of ${amount} CNY to ${recipient} is being processed`,
      });
      
      return {
        success: true,
        transactionId: `wechat_${Date.now()}`,
        message: 'WeChat Pay payment initiated'
      };
    }
  },
  {
    id: 'pix',
    name: 'Pix',
    country: 'Brazil',
    currency: 'BRL',
    processorFunction: async (amount, recipient, options) => {
      console.log(`Processing Pix payment: ${amount} BRL to ${recipient}`, options);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success(`Pix payment initiated`, {
        description: `Payment of ${amount} BRL to ${recipient} is being processed`,
      });
      
      return {
        success: true,
        transactionId: `pix_${Date.now()}`,
        message: 'Pix payment initiated'
      };
    }
  },
  {
    id: 'sepa',
    name: 'SEPA',
    country: 'European Union',
    currency: 'EUR',
    processorFunction: async (amount, recipient, options) => {
      console.log(`Processing SEPA payment: ${amount} EUR to ${recipient}`, options);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success(`SEPA payment initiated`, {
        description: `Payment of ${amount} EUR to ${recipient} is being processed`,
      });
      
      return {
        success: true,
        transactionId: `sepa_${Date.now()}`,
        message: 'SEPA payment initiated'
      };
    }
  },
  {
    id: 'ach',
    name: 'ACH',
    country: 'United States',
    currency: 'USD',
    processorFunction: async (amount, recipient, options) => {
      console.log(`Processing ACH payment: ${amount} USD to ${recipient}`, options);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success(`ACH payment initiated`, {
        description: `Payment of ${amount} USD to ${recipient} is being processed`,
      });
      
      return {
        success: true,
        transactionId: `ach_${Date.now()}`,
        message: 'ACH payment initiated'
      };
    }
  }
];

export default globalPaymentRails;
