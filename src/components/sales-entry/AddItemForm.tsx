
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  unit: string;
}

interface AddItemFormProps {
  products: Product[];
  selectedProduct: string;
  quantity: number;
  onProductChange: (productId: string) => void;
  onQuantityChange: (quantity: number) => void;
  onAddItem: () => void;
}

const AddItemForm = ({ 
  products, 
  selectedProduct, 
  quantity, 
  onProductChange, 
  onQuantityChange, 
  onAddItem 
}: AddItemFormProps) => {
  return (
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
              onChange={(e) => onProductChange(e.target.value)}
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
              onChange={(e) => onQuantityChange(parseFloat(e.target.value) || 0)}
              className="transition-all duration-200 focus:scale-[1.02]"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={onAddItem} className="w-full hover-scale transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddItemForm;
