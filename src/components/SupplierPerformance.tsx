
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  {
    month: "Jan",
    supplierA: 90,
    supplierB: 82,
    supplierC: 95,
  },
  {
    month: "Feb",
    supplierA: 92,
    supplierB: 80,
    supplierC: 92,
  },
  {
    month: "Mar",
    supplierA: 88,
    supplierB: 85,
    supplierC: 90,
  },
  {
    month: "Apr",
    supplierA: 91,
    supplierB: 88,
    supplierC: 93,
  },
  {
    month: "May",
    supplierA: 94,
    supplierB: 90,
    supplierC: 88,
  },
];

const SupplierPerformance = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Supplier Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[70, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="supplierA" name="Supplier A" stroke="#0ea5e9" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="supplierB" name="Supplier B" stroke="#6366f1" />
              <Line type="monotone" dataKey="supplierC" name="Supplier C" stroke="#f97316" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierPerformance;
