import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, Droplets, Sprout, TrendingUp, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Environmental Dashboard</h1>
          <p className="text-muted-foreground">Monitor air quality, flood risks, and agricultural forecasts</p>
        </div>

        {/* Quick Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link to="/air-quality" className="block transition-transform hover:scale-105">
            <Card className="p-6 h-full border-2 hover:border-primary transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Wind className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Air Quality</h3>
                  </div>
                  <p className="text-3xl font-bold text-primary">42</p>
                  <p className="text-sm text-muted-foreground">Good</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-aqi-good/20">
                  <TrendingUp className="h-6 w-6 text-aqi-good" />
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </Card>
          </Link>

          <Card className="p-6 h-full border-2 opacity-60">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Droplets className="h-5 w-5 text-chart-1" />
                  <h3 className="font-semibold">Flood Risk</h3>
                </div>
                <p className="text-3xl font-bold text-chart-1">Low</p>
                <p className="text-sm text-muted-foreground">Next 7 days</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-1/20">
                <AlertTriangle className="h-6 w-6 text-chart-1" />
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full" disabled>
              Coming Soon
            </Button>
          </Card>

          <Card className="p-6 h-full border-2 opacity-60">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Sprout className="h-5 w-5 text-secondary" />
                  <h3 className="font-semibold">Agriculture</h3>
                </div>
                <p className="text-3xl font-bold text-secondary">Optimal</p>
                <p className="text-sm text-muted-foreground">Growing conditions</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20">
                <Sprout className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full" disabled>
              Coming Soon
            </Button>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Wind className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Air quality improved</p>
                <p className="text-sm text-muted-foreground">
                  AQI decreased from 68 to 42 in San Francisco
                </p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Weekly trend analysis complete</p>
                <p className="text-sm text-muted-foreground">
                  Air quality 15% better than last week
                </p>
                <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
