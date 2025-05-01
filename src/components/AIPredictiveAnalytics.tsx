
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Zap, Activity, TrendingUp, FileBarChart } from "lucide-react";
import Badge from "@/components/Badge";

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

const insightData = [
  { name: "Stock Levels", recommendation: "Increase Widget A inventory by 15%", confidence: 92, impact: 87 },
  { name: "Supplier Risk", recommendation: "Diversify Supplier C dependencies", confidence: 89, impact: 94 },
  { name: "Logistics", recommendation: "Reroute shipping through Northern hub", confidence: 86, impact: 78 },
  { name: "Manufacturing", recommendation: "Reduce batch size by 12%", confidence: 91, impact: 83 },
];

const AIPredictiveAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Decision Latency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">842ms</div>
              <Badge className="ml-2 bg-green-500">-8ms</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              99th percentile response time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Processing Throughput
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,348/sec</div>
            <p className="text-xs text-muted-foreground mt-2">
              Decisions per second per node
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Prediction Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.7%</div>
            <p className="text-xs text-muted-foreground mt-2">
              +2.3% vs. human benchmark
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Energy Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">63%</div>
            <p className="text-xs text-muted-foreground mt-2">
              Reduction via neural sparsity
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    fill={(entry) => entry.normal ? "#3b82f6" : "#ef4444"}
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Insights & Recommendations</CardTitle>
          <CardDescription>
            Generated using multi-agent reinforcement learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Area</th>
                  <th className="text-left py-3 px-4">AI Recommendation</th>
                  <th className="text-center py-3 px-4">Confidence</th>
                  <th className="text-center py-3 px-4">Impact</th>
                </tr>
              </thead>
              <tbody>
                {insightData.map((insight) => (
                  <tr key={insight.name} className="border-b">
                    <td className="py-3 px-4">{insight.name}</td>
                    <td className="py-3 px-4">{insight.recommendation}</td>
                    <td className="py-3 px-4 text-center">{insight.confidence}%</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${insight.impact}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm">{insight.impact}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-muted-foreground mt-4 flex items-center">
            <Activity size={16} className="mr-2" />
            Recommendations updated hourly based on real-time data analysis
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPredictiveAnalytics;
