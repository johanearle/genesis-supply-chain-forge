
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Cell, ReferenceLine } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ChartWrapper from "./ChartWrapper";
import { capitalize } from "@/utils/analyticsHelpers";

// Simulated API call to get anomaly data
const fetchAnomalyData = async (filter = 'all') => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const fullData = [
    { date: "May 1", value: 32, threshold: 40, severity: "low" },
    { date: "May 2", value: 38, threshold: 40, severity: "low" },
    { date: "May 3", value: 45, threshold: 40, severity: "medium" },
    { date: "May 4", value: 39, threshold: 40, severity: "low" },
    { date: "May 5", value: 52, threshold: 40, severity: "high" },
    { date: "May 6", value: 37, threshold: 40, severity: "low" },
    { date: "May 7", value: 35, threshold: 40, severity: "low" },
    { date: "May 8", value: 58, threshold: 40, severity: "critical" },
    { date: "May 9", value: 36, threshold: 40, severity: "low" },
    { date: "May 10", value: 39, threshold: 40, severity: "low" },
  ];

  if (filter === 'all') {
    return fullData;
  }
  
  // Filter by severity
  return fullData.filter(item => item.severity === filter);
};

const chartConfig = {
  value: { label: "Anomaly Score" },
  threshold: { label: "Threshold" },
};

const severityColorMap = {
  low: "#10b981",
  medium: "#f59e0b",
  high: "#ef4444",
  critical: "#7f1d1d"
};

// Convert severity to readable text
const formatSeverity = (severity: string) => {
  return capitalize(severity);
};

const AnomalyDetectionChart = () => {
  const [filter, setFilter] = useState('all');
  const [animatedBars, setAnimatedBars] = useState<string[]>([]);
  
  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ['anomaly-data', filter],
    queryFn: () => fetchAnomalyData(filter),
  });
  
  // Animate anomalies when data changes
  useEffect(() => {
    if (data.length > 0) {
      const anomalies = data
        .filter(item => item.value > item.threshold)
        .map(item => item.date);
      
      setAnimatedBars([]);
      
      // Stagger the animation for each anomaly
      anomalies.forEach((date, index) => {
        setTimeout(() => {
          setAnimatedBars(prev => [...prev, date]);
        }, index * 200);
      });
    }
  }, [data]);
  
  const getBarClassName = (date: string) => {
    return animatedBars.includes(date) ? "animate-pulse" : "";
  };

  // Calculate total anomalies and severity breakdown
  const anomalyStats = React.useMemo(() => {
    const anomalies = data.filter(item => item.value > item.threshold);
    const total = anomalies.length;
    
    const sevCounts = anomalies.reduce((acc: Record<string, number>, item) => {
      acc[item.severity] = (acc[item.severity] || 0) + 1;
      return acc;
    }, {});
    
    return { total, sevCounts };
  }, [data]);

  // Get domain for the chart
  const getYAxisDomain = () => {
    if (data.length === 0) return [0, 0];
    
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    
    // Give some padding to the top and bottom
    const range = maxValue - minValue;
    return [Math.max(0, minValue - range * 0.1), maxValue + range * 0.2];
  };

  const chartActions = (
    <>
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Filter severity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Anomalies</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="critical">Critical</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
        <RefreshCw size={16} className={isLoading ? "animate-spin mr-2" : "mr-2"} />
        Refresh
      </Button>
    </>
  );

  const chartFooter = (
    <>
      {!isLoading && !error && (
        <div className="flex flex-wrap justify-between mt-4 text-sm">
          <div className="flex items-center">
            <AlertTriangle size={16} className="mr-2 text-amber-500" />
            <span>
              <span className="font-medium">{anomalyStats.total}</span> anomalies detected
            </span>
          </div>
          <div className="flex gap-3">
            {Object.entries(anomalyStats.sevCounts).map(([severity, count]) => (
              <div key={severity} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-1" 
                  style={{ backgroundColor: severityColorMap[severity] }}
                ></div>
                <span>
                  {count} {formatSeverity(severity)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <ChartWrapper
      title="Anomaly Detection"
      description="Machine learning-powered deviation analysis"
      isLoading={isLoading}
      error={error}
      actions={chartActions}
      footer={chartFooter}
    >
      <ChartContainer config={chartConfig} className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={getYAxisDomain()} />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  formatter={(value: any, name: any) => {
                    if (name === "threshold") return [value, "Threshold"];
                    const item = data.find(d => d.value === value);
                    return [
                      value, 
                      <>
                        Anomaly Score
                        {item && item.value > item.threshold && (
                          <span className="ml-2 text-xs inline-block px-1.5 py-0.5 rounded-full bg-red-100 text-red-800">
                            {formatSeverity(item.severity)}
                          </span>
                        )}
                      </>
                    ];
                  }}
                />
              }
            />
            <Legend />
            <ReferenceLine y={data[0]?.threshold} stroke="#ef4444" strokeDasharray="3 3" />
            <Bar 
              dataKey="value" 
              name="Anomaly Score"
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={entry.value > entry.threshold ? severityColorMap[entry.severity] : "#3b82f6"}
                  className={getBarClassName(entry.date)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </ChartWrapper>
  );
};

export default AnomalyDetectionChart;
