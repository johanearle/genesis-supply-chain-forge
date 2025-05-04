
import React from "react";
import MetricsOverview from "@/components/analytics/MetricsOverview";
import DemandForecastChart from "@/components/analytics/DemandForecastChart";
import AnomalyDetectionChart from "@/components/analytics/AnomalyDetectionChart";
import AIInsightTable from "@/components/analytics/AIInsightTable";

const AIPredictiveAnalytics = () => {
  return (
    <div className="space-y-6">
      <MetricsOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemandForecastChart />
        <AnomalyDetectionChart />
      </div>

      <AIInsightTable />
    </div>
  );
};

export default AIPredictiveAnalytics;
