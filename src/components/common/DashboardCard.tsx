
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "neutral";
  className?: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  variant = "primary",
  className,
  children,
}) => {
  const borderColor = variant === "primary" 
    ? "border-e-school-600" 
    : variant === "secondary" 
      ? "border-e-school-green-500" 
      : "border-slate-400";

  return (
    <Card className={cn("dashboard-card border-b-4", borderColor, className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {icon && <span className="text-slate-600">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
