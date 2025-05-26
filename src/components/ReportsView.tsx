
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { CalendarIcon, Download, FileText, TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from "@/hooks/use-toast";

const ReportsView = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedReport, setSelectedReport] = useState('sales');

  // Sample data - in real app this would come from API based on selected filters
  const salesData = [
    { period: 'Week 1', sales: 125000, orders: 189, customers: 156 },
    { period: 'Week 2', sales: 145000, orders: 210, customers: 178 },
    { period: 'Week 3', sales: 132000, orders: 195, customers: 164 },
    { period: 'Week 4', sales: 158000, orders: 225, customers: 190 },
  ];

  const staffPerformance = [
    { name: 'John Doe', sales: 45000, orders: 67, efficiency: 92 },
    { name: 'Mary Smith', sales: 38000, orders: 58, efficiency: 88 },
    { name: 'Peter Wilson', sales: 42000, orders: 63, efficiency: 90 },
    { name: 'Sarah Johnson', sales: 35000, orders: 52, efficiency: 85 },
    { name: 'Mike Brown', sales: 40000, orders: 60, efficiency: 89 },
  ];

  const productPerformance = [
    { name: 'Beef Steak', sales: 85000, percentage: 28, orders: 145 },
    { name: 'Chicken Breast', sales: 65000, percentage: 22, orders: 120 },
    { name: 'Pork Chops', sales: 48000, percentage: 16, orders: 89 },
    { name: 'Lamb Leg', sales: 35000, percentage: 12, orders: 65 },
    { name: 'Goat Meat', sales: 25000, percentage: 8, orders: 48 },
    { name: 'Others', sales: 42000, percentage: 14, orders: 78 },
  ];

  const peakHours = [
    { hour: '8 AM', sales: 2500, orders: 5 },
    { hour: '9 AM', sales: 4200, orders: 8 },
    { hour: '10 AM', sales: 6800, orders: 12 },
    { hour: '11 AM', sales: 8500, orders: 15 },
    { hour: '12 PM', sales: 12000, orders: 22 },
    { hour: '1 PM', sales: 14500, orders: 26 },
    { hour: '2 PM', sales: 11000, orders: 20 },
    { hour: '3 PM', sales: 9200, orders: 17 },
    { hour: '4 PM', sales: 10500, orders: 19 },
    { hour: '5 PM', sales: 13200, orders: 24 },
    { hour: '6 PM', sales: 15800, orders: 28 },
    { hour: '7 PM', sales: 8900, orders: 16 },
  ];

  const COLORS = ['#f97316', '#22c55e', '#3b82f6', '#eab308', '#ef4444', '#8b5cf6'];

  const downloadReport = (format: 'pdf' | 'excel') => {
    toast({
      title: "Report Downloaded",
      description: `${selectedReport} report has been downloaded as ${format.toUpperCase()}`,
    });
  };

  const renderSalesReport = () => (
    <div className="space-y-6">
      {/* Sales Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-primary">KSh 560,000</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-green-600 flex items-center mt-2">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-accent">819</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-accent" />
            </div>
            <p className="text-xs text-green-600 flex items-center mt-2">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unique Customers</p>
                <p className="text-2xl font-bold text-blue-600">688</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 flex items-center mt-2">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip formatter={(value) => [`KSh ${value.toLocaleString()}`, 'Sales']} />
              <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Peak Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Peak Business Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip formatter={(value) => [`KSh ${value.toLocaleString()}`, 'Sales']} />
              <Bar dataKey="sales" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderStaffReport = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Staff Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {staffPerformance.map((staff, index) => (
              <div key={staff.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {staff.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-medium">{staff.name}</h3>
                    <p className="text-sm text-gray-600">{staff.orders} orders completed</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-bold text-primary">KSh {staff.sales.toLocaleString()}</p>
                  <Badge variant={staff.efficiency >= 90 ? "default" : "secondary"}>
                    {staff.efficiency}% efficiency
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProductReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Sales Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productPerformance}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="percentage"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                >
                  {productPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productPerformance.slice(0, 5).map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">KSh {product.sales.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{product.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600 mt-1">Comprehensive business insights</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => downloadReport('pdf')} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={() => downloadReport('excel')} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Excel
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={selectedReport} onValueChange={setSelectedReport}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Report</SelectItem>
                    <SelectItem value="staff">Staff Performance</SelectItem>
                    <SelectItem value="products">Product Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Period</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Custom Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-48 justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Content */}
        {selectedReport === 'sales' && renderSalesReport()}
        {selectedReport === 'staff' && renderStaffReport()}
        {selectedReport === 'products' && renderProductReport()}
      </div>
    </div>
  );
};

export default ReportsView;
