
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type NodeStatus = "active" | "warning" | "error" | "inactive";

interface Node {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  status: NodeStatus;
}

interface Connection {
  from: string;
  to: string;
  active: boolean;
}

const nodes: Node[] = [
  { id: "supplier1", name: "Supplier A", type: "supplier", x: 50, y: 80, status: "active" },
  { id: "supplier2", name: "Supplier B", type: "supplier", x: 50, y: 160, status: "active" },
  { id: "supplier3", name: "Supplier C", type: "supplier", x: 50, y: 240, status: "warning" },
  { id: "warehouse1", name: "Warehouse 1", type: "warehouse", x: 180, y: 80, status: "active" },
  { id: "warehouse2", name: "Warehouse 2", type: "warehouse", x: 180, y: 240, status: "active" },
  { id: "distribution", name: "Distribution", type: "distribution", x: 310, y: 160, status: "active" },
  { id: "retail1", name: "Retail 1", type: "retail", x: 440, y: 80, status: "active" },
  { id: "retail2", name: "Retail 2", type: "retail", x: 440, y: 160, status: "warning" },
  { id: "retail3", name: "Retail 3", type: "retail", x: 440, y: 240, status: "active" },
];

const connections = [
  { from: "supplier1", to: "warehouse1", active: true },
  { from: "supplier2", to: "warehouse1", active: false },
  { from: "supplier2", to: "warehouse2", active: true },
  { from: "supplier3", to: "warehouse2", active: false },
  { from: "warehouse1", to: "distribution", active: true },
  { from: "warehouse2", to: "distribution", active: true },
  { from: "distribution", to: "retail1", active: true },
  { from: "distribution", to: "retail2", active: false },
  { from: "distribution", to: "retail3", active: true },
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

const NodeComponent = ({ node }: { node: Node }) => {
  const bgColor = getNodeColor(node.type, node.status);

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
          <div className="text-sm space-y-1">
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
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SupplyChainMap = () => {
  const [activeConnections, setActiveConnections] = useState<Connection[]>(connections);

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
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">Supply Chain Network</h2>
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
                  className={cn(
                    "node-connection",
                    conn.active && "active"
                  )}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map(node => (
              <NodeComponent key={node.id} node={node} />
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplyChainMap;
