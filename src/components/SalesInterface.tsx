
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, ShoppingCart, Calculator, User, Receipt } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  unit: string;
}

interface CartItem extends Product {
  quantity: number;
  total: number;
}

const SalesInterface = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, total: product.price }]);
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

  const processSale = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to cart before processing sale",
        variant: "destructive",
      });
      return;
    }

    // Here you would integrate with your backend API
    toast({
      title: "Sale Processed Successfully!",
      description: `Total: KSh ${getTotalAmount().toLocaleString()} for ${getTotalItems()} items`,
    });

    // Reset after successful sale
    setCart([]);
    setCustomerName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Products Section */}
          <div className="lg:col-span-2 space-y-6">
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
                        <Button 
                          onClick={() => addToCart(product)}
                          className="w-full"
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Cart
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
                    cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600">KSh {item.price}/{item.unit}</p>
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
                    ))
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
                    onClick={processSale}
                    className="w-full"
                    size="lg"
                    disabled={cart.length === 0}
                  >
                    <Receipt className="w-5 h-5 mr-2" />
                    Process Sale
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInterface;
