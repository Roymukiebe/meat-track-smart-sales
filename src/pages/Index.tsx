
import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import NavigationBar from '@/components/NavigationBar';
import Dashboard from '@/components/Dashboard';
import SalesInterface from '@/components/SalesInterface';
import ReportsView from '@/components/ReportsView';

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
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'sales':
        return <SalesInterface />;
      case 'reports':
        return <ReportsView />;
      case 'staff':
        return (
          <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Staff Management</h2>
              <p className="text-gray-600">Staff management features coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
              <p className="text-gray-600">System settings coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar
        activeView={activeView}
        onViewChange={setActiveView}
        userRole={user.role}
        onLogout={handleLogout}
      />
      {renderActiveView()}
    </div>
  );
};

export default Index;
