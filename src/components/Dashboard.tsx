import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, FileText, Settings, ShoppingCart, TrendingUp, DollarSign, Package } from 'lucide-react';

const Dashboard = () => {
  // Sample data - in real app this would come from API
  const dailySales = [
    { day: 'Mon', sales: 15000, orders: 25 },
    { day: 'Tue', sales: 18000, orders: 32 },
    { day: 'Wed', sales: 22000, orders: 38 },
    { day: 'Thu', sales: 19000, orders: 30 },
    { day: 'Fri', sales: 28000, orders: 45 },
    { day: 'Sat', sales: 35000, orders: 52 },
    { day: 'Sun', sales: 31000, orders: 48 }
  ];

  const topProducts = [
    { name: 'Beef Steak', sales: 45000, percentage: 35 },
    { name: 'Chicken Breast', sales: 32000, percentage: 25 },
    { name: 'Pork Chops', sales: 25000, percentage: 20 },
    { name: 'Lamb Leg', sales: 15000, percentage: 12 },
    { name: 'Goat Meat', sales: 10000, percentage: 8 }
  ];

  const COLORS = ['#f97316', '#22c55e', '#3b82f6', '#eab308', '#ef4444'];

  const recentSales = [
    { id: '001', customer: 'Joseph Mwangi', amount: 2500, time: '10:30 AM', items: 'Beef Steak, Chicken' },
    { id: '002', customer: 'Faith Wanjiku', amount: 1800, time: '11:15 AM', items: 'Pork Chops' },
    { id: '003', customer: 'Daniel Kiprotich', amount: 3200, time: '12:00 PM', items: 'Lamb Leg, Beef' },
    { id: '004', customer: 'Catherine Nyambura', amount: 1500, time: '12:45 PM', items: 'Chicken Breast' },
    { id: '005', customer: 'Samuel Ochieng', amount: 2200, time: '1:15 PM', items: 'Goat Meat' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Thika Meat Centre</h1>
            <p className="text-gray-600 mt-1">Sales Management Dashboard</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button size="sm">
              <ShoppingCart className="w-4 h-4 mr-2" />
              New Sale
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="metric-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">KSh 31,000</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="metric-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
              <ShoppingCart className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">48</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="metric-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">5</div>
              <p className="text-xs text-gray-600 mt-1">2 on shift now</p>
            </CardContent>
          </Card>

          <Card className="metric-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">156</div>
              <p className="text-xs text-gray-600 mt-1">kg today</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Sales Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Weekly Sales Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`KSh ${value.toLocaleString()}`, 'Sales']} />
                  <Bar dataKey="sales" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2 text-accent" />
                Top Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={topProducts}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="percentage"
                  >
                    {topProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Sales Share']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm">{product.name}</span>
                    </div>
                    <span className="text-sm font-medium">KSh {product.sales.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-primary" />
              Recent Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">#{sale.id}</Badge>
                    <div>
                      <p className="font-medium">{sale.customer}</p>
                      <p className="text-sm text-gray-600">{sale.items}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">KSh {sale.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{sale.time}</p>
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

export default Dashboard;
