
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  unit: string;
  currentStock: number;
  minStock: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
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
    <Card className="sales-card cursor-pointer hover:shadow-md transition-all">
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
          onClick={() => onAddToCart(product)}
          className="w-full"
          size="sm"
          disabled={product.currentStock <= 0}
        >
          <Plus className="w-4 h-4 mr-2" />
          {product.currentStock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
