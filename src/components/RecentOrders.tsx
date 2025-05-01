
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "ORD-123456",
    customer: "Acme Corp",
    date: "2025-04-25",
    amount: "$5,234.89",
    status: "Delivered",
  },
  {
    id: "ORD-123457",
    customer: "TechGiant Inc",
    date: "2025-04-28",
    amount: "$2,127.36",
    status: "Processing",
  },
  {
    id: "ORD-123458",
    customer: "Global Industries",
    date: "2025-04-28",
    amount: "$8,753.00",
    status: "Shipped",
  },
  {
    id: "ORD-123459",
    customer: "Local Business Co",
    date: "2025-04-30",
    amount: "$1,432.25",
    status: "Processing",
  },
  {
    id: "ORD-123460",
    customer: "Mega Enterprises",
    date: "2025-05-01",
    amount: "$4,378.50",
    status: "Pending",
  },
];

const RecentOrders = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest orders in your supply chain</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      order.status === "Delivered" && "bg-green-500",
                      order.status === "Shipped" && "bg-blue-500",
                      order.status === "Processing" && "bg-yellow-500",
                      order.status === "Pending" && "bg-gray-500"
                    )}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
