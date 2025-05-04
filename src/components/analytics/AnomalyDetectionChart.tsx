
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const anomalyData = [
  { date: "2023-05-01", value: 42, normal: true },
  { date: "2023-05-02", value: 44, normal: true },
  { date: "2023-05-03", value: 46, normal: true },
  { date: "2023-05-04", value: 70, normal: false },
  { date: "2023-05-05", value: 45, normal: true },
  { date: "2023-05-06", value: 47, normal: true },
  { date: "2023-05-07", value: 49, normal: true },
  { date: "2023-05-08", value: 52, normal: true },
  { date: "2023-05-09", value: 35, normal: false },
  { date: "2023-05-10", value: 48, normal: true },
];

// Custom fill function for bar chart to change color based on normal/anomaly status
const getBarFill = (entry: { normal: boolean }) => {
  return entry.normal ? "#3b82f6" : "#ef4444";
};

const AnomalyDetectionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anomaly Detection</CardTitle>
        <CardDescription>Real-time monitoring with ML-based detection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={anomalyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="value" 
                name="Value"
                fill="#3b82f6"
                // Use this pattern to specify dynamic fill colors based on data
                fillOpacity={1}
                stroke="none"
                barSize={30}
                // Adding a style function to the Bar elements
                isAnimationActive={true}
                shape={(props: any) => {
                  const { x, y, width, height, normal } = props;
                  return (
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={props.payload.normal ? "#3b82f6" : "#ef4444"}
                    />
                  );
                }}
              />
            </BarChart>
          </ResponsiveContainer>
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
