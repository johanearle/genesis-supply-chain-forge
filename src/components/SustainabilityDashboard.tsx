
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Wind, Droplets, AlertTriangle } from "lucide-react";

const carbonData = [
  { month: "Jan", emissions: 840, target: 900 },
  { month: "Feb", emissions: 820, target: 880 },
  { month: "Mar", emissions: 790, target: 860 },
  { month: "Apr", emissions: 750, target: 840 },
  { month: "May", emissions: 720, target: 820 },
  { month: "Jun", emissions: 690, target: 800 },
];

const energySourceData = [
  { name: "Solar", value: 42, color: "#10b981" },
  { name: "Wind", value: 28, color: "#3b82f6" },
  { name: "Hydro", value: 22, color: "#06b6d4" },
  { name: "Grid", value: 8, color: "#6b7280" },
];

const materialData = [
  { name: "Recycled", value: 68 },
  { name: "Renewable", value: 21 },
  { name: "Conventional", value: 11 }
];

const routeOptimizationData = [
  { route: "A to B", before: 342, after: 298, saving: 44 },
  { route: "C to D", before: 518, after: 412, saving: 106 },
  { route: "E to F", before: 287, after: 231, saving: 56 },
  { route: "G to H", before: 465, after: 389, saving: 76 },
];

const SustainabilityDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              <div className="flex items-center">
                <Leaf className="mr-2 h-4 w-4 text-green-500" />
                Carbon Reduction
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">41%</div>
            <p className="text-xs text-muted-foreground mt-2">
              vs. industry baseline
            </p>
            <Progress value={41} className="h-1 mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              <div className="flex items-center">
                <Wind className="mr-2 h-4 w-4 text-blue-500" />
                Renewable Energy
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground mt-2">
              operations powered by renewables
            </p>
            <Progress value={92} className="h-1 mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              <div className="flex items-center">
                <Droplets className="mr-2 h-4 w-4 text-blue-400" />
                Water Usage
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-32%</div>
            <p className="text-xs text-muted-foreground mt-2">
              reduction from previous quarter
            </p>
            <Progress value={32} className="h-1 mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                Environmental Risk
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Low</div>
            <p className="text-xs text-muted-foreground mt-2">
              based on regulatory compliance
            </p>
            <div className="h-1 mt-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '15%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Carbon Emissions Tracking</CardTitle>
            <CardDescription>Monthly CO2e emissions with reduction targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={carbonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="emissions" 
                    name="Actual Emissions (tons CO2e)" 
                    stroke="#10b981" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    name="Target Emissions" 
                    stroke="#6b7280" 
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-xs text-center text-muted-foreground">
              <span className="font-medium text-green-600">-17.9%</span> reduction in carbon emissions over 6 month period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Sources</CardTitle>
            <CardDescription>WattTime API integration for energy source tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={energySourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {energySourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {energySourceData.map((source) => (
                <div key={source.name} className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                  <span className="text-xs mt-1">{source.name}</span>
                  <span className="text-xs font-medium">{source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Circular Economy Score</CardTitle>
            <CardDescription>
              CE Score = (Σ Recycled Inputs)/(Total Inputs) × 100
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative pt-1">
                <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                  <div 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                    style={{ width: "68%" }}
                  >
                    <span className="font-bold">Recycled 68%</span>
                  </div>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200 mt-2">
                  <div 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    style={{ width: "21%" }}
                  >
                    <span className="font-bold">Renewable 21%</span>
                  </div>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200 mt-2">
                  <div 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500"
                    style={{ width: "11%" }}
                  >
                    <span className="font-bold">Conventional 11%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="rounded-full h-32 w-32 flex items-center justify-center bg-green-100 border-8 border-green-500">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">89</div>
                  <div className="text-xs font-medium text-green-600">CE SCORE</div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              <div className="bg-green-50 p-2 rounded">
                <div className="text-xs text-green-800">Last Year</div>
                <div className="text-sm font-medium">76</div>
              </div>
              <div className="bg-green-100 p-2 rounded">
                <div className="text-xs text-green-800">Current</div>
                <div className="text-sm font-bold">89</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div className="text-xs text-green-800">Target</div>
                <div className="text-sm font-medium">95</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Route Optimization</CardTitle>
            <CardDescription>Hybrid quantum-inspired annealing algorithm results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={routeOptimizationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="route" type="category" width={60} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="before" name="Before Optimization (km)" fill="#6b7280" />
                  <Bar dataKey="after" name="After Optimization (km)" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-between text-xs">
              <div className="text-muted-foreground">
                Total distance reduction: <span className="font-medium">282 km</span>
              </div>
              <div className="text-muted-foreground">
                Carbon saved: <span className="font-medium text-green-600">163 kg CO2e</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SustainabilityDashboard;
