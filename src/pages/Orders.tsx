
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Search, Plus, FileText, Eye } from "lucide-react";

const orders = [
  {
    id: "ORD-12345",
    customer: "Acme Corp",
    date: "2025-04-25",
    items: 5,
    amount: "$5,234.89",
    status: "Delivered",
  },
  {
    id: "ORD-12346",
    customer: "TechGiant Inc",
    date: "2025-04-28",
    items: 3,
    amount: "$2,127.36",
    status: "Processing",
  },
  {
    id: "ORD-12347",
    customer: "Global Industries",
    date: "2025-04-28",
    items: 10,
    amount: "$8,753.00",
    status: "Shipped",
  },
  {
    id: "ORD-12348",
    customer: "Local Business Co",
    date: "2025-04-30",
    items: 2,
    amount: "$1,432.25",
    status: "Processing",
  },
  {
    id: "ORD-12349",
    customer: "Mega Enterprises",
    date: "2025-05-01",
    items: 7,
    amount: "$4,378.50",
    status: "Pending",
  },
  {
    id: "ORD-12350",
    customer: "Smith & Partners",
    date: "2025-04-20",
    items: 4,
    amount: "$3,201.75",
    status: "Delivered",
  },
  {
    id: "ORD-12351",
    customer: "Johnson LLC",
    date: "2025-04-22",
    items: 6,
    amount: "$5,987.44",
    status: "Delivered",
  },
  {
    id: "ORD-12352",
    customer: "Eastern Supplies",
    date: "2025-04-15",
    items: 8,
    amount: "$7,345.19",
    status: "Cancelled",
  },
];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");

  const getFilteredOrders = () => {
    let filtered = orders;
    
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    if (selectedTab !== "all") {
      const statusMap: Record<string, string> = {
        pending: "Pending",
        processing: "Processing",
        shipped: "Shipped",
        delivered: "Delivered",
        cancelled: "Cancelled",
      };
      
      filtered = filtered.filter(order => order.status === statusMap[selectedTab]);
    }
    
    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Order Management</h1>
        <p className="text-muted-foreground mt-1">Track and manage customer orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-2 rounded-full bg-gray-100 text-gray-600 mb-3">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">8</h3>
            <p className="text-xs text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mb-3">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">1</h3>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600 mb-3">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">2</h3>
            <p className="text-xs text-muted-foreground">Processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-2 rounded-full bg-green-100 text-green-600 mb-3">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">3</h3>
            <p className="text-xs text-muted-foreground">Delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-2 rounded-full bg-red-100 text-red-600 mb-3">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">1</h3>
            <p className="text-xs text-muted-foreground">Cancelled</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>Manage and track all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <TabsList className="mb-2 sm:mb-0">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search orders" 
                    className="pl-8 w-[200px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Button onClick={() => setShowDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Order
                </Button>
              </div>
            </div>
            
            <TabsContent value={selectedTab} className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          No orders found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.items}</TableCell>
                          <TableCell>{order.amount}</TableCell>
                          <TableCell>
                            <Badge
                              className={cn(
                                order.status === "Delivered" && "bg-green-500",
                                order.status === "Shipped" && "bg-blue-500",
                                order.status === "Processing" && "bg-yellow-500",
                                order.status === "Pending" && "bg-gray-500",
                                order.status === "Cancelled" && "bg-red-500"
                              )}
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Order</DialogTitle>
            <DialogDescription>
              Enter details for the new order.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="customer" className="text-sm font-medium">Customer</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corp</SelectItem>
                  <SelectItem value="techgiant">TechGiant Inc</SelectItem>
                  <SelectItem value="globalind">Global Industries</SelectItem>
                  <SelectItem value="localbus">Local Business Co</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Items</label>
              <div className="mt-2 p-4 border rounded-md space-y-3">
                <div className="flex items-center justify-between">
                  <span>Widget A (WID-A-001)</span>
                  <span>2 × $150.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Component B (COMP-B-002)</span>
                  <span>1 × $85.50</span>
                </div>
                <div className="flex justify-end pt-2 border-t">
                  <span className="font-medium">Total: $385.50</span>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowDialog(false)}>Create Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
