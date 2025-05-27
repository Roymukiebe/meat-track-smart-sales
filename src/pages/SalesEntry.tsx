import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Save, User, Receipt, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  unit: string;
}

interface SaleItem extends Product {
  quantity: number;
  total: number;
}

const SalesEntry = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [staffName, setStaffName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const products: Product[] = [
    { id: '1', name: 'Beef Steak', price: 800, category: 'Beef', unit: 'kg' },
    { id: '2', name: 'Beef Ribs', price: 650, category: 'Beef', unit: 'kg' },
    { id: '3', name: 'Ground Beef', price: 550, category: 'Beef', unit: 'kg' },
    { id: '4', name: 'Chicken Breast', price: 450, category: 'Chicken', unit: 'kg' },
    { id: '5', name: 'Chicken Thighs', price: 350, category: 'Chicken', unit: 'kg' },
    { id: '6', name: 'Whole Chicken', price: 400, category: 'Chicken', unit: 'kg' },
    { id: '7', name: 'Pork Chops', price: 700, category: 'Pork', unit: 'kg' },
    { id: '8', name: 'Pork Ribs', price: 750, category: 'Pork', unit: 'kg' },
    { id: '9', name: 'Lamb Leg', price: 900, category: 'Lamb', unit: 'kg' },
    { id: '10', name: 'Goat Meat', price: 600, category: 'Goat', unit: 'kg' },
  ];

  const addSaleItem = () => {
    if (!selectedProduct || quantity <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please select a product and enter a valid quantity",
        variant: "destructive",
      });
      return;
    }

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const existingItem = saleItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setSaleItems(saleItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * item.price }
          : item
      ));
    } else {
      setSaleItems([...saleItems, { ...product, quantity, total: product.price * quantity }]);
    }

    setSelectedProduct('');
    setQuantity(1);
    
    toast({
      title: "Item Added",
      description: `${product.name} (${quantity}${product.unit}) added to sale`,
    });
  };

  const updateItemQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setSaleItems(saleItems.filter(item => item.id !== id));
      return;
    }
    
    setSaleItems(saleItems.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setSaleItems(saleItems.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return saleItems.reduce((sum, item) => sum + item.total, 0);
  };

  const getTotalItems = () => {
    return saleItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const saveSale = () => {
    if (saleItems.length === 0) {
      toast({
        title: "No Items",
        description: "Please add items to the sale before saving",
        variant: "destructive",
      });
      return;
    }

    if (!staffName.trim()) {
      toast({
        title: "Staff Name Required",
        description: "Please enter the staff member's name",
        variant: "destructive",
      });
      return;
    }

    // Here you would save to database
    console.log('Saving sale:', {
      items: saleItems,
      customer: customerName,
      staff: staffName,
      total: getTotalAmount(),
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Sale Recorded Successfully!",
      description: `Total: KSh ${getTotalAmount().toLocaleString()} recorded by ${staffName}`,
    });

    // Reset form
    setSaleItems([]);
    setCustomerName('');
    setStaffName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 animate-fade-in">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 mb-6 animate-slide-in-right">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="hover-scale transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">TMC</span>
              </div>
              <span className="font-bold text-lg text-gray-900">Sales Entry</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Receipt className="w-6 h-6 mr-3 text-primary" />
                Sales Entry
              </CardTitle>
              <p className="text-gray-600">Record new sales transactions</p>
            </CardHeader>
          </Card>

          {/* Staff and Customer Info */}
          <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-accent" />
                Sale Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="staff-name">Staff Name *</Label>
                <Input
                  id="staff-name"
                  placeholder="Enter your name"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  required
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-name">Customer Name (Optional)</Label>
                <Input
                  id="customer-name"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Add Items */}
          <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2 text-primary" />
                Add Sale Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="product-select">Product</Label>
                  <select
                    id="product-select"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-200 focus:scale-[1.02]"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    <option value="">Select a product...</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - KSh {product.price}/{product.unit}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addSaleItem} className="w-full hover-scale transition-all duration-200">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sale Items List */}
          <Card className="hover:shadow-lg transition-all duration-300 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-accent" />
                  Sale Items
                </span>
                <Badge variant="secondary" className="animate-pulse">
                  {getTotalItems()} items
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {saleItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8 animate-fade-in">No items added yet</p>
                ) : (
                  saleItems.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 animate-fade-in hover-scale"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          {item.category} • KSh {item.price}/{item.unit}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateItemQuantity(item.id, item.quantity - 0.5)}
                            className="hover-scale transition-all duration-200"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-16 text-center text-sm font-medium">
                            {item.quantity} {item.unit}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 0.5)}
                            className="hover-scale transition-all duration-200"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">KSh {item.total.toLocaleString()}</p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800 h-auto p-0 hover-scale transition-all duration-200"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {saleItems.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center text-lg font-bold animate-fade-in">
                    <span>Total Amount:</span>
                    <span className="text-primary animate-pulse">KSh {getTotalAmount().toLocaleString()}</span>
                  </div>
                  <Button 
                    onClick={saveSale}
                    className="w-full mt-4 hover-scale transition-all duration-200"
                    size="lg"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Sale Record
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SalesEntry;
