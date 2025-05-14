
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PaymentGateway, processPayment } from '@/services/payment/PaymentGatewayService';
import { listAvailableBanks } from '@/services/payment/SouthAfricanBankAdapters';
import { getAvailablePaymentMethods } from '@/services/payment/LocalizedPaymentMethods';
import { globalPaymentRails } from '@/services/payment/GlobalPaymentRails';
import { useTranslation } from "react-i18next";

const PaymentIntegration = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<string>('100.00');
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>('stripe');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [selectedRail, setSelectedRail] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);

  const banks = listAvailableBanks();
  const paymentMethods = getAvailablePaymentMethods();
  
  const handlePaymentGateway = async () => {
    setProcessing(true);
    try {
      await processPayment(selectedGateway, {
        amount: parseFloat(amount),
        currency: 'ZAR',
        description: 'Test payment',
        customerEmail: 'test@example.com'
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleBankPayment = async () => {
    setProcessing(true);
    try {
      // Simulating bank payment
      console.log(`Processing bank payment via ${selectedBank} for R${amount}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real implementation, this would call the bank adapter
    } finally {
      setProcessing(false);
    }
  };

  const handleGlobalPayment = async () => {
    setProcessing(true);
    try {
      const rail = globalPaymentRails.find(r => r.id === selectedRail);
      if (rail) {
        await rail.processorFunction(parseFloat(amount), 'recipient', {
          reference: `ORDER-${Date.now()}`
        });
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('payment.integration')}</CardTitle>
        <CardDescription>
          {t('payment.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gateways" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="gateways">{t('payment.gateways')}</TabsTrigger>
            <TabsTrigger value="banks">{t('payment.saBanks')}</TabsTrigger>
            <TabsTrigger value="global">{t('payment.globalRails')}</TabsTrigger>
          </TabsList>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t('payment.amount')} (ZAR)</label>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              step="0.01"
              min="0"
              className="w-full"
            />
          </div>
          
          <TabsContent value="gateways">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('payment.selectGateway')}</label>
                <Select value={selectedGateway} onValueChange={(value) => setSelectedGateway(value as PaymentGateway)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('payment.selectGatewayPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="payfast">PayFast</SelectItem>
                    <SelectItem value="snapscan">SnapScan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Alert>
                <AlertTitle>{t('payment.complianceTitle')}</AlertTitle>
                <AlertDescription>
                  {t('payment.complianceDescription')}
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={handlePaymentGateway} 
                disabled={processing} 
                className="w-full"
              >
                {processing ? t('payment.processing') : t('payment.processPayment')}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="banks">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('payment.selectBank')}</label>
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('payment.selectBankPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map(bank => (
                      <SelectItem key={bank.code} value={bank.code}>
                        {bank.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Alert>
                <AlertTitle>{t('payment.bankStandardsTitle')}</AlertTitle>
                <AlertDescription>
                  {t('payment.bankStandardsDescription')}
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={handleBankPayment} 
                disabled={processing || !selectedBank} 
                className="w-full"
              >
                {processing ? t('payment.processing') : t('payment.processBankPayment')}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="global">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('payment.selectRail')}</label>
                <Select value={selectedRail} onValueChange={setSelectedRail}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('payment.selectRailPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {globalPaymentRails.map(rail => (
                      <SelectItem key={rail.id} value={rail.id}>
                        {rail.name} ({rail.currency})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Alert>
                <AlertTitle>{t('payment.globalSupportTitle')}</AlertTitle>
                <AlertDescription>
                  {t('payment.globalSupportDescription')}
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={handleGlobalPayment} 
                disabled={processing || !selectedRail} 
                className="w-full"
              >
                {processing ? t('payment.processing') : t('payment.processGlobalPayment')}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentIntegration;
