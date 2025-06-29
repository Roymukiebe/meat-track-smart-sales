
import { Button } from "@/components/ui/button";
import { Plus, Minus } from 'lucide-react';

interface CartItemData {
  id: string;
  name: string;
  price: number;
  category: string;
  unit: string;
  quantity: number;
  total: number;
}

interface CartItemProps {
  item: CartItemData;
  availableStock: number;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, availableStock, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <h4 className="font-medium text-sm">{item.name}</h4>
        <p className="text-xs text-gray-600">KSh {item.price}/{item.unit}</p>
        <p className="text-xs text-gray-500">
          Available: {availableStock} {item.unit}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="w-3 h-3" />
        </Button>
        <span className="w-8 text-center text-sm">{item.quantity}</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          disabled={item.quantity >= availableStock}
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>
      <div className="ml-4 text-right">
        <p className="font-bold text-sm">KSh {item.total.toLocaleString()}</p>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onRemove(item.id)}
          className="text-red-600 hover:text-red-800 h-auto p-0"
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
