
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon, 
  Store, 
  Receipt, 
  Bell, 
  Shield, 
  Database,
  Printer,
  Mail,
  Phone,
  MapPin,
  Save
} from 'lucide-react';

interface SystemSettings {
  businessInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    taxId: string;
  };
  receiptSettings: {
    showLogo: boolean;
    includeFooter: boolean;
    autoNumber: boolean;
    prefix: string;
  };
  notifications: {
    lowStock: boolean;
    dailySales: boolean;
    newStaff: boolean;
    systemUpdates: boolean;
  };
  security: {
    sessionTimeout: number;
    requireStrongPassword: boolean;
    enableAuditLog: boolean;
  };
  system: {
    currency: string;
    dateFormat: string;
    timezone: string;
    backupFrequency: string;
  };
}

const Settings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<SystemSettings>({
    businessInfo: {
      name: 'Thika Meat Centre',
      address: 'P.O. Box 123, Thika, Kenya',
      phone: '+254 712 345 678',
      email: 'info@thikameatcentre.co.ke',
      taxId: 'P051234567A'
    },
    receiptSettings: {
      showLogo: true,
      includeFooter: true,
      autoNumber: true,
      prefix: 'TMC'
    },
    notifications: {
      lowStock: true,
      dailySales: true,
      newStaff: true,
      systemUpdates: false
    },
    security: {
      sessionTimeout: 30,
      requireStrongPassword: true,
      enableAuditLog: true
    },
    system: {
      currency: 'KSh',
      dateFormat: 'DD/MM/YYYY',
      timezone: 'Africa/Nairobi',
      backupFrequency: 'daily'
    }
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSettings = (section: keyof SystemSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    // In a real app, this would save to the backend
    console.log('Saving settings:', settings);
    
    toast({
      title: "Settings Saved",
      description: "All system settings have been updated successfully.",
    });
    
    setHasChanges(false);
  };

  const resetToDefaults = () => {
    setSettings({
      businessInfo: {
        name: 'Thika Meat Centre',
        address: 'P.O. Box 123, Thika, Kenya',
        phone: '+254 712 345 678',
        email: 'info@thikameatcentre.co.ke',
        taxId: 'P051234567A'
      },
      receiptSettings: {
        showLogo: true,
        includeFooter: true,
        autoNumber: true,
        prefix: 'TMC'
      },
      notifications: {
        lowStock: true,
        dailySales: true,
        newStaff: true,
        systemUpdates: false
      },
      security: {
        sessionTimeout: 30,
        requireStrongPassword: true,
        enableAuditLog: true
      },
      system: {
        currency: 'KSh',
        dateFormat: 'DD/MM/YYYY',
        timezone: 'Africa/Nairobi',
        backupFrequency: 'daily'
      }
    });
    setHasChanges(true);
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
              <p className="text-gray-600">Configure your system preferences and business information</p>
            </div>
          </div>
          
          {hasChanges && (
            <Badge variant="secondary" className="animate-pulse">
              Unsaved Changes
            </Badge>
          )}
        </div>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Store className="w-5 h-5" />
              <span>Business Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={settings.businessInfo.name}
                  onChange={(e) => updateSettings('businessInfo', 'name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID</Label>
                <Input
                  id="taxId"
                  value={settings.businessInfo.taxId}
                  onChange={(e) => updateSettings('businessInfo', 'taxId', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Address</span>
              </Label>
              <Input
                id="address"
                value={settings.businessInfo.address}
                onChange={(e) => updateSettings('businessInfo', 'address', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone</span>
                </Label>
                <Input
                  id="phone"
                  value={settings.businessInfo.phone}
                  onChange={(e) => updateSettings('businessInfo', 'phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.businessInfo.email}
                  onChange={(e) => updateSettings('businessInfo', 'email', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Receipt Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Receipt className="w-5 h-5" />
              <span>Receipt Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="receiptPrefix">Receipt Number Prefix</Label>
                <Input
                  id="receiptPrefix"
                  value={settings.receiptSettings.prefix}
                  onChange={(e) => updateSettings('receiptSettings', 'prefix', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Business Logo</Label>
                  <p className="text-sm text-gray-600">Display logo on receipts</p>
                </div>
                <Switch
                  checked={settings.receiptSettings.showLogo}
                  onCheckedChange={(checked) => updateSettings('receiptSettings', 'showLogo', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Include Footer Message</Label>
                  <p className="text-sm text-gray-600">Show thank you message and policies</p>
                </div>
                <Switch
                  checked={settings.receiptSettings.includeFooter}
                  onCheckedChange={(checked) => updateSettings('receiptSettings', 'includeFooter', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-generate Receipt Numbers</Label>
                  <p className="text-sm text-gray-600">Automatically assign receipt numbers</p>
                </div>
                <Switch
                  checked={settings.receiptSettings.autoNumber}
                  onCheckedChange={(checked) => updateSettings('receiptSettings', 'autoNumber', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Low Stock Alerts</Label>
                <p className="text-sm text-gray-600">Get notified when inventory is low</p>
              </div>
              <Switch
                checked={settings.notifications.lowStock}
                onCheckedChange={(checked) => updateSettings('notifications', 'lowStock', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Daily Sales Summary</Label>
                <p className="text-sm text-gray-600">Receive end-of-day sales reports</p>
              </div>
              <Switch
                checked={settings.notifications.dailySales}
                onCheckedChange={(checked) => updateSettings('notifications', 'dailySales', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>New Staff Registration</Label>
                <p className="text-sm text-gray-600">Alert when new staff members are added</p>
              </div>
              <Switch
                checked={settings.notifications.newStaff}
                onCheckedChange={(checked) => updateSettings('notifications', 'newStaff', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>System Updates</Label>
                <p className="text-sm text-gray-600">Notifications about system updates</p>
              </div>
              <Switch
                checked={settings.notifications.systemUpdates}
                onCheckedChange={(checked) => updateSettings('notifications', 'systemUpdates', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Security & Access</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => updateSettings('security', 'sessionTimeout', parseInt(e.target.value))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Strong Passwords</Label>
                <p className="text-sm text-gray-600">Enforce strong password policies</p>
              </div>
              <Switch
                checked={settings.security.requireStrongPassword}
                onCheckedChange={(checked) => updateSettings('security', 'requireStrongPassword', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Audit Log</Label>
                <p className="text-sm text-gray-600">Track user activities and changes</p>
              </div>
              <Switch
                checked={settings.security.enableAuditLog}
                onCheckedChange={(checked) => updateSettings('security', 'enableAuditLog', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>System Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  value={settings.system.currency}
                  onChange={(e) => updateSettings('system', 'currency', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Input
                  id="dateFormat"
                  value={settings.system.dateFormat}
                  onChange={(e) => updateSettings('system', 'dateFormat', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value={settings.system.timezone}
                  onChange={(e) => updateSettings('system', 'timezone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Backup Frequency</Label>
                <Input
                  id="backupFrequency"
                  value={settings.system.backupFrequency}
                  onChange={(e) => updateSettings('system', 'backupFrequency', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6">
          <Button variant="outline" onClick={resetToDefaults}>
            Reset to Defaults
          </Button>
          
          <div className="flex space-x-3">
            <Button
              onClick={saveSettings}
              disabled={!hasChanges}
              className="flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
