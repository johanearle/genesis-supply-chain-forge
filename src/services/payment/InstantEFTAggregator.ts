
import { BankPaymentDetails, BankPaymentResult } from './SouthAfricanBankAdapters';
import { toast } from "sonner";

// Banks supported by the fallback mechanism
export const fallbackSupportedBanks = [
  { code: 'TYME', name: 'TymeBank' },
  { code: 'ZERO', name: 'Bank Zero' },
  { code: 'DISC', name: 'Discovery Bank' }
];

// Criteria for fallback triggering
export interface FallbackCriteria {
  directIntegrationFailed: boolean;
  bankSupported: boolean;
  retryCount: number;
}

// Process payment through the Instant EFT aggregator
export const processInstantEFT = async (
  bankCode: string,
  paymentDetails: BankPaymentDetails
): Promise<BankPaymentResult> => {
  console.log(`Processing Instant EFT for ${bankCode}`, paymentDetails);
  
  // Check if the bank is supported by the fallback
  const bankSupported = fallbackSupportedBanks.some(bank => bank.code === bankCode);
  
  if (!bankSupported) {
    console.error(`Bank ${bankCode} not supported by Instant EFT aggregator`);
    toast.error('Bank not supported', {
      description: 'This bank is not supported by our Instant EFT service.'
    });
    return {
      success: false,
      paymentStatus: 'failed',
      message: 'Bank not supported by Instant EFT aggregator'
    };
  }
  
  try {
    // Simulate API call to Instant EFT service
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    toast.success('Instant EFT processed', {
      description: `Your payment of R${paymentDetails.amount} has been processed.`
    });
    
    return {
      success: true,
      transactionId: `EFT${Date.now()}`,
      paymentStatus: 'pending',
      reference: paymentDetails.reference,
      message: 'Payment is being processed. You will receive a confirmation shortly.'
    };
  } catch (error) {
    console.error('Instant EFT processing error:', error);
    return {
      success: false,
      paymentStatus: 'failed',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Determine if fallback should be used
export const shouldUseFallback = (criteria: FallbackCriteria): boolean => {
  // Use fallback if direct integration failed and bank is supported by fallback
  if (criteria.directIntegrationFailed && criteria.bankSupported) {
    return true;
  }
  
  // Also use fallback if retry count exceeds threshold
  if (criteria.retryCount >= 2) {
    return true;
  }
  
  return false;
};
