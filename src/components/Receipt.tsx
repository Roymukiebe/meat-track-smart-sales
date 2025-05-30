import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Receipt as ReceiptIcon, Download, Printer } from 'lucide-react';

interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  unit: string;
}

interface ReceiptProps {
  receiptNumber: string;
  items: ReceiptItem[];
  customerName?: string;
  staffName?: string;
  paymentMethod: string;
  paymentReference: string;
  total: number;
  date: string;
  onDownload?: () => void;
  onPrint?: () => void;
}

const Receipt = ({
  receiptNumber,
  items,
  customerName,
  staffName,
  paymentMethod,
  paymentReference,
  total,
  date,
  onDownload,
  onPrint
}: ReceiptProps) => {
  return (
    <Card className="max-w-md mx-auto bg-white">
      <CardHeader className="text-center border-b">
        <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-2">
          <span className="text-white font-bold text-lg">TMC</span>
        </div>
        <CardTitle className="text-xl font-bold">Thika Meat Centre</CardTitle>
        <p className="text-sm text-gray-600">Quality Meat Products</p>
        <p className="text-xs text-gray-500">P.O. Box 123, Thika, Kenya</p>
        <p className="text-xs text-gray-500">Tel: +254 712 345 678</p>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        {/* Receipt Header */}
        <div className="text-center">
          <h2 className="font-bold text-lg flex items-center justify-center">
            <ReceiptIcon className="w-5 h-5 mr-2" />
            SALES RECEIPT
          </h2>
          <p className="text-sm text-gray-600">Receipt No: {receiptNumber}</p>
          <p className="text-sm text-gray-600">{date}</p>
        </div>

        <Separator />

        {/* Customer and Staff Info */}
        <div className="space-y-1 text-sm">
          {customerName && (
            <p><span className="font-medium">Customer:</span> {customerName}</p>
          )}
          {staffName && (
            <p><span className="font-medium">Served by:</span> {staffName}</p>
          )}
        </div>

        <Separator />

        {/* Items */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm">ITEMS PURCHASED:</h3>
          {items.map((item, index) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600 text-xs">
                  {item.quantity} {item.unit} × KSh {item.price.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">KSh {item.total.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Total */}
        <div className="space-y-1">
          <div className="flex justify-between text-lg font-bold">
            <span>TOTAL:</span>
            <span>KSh {total.toLocaleString()}</span>
          </div>
        </div>

        <Separator />

        {/* Payment Info */}
        <div className="space-y-1 text-sm">
          <p><span className="font-medium">Payment Method:</span> {paymentMethod}</p>
          <p><span className="font-medium">Reference:</span> {paymentReference}</p>
          <p className="text-green-600 font-medium">✓ PAYMENT SUCCESSFUL</p>
        </div>

        <Separator />

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>Thank you for your business!</p>
          <p>Goods sold are not returnable</p>
          <p>Visit us again soon</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          {onDownload && (
            <Button onClick={onDownload} variant="outline" size="sm" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          )}
          {onPrint && (
            <Button onClick={onPrint} variant="outline" size="sm" className="flex-1">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Receipt;
