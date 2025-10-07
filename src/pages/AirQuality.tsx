import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PollutantCard } from "@/components/PollutantCard";
import { AQICard } from "@/components/AQICard";
import { Search, MapPin, Wind, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const mockTrendData = [
  { date: "Mon", aqi: 45, pm25: 12 },
  { date: "Tue", aqi: 52, pm25: 15 },
  { date: "Wed", aqi: 38, pm25: 10 },
  { date: "Thu", aqi: 42, pm25: 11 },
  { date: "Fri", aqi: 48, pm25: 13 },
  { date: "Sat", aqi: 35, pm25: 9 },
  { date: "Sun", aqi: 42, pm25: 11 },
];

const AirQuality = () => {
  const [location, setLocation] = useState("San Francisco, California");

  const pollutants = [
    { name: "PM2.5", value: 11.2, unit: "µg/m³", status: "good" as const, description: "Fine particulate matter" },
    { name: "PM10", value: 23.5, unit: "µg/m³", status: "good" as const, description: "Coarse particulate matter" },
    { name: "O3", value: 45, unit: "ppb", status: "good" as const, description: "Ground-level ozone" },
    { name: "NO2", value: 18, unit: "ppb", status: "good" as const, description: "Nitrogen dioxide" },
    { name: "CO", value: 0.4, unit: "ppm", status: "good" as const, description: "Carbon monoxide" },
    { name: "SO2", value: 2.1, unit: "ppb", status: "good" as const, description: "Sulfur dioxide" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Air Quality Monitor</h1>
          <p className="text-muted-foreground">Real-time air quality data and pollutant levels</p>
        </div>

        {/* Location Search */}
        <Card className="p-6 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current AQI */}
            <div className="animate-fade-in">
              <AQICard 
                aqi={42}
                location={location}
                status="good"
              />
            </div>

            {/* Pollutants Grid */}
            <div className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4">Key Pollutants</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {pollutants.map((pollutant, index) => (
                  <PollutantCard key={index} {...pollutant} />
                ))}
              </div>
            </div>

            {/* 7-Day Trend */}
            <Card className="p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">7-Day Trend</h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>Improving</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="aqi" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="AQI"
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="pm25" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    name="PM2.5"
                    dot={{ fill: "hsl(var(--secondary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Health Advisory */}
            <Card className="p-6 animate-fade-in border-2 border-aqi-good">
              <div className="flex items-center space-x-2 mb-4">
                <Wind className="h-5 w-5 text-aqi-good" />
                <h3 className="font-semibold">Health Advisory</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-aqi-good/10">
                  <p className="text-sm font-medium mb-1">Air quality is good</p>
                  <p className="text-xs text-muted-foreground">
                    Air quality is satisfactory and poses little or no risk.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium mb-1">Safe for outdoor activities</p>
                  <p className="text-xs text-muted-foreground">
                    Everyone can enjoy normal outdoor activities.
                  </p>
                </div>
              </div>
            </Card>

            {/* Nearby Locations */}
            <Card className="p-6 animate-fade-in">
              <h3 className="font-semibold mb-4">Nearby Locations</h3>
              <div className="space-y-3">
                {[
                  { name: "Oakland", aqi: 48, status: "good" },
                  { name: "San Jose", aqi: 55, status: "moderate" },
                  { name: "Berkeley", aqi: 38, status: "good" },
                ].map((loc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div>
                      <p className="font-medium">{loc.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{loc.status}</p>
                    </div>
                    <p className="text-lg font-bold">{loc.aqi}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQuality;
