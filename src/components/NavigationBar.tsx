import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  ShoppingCart, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Package,
  FileCheck
} from 'lucide-react';

interface NavigationBarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  userRole: 'owner' | 'staff';
  onLogout: () => void;
}

const NavigationBar = ({ activeView, onViewChange, userRole, onLogout }: NavigationBarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart, roles: ['owner', 'staff'] },
    { id: 'sales', label: 'New Sale', icon: ShoppingCart, roles: ['owner', 'staff'] },
    { id: 'inventory', label: 'Inventory', icon: Package, roles: ['owner', 'staff'] },
    { id: 'receipts', label: 'Receipts', icon: FileCheck, roles: ['owner', 'staff'] },
    { id: 'sales-entry', label: 'Sales Entry', icon: FileText, roles: ['owner', 'staff'], isLink: true, path: '/sales-entry' },
    { id: 'reports', label: 'Reports', icon: FileText, roles: ['owner'] },
    { id: 'staff', label: 'Staff Management', icon: Users, roles: ['owner'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['owner'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex bg-white border-b border-gray-200 px-6 py-4 animate-slide-in-right">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 hover-scale">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:shadow-lg">
                <span className="text-white font-bold text-sm">TMC</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Thika Meat Centre</span>
            </div>
            
            <div className="flex space-x-1">
              {filteredMenuItems.map(item => {
                const Icon = item.icon;
                if (item.isLink && item.path) {
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      asChild
                      className="flex items-center space-x-2 hover-scale transition-all duration-200"
                    >
                      <a href={item.path}>
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </a>
                    </Button>
                  );
                }
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    onClick={() => onViewChange(item.id)}
                    className="flex items-center space-x-2 hover-scale transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 capitalize animate-fade-in">
              Logged in as: <span className="font-medium">{userRole}</span>
            </span>
            <Button variant="outline" onClick={onLogout} className="hover-scale transition-all duration-200">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white border-b border-gray-200 animate-slide-in-right">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2 hover-scale">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center transition-all duration-300 hover:shadow-lg">
              <span className="text-white font-bold text-xs">TMC</span>
            </div>
            <span className="font-bold text-lg text-gray-900">Thika Meat Centre</span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="hover-scale transition-all duration-200">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white animate-accordion-down">
            <div className="px-4 py-2 space-y-1">
              {filteredMenuItems.map(item => {
                const Icon = item.icon;
                if (item.isLink && item.path) {
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      asChild
                      className="w-full justify-start hover-scale transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <a href={item.path}>
                        <Icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </a>
                    </Button>
                  );
                }
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    onClick={() => {
                      onViewChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start hover-scale transition-all duration-200"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
              <div className="pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-500 px-3 py-1 animate-fade-in">
                  Logged in as: <span className="font-medium capitalize">{userRole}</span>
                </div>
                <Button variant="ghost" onClick={onLogout} className="w-full justify-start text-red-600 hover-scale transition-all duration-200">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavigationBar;
