
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Receipt as ReceiptIcon, Download, Printer, Search, Eye, Calendar } from 'lucide-react';
import { useInventory } from '@/contexts/InventoryContext';
import Receipt from './Receipt';
import { downloadReceiptAsPDF, printReceipt } from '@/utils/receiptService';

const ReceiptsHistory = () => {
  const { salesHistory } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  const filteredReceipts = salesHistory.filter(sale =>
    sale.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <ReceiptIcon className="w-8 h-8 text-primary animate-pulse" />
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <ReceiptIcon className="w-5 h-5 mr-2 text-primary" />
                    All Receipts ({salesHistory.length})
                  </span>
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by receipt number, customer name, or payment method..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {filteredReceipts.length === 0 ? (
                  <div className="text-center py-8">
                    <ReceiptIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {salesHistory.length === 0 ? 'No sales receipts yet' : 'No receipts match your search'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredReceipts.map(sale => (
                      <Card key={sale.id} className="cursor-pointer hover:shadow-md transition-all">
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
                                onClick={() => setSelectedReceipt(sale.id)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                              <div className="flex space-x-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handlePrint(sale)}
                                >
                                  <Printer className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDownload(sale)}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
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
                  <ReceiptIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
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
