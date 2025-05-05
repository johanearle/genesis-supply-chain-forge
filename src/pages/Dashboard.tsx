
import StatusOverview from "@/components/StatusOverview";
import SupplyChainMap from "@/components/SupplyChainMap";
import RecentAlerts from "@/components/RecentAlerts";
import OrderSummary from "@/components/OrderSummary";
import InventoryStatus from "@/components/InventoryStatus";
import RecentOrders from "@/components/RecentOrders";
import PaymentIntegration from "@/components/PaymentIntegration";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your supply chain operations</p>
      </div>

      <StatusOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SupplyChainMap />
        </div>
        <div>
          <RecentAlerts />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderSummary />
        <RecentOrders />
      </div>
      
      <PaymentIntegration />
      
      <InventoryStatus />
    </div>
  );
};

export default Dashboard;
