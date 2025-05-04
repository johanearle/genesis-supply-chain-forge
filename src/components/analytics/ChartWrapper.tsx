
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Loader } from "lucide-react";

interface ChartWrapperProps {
  title: string;
  description?: string;
  isLoading?: boolean;
  error?: unknown;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const ChartWrapper = ({
  title,
  description,
  isLoading = false,
  error = null,
  actions,
  footer,
  children,
  className = "h-[300px]"
}: ChartWrapperProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {actions && <div className="flex items-center space-x-2">{actions}</div>}
      </CardHeader>
      <CardContent>
        <div className={className}>
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader className="animate-spin" />
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center text-destructive">
              <AlertTriangle className="mr-2" /> Error loading data
            </div>
          ) : (
            children
          )}
        </div>
        {footer && <div className="mt-4">{footer}</div>}
      </CardContent>
    </Card>
  );
};

export default ChartWrapper;
