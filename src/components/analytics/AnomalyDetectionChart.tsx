
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { Loader, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TooltipProvider, Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Simulated API call to get anomaly data
const fetchAnomalyData = async (timeFrame: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  const baseData = [
    { date: "2023-05-01", value: 42, normal: true },
    { date: "2023-05-02", value: 44, normal: true },
    { date: "2023-05-03", value: 46, normal: true },
    { date: "2023-05-04", value: 70, normal: false, reason: "Unexpected spike in demand" },
    { date: "2023-05-05", value: 45, normal: true },
    { date: "2023-05-06", value: 47, normal: true },
    { date: "2023-05-07", value: 49, normal: true },
    { date: "2023-05-08", value: 52, normal: true },
    { date: "2023-05-09", value: 35, normal: false, reason: "Supply chain disruption" },
    { date: "2023-05-10", value: 48, normal: true },
  ];

  // Extended data for other time frames
  if (timeFrame === "2-weeks") {
    return [
      ...baseData,
      { date: "2023-05-11", value: 50, normal: true },
      { date: "2023-05-12", value: 51, normal: true },
      { date: "2023-05-13", value: 75, normal: false, reason: "Logistics delay" },
      { date: "2023-05-14", value: 49, normal: true },
    ];
  } else if (timeFrame === "1-month") {
    return [
      ...baseData,
      { date: "2023-05-11", value: 50, normal: true },
      { date: "2023-05-12", value: 51, normal: true },
      { date: "2023-05-13", value: 75, normal: false, reason: "Logistics delay" },
      { date: "2023-05-14", value: 49, normal: true },
      { date: "2023-05-15", value: 48, normal: true },
      { date: "2023-05-16", value: 46, normal: true },
      { date: "2023-05-17", value: 45, normal: true },
      { date: "2023-05-18", value: 32, normal: false, reason: "Component shortage" },
      { date: "2023-05-19", value: 47, normal: true },
      { date: "2023-05-20", value: 49, normal: true },
    ];
  }

  return baseData;
};

const AnomalyDetectionChart = () => {
  const [timeFrame, setTimeFrame] = useState("10-days");
  const [anomaliesOnly, setAnomaliesOnly] = useState(false);
  
  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ['anomaly-data', timeFrame],
    queryFn: () => fetchAnomalyData(timeFrame),
  });

  const displayData = anomaliesOnly ? data.filter(item => !item.normal) : data;

  // Calculate statistics
  const anomalyCount = data.filter(item => !item.normal).length;
  const totalEntries = data.length;
  const anomalyPercentage = totalEntries > 0 ? ((anomalyCount / totalEntries) * 100).toFixed(1) : "0";

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-background border rounded-md p-3 shadow-lg">
          <p className="font-medium">{item.date}</p>
          <p className="text-sm">Value: {item.value}</p>
          {!item.normal && (
            <div className="mt-1 text-xs bg-red-100 text-red-800 p-1 rounded">
              <span className="font-medium">Anomaly:</span> {item.reason || "Unusual pattern detected"}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              Anomaly Detection
              {anomalyCount > 0 && (
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger>
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                        <AlertTriangle size={12} className="mr-1" />
                        {anomalyCount}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{anomalyCount} anomalies detected ({anomalyPercentage}%)</TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              )}
            </CardTitle>
            <CardDescription>ML-based pattern anomaly detection</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10-days">10 days</SelectItem>
                <SelectItem value="2-weeks">2 weeks</SelectItem>
                <SelectItem value="1-month">1 month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => setAnomaliesOnly(!anomaliesOnly)}>
              {anomaliesOnly ? "Show All" : "Anomalies Only"}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => refetch()} disabled={isLoading}>
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center text-destructive">
              Error loading anomaly data
            </div>
          ) : displayData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              No anomalies found in the selected time range
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={displayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  name="Value"
                  fillOpacity={1}
                  stroke="none"
                  barSize={30}
                  isAnimationActive={true}
                  shape={(props: any) => {
                    const { x, y, width, height } = props;
                    const fill = props.payload.normal ? "#3b82f6" : "#ef4444";
                    
                    return (
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill={fill}
                        radius={[4, 4, 0, 0]}
                      />
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="flex justify-between mt-4 text-xs">
          <div className="flex items-center">
            <span className="h-3 w-3 bg-blue-500 rounded-full mr-1"></span>
            <span className="text-muted-foreground">Normal Operation</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 bg-red-500 rounded-full mr-1"></span>
            <span className="text-muted-foreground">Detected Anomaly</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnomalyDetectionChart;
