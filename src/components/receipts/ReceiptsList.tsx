
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileCheck, Search } from 'lucide-react';
import ReceiptCard from './ReceiptCard';

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

interface ReceiptsListProps {
  salesHistory: SaleRecord[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onViewReceipt: (id: string) => void;
  onPrintReceipt: (sale: SaleRecord) => void;
  onDownloadReceipt: (sale: SaleRecord) => void;
}

const ReceiptsList = ({ 
  salesHistory, 
  searchTerm, 
  onSearchChange, 
  onViewReceipt, 
  onPrintReceipt, 
  onDownloadReceipt 
}: ReceiptsListProps) => {
  const filteredReceipts = salesHistory.filter(sale =>
    sale.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <FileCheck className="w-5 h-5 mr-2 text-primary" />
            All Receipts ({salesHistory.length})
          </span>
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by receipt number, customer name, or payment method..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        {filteredReceipts.length === 0 ? (
          <div className="text-center py-8">
            <FileCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {salesHistory.length === 0 ? 'No sales receipts yet' : 'No receipts match your search'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReceipts.map(sale => (
              <ReceiptCard
                key={sale.id}
                sale={sale}
                onView={onViewReceipt}
                onPrint={onPrintReceipt}
                onDownload={onDownloadReceipt}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReceiptsList;
