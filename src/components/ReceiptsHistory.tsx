
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, Calendar } from 'lucide-react';
import { useInventory } from '@/contexts/InventoryContext';
import Receipt from './Receipt';
import ReceiptsList from './receipts/ReceiptsList';
import { downloadReceiptAsPDF, printReceipt } from '@/utils/receiptService';

const ReceiptsHistory = () => {
  const { salesHistory } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  const handleDownload = (sale: any) => {
    downloadReceiptAsPDF({
      receiptNumber: sale.receiptNumber,
      items: sale.items,
      customerName: sale.customerName,
      staffName: sale.staffName,
      paymentMethod: sale.paymentMethod,
      paymentReference: sale.paymentReference,
      total: sale.total,
      date: sale.date
    });
  };

  const handlePrint = (sale: any) => {
    printReceipt({
      receiptNumber: sale.receiptNumber,
      items: sale.items,
      customerName: sale.customerName,
      staffName: sale.staffName,
      paymentMethod: sale.paymentMethod,
      paymentReference: sale.paymentReference,
      total: sale.total,
      date: sale.date
    });
  };

  const selectedSale = salesHistory.find(sale => sale.id === selectedReceipt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/5 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-primary/3 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-accent/3 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 p-4 lg:p-6">
        {/* Header */}
        <div className="mb-6 text-center animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <FileCheck className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sales Receipts History
            </h1>
            <Calendar className="w-8 h-8 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-gray-600">View and manage past sales receipts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Receipts List */}
          <div className="lg:col-span-2 space-y-6">
            <ReceiptsList
              salesHistory={salesHistory}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onViewReceipt={setSelectedReceipt}
              onPrintReceipt={handlePrint}
              onDownloadReceipt={handleDownload}
            />
          </div>

          {/* Receipt Preview */}
          <div className="space-y-6">
            {selectedSale ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Receipt Preview</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedReceipt(null)}
                  >
                    Close
                  </Button>
                </div>
                <Receipt
                  receiptNumber={selectedSale.receiptNumber}
                  items={selectedSale.items}
                  customerName={selectedSale.customerName}
                  staffName={selectedSale.staffName}
                  paymentMethod={selectedSale.paymentMethod}
                  paymentReference={selectedSale.paymentReference}
                  total={selectedSale.total}
                  date={selectedSale.date}
                  onDownload={() => handleDownload(selectedSale)}
                  onPrint={() => handlePrint(selectedSale)}
                />
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Select a Receipt</h3>
                  <p className="text-gray-500">Choose a receipt from the list to view its details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptsHistory;
