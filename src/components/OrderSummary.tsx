
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";

const data = [
  { name: "Jan", completed: 65, pending: 28, cancelled: 7 },
  { name: "Feb", completed: 59, pending: 35, cancelled: 6 },
  { name: "Mar", completed: 80, pending: 15, cancelled: 5 },
  { name: "Apr", completed: 81, pending: 13, cancelled: 6 },
  { name: "May", completed: 76, pending: 20, cancelled: 4 },
  { name: "Jun", completed: 85, pending: 10, cancelled: 5 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  const { t } = useTranslation();
  
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-sm">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {t(`orders.status.${entry.name.toLowerCase()}`)}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const OrderSummary = () => {
  const { t } = useTranslation();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('orders.statusSummary')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="completed" stackId="a" fill="#10b981" name={t('orders.status.delivered')} />
              <Bar dataKey="pending" stackId="a" fill="#f59e0b" name={t('orders.status.pending')} />
              <Bar dataKey="cancelled" stackId="a" fill="#ef4444" name={t('orders.status.cancelled')} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
