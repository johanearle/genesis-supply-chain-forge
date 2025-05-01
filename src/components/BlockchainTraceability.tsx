
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, CheckCircle, AlertCircle, Clock } from "lucide-react";

const blockchainData = [
  {
    id: "0x8a3b...fd12",
    timestamp: "2023-05-01T09:32:17Z",
    action: "Shipment Received",
    location: "Warehouse #1",
    initiator: "0x7621...3a1c",
    carbonImpact: -2.3,
    verified: true,
    status: "completed"
  },
  {
    id: "0x4c1e...89ad",
    timestamp: "2023-05-01T12:45:03Z",
    action: "Quality Check",
    location: "QC Station #4",
    initiator: "0x3f98...2b5d",
    carbonImpact: -0.5,
    verified: true,
    status: "completed"
  },
  {
    id: "0x2d7f...a16c",
    timestamp: "2023-05-01T15:21:36Z",
    action: "Packaging",
    location: "Packing Line #2",
    initiator: "0x9a34...c78e",
    carbonImpact: -1.8,
    verified: true,
    status: "completed"
  },
  {
    id: "0xb25a...74e9",
    timestamp: "2023-05-01T16:07:22Z",
    action: "Dispatch",
    location: "Loading Bay #3",
    initiator: "0x5d12...9f41",
    carbonImpact: -3.7,
    verified: false,
    status: "pending"
  },
];

const metricsData = [
  { name: "Finality", value: "2.1s", subtext: "private chain" },
  { name: "Throughput", value: "2,900", subtext: "TPS" },
  { name: "Storage Cost", value: "$0.00017", subtext: "GB-day" },
  { name: "Verified Transactions", value: "5.2M", subtext: "all-time" }
];

const BlockchainTraceability = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metricsData.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-2">
                {metric.subtext}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Blockchain Architecture</CardTitle>
            <CardDescription>Dual-layer blockchain with Hyperledger Fabric & Polygon zkEVM</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-6">
            <div className="flex flex-col items-center max-w-lg">
              <div className="bg-blue-100 dark:bg-blue-950/40 p-4 rounded-lg border border-blue-200 dark:border-blue-900 w-full text-center mb-4">
                <h3 className="font-medium text-blue-800 dark:text-blue-300">Layer 1: Hyperledger Fabric</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">Enterprise contracts & private data</p>
              </div>
              <div className="h-10 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
              <div className="bg-purple-100 dark:bg-purple-950/40 p-4 rounded-lg border border-purple-200 dark:border-purple-900 w-full text-center mt-4">
                <h3 className="font-medium text-purple-800 dark:text-purple-300">Layer 2: Polygon zkEVM</h3>
                <p className="text-sm text-purple-700 dark:text-purple-400">Public verification & transparency</p>
              </div>
              <div className="h-10 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
              <div className="bg-amber-100 dark:bg-amber-950/40 p-4 rounded-lg border border-amber-200 dark:border-amber-900 w-full text-center mt-4">
                <h3 className="font-medium text-amber-800 dark:text-amber-300">IPFS Cold Storage</h3>
                <p className="text-sm text-amber-700 dark:text-amber-400">Content-addressable documents with Filecoin backup</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Live Transaction Ledger</CardTitle>
          <CardDescription>Supply chain events recorded on Hyperledger Fabric</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Transaction Hash</th>
                  <th className="text-left py-3 px-4">Timestamp</th>
                  <th className="text-left py-3 px-4">Action</th>
                  <th className="text-left py-3 px-4">Location</th>
                  <th className="text-right py-3 px-4">Carbon Impact</th>
                  <th className="text-center py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {blockchainData.map((record) => (
                  <tr key={record.id} className="border-b">
                    <td className="py-3 px-4 font-mono text-sm">{record.id}</td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(record.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">{record.action}</td>
                    <td className="py-3 px-4">{record.location}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={record.carbonImpact < 0 ? "text-green-500" : "text-red-500"}>
                        {record.carbonImpact < 0 ? "" : "+"}
                        {record.carbonImpact} kg CO2e
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {record.status === "completed" ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle size={12} className="mr-1" /> Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                          <Clock size={12} className="mr-1" /> Pending
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-muted-foreground mt-4 flex items-center">
            <Layers size={16} className="mr-2" />
            All transactions cryptographically verified and immutable
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Smart Contract Details</CardTitle>
          <CardDescription>Hyperledger Fabric chaincode implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 dark:bg-gray-900 rounded-md p-4 font-mono text-sm overflow-x-auto">
            <pre>{`struct SupplyChainAction {
    uint256 timestamp;
    address initiator;
    bytes32 xaiHash; // SHAP explainability proof
    int256 carbonImpact; // kgCO2e
    bool ethicalApproval;
}`}</pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Immutable Properties</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Tamper-proof transaction history
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Cryptographic verification
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Zero-knowledge privacy
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  XAI integration for transparency
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Automated Validations</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Ethical sourcing compliance
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Carbon impact calculation
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Regulatory requirement checks
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-green-500 mr-2" />
                  Multi-party consensus
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlockchainTraceability;
