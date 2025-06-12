import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, ShoppingCart, Calculator, User, Receipt, Sparkles, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import BarcodeScanner from './BarcodeScanner';
import PaymentOptions from './PaymentOptions';
import { useInventory } from '@/contexts/InventoryContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  category: string;
  unit: string;
  quantity: number;
  total: number;
}

const SalesInterface = () => {
  const { toast } = useToast();
  const { inventory, processSale } = useInventory();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPayment, setShowPayment] = useState(false);

  const categories = [...new Set(inventory.map(p => p.category))];

  const filteredProducts = inventory.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: any) => {
    // Check if there's enough stock
    if (product.currentStock <= 0) {
      toast({
        title: "Out of Stock",
        description: `${product.name} is currently out of stock`,
        variant: "destructive",
      });
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
    
    if (currentQuantityInCart >= product.currentStock) {
      toast({
        title: "Insufficient Stock",
        description: `Only ${product.currentStock} ${product.unit} available for ${product.name}`,
        variant: "destructive",
      });
      return;
    }
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, { 
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        unit: product.unit,
        quantity: 1, 
        total: product.price 
      }]);
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} added successfully`,
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
      return;
    }

    // Check stock availability
    const product = inventory.find(p => p.id === id);
    if (product && newQuantity > product.currentStock) {
      toast({
        title: "Insufficient Stock",
        description: `Only ${product.currentStock} ${product.unit} available`,
        variant: "destructive",
      });
      return;
    }
    
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
        : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handlePaymentComplete = (method: string, reference: string) => {
    // Process the sale and update inventory
    const receiptNumber = processSale(cart, method, reference, customerName, "Current User");
    
    console.log('Payment completed:', { method, reference, total: getTotalAmount(), receiptNumber });
    
    // Reset after successful payment
    setCart([]);
    setCustomerName('');
    setShowPayment(false);
    
    toast({
      title: "Sale Completed Successfully!",
      description: `Payment via ${method} - Receipt: ${receiptNumber}. Stock levels updated.`,
    });
  };

  const handleProductScanned = (product: any) => {
    addToCart(product);
  };

  const getStockBadge = (currentStock: number, minStock: number) => {
    if (currentStock <= 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (currentStock <= minStock) {
      return <Badge variant="destructive">Low Stock</Badge>;
    } else if (currentStock <= minStock * 2) {
      return <Badge className="bg-orange-500 hover:bg-orange-600">Running Low</Badge>;
    }
    return <Badge variant="secondary">In Stock</Badge>;
  };

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
        {/* Enhanced Header */}
        <div className="mb-6 text-center animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sales Interface
            </h1>
            <Sparkles className="w-8 h-8 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-gray-600">Streamlined product selection and checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Barcode Scanner */}
            <BarcodeScanner onProductScanned={handleProductScanned} />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-primary" />
                  Product Selection
                </CardTitle>
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-4"
                />
              </CardHeader>
              <CardContent>
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button
                    variant={searchTerm === '' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSearchTerm('')}
                  >
                    All
                  </Button>
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={searchTerm === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSearchTerm(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredProducts.map(product => (
                    <Card key={product.id} className="sales-card cursor-pointer hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{product.name}</h3>
                          <Badge variant="secondary">{product.category}</Badge>
                        </div>
                        <p className="text-2xl font-bold text-primary mb-2">
                          KSh {product.price}/{product.unit}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Stock:</span>
                            <span className={`text-sm font-bold ${product.currentStock <= product.minStock ? 'text-red-600' : 'text-green-600'}`}>
                              {product.currentStock} {product.unit}
                            </span>
                          </div>
                          {getStockBadge(product.currentStock, product.minStock)}
                        </div>
                        {product.currentStock <= product.minStock && product.currentStock > 0 && (
                          <div className="flex items-center space-x-1 mb-2 text-orange-600 text-xs">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Low stock warning!</span>
                          </div>
                        )}
                        <Button 
                          onClick={() => addToCart(product)}
                          className="w-full"
                          size="sm"
                          disabled={product.currentStock <= 0}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {product.currentStock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cart Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Receipt className="w-5 h-5 mr-2 text-accent" />
                    Current Sale
                  </span>
                  <Badge variant="secondary">
                    {getTotalItems()} items
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
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>

                <Separator />

                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Cart is empty</p>
                  ) : (
                    cart.map(item => {
                      const product = inventory.find(p => p.id === item.id);
                      return (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-600">KSh {item.price}/{item.unit}</p>
                            <p className="text-xs text-gray-500">
                              Available: {product ? product.currentStock : 0} {item.unit}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={product ? item.quantity >= product.currentStock : true}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="ml-4 text-right">
                            <p className="font-bold text-sm">KSh {item.total.toLocaleString()}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-800 h-auto p-0"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <Separator />

                {/* Total */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Total Amount:
                    </span>
                    <span className="text-primary">KSh {getTotalAmount().toLocaleString()}</span>
                  </div>
                  
                  <Button 
                    onClick={() => setShowPayment(true)}
                    className="w-full"
                    size="lg"
                    disabled={cart.length === 0}
                  >
                    <Receipt className="w-5 h-5 mr-2" />
                    Proceed to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Options */}
            {showPayment && cart.length > 0 && (
              <PaymentOptions 
                total={getTotalAmount()}
                items={cart.map(item => ({
                  id: item.id,
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price,
                  total: item.total,
                  unit: item.unit
                }))}
                customerName={customerName}
                staffName="Current User"
                onPaymentComplete={handlePaymentComplete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInterface;
