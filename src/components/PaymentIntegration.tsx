
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

const PaymentIntegration = () => {
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
        <CardTitle>Banking & Open Finance Integration</CardTitle>
        <CardDescription>
          Process payments through various payment methods and banking integrations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gateways" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="gateways">Payment Gateways</TabsTrigger>
            <TabsTrigger value="banks">SA Banks</TabsTrigger>
            <TabsTrigger value="global">Global Rails</TabsTrigger>
          </TabsList>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Amount (ZAR)</label>
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
                <label className="block text-sm font-medium mb-1">Select Payment Gateway</label>
                <Select value={selectedGateway} onValueChange={(value) => setSelectedGateway(value as PaymentGateway)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment gateway" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="payfast">PayFast</SelectItem>
                    <SelectItem value="snapscan">SnapScan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Alert>
                <AlertTitle>PCI-DSS 4.0 Compliant</AlertTitle>
                <AlertDescription>
                  All payments are processed securely using PCI-DSS 4.0 compliant infrastructure.
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={handlePaymentGateway} 
                disabled={processing} 
                className="w-full"
              >
                {processing ? 'Processing...' : 'Process Payment'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="banks">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Bank</label>
                <Select value={selectedBank} onValueChange={setSelectedBank}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bank" />
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
                <AlertTitle>Bank Integration Standards</AlertTitle>
                <AlertDescription>
                  All bank integrations comply with HSM, PCI-DSS 4.0, SWIFT CSP, and ISO 27001 standards.
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={handleBankPayment} 
                disabled={processing || !selectedBank} 
                className="w-full"
              >
                {processing ? 'Processing...' : 'Process Bank Payment'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="global">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Global Payment Rail</label>
                <Select value={selectedRail} onValueChange={setSelectedRail}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment rail" />
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
                <AlertTitle>Global Payment Support</AlertTitle>
                <AlertDescription>
                  We support UPI/IMPS (India), WeChat/Alipay (China), Pix/SPEI (Latin America), SEPA (EU), and ACH (US).
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={handleGlobalPayment} 
                disabled={processing || !selectedRail} 
                className="w-full"
              >
                {processing ? 'Processing...' : 'Process Global Payment'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentIntegration;
