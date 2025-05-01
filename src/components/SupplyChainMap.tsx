
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Layers, Zap, Box } from "lucide-react";

type NodeStatus = "active" | "warning" | "error" | "inactive";
type NodeTechnology = "ai" | "blockchain" | "iot" | "standard" | "digital-twin";

interface Node {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  status: NodeStatus;
  technology?: NodeTechnology;
  metrics?: {
    efficiency: number;
    carbon: number;
    risk: number;
  };
}

interface Connection {
  from: string;
  to: string;
  active: boolean;
  encrypted?: boolean;
  type?: "standard" | "blockchain" | "iot";
}

const nodes: Node[] = [
  { 
    id: "supplier1", 
    name: "Supplier A", 
    type: "supplier", 
    x: 50, 
    y: 80, 
    status: "active",
    technology: "blockchain",
    metrics: { efficiency: 94, carbon: 32, risk: 15 }
  },
  { 
    id: "supplier2", 
    name: "Supplier B", 
    type: "supplier", 
    x: 50, 
    y: 160, 
    status: "active",
    metrics: { efficiency: 87, carbon: 45, risk: 23 }
  },
  { 
    id: "supplier3", 
    name: "Supplier C", 
    type: "supplier", 
    x: 50, 
    y: 240, 
    status: "warning",
    technology: "iot",
    metrics: { efficiency: 78, carbon: 51, risk: 38 }
  },
  { 
    id: "warehouse1", 
    name: "Warehouse 1", 
    type: "warehouse", 
    x: 180, 
    y: 80, 
    status: "active",
    technology: "digital-twin",
    metrics: { efficiency: 92, carbon: 28, risk: 12 }
  },
  { 
    id: "warehouse2", 
    name: "Warehouse 2", 
    type: "warehouse", 
    x: 180, 
    y: 240, 
    status: "active",
    metrics: { efficiency: 89, carbon: 36, risk: 18 }
  },
  { 
    id: "distribution", 
    name: "Distribution", 
    type: "distribution", 
    x: 310, 
    y: 160, 
    status: "active",
    technology: "ai",
    metrics: { efficiency: 96, carbon: 22, risk: 9 }
  },
  { 
    id: "retail1", 
    name: "Retail 1", 
    type: "retail", 
    x: 440, 
    y: 80, 
    status: "active",
    metrics: { efficiency: 90, carbon: 35, risk: 17 }
  },
  { 
    id: "retail2", 
    name: "Retail 2", 
    type: "retail", 
    x: 440, 
    y: 160, 
    status: "warning",
    technology: "iot",
    metrics: { efficiency: 84, carbon: 42, risk: 29 }
  },
  { 
    id: "retail3", 
    name: "Retail 3", 
    type: "retail", 
    x: 440, 
    y: 240, 
    status: "active",
    metrics: { efficiency: 91, carbon: 31, risk: 14 }
  },
];

const connections: Connection[] = [
  { from: "supplier1", to: "warehouse1", active: true, type: "blockchain", encrypted: true },
  { from: "supplier2", to: "warehouse1", active: false },
  { from: "supplier2", to: "warehouse2", active: true, type: "standard" },
  { from: "supplier3", to: "warehouse2", active: false, type: "iot" },
  { from: "warehouse1", to: "distribution", active: true, type: "blockchain", encrypted: true },
  { from: "warehouse2", to: "distribution", active: true, type: "iot" },
  { from: "distribution", to: "retail1", active: true },
  { from: "distribution", to: "retail2", active: false, type: "iot" },
  { from: "distribution", to: "retail3", active: true, type: "standard" },
];

const getNodeColor = (type: string, status: NodeStatus) => {
  const baseColors = {
    supplier: "bg-blue-500",
    warehouse: "bg-purple-500",
    distribution: "bg-amber-500",
    retail: "bg-green-500",
  };

  const statusColors = {
    active: "",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    inactive: "bg-gray-400",
  };

  return status !== "active" ? statusColors[status] : baseColors[type as keyof typeof baseColors];
};

const getTechnologyIcon = (technology?: NodeTechnology) => {
  switch (technology) {
    case "ai": return <Zap size={12} className="text-white" />;
    case "blockchain": return <Layers size={12} className="text-white" />;
    case "iot": return <Box size={12} className="text-white" />;
    case "digital-twin": return <span className="text-xs text-white font-bold">DT</span>;
    default: return null;
  }
};

const getConnectionStyle = (conn: Connection) => {
  let className = "stroke-[2px] ";
  
  if (!conn.active) {
    return className + "stroke-gray-300 stroke-dasharray-[5,5]";
  }
  
  switch (conn.type) {
    case "blockchain": 
      return className + "stroke-blue-500 " + (conn.encrypted ? "stroke-[3px]" : "");
    case "iot": 
      return className + "stroke-green-500 stroke-dasharray-[2,2]";
    default: 
      return className + "stroke-gray-500";
  }
};

