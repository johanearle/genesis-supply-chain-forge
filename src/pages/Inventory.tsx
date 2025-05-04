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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Package, PackagePlus, Search, AlertTriangle, FileEdit, Trash2 } from "lucide-react";

const inventoryItems = [
  {
    id: "INV001",
    name: "Widget A",
    sku: "WID-A-001",
    category: "Finished Goods",
    quantity: 342,
    reorderLevel: 100,
    location: "Warehouse 1",
    lastUpdated: "2025-04-25",
  },
  {
    id: "INV002",
    name: "Component B",
    sku: "COMP-B-002",
    category: "Components",
    quantity: 123,
    reorderLevel: 150,
    location: "Warehouse 1",
    lastUpdated: "2025-04-26",
  },
  {
    id: "INV003",
    name: "Assembly C",
    sku: "ASM-C-003",
    category: "Semi-Finished",
    quantity: 0,
    reorderLevel: 50,
    location: "Warehouse 2",
    lastUpdated: "2025-04-24",
  },
  {
    id: "INV004",
    name: "Part D",
    sku: "PRT-D-004",
    category: "Components",
    quantity: 534,
    reorderLevel: 200,
    location: "Warehouse 2",
    lastUpdated: "2025-04-23",
  },
  {
    id: "INV005",
    name: "Module E",
    sku: "MOD-E-005",
    category: "Components",
    quantity: 50,
    reorderLevel: 100,
    location: "Warehouse 1",
    lastUpdated: "2025-04-20",
  },
  {
    id: "INV006",
    name: "Product F",
    sku: "PRD-F-006",
    category: "Finished Goods",
    quantity: 78,
    reorderLevel: 50,
    location: "Warehouse 3",
    lastUpdated: "2025-04-22",
  },
  {
    id: "INV007",
    name: "Raw Material G",
    sku: "RAW-G-007",
    category: "Raw Materials",
    quantity: 1250,
    reorderLevel: 500,
    location: "Warehouse 1",
    lastUpdated: "2025-04-19",
  },
  {
    id: "INV008",
    name: "Product H",
    sku: "PRD-H-008",
    category: "Finished Goods",
    quantity: 24,
    reorderLevel: 30,
    location: "Warehouse 3",
    lastUpdated: "2025-04-21",
  },
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "" || item.category === categoryFilter;
    const matchesLocation = locationFilter === "" || item.location === locationFilter;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getInventoryStatus = (quantity: number, reorderLevel: number) => {
    if (quantity === 0) return { status: "Out of Stock", color: "bg-red-500" };
    if (quantity < reorderLevel) return { status: "Low Stock", color: "bg-yellow-500" };
    return { status: "In Stock", color: "bg-green-500" };
  };

  const categories = Array.from(new Set(inventoryItems.map(item => item.category)));
  const locations = Array.from(new Set(inventoryItems.map(item => item.location)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <p className="text-muted-foreground mt-1">Track and manage your inventory items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Package className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold">8</h3>
            <p className="text-muted-foreground">Total Products</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600 mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold">3</h3>
            <p className="text-muted-foreground">Low Stock Items</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mb-4">
              <Package className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold">2,401</h3>
            <p className="text-muted-foreground">Total Quantity</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory List</CardTitle>
          <CardDescription>Manage and track all inventory items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or SKU" 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-locations">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={() => setShowDialog(true)}>
                <PackagePlus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => {
                  const { status, color } = getInventoryStatus(item.quantity, item.reorderLevel);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell>
                        <Badge className={cn(color)}>{status}</Badge>
                      </TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Inventory Item</DialogTitle>
            <DialogDescription>
              Enter details for the new inventory item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" placeholder="Product name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="sku" className="text-sm font-medium">SKU</label>
              <Input id="sku" placeholder="SKU" />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rawMaterials">Raw Materials</SelectItem>
                  <SelectItem value="components">Components</SelectItem>
                  <SelectItem value="semifinished">Semi-Finished</SelectItem>
                  <SelectItem value="finishedGoods">Finished Goods</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
              <Input id="quantity" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <label htmlFor="reorderLevel" className="text-sm font-medium">Reorder Level</label>
              <Input id="reorderLevel" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Location</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warehouse1">Warehouse 1</SelectItem>
                  <SelectItem value="warehouse2">Warehouse 2</SelectItem>
                  <SelectItem value="warehouse3">Warehouse 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowDialog(false)}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;
