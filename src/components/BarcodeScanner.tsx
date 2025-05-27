
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Scan, Package, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  unit: string;
  barcode?: string;
}

interface BarcodeScannerProps {
  onProductScanned: (product: Product) => void;
}

const BarcodeScanner = ({ onProductScanned }: BarcodeScannerProps) => {
  const { toast } = useToast();
  const [scannedCode, setScannedCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample products with barcodes
  const products: Product[] = [
    { id: '1', name: 'Beef Steak', price: 800, category: 'Beef', unit: 'kg', barcode: '1234567890123' },
    { id: '2', name: 'Beef Ribs', price: 650, category: 'Beef', unit: 'kg', barcode: '1234567890124' },
    { id: '3', name: 'Ground Beef', price: 550, category: 'Beef', unit: 'kg', barcode: '1234567890125' },
    { id: '4', name: 'Chicken Breast', price: 450, category: 'Chicken', unit: 'kg', barcode: '1234567890126' },
    { id: '5', name: 'Chicken Thighs', price: 350, category: 'Chicken', unit: 'kg', barcode: '1234567890127' },
  ];

  const handleScan = () => {
    if (!scannedCode.trim()) {
      toast({
        title: "Invalid Barcode",
        description: "Please enter or scan a valid barcode",
        variant: "destructive",
      });
      return;
    }

    const product = products.find(p => p.barcode === scannedCode);
    
    if (product) {
      onProductScanned(product);
      toast({
        title: "Product Found!",
        description: `${product.name} - KSh ${product.price}/${product.unit}`,
      });
      setScannedCode('');
    } else {
      toast({
        title: "Product Not Found",
        description: "Barcode not found in inventory",
        variant: "destructive",
      });
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    // Focus on input for manual entry or camera scanning
    inputRef.current?.focus();
    
    toast({
      title: "Scanner Ready",
      description: "Point camera at barcode or enter manually",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Scan className="w-5 h-5 mr-2 text-primary" />
          Barcode Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Input
              ref={inputRef}
              placeholder="Scan or enter barcode..."
              value={scannedCode}
              onChange={(e) => setScannedCode(e.target.value)}
              onKeyPress={handleKeyPress}
              className="transition-all duration-200 focus:scale-[1.02]"
            />
          </div>
          <Button onClick={startScanning} variant="outline" className="hover-scale">
            <Scan className="w-4 h-4" />
          </Button>
          <Button onClick={handleScan} className="hover-scale">
            <CheckCircle className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        {isScanning && (
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Package className="w-5 h-5 animate-pulse" />
              <span className="font-medium">Scanner Active - Ready to scan</span>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p className="flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Tip: Position barcode clearly in view or enter manually
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarcodeScanner;
