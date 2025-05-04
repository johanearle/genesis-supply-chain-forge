
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Zap } from "lucide-react";

const forecastData = [
  { month: "Jan", actual: 120, predicted: 127, lower: 115, upper: 139 },
  { month: "Feb", actual: 132, predicted: 130, lower: 120, upper: 140 },
  { month: "Mar", actual: 125, predicted: 128, lower: 118, upper: 138 },
  { month: "Apr", actual: 140, predicted: 138, lower: 130, upper: 146 },
  { month: "May", actual: 147, predicted: 150, lower: 140, upper: 160 },
  { month: "Jun", actual: null, predicted: 156, lower: 145, upper: 167 },
  { month: "Jul", actual: null, predicted: 162, lower: 148, upper: 176 },
  { month: "Aug", actual: null, predicted: 170, lower: 157, upper: 183 },
];

const DemandForecastChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Demand Forecasting (LSTM-powered)</CardTitle>
        <CardDescription>Next 3 months prediction with confidence intervals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Actual"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#10b981" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                name="AI Prediction"
              />
              <Line 
                type="monotone" 
                dataKey="upper" 
                stroke="#d1d5db" 
                strokeWidth={1}
                name="Upper Bound"
              />
              <Line 
                type="monotone" 
                dataKey="lower" 
                stroke="#d1d5db" 
                strokeWidth={1}
                name="Lower Bound"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-muted-foreground mt-4 flex items-center">
          <Zap size={16} className="mr-2" />
          Powered by 128-layer LSTM neural network with temporal attention
        </div>
      </CardContent>
    </Card>
  );
};

export default DemandForecastChart;
