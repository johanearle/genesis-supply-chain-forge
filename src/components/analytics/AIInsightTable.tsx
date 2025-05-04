
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import Badge from "@/components/Badge";

interface InsightItem {
  id: string;
  name: string;
  recommendation: string;
  confidence: number;
  impact: number;
  category: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
}

// Simulated API call to get insights data
const fetchInsightsData = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  return [
    { 
      id: "i1", 
      name: "Stock Levels", 
      recommendation: "Increase Widget A inventory by 15%", 
      confidence: 92, 
      impact: 87,
      category: "Inventory",
      priority: "high" as const,
      timestamp: "2023-05-04T09:15:22Z"
    },
    { 
      id: "i2", 
      name: "Supplier Risk", 
      recommendation: "Diversify Supplier C dependencies", 
      confidence: 89, 
      impact: 94,
      category: "Supply Chain",
      priority: "high" as const,
      timestamp: "2023-05-04T10:22:45Z" 
    },
    { 
      id: "i3", 
      name: "Logistics", 
      recommendation: "Reroute shipping through Northern hub", 
      confidence: 86, 
      impact: 78,
      category: "Logistics",
      priority: "medium" as const,
      timestamp: "2023-05-03T14:08:12Z" 
    },
    { 
      id: "i4", 
      name: "Manufacturing", 
      recommendation: "Reduce batch size by 12%", 
      confidence: 91, 
      impact: 83,
      category: "Production",
      priority: "medium" as const,
      timestamp: "2023-05-02T11:45:36Z" 
    },
    { 
      id: "i5", 
      name: "Distribution", 
      recommendation: "Consolidate regional warehousing", 
      confidence: 84, 
      impact: 79,
      category: "Logistics",
      priority: "low" as const,
      timestamp: "2023-05-01T16:30:22Z" 
    },
    { 
      id: "i6", 
      name: "Quality Control", 
      recommendation: "Implement additional testing at stage 2", 
      confidence: 93, 
      impact: 85,
      category: "Production",
      priority: "high" as const,
      timestamp: "2023-05-04T08:12:18Z" 
    }
  ];
};

const AIInsightTable = () => {
  const [sortField, setSortField] = useState<keyof InsightItem>("impact");
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterText, setFilterText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ['insights-data'],
    queryFn: fetchInsightsData,
  });

  const handleSort = (field: keyof InsightItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const filteredData = sortedData.filter((item) => {
    const matchesText = filterText === "" || 
      item.name.toLowerCase().includes(filterText.toLowerCase()) || 
      item.recommendation.toLowerCase().includes(filterText.toLowerCase());
    
    const matchesCategory = categoryFilter === null || item.category === categoryFilter;
    
    return matchesText && matchesCategory;
  });

  // Extract unique categories for filter
  const categories = Array.from(new Set(data.map(item => item.category)));

  const priorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return "bg-red-500";
      case 'medium': return "bg-yellow-500";
      case 'low': return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle>AI-Generated Insights & Recommendations</CardTitle>
            <CardDescription>
              Generated using multi-agent reinforcement learning
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
            <RefreshCw size={16} className={`mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Input
              placeholder="Search insights..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="pl-8"
            />
            <div className="absolute left-2.5 top-2.5 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button 
              variant={categoryFilter === null ? "secondary" : "outline"} 
              size="sm"
              onClick={() => setCategoryFilter(null)}
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={categoryFilter === category ? "secondary" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort('name')} className="cursor-pointer hover:bg-muted">
                  <div className="flex items-center">
                    Area
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </TableHead>
                <TableHead>AI Recommendation</TableHead>
                <TableHead onClick={() => handleSort('confidence')} className="cursor-pointer hover:bg-muted text-center">
                  <div className="flex items-center justify-center">
                    Confidence
                    {sortField === 'confidence' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </TableHead>
                <TableHead onClick={() => handleSort('impact')} className="cursor-pointer hover:bg-muted text-center">
                  <div className="flex items-center justify-center">
                    Impact
                    {sortField === 'impact' && (
                      sortDirection === 'asc' ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-center">Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">Loading insights data...</TableCell>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">No matching insights found</TableCell>
                </TableRow>
              ) : (
                filteredData.map((insight) => (
                  <TableRow key={insight.id}>
                    <TableCell>
                      <div className="font-medium">{insight.name}</div>
                      <div className="text-xs text-muted-foreground">{insight.category}</div>
                    </TableCell>
                    <TableCell className="max-w-sm">{insight.recommendation}</TableCell>
                    <TableCell className="text-center">{insight.confidence}%</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${insight.impact}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{insight.impact}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={priorityColor(insight.priority)}>
                        {insight.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="text-xs text-muted-foreground mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <Activity size={16} className="mr-2" />
            Recommendations updated hourly based on real-time data analysis
          </div>
          <div>{filteredData.length} of {data.length} insights displayed</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightTable;
