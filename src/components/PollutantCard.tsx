import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface PollutantCardProps {
  name: string;
  value: number;
  unit: string;
  status: "good" | "moderate" | "unhealthy" | "hazardous";
  description: string;
}

export const PollutantCard = ({ name, value, unit, status, description }: PollutantCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "good":
        return "text-aqi-good";
      case "moderate":
        return "text-aqi-moderate";
      case "unhealthy":
        return "text-aqi-unhealthy";
      case "hazardous":
        return "text-aqi-hazardous";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">{name}</h4>
          <p className={cn("text-2xl font-bold mt-1", getStatusColor())}>
            {value} <span className="text-sm font-normal">{unit}</span>
          </p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Card>
  );
};
