
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useInventory } from '@/contexts/InventoryContext';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react';

const InventoryManagement = () => {
  const { toast } = useToast();
  const { inventory, addProduct, removeProduct, updateStock } = useInventory();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unit: 'kg',
    costPrice: 0,
    price: 0,
    supplier: ''
  });

  const categories = [...new Set(inventory.map(item => item.category))];
  
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock);

  const getStockStatus = (item: any) => {
    if (item.currentStock <= 0) return 'outofstock';
    if (item.currentStock <= item.minStock) return 'low';
    if (item.currentStock >= item.maxStock * 0.8) return 'high';
    return 'normal';
  };

  const getStockBadge = (item: any) => {
    const status = getStockStatus(item);
    switch (status) {
      case 'outofstock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      case 'low':
        return <Badge variant="destructive">Low Stock</Badge>;
      case 'high':
        return <Badge variant="secondary">Well Stocked</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.name || !newItem.category || newItem.price <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addProduct(newItem);
    setNewItem({
      name: '',
      category: '',
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      unit: 'kg',
      costPrice: 0,
      price: 0,
      supplier: ''
    });
    setShowAddForm(false);

    toast({
      title: "Item Added",
      description: `${newItem.name} has been added to inventory`,
    });
  };

  const handleDeleteItem = (id: string, name: string) => {
    removeProduct(id);
    toast({
      title: "Item Removed",
      description: `${name} has been removed from inventory`,
    });
  };

  const handleStockUpdate = (id: string, newStock: number) => {
    const product = inventory.find(p => p.id === id);
    if (product) {
      const difference = newStock - product.currentStock;
      updateStock(id, -difference); // Negative to add stock
      
      toast({
        title: "Stock Updated",
        description: "Stock level has been updated successfully",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Package className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
              <p className="text-gray-600">Track and manage your product inventory</p>
            </div>
          </div>
          
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Button>
        </div>

        {/* Low Stock Alert */}
        {lowStockItems.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-800">
                  {lowStockItems.length} item(s) running low on stock: {lowStockItems.map(item => item.name).join(', ')}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search products or suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === '' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory('')}
                >
                  All Categories
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Item Form */}
        {showAddForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Input
                      id="category"
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentStock">Current Stock</Label>
                    <Input
                      id="currentStock"
                      type="number"
                      value={newItem.currentStock}
                      onChange={(e) => setNewItem({...newItem, currentStock: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minStock">Min Stock</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={newItem.minStock}
                      onChange={(e) => setNewItem({...newItem, minStock: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxStock">Max Stock</Label>
                    <Input
                      id="maxStock"
                      type="number"
                      value={newItem.maxStock}
                      onChange={(e) => setNewItem({...newItem, maxStock: Number(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={newItem.unit}
                      onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="costPrice">Cost Price (KSh)</Label>
                    <Input
                      id="costPrice"
                      type="number"
                      value={newItem.costPrice}
                      onChange={(e) => setNewItem({...newItem, costPrice: Number(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sellingPrice">Selling Price (KSh) *</Label>
                    <Input
                      id="sellingPrice"
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                  />
                </div>

                <div className="flex space-x-3">
                  <Button type="submit">Add Product</Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Inventory List */}
        <Card>
          <CardHeader>
            <CardTitle>Current Inventory ({filteredInventory.length} items)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInventory.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <Badge variant="outline">{item.category}</Badge>
                      {getStockBadge(item)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>Stock: <span className={`font-bold ${item.currentStock <= item.minStock ? 'text-red-600' : 'text-green-600'}`}>{item.currentStock} {item.unit}</span></div>
                      <div>Min: {item.minStock} {item.unit}</div>
                      <div>Price: KSh {item.price}/{item.unit}</div>
                      <div>Supplier: {item.supplier}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={item.currentStock}
                        onChange={(e) => handleStockUpdate(item.id, Number(e.target.value))}
                        className="w-20 h-8"
                        min="0"
                      />
                      <span className="text-sm text-gray-500">{item.unit}</span>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id, item.name)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredInventory.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No items found matching your search criteria
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InventoryManagement;
