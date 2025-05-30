
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, UserMinus, Users, Trash2, Edit } from 'lucide-react';

interface User {
  id: string;
  username: string;
  fullName: string;
  role: 'owner' | 'staff';
  dateAdded: string;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'peter.mutua',
      fullName: 'Peter Mutua',
      role: 'owner',
      dateAdded: '2024-01-01'
    },
    {
      id: '2',
      username: 'grace.wanjiru',
      fullName: 'Grace Wanjiru',
      role: 'staff',
      dateAdded: '2024-01-15'
    }
  ]);

  const [newUser, setNewUser] = useState({
    username: '',
    fullName: '',
    password: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.username || !newUser.fullName || !newUser.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Check if username already exists
    if (users.some(user => user.username === newUser.username)) {
      toast({
        title: "Error",
        description: "Username already exists",
        variant: "destructive",
      });
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      username: newUser.username,
      fullName: newUser.fullName,
      role: 'staff',
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, user]);
    setNewUser({ username: '', fullName: '', password: '' });
    setShowAddForm(false);

    toast({
      title: "Success!",
      description: `Staff member ${newUser.fullName} has been added`,
    });
  };

  const handleRemoveUser = (userId: string, userFullName: string) => {
    const userToRemove = users.find(user => user.id === userId);
    
    if (userToRemove?.role === 'owner') {
      toast({
        title: "Error",
        description: "Cannot remove owner account",
        variant: "destructive",
      });
      return;
    }

    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Removed",
      description: `${userFullName} has been removed from the system`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600">Manage system users and staff members</p>
            </div>
          </div>
          
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Staff</span>
          </Button>
        </div>

        {/* Add User Form */}
        {showAddForm && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5" />
                <span>Add New Staff Member</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="e.g., Mary Njeri"
                      value={newUser.fullName}
                      onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      placeholder="e.g., mary.njeri"
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value.toLowerCase()})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter initial password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <Button type="submit">Add Staff Member</Button>
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

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Current Users ({users.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {user.fullName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
                        <Badge variant={user.role === 'owner' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                      <p className="text-xs text-gray-400">Added: {user.dateAdded}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {user.role !== 'owner' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveUser(user.id, user.fullName)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
