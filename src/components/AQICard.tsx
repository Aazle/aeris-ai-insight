import { cn } from "@/lib/utils";
import { Wind } from "lucide-react";
import { Card } from "./ui/card";

interface AQICardProps {
  aqi: number;
  location: string;
  status: "good" | "moderate" | "unhealthy" | "hazardous";
  className?: string;
}

export const AQICard = ({ aqi, location, status, className }: AQICardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "good":
        return "bg-aqi-good";
      case "moderate":
        return "bg-aqi-moderate";
      case "unhealthy":
        return "bg-aqi-unhealthy";
      case "hazardous":
        return "bg-aqi-hazardous";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "good":
        return "Good";
      case "moderate":
        return "Moderate";
      case "unhealthy":
        return "Unhealthy";
      case "hazardous":
        return "Hazardous";
      default:
        return "Unknown";
    }
  };

  return (
    <Card className={cn("p-6 animate-fade-in", className)}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Current AQI</p>
          <h3 className="text-3xl font-bold">{aqi}</h3>
        </div>
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", getStatusColor())}>
          <Wind className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="space-y-2">
        <div className={cn("inline-block px-3 py-1 rounded-full text-xs font-medium text-white", getStatusColor())}>
          {getStatusText()}
        </div>
        <p className="text-sm text-muted-foreground">{location}</p>
      </div>
    </Card>
  );
};
