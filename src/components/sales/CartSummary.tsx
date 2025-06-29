
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Receipt, Calculator, User } from 'lucide-react';

interface CartSummaryProps {
  customerName: string;
  onCustomerNameChange: (name: string) => void;
  totalItems: number;
  totalAmount: number;
  onProceedToPayment: () => void;
  children: React.ReactNode;
}

const CartSummary = ({ 
  customerName, 
  onCustomerNameChange, 
  totalItems, 
  totalAmount, 
  onProceedToPayment, 
  children 
}: CartSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Receipt className="w-5 h-5 mr-2 text-accent" />
            Current Sale
          </span>
          <Badge variant="secondary">
            {totalItems} items
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Customer Info */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center">
            <User className="w-4 h-4 mr-2" />
            Customer Name (Optional)
          </label>
          <Input
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
          />
        </div>

        <Separator />

        {/* Cart Items */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {children}
        </div>

        <Separator />

        {/* Total */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-lg font-bold">
            <span className="flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Total Amount:
            </span>
            <span className="text-primary">KSh {totalAmount.toLocaleString()}</span>
          </div>
          
          <Button 
            onClick={onProceedToPayment}
            className="w-full"
            size="lg"
            disabled={totalItems === 0}
          >
            <Receipt className="w-5 h-5 mr-2" />
            Proceed to Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
