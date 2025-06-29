
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categories: string[];
}

const ProductFilter = ({ searchTerm, onSearchChange, categories }: ProductFilterProps) => {
  return (
    <>
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="mt-4"
      />
      
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={searchTerm === '' ? "default" : "outline"}
          size="sm"
          onClick={() => onSearchChange('')}
        >
          All
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={searchTerm === category ? "default" : "outline"}
            size="sm"
            onClick={() => onSearchChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </>
  );
};

export default ProductFilter;
