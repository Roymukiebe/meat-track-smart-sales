import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import BarcodeScanner from './BarcodeScanner';
import PaymentOptions from './PaymentOptions';
import ProductCard from './sales/ProductCard';
import CartItem from './sales/CartItem';
import ProductFilter from './sales/ProductFilter';
import CartSummary from './sales/CartSummary';
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
                <ProductFilter 
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  categories={categories}
                />
              </CardHeader>
              <CardContent>
                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cart Section */}
          <div className="space-y-6">
            <CartSummary
              customerName={customerName}
              onCustomerNameChange={setCustomerName}
              totalItems={getTotalItems()}
              totalAmount={getTotalAmount()}
              onProceedToPayment={() => setShowPayment(true)}
            >
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Cart is empty</p>
              ) : (
                cart.map(item => {
                  const product = inventory.find(p => p.id === item.id);
                  return (
                    <CartItem
                      key={item.id}
                      item={item}
                      availableStock={product ? product.currentStock : 0}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeFromCart}
                    />
                  );
                })
              )}
            </CartSummary>

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
