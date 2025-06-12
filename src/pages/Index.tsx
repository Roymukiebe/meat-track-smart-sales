
import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import NavigationBar from '@/components/NavigationBar';
import Dashboard from '@/components/Dashboard';
import SalesInterface from '@/components/SalesInterface';
import ReportsView from '@/components/ReportsView';
import UserManagement from '@/components/UserManagement';
import Settings from '@/components/Settings';
import InventoryManagement from '@/components/InventoryManagement';
import { InventoryProvider } from '@/contexts/InventoryContext';

interface User {
  role: 'owner' | 'staff';
  username: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState('dashboard');

  const handleLogin = (role: 'owner' | 'staff', username: string) => {
    setUser({ role, username });
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveView('dashboard');
  };

  const renderActiveView = () => {
    const baseClasses = "animate-fade-in";
    
    switch (activeView) {
      case 'dashboard':
        return (
          <div className={baseClasses}>
            <Dashboard />
          </div>
        );
      case 'sales':
        return (
          <div className={baseClasses}>
            <SalesInterface />
          </div>
        );
      case 'inventory':
        return (
          <div className={baseClasses}>
            <InventoryManagement />
          </div>
        );
      case 'reports':
        return (
          <div className={baseClasses}>
            <ReportsView />
          </div>
        );
      case 'staff':
        return user?.role === 'owner' ? (
          <div className={baseClasses}>
            <UserManagement />
          </div>
        ) : (
          <div className={`${baseClasses} min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center`}>
            <div className="text-center animate-scale-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
              <p className="text-gray-600">You don't have permission to access staff management.</p>
            </div>
          </div>
        );
      case 'settings':
        return user?.role === 'owner' ? (
          <div className={baseClasses}>
            <Settings />
          </div>
        ) : (
          <div className={`${baseClasses} min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center`}>
            <div className="text-center animate-scale-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
              <p className="text-gray-600">You don't have permission to access system settings.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className={baseClasses}>
            <Dashboard />
          </div>
        );
    }
  };

  if (!user) {
    return (
      <div className="animate-fade-in">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <InventoryProvider>
      <div className="min-h-screen bg-gray-50">
        <NavigationBar
          activeView={activeView}
          onViewChange={setActiveView}
          userRole={user.role}
          onLogout={handleLogout}
        />
        {renderActiveView()}
      </div>
    </InventoryProvider>
  );
};

export default Index;
