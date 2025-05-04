
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";

const insightData = [
  { name: "Stock Levels", recommendation: "Increase Widget A inventory by 15%", confidence: 92, impact: 87 },
  { name: "Supplier Risk", recommendation: "Diversify Supplier C dependencies", confidence: 89, impact: 94 },
  { name: "Logistics", recommendation: "Reroute shipping through Northern hub", confidence: 86, impact: 78 },
  { name: "Manufacturing", recommendation: "Reduce batch size by 12%", confidence: 91, impact: 83 },
];

const AIInsightTable = () => {
  return (
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
  );
};

export default AIInsightTable;
