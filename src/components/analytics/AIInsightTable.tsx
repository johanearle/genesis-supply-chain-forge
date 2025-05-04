
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, ChevronDown, ChevronUp, Filter, Loader, RefreshCw, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { capitalize } from "@/utils/analyticsHelpers";

// Type definitions for insights
interface Insight {
  id: string;
  title: string;
  description: string;
  category: 'inventory' | 'logistics' | 'demand' | 'supplier' | 'risk';
  impact: 'high' | 'medium' | 'low';
  date: string;
  status: 'new' | 'reviewed' | 'implemented' | 'dismissed';
}

// Simulated API call to get AI insights
const fetchInsights = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return [
    {
      id: "ins-001",
      title: "Inventory levels for Product A approaching critical threshold",
      description: "Based on current demand and supply chain latency, Product A inventory will fall below safety threshold in 7 days.",
      category: "inventory",
      impact: "high",
      date: "2025-05-01",
      status: "new"
    },
    {
      id: "ins-002",
      title: "Logistics route optimization potential",
      description: "Alternative routing through Facility B could reduce transit time by 18% for western region deliveries.",
      category: "logistics",
      impact: "medium",
      date: "2025-04-28",
      status: "reviewed"
    },
    {
      id: "ins-003",
      title: "Demand spike predicted for Product C",
      description: "Social media sentiment analysis indicates 34% increase in consumer interest for Product C over next 30 days.",
      category: "demand",
      impact: "high",
      date: "2025-04-25",
      status: "implemented"
    },
    {
      id: "ins-004",
      title: "Supplier reliability concerns for Component X",
      description: "Supplier has shown 15% increase in delayed shipments over last quarter, suggesting need for backup source.",
      category: "supplier",
      impact: "medium",
      date: "2025-04-22",
      status: "new"
    },
    {
      id: "ins-005",
      title: "Packaging cost reduction opportunity",
      description: "AI material analysis shows potential 12% cost reduction with alternative biodegradable packaging without quality impact.",
      category: "inventory",
      impact: "medium",
      date: "2025-04-20",
      status: "new"
    },
    {
      id: "ins-006",
      title: "Weather disruption risk to northern shipping routes",
      description: "Predictive weather models show 75% chance of severe storms affecting northern distribution channels next week.",
      category: "risk",
      impact: "high",
      date: "2025-04-18",
      status: "dismissed"
    },
    {
      id: "ins-007",
      title: "Bundling opportunity for Products B and E",
      description: "83% of customers who purchase Product B also buy Product E within 30 days. Bundling could increase margins by 8%.",
      category: "demand",
      impact: "low",
      date: "2025-04-15",
      status: "reviewed"
    }
  ];
};

const impactColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-amber-100 text-amber-800",
  low: "bg-green-100 text-green-800"
};

const categoryIcons = {
  inventory: "📦",
  logistics: "🚚",
  demand: "📈",
  supplier: "🏭",
  risk: "⚠️"
};

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  reviewed: "bg-purple-100 text-purple-800",
  implemented: "bg-green-100 text-green-800",
  dismissed: "bg-gray-100 text-gray-800"
};

const AIInsightTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [impactFilter, setImpactFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Insight | null,
    direction: 'asc' | 'desc'
  }>({
    key: 'date',
    direction: 'desc'
  });

  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ['ai-insights'],
    queryFn: fetchInsights,
    staleTime: 60000, // 1 minute
  });
  
  const requestSort = (key: keyof Insight) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply filters and sorting to data
  const filteredData = React.useMemo(() => {
    let result = [...data];
    
    // Apply text search
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(lowerCaseQuery) || 
        item.description.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(item => item.category === categoryFilter);
    }
    
    // Apply impact filter
    if (impactFilter) {
      result = result.filter(item => item.impact === impactFilter);
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(item => item.status === statusFilter);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return result;
  }, [data, searchQuery, categoryFilter, impactFilter, statusFilter, sortConfig]);

  // Get unique categories, impacts, and statuses for filters
  const categories = [...new Set(data.map(item => item.category))];
  const impacts = [...new Set(data.map(item => item.impact))];
  const statuses = [...new Set(data.map(item => item.status))];

  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter(null);
    setImpactFilter(null);
    setStatusFilter(null);
  };

  const hasActiveFilters = !!searchQuery || !!categoryFilter || !!impactFilter || !!statusFilter;

  const renderSortIcon = (column: keyof Insight) => {
    if (sortConfig.key !== column) return <ChevronUp className="opacity-0" size={16} />;
    return sortConfig.direction === 'asc' 
      ? <ChevronUp size={16} />
      : <ChevronDown size={16} />;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle className="flex items-center">
            AI-Generated Supply Chain Insights
            {isLoading && <Loader className="ml-2 animate-spin" size={16} />}
          </CardTitle>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search insights..."
                className="pl-8 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2" size={16} />
                    Category
                    {categoryFilter && <Badge className="ml-1 bg-primary">{categoryFilter}</Badge>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map(cat => (
                    <DropdownMenuItem 
                      key={cat} 
                      onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}
                      className={categoryFilter === cat ? "bg-primary/10" : ""}
                    >
                      {categoryIcons[cat]} {capitalize(cat)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2" size={16} />
                    Impact
                    {impactFilter && <Badge className="ml-1 bg-primary">{impactFilter}</Badge>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {impacts.map(impact => (
                    <DropdownMenuItem 
                      key={impact} 
                      onClick={() => setImpactFilter(impactFilter === impact ? null : impact)}
                      className={impactFilter === impact ? "bg-primary/10" : ""}
                    >
                      {capitalize(impact)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9" 
                onClick={() => refetch()} 
                disabled={isLoading}
              >
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              </Button>
            </div>
          </div>
        </div>
        
        {hasActiveFilters && (
          <div className="flex items-center mt-2 text-sm">
            <Badge variant="outline" className="mr-2">
              {filteredData.length} {filteredData.length === 1 ? 'result' : 'results'}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs"
              onClick={clearFilters}
            >
              Clear filters
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="flex items-center justify-center p-4 text-destructive">
            <AlertCircle className="mr-2" size={16} />
            Error loading insights
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="w-[50%] cursor-pointer"
                    onClick={() => requestSort('title')}
                  >
                    <div className="flex items-center">
                      Insight {renderSortIcon('title')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => requestSort('category')}
                  >
                    <div className="flex items-center">
                      Category {renderSortIcon('category')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => requestSort('impact')}
                  >
                    <div className="flex items-center">
                      Impact {renderSortIcon('impact')}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer text-right"
                    onClick={() => requestSort('date')}
                  >
                    <div className="flex items-center justify-end">
                      Date {renderSortIcon('date')}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      {isLoading ? (
                        <div className="flex justify-center">
                          <Loader className="animate-spin" />
                        </div>
                      ) : (
                        "No insights found"
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((insight) => (
                    <TableRow key={insight.id} className="group hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">{insight.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {insight.description}
                        </div>
                        <div className="mt-2 hidden group-hover:block">
                          <Badge className={statusColors[insight.status]}>
                            {capitalize(insight.status)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="mr-2">{categoryIcons[insight.category]}</span>
                          {capitalize(insight.category)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={impactColors[insight.impact]}>
                          {capitalize(insight.impact)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatDate(new Date(insight.date))}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to format dates in a readable format
const formatDate = (date: Date) => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 7) {
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  }
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export default AIInsightTable;
