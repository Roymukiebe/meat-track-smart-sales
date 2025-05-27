import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { LogIn, User, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLogin: (role: 'owner' | 'staff', username: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Demo credentials - in real app, this would be validated against your backend
  const demoCredentials = {
    owner: { username: 'peter.mutua', password: 'owner123' },
    staff: { username: 'grace.wanjiru', password: 'staff123' }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    if (username === demoCredentials.owner.username && password === demoCredentials.owner.password) {
      toast({
        title: "Login Successful!",
        description: "Welcome back, Peter Mutua (Owner)",
      });
      onLogin('owner', username);
    } else if (username === demoCredentials.staff.username && password === demoCredentials.staff.password) {
      toast({
        title: "Login Successful!",
        description: "Welcome back, Grace Wanjiru (Staff)",
      });
      onLogin('staff', username);
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const quickLogin = (role: 'owner' | 'staff') => {
    const credentials = demoCredentials[role];
    const displayName = role === 'owner' ? 'Peter Mutua' : 'Grace Wanjiru';
    setUsername(credentials.username);
    setPassword(credentials.password);
    
    setTimeout(() => {
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${displayName}`,
      });
      onLogin(role, credentials.username);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">TMC</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Thika Meat Centre</h1>
          <p className="text-gray-600">Sales Management System</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-center space-x-2">
              <LogIn className="w-5 h-5 text-primary" />
              <span>Login to Continue</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Username</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Demo Login Buttons */}
            <div className="space-y-3">
              <div className="text-center">
                <span className="text-sm text-gray-500">Demo Login Options:</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => quickLogin('owner')}
                  className="flex flex-col items-center space-y-1 h-auto py-3"
                >
                  <Badge className="bg-primary">Owner</Badge>
                  <span className="text-xs">Full Access</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => quickLogin('staff')}
                  className="flex flex-col items-center space-y-1 h-auto py-3"
                >
                  <Badge className="bg-accent">Staff</Badge>
                  <span className="text-xs">Limited Access</span>
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center space-y-1">
                <p><strong>Owner:</strong> username: peter.mutua, password: owner123</p>
                <p><strong>Staff:</strong> username: grace.wanjiru, password: staff123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2025 Thika Meat Centre. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
