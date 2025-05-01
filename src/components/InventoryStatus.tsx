
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const inventoryItems = [
  {
    id: "INV001",
    product: "Widget A",
    sku: "WID-A-001",
    quantity: 342,
    status: "In Stock",
    location: "Warehouse 1",
  },
  {
    id: "INV002",
    product: "Component B",
    sku: "COMP-B-002",
    quantity: 123,
    status: "Low Stock",
    location: "Warehouse 1",
  },
  {
    id: "INV003",
    product: "Assembly C",
    sku: "ASM-C-003",
    quantity: 0,
    status: "Out of Stock",
    location: "Warehouse 2",
  },
  {
    id: "INV004",
    product: "Part D",
    sku: "PRT-D-004",
    quantity: 534,
    status: "In Stock",
    location: "Warehouse 2",
  },
  {
    id: "INV005",
    product: "Module E",
    sku: "MOD-E-005",
    quantity: 50,
    status: "Low Stock",
    location: "Warehouse 1",
  },
];

const InventoryStatus = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Inventory Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.product}</TableCell>
                <TableCell className="text-muted-foreground">{item.sku}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                      item.status === "In Stock" && "bg-green-500",
                      item.status === "Low Stock" && "bg-yellow-500",
                      item.status === "Out of Stock" && "bg-red-500"
                    )}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InventoryStatus;
