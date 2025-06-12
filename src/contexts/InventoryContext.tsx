import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  costPrice: number;
  supplier: string;
  lastRestocked: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  category: string;
  unit: string;
  quantity: number;
  total: number;
}

interface SaleRecord {
  id: string;
  receiptNumber: string;
  items: CartItem[];
  customerName?: string;
  staffName?: string;
  paymentMethod: string;
  paymentReference: string;
  total: number;
  date: string;
  timestamp: number;
}

interface InventoryContextType {
  inventory: Product[];
  salesHistory: SaleRecord[];
  updateStock: (productId: string, quantityUsed: number) => void;
  addProduct: (product: Omit<Product, 'id' | 'lastRestocked'>) => void;
  removeProduct: (productId: string) => void;
  getProduct: (productId: string) => Product | undefined;
  processSale: (cartItems: CartItem[], paymentMethod: string, paymentReference: string, customerName?: string, staffName?: string) => string;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [inventory, setInventory] = useState<Product[]>([
    {
      id: '1',
      name: 'Beef Steak',
      price: 800,
      category: 'Beef',
      unit: 'kg',
      currentStock: 25,
      minStock: 10,
      maxStock: 100,
      costPrice: 650,
      supplier: 'Premium Meat Supplies',
      lastRestocked: '2024-01-10'
    },
    {
      id: '2',
      name: 'Beef Ribs',
      price: 650,
      category: 'Beef',
      unit: 'kg',
      currentStock: 18,
      minStock: 8,
      maxStock: 50,
      costPrice: 500,
      supplier: 'Premium Meat Supplies',
      lastRestocked: '2024-01-10'
    },
    {
      id: '3',
      name: 'Ground Beef',
      price: 550,
      category: 'Beef',
      unit: 'kg',
      currentStock: 30,
      minStock: 20,
      maxStock: 60,
      costPrice: 450,
      supplier: 'Premium Meat Supplies',
      lastRestocked: '2024-01-12'
    },
    {
      id: '4',
      name: 'Chicken Breast',
      price: 450,
      category: 'Chicken',
      unit: 'kg',
      currentStock: 5,
      minStock: 15,
      maxStock: 80,
      costPrice: 350,
      supplier: 'Poultry Direct',
      lastRestocked: '2024-01-08'
    },
    {
      id: '5',
      name: 'Chicken Thighs',
      price: 350,
      category: 'Chicken',
      unit: 'kg',
      currentStock: 22,
      minStock: 10,
      maxStock: 60,
      costPrice: 280,
      supplier: 'Poultry Direct',
      lastRestocked: '2024-01-09'
    },
    {
      id: '6',
      name: 'Whole Chicken',
      price: 400,
      category: 'Chicken',
      unit: 'kg',
      currentStock: 15,
      minStock: 8,
      maxStock: 40,
      costPrice: 320,
      supplier: 'Poultry Direct',
      lastRestocked: '2024-01-09'
    },
    {
      id: '7',
      name: 'Pork Chops',
      price: 700,
      category: 'Pork',
      unit: 'kg',
      currentStock: 12,
      minStock: 5,
      maxStock: 30,
      costPrice: 560,
      supplier: 'Pork Suppliers Ltd',
      lastRestocked: '2024-01-11'
    },
    {
      id: '8',
      name: 'Pork Ribs',
      price: 750,
      category: 'Pork',
      unit: 'kg',
      currentStock: 8,
      minStock: 5,
      maxStock: 25,
      costPrice: 600,
      supplier: 'Pork Suppliers Ltd',
      lastRestocked: '2024-01-11'
    },
    {
      id: '9',
      name: 'Lamb Leg',
      price: 900,
      category: 'Lamb',
      unit: 'kg',
      currentStock: 6,
      minStock: 3,
      maxStock: 20,
      costPrice: 720,
      supplier: 'Premium Meats',
      lastRestocked: '2024-01-07'
    },
    {
      id: '10',
      name: 'Goat Meat',
      price: 600,
      category: 'Goat',
      unit: 'kg',
      currentStock: 14,
      minStock: 5,
      maxStock: 35,
      costPrice: 480,
      supplier: 'Local Farmers',
      lastRestocked: '2024-01-08'
    }
  ]);

  const [salesHistory, setSalesHistory] = useState<SaleRecord[]>([]);

  const updateStock = (productId: string, quantityUsed: number) => {
    setInventory(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, currentStock: Math.max(0, product.currentStock - quantityUsed) }
        : product
    ));
  };

  const addProduct = (productData: Omit<Product, 'id' | 'lastRestocked'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      lastRestocked: new Date().toISOString().split('T')[0]
    };
    setInventory(prev => [...prev, newProduct]);
  };

  const removeProduct = (productId: string) => {
    setInventory(prev => prev.filter(product => product.id !== productId));
  };

  const getProduct = (productId: string) => {
    return inventory.find(product => product.id === productId);
  };

  const processSale = (cartItems: CartItem[], paymentMethod: string, paymentReference: string, customerName?: string, staffName?: string): string => {
    // Generate receipt number
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const time = Date.now().toString().substr(-6);
    const receiptNumber = `TMC${year}${month}${day}${time}`;

    // Update stock levels
    cartItems.forEach(item => {
      updateStock(item.id, item.quantity);
    });

    // Create sale record
    const saleRecord: SaleRecord = {
      id: Date.now().toString(),
      receiptNumber,
      items: cartItems,
      customerName,
      staffName,
      paymentMethod,
      paymentReference,
      total: cartItems.reduce((sum, item) => sum + item.total, 0),
      date: new Date().toLocaleDateString(),
      timestamp: Date.now()
    };

    // Add to sales history
    setSalesHistory(prev => [saleRecord, ...prev]);

    return receiptNumber;
  };

  return (
    <InventoryContext.Provider value={{
      inventory,
      salesHistory,
      updateStock,
      addProduct,
      removeProduct,
      getProduct,
      processSale
    }}>
      {children}
    </InventoryContext.Provider>
  );
};
