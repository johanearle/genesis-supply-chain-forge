
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/Badge";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Clock, Loader, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getTrendColor } from "@/utils/analyticsHelpers";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: {
    value: string;
    color?: string;
  };
  isLoading?: boolean;
  icon?: React.ReactNode;
  tooltip?: string;
}

// Simulated API call to get metrics data
const fetchMetricsData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  return {
    decisionLatency: {
      value: "842ms",
      badge: { value: "-8ms" },
      subtitle: "99th percentile response time",
      trend: "down", // down is good for latency
      tooltip: "Time taken to make supply chain decisions"
    },
    processingThroughput: {
      value: "2,348/sec",
      badge: { value: "+56/sec" },
      subtitle: "Decisions per second per node",
      trend: "up", // up is good for throughput
      tooltip: "Number of supply chain decisions processed each second"
    },
    predictionAccuracy: {
      value: "94.7%",
      badge: { value: "+2.3%" },
      subtitle: "+2.3% vs. human benchmark",
      trend: "up", // up is good for accuracy
      tooltip: "Accuracy of AI prediction algorithms compared to historical data"
    },
    energyEfficiency: {
      value: "63%",
      badge: { value: "+5%" },
      subtitle: "Reduction via neural sparsity",
      trend: "up", // up is good for efficiency
      tooltip: "Energy efficiency gains from optimized neural network architecture"
    },
    lastUpdated: new Date().toISOString()
  };
};

const MetricCard = ({ title, value, subtitle, badge, isLoading, icon, tooltip }: MetricCardProps) => (
  <Card className="transition-all duration-200 hover:shadow-md hover:border-primary/20">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help">{title}</span>
              </TooltipTrigger>
              {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
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
            {badge && badge.value && (
              <Badge className={`ml-2 ${badge.color || getBadgeColor(badge.value)}`}>
                {badge.value.includes("+") ? (
                  <ArrowUp className="mr-1" size={12} />
                ) : badge.value.includes("-") ? (
                  <ArrowDown className="mr-1" size={12} />
                ) : null}
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

// Helper to determine badge color based on value and metric type
const getBadgeColor = (value: string): string => {
  // For numerical values with + or - prefix
  if (value.startsWith("+")) {
    return "bg-green-500";
  } else if (value.startsWith("-")) {
    return "bg-blue-500"; // assuming negative values are good in this context (like reduced latency)
  } else {
    return "bg-gray-500";
  }
};

const MetricsOverview = () => {
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  
  const { data, isLoading, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: ['metrics-overview'],
    queryFn: fetchMetricsData,
    refetchInterval: refreshInterval,
    staleTime: 10000,
  });

  // Calculate time since last update
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt) : null;
  const timeAgo = lastUpdated ? getTimeAgo(lastUpdated) : 'never';

  // Handle error state
  if (error) {
    console.error("Error fetching metrics:", error);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Real-time Metrics</h2>
        <div className="flex items-center space-x-2 text-xs">
          <div className="flex items-center text-muted-foreground">
            <Clock size={14} className="mr-1" />
            Updated {timeAgo}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => refetch()} 
            className="text-xs h-8"
          >
            <RefreshCw size={14} className={`mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Decision Latency"
          value={data?.decisionLatency.value || ""}
          badge={data?.decisionLatency.badge}
          subtitle={data?.decisionLatency.subtitle}
          isLoading={isLoading}
          icon={<Clock size={16} className={getTrendColor(-1, false)} />}
          tooltip={data?.decisionLatency.tooltip}
        />
        <MetricCard
          title="Processing Throughput"
          value={data?.processingThroughput.value || ""}
          badge={data?.processingThroughput.badge}
          subtitle={data?.processingThroughput.subtitle}
          isLoading={isLoading}
          icon={<ArrowUp size={16} className={getTrendColor(1)} />}
          tooltip={data?.processingThroughput.tooltip}
        />
        <MetricCard
          title="Prediction Accuracy"
          value={data?.predictionAccuracy.value || ""}
          subtitle={data?.predictionAccuracy.subtitle}
          badge={data?.predictionAccuracy.badge}
          isLoading={isLoading}
          icon={<ArrowUp size={16} className={getTrendColor(1)} />}
          tooltip={data?.predictionAccuracy.tooltip}
        />
        <MetricCard
          title="Energy Efficiency"
          value={data?.energyEfficiency.value || ""}
          subtitle={data?.energyEfficiency.subtitle}
          badge={data?.energyEfficiency.badge}
          isLoading={isLoading}
          icon={<ArrowUp size={16} className={getTrendColor(1)} />}
          tooltip={data?.energyEfficiency.tooltip}
        />
      </div>
    </div>
  );
};

// Helper function to display time since last update
function getTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  
  const hours = Math.floor(minutes / 60);
  return `${hours} hour${hours > 1 ? 's' : ''} ago`;
}

export default MetricsOverview;
