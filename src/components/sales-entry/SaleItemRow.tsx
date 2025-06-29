
import { Button } from "@/components/ui/button";
import { Plus, Minus } from 'lucide-react';

interface SaleItem {
  id: string;
  name: string;
  price: number;
  category: string;
  unit: string;
  quantity: number;
  total: number;
}

interface SaleItemRowProps {
  item: SaleItem;
  index: number;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemove: (id: string) => void;
}

const SaleItemRow = ({ item, index, onUpdateQuantity, onRemove }: SaleItemRowProps) => {
  return (
    <div 
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
            onClick={() => onUpdateQuantity(item.id, item.quantity - 0.5)}
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
            onClick={() => onUpdateQuantity(item.id, item.quantity + 0.5)}
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
            onClick={() => onRemove(item.id)}
            className="text-red-600 hover:text-red-800 h-auto p-0 hover-scale transition-all duration-200"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SaleItemRow;
