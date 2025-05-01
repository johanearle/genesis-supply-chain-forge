
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DigitalTwinSimulation = () => {
  const [isSimulationRunning, setSimulationRunning] = useState(false);
  const [activeScenario, setActiveScenario] = useState("normal");
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Simulation Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.3%</div>
            <p className="text-xs text-muted-foreground mt-2">
              vs real-world data
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Concurrent Twins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground mt-2">
              per server node
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Event Propagation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">&lt;2ms</div>
            <p className="text-xs text-muted-foreground mt-2">
              average latency
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monte Carlo Simulations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,000</div>
            <p className="text-xs text-muted-foreground mt-2">
              scenarios per minute
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Digital Twin Visualization</span>
                <Badge variant={isSimulationRunning ? "default" : "outline"}>
                  {isSimulationRunning ? "Simulation Active" : "Simulation Ready"}
                </Badge>
              </CardTitle>
              <CardDescription>Unity3D integration with physics-informed ML</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 p-8 flex flex-col items-center justify-center">
                  <p className="text-center text-muted-foreground mb-6">
                    Digital twin visualization would render here through Unity3D WebGL integration.
                    The visualization would show a 3D representation of the supply chain with real-time status.
                  </p>
                  
                  <div className="w-full max-w-md grid grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 animate-pulse"></div>
                      </div>
                      <span className="text-xs text-muted-foreground">Suppliers</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500 animate-pulse"></div>
                      </div>
                      <span className="text-xs text-muted-foreground">Warehouses</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                      <span className="text-xs text-muted-foreground">Distribution</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="mb-2" 
                    onClick={() => setSimulationRunning(!isSimulationRunning)}
                  >
                    {isSimulationRunning ? "Pause Simulation" : "Run Simulation"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    NVIDIA Omniverse-compatible with real-time synchronization
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={activeScenario === "normal" ? "bg-blue-50 dark:bg-blue-900/20" : ""} 
                  onClick={() => setActiveScenario("normal")}
                >
                  Normal Operations
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={activeScenario === "disruption" ? "bg-amber-50 dark:bg-amber-900/20" : ""} 
                  onClick={() => setActiveScenario("disruption")}
                >
                  Supply Disruption
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={activeScenario === "peak" ? "bg-purple-50 dark:bg-purple-900/20" : ""} 
                  onClick={() => setActiveScenario("peak")}
                >
                  Peak Demand
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Simulation Controls</CardTitle>
              <CardDescription>Configure digital twin parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Simulation Speed</label>
                <div className="flex items-center space-x-2">
                  <span className="text-xs">1x</span>
                  <input type="range" min="1" max="100" defaultValue="10" className="flex-1" />
                  <span className="text-xs">100x</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Detail Level</label>
                <div className="flex items-center space-x-2">
                  <span className="text-xs">Low</span>
                  <input type="range" min="1" max="5" defaultValue="3" className="flex-1" />
                  <span className="text-xs">High</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Randomization Factor</label>
                <div className="flex items-center space-x-2">
                  <span className="text-xs">0%</span>
                  <input type="range" min="0" max="100" defaultValue="15" className="flex-1" />
                  <span className="text-xs">100%</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Active Scenarios</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="weather" className="mr-2" defaultChecked />
                    <label htmlFor="weather" className="text-sm">Weather Disruptions</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="demand" className="mr-2" defaultChecked />
                    <label htmlFor="demand" className="text-sm">Demand Fluctuations</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="supplier" className="mr-2" defaultChecked />
                    <label htmlFor="supplier" className="text-sm">Supplier Reliability</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="logistics" className="mr-2" defaultChecked />
                    <label htmlFor="logistics" className="text-sm">Logistics Delays</label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full">Apply Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment & Scenario Analysis</CardTitle>
            <CardDescription>Monte Carlo simulation results across 10,000 scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="delivery">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="delivery">Delivery Times</TabsTrigger>
                <TabsTrigger value="costs">Cost Impact</TabsTrigger>
                <TabsTrigger value="inventory">Inventory Levels</TabsTrigger>
              </TabsList>
              
              <TabsContent value="delivery" className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Likelihood of On-Time Delivery</span>
                  <span className="font-medium">94.3%</span>
                </div>
                <Progress value={94.3} className="h-2" />
                
                <div className="grid grid-cols-3 gap-4 my-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Best Case</div>
                    <div className="font-medium">1.2 days</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Expected</div>
                    <div className="font-medium">2.3 days</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Worst Case</div>
                    <div className="font-medium">4.8 days</div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Based on 10,000 simulation runs with current network configuration and historical weather patterns.
                </div>
              </TabsContent>
              
              <TabsContent value="costs" className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Probability of Budget Adherence</span>
                  <span className="font-medium">87.2%</span>
                </div>
                <Progress value={87.2} className="h-2" />
                
                <div className="grid grid-cols-3 gap-4 my-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Min Cost</div>
                    <div className="font-medium">$14,320</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Expected</div>
                    <div className="font-medium">$16,750</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Max Cost</div>
                    <div className="font-medium">$22,480</div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Fluctuations primarily driven by fuel costs, labor availability, and port congestion variables.
                </div>
              </TabsContent>
              
              <TabsContent value="inventory" className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Stock-out Risk</span>
                  <span className="font-medium">5.8%</span>
                </div>
                <Progress value={5.8} className="h-2" />
                
                <div className="grid grid-cols-3 gap-4 my-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Min Level</div>
                    <div className="font-medium">18.3%</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Average</div>
                    <div className="font-medium">64.2%</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <div className="text-xs text-muted-foreground">Max Level</div>
                    <div className="font-medium">92.7%</div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Simulation considers seasonal demand fluctuations and potential supply chain disruptions.
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalTwinSimulation;
