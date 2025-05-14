
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
import { useTranslation } from "react-i18next";

const orders = [
  {
    id: "ORD-123456",
    customer: "Acme Corp",
    date: "2025-04-25",
    amount: "$5,234.89",
    status: "delivered",
  },
  {
    id: "ORD-123457",
    customer: "TechGiant Inc",
    date: "2025-04-28",
    amount: "$2,127.36",
    status: "processing",
  },
  {
    id: "ORD-123458",
    customer: "Global Industries",
    date: "2025-04-28",
    amount: "$8,753.00",
    status: "shipped",
  },
  {
    id: "ORD-123459",
    customer: "Local Business Co",
    date: "2025-04-30",
    amount: "$1,432.25",
    status: "processing",
  },
  {
    id: "ORD-123460",
    customer: "Mega Enterprises",
    date: "2025-05-01",
    amount: "$4,378.50",
    status: "pending",
  },
];

const RecentOrders = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t('dashboard.recentOrders')}</CardTitle>
        <CardDescription>{t('dashboard.recentOrdersDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('orders.orderId')}</TableHead>
              <TableHead>{t('orders.customer')}</TableHead>
              <TableHead>{t('orders.date')}</TableHead>
              <TableHead>{t('orders.amount')}</TableHead>
              <TableHead>{t('orders.status')}</TableHead>
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
                      order.status === "delivered" && "bg-green-500",
                      order.status === "shipped" && "bg-blue-500",
                      order.status === "processing" && "bg-yellow-500",
                      order.status === "pending" && "bg-gray-500"
                    )}
                  >
                    {/* Use the correct path to access the translation strings */}
                    {t(`orders.status.${order.status}`)}
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
