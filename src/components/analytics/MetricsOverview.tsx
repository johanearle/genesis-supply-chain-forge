
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/Badge";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: {
    value: string;
    color?: string;
  };
  isLoading?: boolean;
}

// Simulated API call to get metrics data
const fetchMetricsData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return {
    decisionLatency: {
      value: "842ms",
      badge: { value: "-8ms" },
      subtitle: "99th percentile response time"
    },
    processingThroughput: {
      value: "2,348/sec",
      subtitle: "Decisions per second per node"
    },
    predictionAccuracy: {
      value: "94.7%",
      subtitle: "+2.3% vs. human benchmark"
    },
    energyEfficiency: {
      value: "63%",
      subtitle: "Reduction via neural sparsity"
    }
  };
};

const MetricCard = ({ title, value, subtitle, badge, isLoading }: MetricCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="flex justify-center items-center h-12">
          <Loader size={20} className="animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <div className="text-2xl font-bold">{value}</div>
            {badge && (
              <Badge className={`ml-2 ${badge.color || "bg-green-500"}`}>
                {badge.value}
              </Badge>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
          )}
        </>
      )}
    </CardContent>
  </Card>
);

const MetricsOverview = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['metrics-overview'],
    queryFn: fetchMetricsData,
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  // Handle error state
  if (error) {
    console.error("Error fetching metrics:", error);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Real-time Metrics</h2>
        <button 
          onClick={() => refetch()} 
          className="text-xs text-primary flex items-center gap-1 hover:underline"
        >
          Refresh Data
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Decision Latency"
          value={data?.decisionLatency.value || ""}
          badge={data?.decisionLatency.badge}
          subtitle={data?.decisionLatency.subtitle}
          isLoading={isLoading}
        />
        <MetricCard
          title="Processing Throughput"
          value={data?.processingThroughput.value || ""}
          subtitle={data?.processingThroughput.subtitle}
          isLoading={isLoading}
        />
        <MetricCard
          title="Prediction Accuracy"
          value={data?.predictionAccuracy.value || ""}
          subtitle={data?.predictionAccuracy.subtitle}
          isLoading={isLoading}
        />
        <MetricCard
          title="Energy Efficiency"
          value={data?.energyEfficiency.value || ""}
          subtitle={data?.energyEfficiency.subtitle}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default MetricsOverview;