const NodeComponent = ({ node }: { node: Node }) => {
  const bgColor = getNodeColor(node.type, node.status);
  const icon = getTechnologyIcon(node.technology);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <g transform={`translate(${node.x}, ${node.y})`} className="cursor-pointer">
            <circle
              r={16}
              className={cn(bgColor, "stroke-white stroke-2")}
              filter="drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.2))"
            />
            {icon && (
              <foreignObject x={-8} y={-8} width={16} height={16} className="flex items-center justify-center">
                {icon}
              </foreignObject>
            )}
            <text
              textAnchor="middle"
              y={-25}
              className="text-xs font-medium fill-current text-foreground"
            >
              {node.name}
            </text>
          </g>
        </TooltipTrigger>
        <TooltipContent side="top">
          <div className="text-sm space-y-2">
            <p className="font-medium">{node.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{node.type}</p>
            <Badge
              className={cn(
                "mt-1",
                node.status === "active" && "bg-green-500",
                node.status === "warning" && "bg-yellow-500",
                node.status === "error" && "bg-red-500",
                node.status === "inactive" && "bg-gray-400"
              )}
            >
              {node.status}
            </Badge>
            {node.technology && (
              <p className="text-xs">Technology: <span className="font-medium capitalize">{node.technology}</span></p>
            )}
            {node.metrics && (
              <div className="grid grid-cols-3 gap-2 mt-1 pt-1 border-t text-xs">
                <div>
                  <div className="text-muted-foreground">Efficiency</div>
                  <div className="font-medium">{node.metrics.efficiency}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Carbon</div>
                  <div className="font-medium">{node.metrics.carbon} kg</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Risk</div>
                  <div className="font-medium">{node.metrics.risk}%</div>
                </div>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SupplyChainMap = () => {
  const [activeConnections, setActiveConnections] = useState<Connection[]>(connections);
  const [viewMode, setViewMode] = useState<"standard" | "efficiency" | "carbon" | "risk">("standard");
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate activity changes in connections
      setActiveConnections(currentConnections => {
        return currentConnections.map(conn => ({
          ...conn,
          active: Math.random() > 0.3
        }));
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Adjust node size based on view mode
  const getNodeRadius = (node: Node) => {
    if (viewMode === "standard" || !node.metrics) return 16;
    
    switch (viewMode) {
      case "efficiency": return 10 + (node.metrics.efficiency / 10);
      case "carbon": return 16 - (node.metrics.carbon / 10);
      case "risk": return 16 - (node.metrics.risk / 5);
      default: return 16;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center justify-between">
          <span>Supply Chain Network</span>
          <div className="flex gap-2 text-xs">
            <Badge 
              variant={viewMode === "standard" ? "default" : "outline"}
              className="cursor-pointer" 
              onClick={() => setViewMode("standard")}
            >
              Standard
            </Badge>
            <Badge 
              variant={viewMode === "efficiency" ? "default" : "outline"}
              className="cursor-pointer" 
              onClick={() => setViewMode("efficiency")}
            >
              Efficiency
            </Badge>
            <Badge 
              variant={viewMode === "carbon" ? "default" : "outline"}
              className="cursor-pointer" 
              onClick={() => setViewMode("carbon")}
            >
              Carbon
            </Badge>
            <Badge 
              variant={viewMode === "risk" ? "default" : "outline"}
              className="cursor-pointer" 
              onClick={() => setViewMode("risk")}
            >
              Risk
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-blue-500"></span>
              <span className="text-xs text-muted-foreground">Supplier</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-purple-500"></span>
              <span className="text-xs text-muted-foreground">Warehouse</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-amber-500"></span>
              <span className="text-xs text-muted-foreground">Distribution</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-green-500"></span>
              <span className="text-xs text-muted-foreground">Retail</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <Layers size={14} className="text-blue-500" />
              <span className="text-xs text-muted-foreground">Blockchain</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-amber-500" />
              <span className="text-xs text-muted-foreground">AI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Box size={14} className="text-green-500" />
              <span className="text-xs text-muted-foreground">IoT</span>
            </div>
          </div>
        </div>

        <div className="relative w-full h-[320px]">
          <svg width="100%" height="100%" viewBox="0 0 500 300">
            {/* Connections */}
            {activeConnections.map((conn, i) => {
              const fromNode = nodes.find(n => n.id === conn.from);
              const toNode = nodes.find(n => n.id === conn.to);

              if (!fromNode || !toNode) return null;

              return (
                <path
                  key={`${conn.from}-${conn.to}`}
                  d={`M${fromNode.x},${fromNode.y} L${toNode.x},${toNode.y}`}
                  className={getConnectionStyle(conn)}
                  markerEnd={conn.encrypted ? "url(#arrowheadSecure)" : "url(#arrowhead)"}
                />
              );
            })}

            {/* Define arrowhead markers */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
              </marker>
              <marker
                id="arrowheadSecure"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
            </defs>

            {/* Nodes */}
            {nodes.map(node => (
              <NodeComponent key={node.id} node={{...node, x: node.x, y: node.y}} />
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplyChainMap;
