
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceArea } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { Loader, RefreshCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simulated API call to get forecast data
const fetchForecastData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  return [
    { month: "Jan", actual: 120, predicted: 127, lower: 115, upper: 139 },
    { month: "Feb", actual: 132, predicted: 130, lower: 120, upper: 140 },
    { month: "Mar", actual: 125, predicted: 128, lower: 118, upper: 138 },
    { month: "Apr", actual: 140, predicted: 138, lower: 130, upper: 146 },
    { month: "May", actual: 147, predicted: 150, lower: 140, upper: 160 },
    { month: "Jun", actual: null, predicted: 156, lower: 145, upper: 167 },
    { month: "Jul", actual: null, predicted: 162, lower: 148, upper: 176 },
    { month: "Aug", actual: null, predicted: 170, lower: 157, upper: 183 },
  ];
};

const chartConfig = {
  actual: { label: "Actual" },
  predicted: { label: "AI Prediction" },
  upper: { label: "Upper Bound" },
  lower: { label: "Lower Bound" },
};

const DemandForecastChart = () => {
  const [refAreaLeft, setRefAreaLeft] = useState('');
  const [refAreaRight, setRefAreaRight] = useState('');
  const [zoomedData, setZoomedData] = useState<Array<any> | null>(null);
  
  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ['forecast-data'],
    queryFn: fetchForecastData,
  });

  const chartData = zoomedData || data;

  const handleMouseDown = (e: any) => {
    if (e && e.activeLabel) {
      setRefAreaLeft(e.activeLabel);
    }
  };

  const handleMouseMove = (e: any) => {
    if (refAreaLeft && e && e.activeLabel) {
      setRefAreaRight(e.activeLabel);
    }
  };

  const handleMouseUp = () => {
    if (refAreaLeft === refAreaRight || !refAreaRight) {
      setRefAreaLeft('');
      setRefAreaRight('');
      return;
    }

    // Order labels
    let left = data.findIndex(item => item.month === refAreaLeft);
    let right = data.findIndex(item => item.month === refAreaRight);

    if (left > right) {
      [left, right] = [right, left];
    }

    const zoomed = data.slice(left, right + 1);
    setZoomedData(zoomed.length > 1 ? zoomed : null);

    setRefAreaLeft('');
    setRefAreaRight('');
  };

  const handleReset = () => {
    setZoomedData(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Demand Forecasting (LSTM-powered)</CardTitle>
          <CardDescription>Next 3 months prediction with confidence intervals</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
          <RefreshCw size={16} className={isLoading ? "animate-spin mr-2" : "mr-2"} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center text-destructive">
              Error loading forecast data
            </div>
          ) : (
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={chartData}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                >
                  <defs>
                    <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Actual"
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    name="AI Prediction"
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="upper" 
                    stroke="#d1d5db" 
                    strokeWidth={1}
                    name="Upper Bound"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lower" 
                    stroke="#d1d5db" 
                    strokeWidth={1}
                    name="Lower Bound"
                    dot={false}
                  />
                  {refAreaLeft && refAreaRight && (
                    <ReferenceArea
                      x1={refAreaLeft}
                      x2={refAreaRight}
                      strokeOpacity={0.3}
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <div className="text-xs text-muted-foreground flex items-center">
            <Zap size={16} className="mr-2" />
            Powered by 128-layer LSTM neural network with temporal attention
          </div>
          {zoomedData && (
            <Button size="sm" variant="outline" onClick={handleReset}>
              Reset Zoom
            </Button>
          )}
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          {!zoomedData ? "Drag to zoom into specific time periods" : `Showing ${zoomedData[0].month} - ${zoomedData[zoomedData.length - 1].month}`}
        </div>
      </CardContent>
    </Card>
  );
};

export default DemandForecastChart;
