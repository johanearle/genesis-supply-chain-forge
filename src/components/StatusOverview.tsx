
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";

const StatusOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            On-Time Delivery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">92%</div>
            <div className="p-2 rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <Progress value={92} className="h-1 mt-3" />
          <p className="text-xs text-muted-foreground mt-2">
            +2.5% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Inventory Accuracy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">96%</div>
            <div className="p-2 rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <Progress value={96} className="h-1 mt-3" />
          <p className="text-xs text-muted-foreground mt-2">
            +1.2% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Order Fulfillment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">87%</div>
            <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <Progress value={87} className="h-1 mt-3" />
          <p className="text-xs text-muted-foreground mt-2">
            -3.1% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Supplier Reliability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">94%</div>
            <div className="p-2 rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <Progress value={94} className="h-1 mt-3" />
          <p className="text-xs text-muted-foreground mt-2">
            +0.8% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusOverview;
