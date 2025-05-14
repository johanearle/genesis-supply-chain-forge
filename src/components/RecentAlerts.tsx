
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const alerts = [
  {
    id: 1,
    title: "Low Stock Alert",
    description: "Product XYZ-123 is below minimum threshold",
    severity: "high",
    time: "10 minutes ago",
  },
  {
    id: 2,
    title: "Shipment Delayed",
    description: "Order #45678 delivery will be delayed by 2 days",
    severity: "medium",
    time: "2 hours ago",
  },
  {
    id: 3,
    title: "Price Increase Notice",
    description: "Supplier ABC Corp announced 5% price increase",
    severity: "low",
    time: "1 day ago",
  },
  {
    id: 4,
    title: "New Compliance Requirement",
    description: "Update needed for new safety regulations",
    severity: "medium",
    time: "2 days ago",
  },
];

const RecentAlerts = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t('dashboard.alerts')}</CardTitle>
        <CardDescription>{t('alerts.latestNotifications')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start gap-4 p-3 rounded-lg border bg-card">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{t(`alerts.items.${alert.id}.title`, alert.title)}</h4>
                <Badge
                  className={cn(
                    "ml-auto",
                    alert.severity === "high" && "bg-red-500",
                    alert.severity === "medium" && "bg-yellow-500",
                    alert.severity === "low" && "bg-blue-500"
                  )}
                >
                  {t(`alerts.severity.${alert.severity}`)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {t(`alerts.items.${alert.id}.description`, alert.description)}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                {t(`alerts.items.${alert.id}.time`, alert.time)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentAlerts;
