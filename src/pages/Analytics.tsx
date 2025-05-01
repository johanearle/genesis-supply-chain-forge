
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const orderData = [
  { name: "Jan", completed: 65, pending: 28, cancelled: 7 },
  { name: "Feb", completed: 59, pending: 35, cancelled: 6 },
  { name: "Mar", completed: 80, pending: 15, cancelled: 5 },
  { name: "Apr", completed: 81, pending: 13, cancelled: 6 },
  { name: "May", completed: 76, pending: 20, cancelled: 4 },
  { name: "Jun", completed: 85, pending: 10, cancelled: 5 },
];

const inventoryData = [
  { name: "Jan", inStock: 320, lowStock: 45, outOfStock: 20 },
  { name: "Feb", inStock: 300, lowStock: 50, outOfStock: 25 },
  { name: "Mar", inStock: 340, lowStock: 35, outOfStock: 15 },
  { name: "Apr", inStock: 380, lowStock: 30, outOfStock: 10 },
  { name: "May", inStock: 350, lowStock: 40, outOfStock: 18 },
  { name: "Jun", inStock: 375, lowStock: 35, outOfStock: 12 },
];

const deliveryPerformance = [
  { name: "Jan", onTime: 92, delayed: 8 },
  { name: "Feb", onTime: 88, delayed: 12 },
  { name: "Mar", onTime: 94, delayed: 6 },
  { name: "Apr", onTime: 89, delayed: 11 },
  { name: "May", onTime: 93, delayed: 7 },
  { name: "Jun", onTime: 95, delayed: 5 },
];

const supplierData = [
  { name: "Supplier A", value: 35 },
  { name: "Supplier B", value: 25 },
  { name: "Supplier C", value: 20 },
  { name: "Supplier D", value: 10 },
  { name: "Others", value: 10 },
];

const costBreakdown = [
  { name: "Materials", value: 45 },
  { name: "Labor", value: 25 },
  { name: "Shipping", value: 15 },
  { name: "Overhead", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-sm">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">Visualize your supply chain data</p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
              <TabsTrigger value="costs">Costs</TabsTrigger>
            </TabsList>

            <Select defaultValue="6m">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="3m">Last 3 months</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>Order status distribution over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={orderData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                        <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
                        <Bar dataKey="cancelled" stackId="a" fill="#ef4444" name="Cancelled" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Performance</CardTitle>
                  <CardDescription>On-time vs delayed deliveries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={deliveryPerformance}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area type="monotone" dataKey="onTime" stackId="1" stroke="#10b981" fill="#10b981" name="On Time" />
                        <Area type="monotone" dataKey="delayed" stackId="1" stroke="#ef4444" fill="#ef4444" name="Delayed" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supplier Distribution</CardTitle>
                  <CardDescription>Order volume by supplier</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={supplierData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {supplierData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory Levels</CardTitle>
                  <CardDescription>Inventory status over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={inventoryData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="inStock" stroke="#10b981" name="In Stock" />
                        <Line type="monotone" dataKey="lowStock" stroke="#f59e0b" name="Low Stock" />
                        <Line type="monotone" dataKey="outOfStock" stroke="#ef4444" name="Out of Stock" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Order Volume Trends</CardTitle>
                  <CardDescription>Monthly order volume by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={orderData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                        <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
                        <Bar dataKey="cancelled" stackId="a" fill="#ef4444" name="Cancelled" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Inventory Trends</CardTitle>
                  <CardDescription>Inventory levels over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={inventoryData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="inStock" stroke="#10b981" name="In Stock" />
                        <Line type="monotone" dataKey="lowStock" stroke="#f59e0b" name="Low Stock" />
                        <Line type="monotone" dataKey="outOfStock" stroke="#ef4444" name="Out of Stock" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="suppliers">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Distribution</CardTitle>
                  <CardDescription>Order volume by supplier</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={supplierData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {supplierData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="costs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                  <CardDescription>Supply chain costs by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={costBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {costBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
