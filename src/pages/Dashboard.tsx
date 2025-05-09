
import StatusOverview from "@/components/StatusOverview";
import SupplyChainMap from "@/components/SupplyChainMap";
import RecentAlerts from "@/components/RecentAlerts";
import OrderSummary from "@/components/OrderSummary";
import InventoryStatus from "@/components/InventoryStatus";
import RecentOrders from "@/components/RecentOrders";
import PaymentIntegration from "@/components/PaymentIntegration";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('dashboard.overview')}</p>
      </div>

      <StatusOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentIntegration />
        <RecentAlerts />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SupplyChainMap />
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <InventoryStatus />
      </div>
    </div>
  );
};

export default Dashboard;
