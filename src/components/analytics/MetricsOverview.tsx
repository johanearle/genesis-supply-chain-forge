
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/Badge";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  badge?: {
    value: string;
    color?: string;
  };
}

const MetricCard = ({ title, value, subtitle, badge }: MetricCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
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
    </CardContent>
  </Card>
);

const MetricsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        title="Decision Latency"
        value="842ms"
        badge={{ value: "-8ms" }}
        subtitle="99th percentile response time"
      />
      <MetricCard
        title="Processing Throughput"
        value="2,348/sec"
        subtitle="Decisions per second per node"
      />
      <MetricCard
        title="Prediction Accuracy"
        value="94.7%"
        subtitle="+2.3% vs. human benchmark"
      />
      <MetricCard
        title="Energy Efficiency"
        value="63%"
        subtitle="Reduction via neural sparsity"
      />
    </div>
  );
};

export default MetricsOverview;
