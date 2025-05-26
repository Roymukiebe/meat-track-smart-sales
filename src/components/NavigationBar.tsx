
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
  X
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
      <nav className="hidden lg:flex bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TMC</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Thika Meat Centre</span>
            </div>
            
            <div className="flex space-x-1">
              {filteredMenuItems.map(item => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    onClick={() => onViewChange(item.id)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 capitalize">
              Logged in as: <span className="font-medium">{userRole}</span>
            </span>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">TMC</span>
            </div>
            <span className="font-bold text-lg text-gray-900">Thika Meat Centre</span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              {filteredMenuItems.map(item => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    onClick={() => {
                      onViewChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
              <div className="pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-500 px-3 py-1">
                  Logged in as: <span className="font-medium capitalize">{userRole}</span>
                </div>
                <Button variant="ghost" onClick={onLogout} className="w-full justify-start text-red-600">
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
