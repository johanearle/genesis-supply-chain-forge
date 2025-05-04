
import React from "react";
import { Toaster } from "sonner";
import MetricsOverview from "@/components/analytics/MetricsOverview";
import DemandForecastChart from "@/components/analytics/DemandForecastChart";
import AnomalyDetectionChart from "@/components/analytics/AnomalyDetectionChart";
import AIInsightTable from "@/components/analytics/AIInsightTable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const AIPredictiveAnalytics = () => {
  const handleExportData = () => {
    // Simulate data export
    console.log("Exporting analytics data...");
    // Show a toast notification
    window.toast?.("Analytics data exported successfully", {
      description: "The report has been downloaded to your device",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Predictive Analytics Dashboard</h2>
        <Button onClick={handleExportData} size="sm">
          <Download className="mr-2" size={16} />
          Export Report
        </Button>
      </div>
      
      <MetricsOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemandForecastChart />
        <AnomalyDetectionChart />
      </div>

      <AIInsightTable />
      
      {/* Add Toaster for notifications */}
      <Toaster position="top-right" />
    </div>
  );
};

export default AIPredictiveAnalytics;
