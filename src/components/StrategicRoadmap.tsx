
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock } from "lucide-react";

const StrategicRoadmap = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Supply Chain Evolution Roadmap</CardTitle>
          <CardDescription>
            Strategic plan for advancing the current MVP toward enterprise-grade capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 left-[15px] md:left-1/2 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
            
            {/* Phase 1 */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex flex-col md:w-1/2 md:pr-8 md:text-right order-2 md:order-1 mt-6 md:mt-0">
                  <h3 className="text-lg font-medium">Phase 1: Data Foundation</h3>
                  <Badge variant="outline" className="inline-flex mb-2 mt-1 self-start md:self-end">
                    <Clock size={14} className="mr-1" /> 3 Months
                  </Badge>
                  <p className="text-muted-foreground text-sm">
                    Establish the core data infrastructure and integration frameworks to enable advanced analytics.
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-end">
                      <CheckCircle size={14} className="mr-2 text-green-500 md:hidden" />
                      <span>Implement data lake architecture</span>
                      <CheckCircle size={14} className="ml-2 text-green-500 hidden md:block" />
                    </div>
                    <div className="flex items-center justify-end">
                      <CheckCircle size={14} className="mr-2 text-green-500 md:hidden" />
                      <span>Connect IoT data sources</span>
                      <CheckCircle size={14} className="ml-2 text-green-500 hidden md:block" />
                    </div>
                    <div className="flex items-center justify-end">
                      <CheckCircle size={14} className="mr-2 text-green-500 md:hidden" />
                      <span>Develop API integration framework</span>
                      <CheckCircle size={14} className="ml-2 text-green-500 hidden md:block" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="rounded-full h-10 w-10 bg-blue-500 border-4 border-white dark:border-gray-900 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                </div>
                
                <div className="md:w-1/2 md:pl-8 order-1 md:order-2">
                  <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Key Technologies</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 py-0">
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                        <span>Apache Kafka for event streaming</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                        <span>Delta Lake for structured storage</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                        <span>Terraform for infrastructure</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Phase 2 */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="md:w-1/2 md:pr-8 order-2 mt-6 md:mt-0">
                  <Card className="border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Key Technologies</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 py-0">
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
                        <span>TensorFlow for ML models</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
                        <span>Ray RLlib for reinforcement learning</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
                        <span>MLflow for model tracking</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="rounded-full h-10 w-10 bg-purple-500 border-4 border-white dark:border-gray-900 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:w-1/2 md:pl-8 md:text-left order-1">
                  <h3 className="text-lg font-medium">Phase 2: AI Prediction Engines</h3>
                  <Badge variant="outline" className="inline-flex mb-2 mt-1 self-start">
                    <Clock size={14} className="mr-1" /> 6 Months
                  </Badge>
                  <p className="text-muted-foreground text-sm">
                    Deploy initial machine learning models for demand forecasting and optimization.
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center">
                      <CheckCircle size={14} className="mr-2 text-green-500" />
                      <span>Train LSTM demand forecasting models</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={14} className="mr-2 text-green-500" />
                      <span>Implement supplier risk scoring</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={14} className="mr-2 text-green-500" />
                      <span>Develop route optimization algorithms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Phase 3 */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex flex-col md:w-1/2 md:pr-8 md:text-right order-2 md:order-1 mt-6 md:mt-0">
                  <h3 className="text-lg font-medium">Phase 3: Blockchain Integration</h3>
                  <Badge variant="outline" className="inline-flex mb-2 mt-1 self-start md:self-end">
                    <Clock size={14} className="mr-1" /> 4 Months
                  </Badge>
                  <p className="text-muted-foreground text-sm">
                    Establish the immutable ledger system for supply chain traceability and verification.
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-end">
                      <CheckCircle size={14} className="mr-2 text-green-500 md:hidden" />
                      <span>Deploy Hyperledger Fabric network</span>
                      <CheckCircle size={14} className="ml-2 text-green-500 hidden md:block" />
                    </div>
                    <div className="flex items-center justify-end">
                      <CheckCircle size={14} className="mr-2 text-green-500 md:hidden" />
                      <span>Develop smart contracts for supply chain events</span>
                      <CheckCircle size={14} className="ml-2 text-green-500 hidden md:block" />
                    </div>
                    <div className="flex items-center justify-end">
                      <CheckCircle size={14} className="mr-2 text-green-500 md:hidden" />
                      <span>Integrate with IPFS for document storage</span>
                      <CheckCircle size={14} className="ml-2 text-green-500 hidden md:block" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="rounded-full h-10 w-10 bg-green-500 border-4 border-white dark:border-gray-900 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                </div>
                
                <div className="md:w-1/2 md:pl-8 order-1 md:order-2">
                  <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Key Technologies</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 py-0">
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                        <span>Hyperledger Fabric</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                        <span>IPFS + Filecoin</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                        <span>Polygon zkEVM for public verification</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Phase 4 */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="md:w-1/2 md:pr-8 order-2 mt-6 md:mt-0">
                  <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Key Technologies</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 py-0">
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-amber-500"></span>
                        <span>Unity3D for visualization</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-amber-500"></span>
                        <span>NVIDIA Omniverse for physics simulation</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-amber-500"></span>
                        <span>Physics-informed neural networks</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="rounded-full h-10 w-10 bg-amber-500 border-4 border-white dark:border-gray-900 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                </div>
                
                <div className="flex flex-col md:w-1/2 md:pl-8 md:text-left order-1">
                  <h3 className="text-lg font-medium">Phase 4: Digital Twin Implementation</h3>
                  <Badge variant="outline" className="inline-flex mb-2 mt-1 self-start">
                    <Clock size={14} className="mr-1" /> 5 Months
                  </Badge>
                  <p className="text-muted-foreground text-sm">
                    Create virtual replicas of the supply chain for simulation and optimization.
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center">
                      <CheckCircle size={14} className="mr-2 text-green-500" />
                      <span>Develop 3D visualization engine</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={14} className="mr-2 text-green-500" />
                      <span>Implement Monte Carlo simulation framework</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle size={14} className="mr-2 text-green-500" />
                      <span>Create physics-based simulation models</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Phase 5 */}
            <div className="relative mb-16">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="flex flex-col md:w-1/2 md:pr-8 md:text-right order-2 md:order-1 mt-6 md:mt-0">
                  <h3 className="text-lg font-medium">Phase 5: Autonomous Decision Engine</h3>
                  <Badge variant="outline" className="inline-flex mb-2 mt-1 self-start md:self-end">
                    <Clock size={14} className="mr-1" /> 6 Months
                  </Badge>
                  <p className="text-muted-foreground text-sm">
                    Deploy the multi-agent system that handles autonomous decision making.
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-end">
                      <CheckCircle size={14} className="mr-2 text-green-500 md:hidden" />
                      <span>Implement Cost Optimizer agent</span>
                      <CheckCircle size={14} className="ml-2 text-green-500 hidden md:block" />
                    </div>
                    <div className="flex items-center justify-end">
                      <CheckCircle size={14} className="mr-2 text-green-500 md:hidden" />
                      <span>Deploy Sustainability Enforcer agent</span>
                      <CheckCircle size={14} className="ml-2 text-green-500 hidden md:block" />
                    </div>
                    <div className="flex items-center justify-end">
                      <CheckCircle size={14} className="mr-2 text-green-500 md:hidden" />
                      <span>Integrate Risk Mitigator agent</span>
                      <CheckCircle size={14} className="ml-2 text-green-500 hidden md:block" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="rounded-full h-10 w-10 bg-blue-600 border-4 border-white dark:border-gray-900 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">5</span>
                  </div>
                </div>
                
                <div className="md:w-1/2 md:pl-8 order-1 md:order-2">
                  <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Key Technologies</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2 py-0">
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-600"></span>
                        <span>Multi-Agent Reinforcement Learning</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-600"></span>
                        <span>Genetic Algorithms for optimization</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-600"></span>
                        <span>Bayesian Networks for risk modeling</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Final Result */}
            <div className="relative">
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="rounded-full h-10 w-10 bg-purple-600 border-4 border-white dark:border-gray-900 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
              </div>
              
              <div className="md:mx-auto md:w-2/3 pt-10 text-center">
                <h3 className="text-lg font-medium">Full Enterprise System</h3>
                <p className="text-muted-foreground text-sm mt-2">
                  Complete enterprise-grade supply chain system achieving 6.2σ process capability through
                  neuro-symbolic AI architecture, carbon-negative compute, regulatory-proof design, and self-healing infrastructure.
                </p>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-green-50 dark:bg-green-900/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-green-600">17.4%</div>
                      <div className="text-xs text-muted-foreground">Higher Efficiency</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50 dark:bg-blue-900/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-blue-600">63%</div>
                      <div className="text-xs text-muted-foreground">Lower Compliance Costs</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-amber-50 dark:bg-amber-900/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-amber-600">41%</div>
                      <div className="text-xs text-muted-foreground">Carbon Reduction</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 dark:bg-purple-900/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-xl font-bold text-purple-600">94.7%</div>
                      <div className="text-xs text-muted-foreground">AI Accuracy</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategicRoadmap;
