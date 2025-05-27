
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Smartphone, 
  Banknote, 
  CheckCircle, 
  Clock, 
  Shield 
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PaymentOptionsProps {
  total: number;
  onPaymentComplete: (method: string, reference: string) => void;
}

const PaymentOptions = ({ total, onPaymentComplete }: PaymentOptionsProps) => {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMpesaPayment = async () => {
    if (!phoneNumber.match(/^254\d{9}$/)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid M-Pesa number (254XXXXXXXXX)",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate M-Pesa payment processing
    setTimeout(() => {
      const reference = `MP${Date.now()}`;
      setIsProcessing(false);
      onPaymentComplete('M-Pesa', reference);
      
      toast({
        title: "M-Pesa Payment Successful!",
        description: `Payment of KSh ${total.toLocaleString()} completed. Ref: ${reference}`,
      });
    }, 3000);
  };

  const handleCardPayment = async () => {
    if (!cardNumber || cardNumber.length < 16) {
      toast({
        title: "Invalid Card Number",
        description: "Please enter a valid card number",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate card payment processing
    setTimeout(() => {
      const reference = `CD${Date.now()}`;
      setIsProcessing(false);
      onPaymentComplete('Card', reference);
      
      toast({
        title: "Card Payment Successful!",
        description: `Payment of KSh ${total.toLocaleString()} completed. Ref: ${reference}`,
      });
    }, 2000);
  };

  const handleCashPayment = () => {
    const reference = `CSH${Date.now()}`;
    onPaymentComplete('Cash', reference);
    
    toast({
      title: "Cash Payment Recorded!",
      description: `Payment of KSh ${total.toLocaleString()} recorded as cash`,
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-primary" />
            Payment Options
          </span>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            KSh {total.toLocaleString()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* M-Pesa Payment */}
        <div className="space-y-3">
          <Button
            variant={selectedMethod === 'mpesa' ? "default" : "outline"}
            className="w-full justify-start p-4 h-auto hover-scale"
            onClick={() => setSelectedMethod('mpesa')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium">M-Pesa Payment</div>
                <div className="text-sm text-gray-600">Pay with M-Pesa mobile money</div>
              </div>
            </div>
          </Button>
          
          {selectedMethod === 'mpesa' && (
            <div className="space-y-3 p-4 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
              <Label htmlFor="phone">M-Pesa Phone Number</Label>
              <Input
                id="phone"
                placeholder="254712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02]"
              />
              <Button 
                onClick={handleMpesaPayment}
                disabled={isProcessing}
                className="w-full hover-scale"
              >
                {isProcessing ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Pay with M-Pesa
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        <Separator />

        {/* Card Payment */}
        <div className="space-y-3">
          <Button
            variant={selectedMethod === 'card' ? "default" : "outline"}
            className="w-full justify-start p-4 h-auto hover-scale"
            onClick={() => setSelectedMethod('card')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium">Card Payment</div>
                <div className="text-sm text-gray-600">Credit or Debit Card</div>
              </div>
            </div>
          </Button>
          
          {selectedMethod === 'card' && (
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fade-in">
              <Label htmlFor="card">Card Number</Label>
              <Input
                id="card"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02]"
              />
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>Secure payment processing</span>
              </div>
              <Button 
                onClick={handleCardPayment}
                disabled={isProcessing}
                className="w-full hover-scale"
              >
                {isProcessing ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Pay with Card
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        <Separator />

        {/* Cash Payment */}
        <Button
          variant="outline"
          className="w-full justify-start p-4 h-auto hover-scale"
          onClick={handleCashPayment}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Banknote className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium">Cash Payment</div>
              <div className="text-sm text-gray-600">Record cash transaction</div>
            </div>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentOptions;
