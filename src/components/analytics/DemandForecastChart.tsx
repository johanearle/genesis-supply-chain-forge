
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, ReferenceArea } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChartWrapper from "./ChartWrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Simulated API call to get forecast data
const fetchForecastData = async (timeframe = '3m') => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // Base data
  const baseData = [
    { month: "Jan", actual: 120, predicted: 127, lower: 115, upper: 139 },
    { month: "Feb", actual: 132, predicted: 130, lower: 120, upper: 140 },
    { month: "Mar", actual: 125, predicted: 128, lower: 118, upper: 138 },
    { month: "Apr", actual: 140, predicted: 138, lower: 130, upper: 146 },
    { month: "May", actual: 147, predicted: 150, lower: 140, upper: 160 },
    { month: "Jun", actual: null, predicted: 156, lower: 145, upper: 167 },
    { month: "Jul", actual: null, predicted: 162, lower: 148, upper: 176 },
    { month: "Aug", actual: null, predicted: 170, lower: 157, upper: 183 },
  ];
  
  // Adjust data based on timeframe
  switch(timeframe) {
    case '1m':
      return baseData.slice(-3);
    case '6m':
      return [...baseData, 
        { month: "Sep", actual: null, predicted: 175, lower: 160, upper: 190 },
        { month: "Oct", actual: null, predicted: 182, lower: 170, upper: 194 },
        { month: "Nov", actual: null, predicted: 188, lower: 175, upper: 201 }
      ];
    case '12m':
      return [...baseData,
        { month: "Sep", actual: null, predicted: 175, lower: 160, upper: 190 },
        { month: "Oct", actual: null, predicted: 182, lower: 170, upper: 194 },
        { month: "Nov", actual: null, predicted: 188, lower: 175, upper: 201 },
        { month: "Dec", actual: null, predicted: 194, lower: 180, upper: 208 },
        { month: "Jan", actual: null, predicted: 187, lower: 175, upper: 199 },
        { month: "Feb", actual: null, predicted: 192, lower: 178, upper: 206 },
        { month: "Mar", actual: null, predicted: 198, lower: 183, upper: 213 },
      ];
    default:
      return baseData;
  }
};

const chartConfig = {
  actual: { label: "Actual" },
  predicted: { label: "AI Prediction" },
  upper: { label: "Upper Bound" },
  lower: { label: "Lower Bound" },
};

const timeframeOptions = [
  { value: '1m', label: '1 Month Forecast' },
  { value: '3m', label: '3 Month Forecast' },
  { value: '6m', label: '6 Month Forecast' },
  { value: '12m', label: '12 Month Forecast' },
];

const DemandForecastChart = () => {
  const [timeframe, setTimeframe] = useState('3m');
  const [refAreaLeft, setRefAreaLeft] = useState('');
  const [refAreaRight, setRefAreaRight] = useState('');
  const [zoomedData, setZoomedData] = useState<Array<any> | null>(null);
  
  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ['forecast-data', timeframe],
    queryFn: () => fetchForecastData(timeframe),
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

  // Calculate forecast accuracy
  const accuracyMetrics = React.useMemo(() => {
    const pastData = data.filter(item => item.actual !== null);
    if (pastData.length === 0) return { accuracy: 0, mape: 0 };
    
    const totalError = pastData.reduce((sum, item) => {
      const error = Math.abs((item.predicted - item.actual) / item.actual);
      return sum + error;
    }, 0);
    
    const mape = (totalError / pastData.length) * 100;
    const accuracy = 100 - mape;
    
    return { 
      accuracy: accuracy.toFixed(1), 
      mape: mape.toFixed(1) 
    };
  }, [data]);

  const chartActions = (
    <>
      <Select value={timeframe} onValueChange={setTimeframe}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Forecast Timeframe" />
        </SelectTrigger>
        <SelectContent>
          {timeframeOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
        <RefreshCw size={16} className={isLoading ? "animate-spin mr-2" : "mr-2"} />
        Refresh
      </Button>
    </>
  );

  const chartFooter = (
    <div className="flex justify-between mt-4">
      <div className="flex items-center text-xs text-muted-foreground">
        <Zap size={16} className="mr-2" />
        Powered by 128-layer LSTM neural network with temporal attention
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div>
          <span className="font-medium">Accuracy:</span> {accuracyMetrics.accuracy}%
        </div>
        <div>
          <span className="font-medium">MAPE:</span> {accuracyMetrics.mape}%
        </div>
        {zoomedData && (
          <Button size="sm" variant="outline" onClick={handleReset}>
            Reset Zoom
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <ChartWrapper
      title="Demand Forecasting (LSTM-powered)"
      description="AI-powered prediction with confidence intervals"
      isLoading={isLoading}
      error={error}
      actions={chartActions}
      footer={chartFooter}
    >
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
      <div className="mt-2 text-xs text-muted-foreground">
        {!zoomedData ? "Drag to zoom into specific time periods" : `Showing ${zoomedData[0].month} - ${zoomedData[zoomedData.length - 1].month}`}
      </div>
    </ChartWrapper>
  );
};

export default DemandForecastChart;
