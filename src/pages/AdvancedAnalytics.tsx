
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AIPredictiveAnalytics from "@/components/AIPredictiveAnalytics";
import BlockchainTraceability from "@/components/BlockchainTraceability";
import SustainabilityDashboard from "@/components/SustainabilityDashboard";
import DigitalTwinSimulation from "@/components/DigitalTwinSimulation";
import StrategicRoadmap from "@/components/StrategicRoadmap";

const AdvancedAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Advanced Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Next-generation supply chain intelligence and optimization
        </p>
      </div>

      <Tabs defaultValue="ai">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="ai">AI & Predictive</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="digital-twin">Digital Twin</TabsTrigger>
          <TabsTrigger value="roadmap">Evolution Roadmap</TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-6">
          <AIPredictiveAnalytics />
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-6">
          <BlockchainTraceability />
        </TabsContent>

        <TabsContent value="sustainability" className="space-y-6">
          <SustainabilityDashboard />
        </TabsContent>

        <TabsContent value="digital-twin" className="space-y-6">
          <DigitalTwinSimulation />
        </TabsContent>
        
        <TabsContent value="roadmap" className="space-y-6">
          <StrategicRoadmap />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;
