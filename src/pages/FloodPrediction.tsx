import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Search, 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  CloudRain,
  Waves,
  ThermometerSun,
  Wind,
  Activity
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const waterLevelData = [
  { time: "00:00", level: 2.3, threshold: 4.5 },
  { time: "04:00", level: 2.4, threshold: 4.5 },
  { time: "08:00", level: 2.6, threshold: 4.5 },
  { time: "12:00", level: 2.8, threshold: 4.5 },
  { time: "16:00", level: 2.9, threshold: 4.5 },
  { time: "20:00", level: 3.0, threshold: 4.5 },
  { time: "24:00", level: 3.1, threshold: 4.5 },
];

const rainfallForecastData = [
  { day: "Mon", rainfall: 5, historical: 8 },
  { day: "Tue", rainfall: 12, historical: 6 },
  { day: "Wed", rainfall: 8, historical: 10 },
  { day: "Thu", rainfall: 3, historical: 4 },
  { day: "Fri", rainfall: 15, historical: 12 },
  { day: "Sat", rainfall: 7, historical: 9 },
  { day: "Sun", rainfall: 4, historical: 5 },
];

const historicalFloodData = [
  { month: "Jan", incidents: 0 },
  { month: "Feb", incidents: 0 },
  { month: "Mar", incidents: 1 },
  { month: "Apr", incidents: 2 },
  { month: "May", incidents: 3 },
  { month: "Jun", incidents: 5 },
  { month: "Jul", incidents: 8 },
  { month: "Aug", incidents: 6 },
  { month: "Sep", incidents: 4 },
  { month: "Oct", incidents: 2 },
  { month: "Nov", incidents: 1 },
  { month: "Dec", incidents: 0 },
];

const nearbyLocations = [
  { name: "Ravi River Basin", risk: "Medium", waterLevel: "3.8m", status: "warning" },
  { name: "Canal Road Area", risk: "Low", waterLevel: "2.1m", status: "safe" },
  { name: "Sheikhupura District", risk: "Low", waterLevel: "2.5m", status: "safe" },
];

const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case "high": return "text-destructive";
    case "critical": return "text-destructive";
    case "medium": return "text-warning";
    case "moderate": return "text-warning";
    case "low": return "text-aqi-good";
    default: return "text-muted-foreground";
  }
};

const getRiskBadgeVariant = (risk: string): "default" | "destructive" | "secondary" => {
  switch (risk.toLowerCase()) {
    case "high":
    case "critical":
      return "destructive";
    case "medium":
    case "moderate":
      return "secondary";
    default:
      return "default";
  }
};

const FloodPrediction = () => {
  const [location, setLocation] = useState("Lahore, Pakistan");

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-3 mb-2">
            <Droplets className="h-8 w-8 text-secondary" />
            <h1 className="text-4xl font-bold">Flood Risk & Disaster Prediction</h1>
          </div>
          <p className="text-muted-foreground">AI-driven flood monitoring and early warning system</p>
        </div>

        {/* Location Search */}
        <Card className="p-6 mb-8 animate-fade-in border-2 border-secondary/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search location for flood risk assessment..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-gradient-to-r from-secondary to-secondary/80">
              <MapPin className="mr-2 h-4 w-4" />
              Search Location
            </Button>
          </div>
        </Card>

        {/* Current Risk Assessment */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 p-6 animate-fade-in border-2 border-secondary/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{location}</h2>
                <p className="text-muted-foreground">Current Flood Risk Assessment</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-aqi-good">LOW</div>
                <Badge variant="default" className="mt-2 bg-aqi-good">
                  All Clear
                </Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Waves className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Water Level</span>
                </div>
                <div className="text-2xl font-bold">3.1m</div>
                <p className="text-xs text-muted-foreground mt-1">Normal range (0-4.5m)</p>
              </div>

              <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                <div className="flex items-center gap-2 mb-2">
                  <CloudRain className="h-5 w-5 text-secondary" />
                  <span className="text-sm font-medium">Rainfall (24h)</span>
                </div>
                <div className="text-2xl font-bold">12mm</div>
                <p className="text-xs text-muted-foreground mt-1">Moderate precipitation</p>
              </div>

              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Alert Status</span>
                </div>
                <div className="text-2xl font-bold text-aqi-good">Clear</div>
                <p className="text-xs text-muted-foreground mt-1">No warnings issued</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Environmental Factors</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ThermometerSun className="h-4 w-4 text-primary" />
                  <span className="text-sm">Temperature</span>
                </div>
                <span className="font-semibold">28°C</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-secondary" />
                  <span className="text-sm">Wind Speed</span>
                </div>
                <span className="font-semibold">15 km/h</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-accent" />
                  <span className="text-sm">Humidity</span>
                </div>
                <span className="font-semibold">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-chart-1" />
                  <span className="text-sm">Pressure</span>
                </div>
                <span className="font-semibold">1013 mb</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Water Level Monitoring (24h)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={waterLevelData}>
                <defs>
                  <linearGradient id="waterLevel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="level" 
                  stroke="hsl(var(--secondary))" 
                  fill="url(#waterLevel)"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="threshold" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="inline-block w-3 h-3 bg-secondary rounded-sm mr-1"></span>
              Current Water Level
              <span className="inline-block w-3 h-0.5 bg-destructive ml-4 mr-1"></span>
              Danger Threshold (4.5m)
            </p>
          </Card>

          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">7-Day Rainfall Forecast</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={rainfallForecastData}>
                <defs>
                  <linearGradient id="rainfall" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="rainfall" 
                  stroke="hsl(var(--primary))" 
                  fill="url(#rainfall)"
                  strokeWidth={2}
                  name="Forecast"
                />
                <Line 
                  type="monotone" 
                  dataKey="historical" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  name="Historical Avg"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Historical Flood Data */}
        <Card className="p-6 mb-8 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Historical Flood Incidents (2024)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={historicalFloodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Line 
                type="monotone" 
                dataKey="incidents" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--destructive))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Nearby Locations */}
        <Card className="p-6 mb-8 animate-fade-in">
          <h3 className="text-lg font-semibold mb-4">Nearby Risk Areas</h3>
          <div className="space-y-4">
            {nearbyLocations.map((loc, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">{loc.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Water Level: {loc.waterLevel}</span>
                    <span>Status: {loc.status}</span>
                  </div>
                </div>
                <Badge variant={getRiskBadgeVariant(loc.risk)} className={getRiskColor(loc.risk)}>
                  {loc.risk} Risk
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Safety Recommendations */}
        <Card className="p-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Safety Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-aqi-good/10 border border-aqi-good/20">
              <h4 className="font-medium text-aqi-good mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Current Conditions
              </h4>
              <p className="text-sm text-muted-foreground">
                Low flood risk. Normal activities can continue. Monitor weather updates regularly.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-medium text-primary mb-2">ℹ️ Stay Informed</h4>
              <p className="text-sm text-muted-foreground">
                Enable alerts to receive real-time notifications about changing flood conditions.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
              <h4 className="font-medium text-secondary mb-2">🏠 Prepare Your Home</h4>
              <p className="text-sm text-muted-foreground">
                Check drainage systems and ensure emergency supplies are accessible.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <h4 className="font-medium mb-2">📱 Emergency Contacts</h4>
              <p className="text-sm text-muted-foreground">
                Keep emergency numbers handy: Rescue 1122, District Administration Helpline.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FloodPrediction;
