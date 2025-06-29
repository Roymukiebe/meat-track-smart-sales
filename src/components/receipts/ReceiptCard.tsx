
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Printer, Download } from 'lucide-react';

interface SaleRecord {
  id: string;
  receiptNumber: string;
  items: any[];
  customerName?: string;
  staffName?: string;
  paymentMethod: string;
  paymentReference: string;
  total: number;
  date: string;
  timestamp: number;
}

interface ReceiptCardProps {
  sale: SaleRecord;
  onView: (id: string) => void;
  onPrint: (sale: SaleRecord) => void;
  onDownload: (sale: SaleRecord) => void;
}

const ReceiptCard = ({ sale, onView, onPrint, onDownload }: ReceiptCardProps) => {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-lg">{sale.receiptNumber}</h3>
              <Badge variant="secondary">{sale.paymentMethod}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p><span className="font-medium">Date:</span> {sale.date}</p>
                <p><span className="font-medium">Items:</span> {sale.items.length}</p>
              </div>
              <div>
                <p><span className="font-medium">Total:</span> KSh {sale.total.toLocaleString()}</p>
                {sale.customerName && (
                  <p><span className="font-medium">Customer:</span> {sale.customerName}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onView(sale.id)}
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onPrint(sale)}
              >
                <Printer className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDownload(sale)}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReceiptCard;
