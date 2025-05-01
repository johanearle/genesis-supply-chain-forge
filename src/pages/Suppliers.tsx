
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SupplierPerformance from "@/components/SupplierPerformance";
import { cn } from "@/lib/utils";
import { Search, Plus, Star, Mail, Phone, Globe, Eye, FileEdit, UserPlus } from "lucide-react";

const suppliers = [
  {
    id: "SUP001",
    name: "Acme Supplies Inc",
    category: "Components",
    location: "Chicago, IL",
    contact: "John Smith",
    email: "jsmith@acmesupplies.com",
    phone: "+1 (312) 555-1234",
    status: "Active",
    rating: 4.8,
  },
  {
    id: "SUP002",
    name: "Global Materials Co",
    category: "Raw Materials",
    location: "Atlanta, GA",
    contact: "Sarah Johnson",
    email: "sjohnson@globalmaterials.com",
    phone: "+1 (404) 555-7890",
    status: "Active",
    rating: 4.2,
  },
  {
    id: "SUP003",
    name: "Tech Components Ltd",
    category: "Electronics",
    location: "San Jose, CA",
    contact: "David Chen",
    email: "dchen@techcomponents.com",
    phone: "+1 (408) 555-5678",
    status: "Active",
    rating: 4.9,
  },
  {
    id: "SUP004",
    name: "Eco Packaging Solutions",
    category: "Packaging",
    location: "Portland, OR",
    contact: "Emma Green",
    email: "egreen@ecopackaging.com",
    phone: "+1 (503) 555-4321",
    status: "Inactive",
    rating: 3.5,
  },
  {
    id: "SUP005",
    name: "Advanced Manufacturing Inc",
    category: "Components",
    location: "Detroit, MI",
    contact: "Robert Johnson",
    email: "rjohnson@advancedmfg.com",
    phone: "+1 (313) 555-3456",
    status: "Pending",
    rating: 4.0,
  },
];

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");

  const getFilteredSuppliers = () => {
    let filtered = suppliers;
    
    if (searchTerm) {
      filtered = filtered.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedTab === "active") {
      filtered = filtered.filter(supplier => supplier.status === "Active");
    } else if (selectedTab === "inactive") {
      filtered = filtered.filter(supplier => supplier.status === "Inactive");
    } else if (selectedTab === "pending") {
      filtered = filtered.filter(supplier => supplier.status === "Pending");
    }
    
    return filtered;
  };

  const filteredSuppliers = getFilteredSuppliers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Supplier Management</h1>
        <p className="text-muted-foreground mt-1">Track and manage your suppliers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-4">
              <UserPlus className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">{suppliers.length}</h3>
            <p className="text-muted-foreground">Total Suppliers</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mb-4">
              <Star className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">4.3</h3>
            <p className="text-muted-foreground">Average Rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mb-4">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold">4</h3>
            <p className="text-muted-foreground">Countries</p>
          </CardContent>
        </Card>
      </div>

      <SupplierPerformance />

      <Card>
        <CardHeader>
          <CardTitle>Supplier Directory</CardTitle>
          <CardDescription>Manage and track all your suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <TabsList>
                <TabsTrigger value="all">All Suppliers</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search suppliers" 
                    className="pl-8 w-[200px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Button onClick={() => setShowDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Supplier
                </Button>
              </div>
            </div>
            
            <TabsContent value={selectedTab} className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          No suppliers found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredSuppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell className="font-medium">{supplier.name}</TableCell>
                          <TableCell>{supplier.category}</TableCell>
                          <TableCell>{supplier.location}</TableCell>
                          <TableCell>
                            <div>
                              <div>{supplier.contact}</div>
                              <div className="text-xs text-muted-foreground">{supplier.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{supplier.rating.toFixed(1)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={cn(
                                supplier.status === "Active" && "bg-green-500",
                                supplier.status === "Inactive" && "bg-gray-500",
                                supplier.status === "Pending" && "bg-yellow-500"
                              )}
                            >
                              {supplier.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <FileEdit className="h-4 w-4" />
                              </Button>
                            </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.slice(0, 3).map(supplier => (
          <Card key={supplier.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{supplier.name}</CardTitle>
                  <CardDescription>{supplier.category}</CardDescription>
                </div>
                <Badge
                  className={cn(
                    supplier.status === "Active" && "bg-green-500",
                    supplier.status === "Inactive" && "bg-gray-500",
                    supplier.status === "Pending" && "bg-yellow-500"
                  )}
                >
                  {supplier.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{supplier.location}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-400" />
                  <span className="font-medium">{supplier.rating.toFixed(1)} / 5.0</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">View Details</Button>
              <Button variant="outline" size="sm">Contact</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
            <DialogDescription>
              Enter details for the new supplier.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Company Name</label>
              <Input id="name" placeholder="Enter company name" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Input id="category" placeholder="Ex: Components, Raw Materials" />
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <Input id="location" placeholder="City, State/Country" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact" className="text-sm font-medium">Primary Contact</label>
              <Input id="contact" placeholder="Contact person name" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" placeholder="contact@company.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                <Input id="phone" placeholder="Phone number" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowDialog(false)}>Add Supplier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Suppliers;
