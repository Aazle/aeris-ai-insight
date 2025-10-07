import { Card } from "@/components/ui/card";
import { LayoutDashboard, Users, Activity, Database, Bell } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>

        {/* System Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-bold">45.2K</p>
            </div>
            <p className="text-sm text-muted-foreground">API Calls</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Database className="h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-bold">3</p>
            </div>
            <p className="text-sm text-muted-foreground">Data Sources</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-bold">127</p>
            </div>
            <p className="text-sm text-muted-foreground">Alerts Sent</p>
          </Card>
        </div>

        {/* Monitored Regions */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Monitored Regions</h2>
          <div className="space-y-3">
            {[
              { name: "San Francisco Bay Area", status: "active", stations: 12 },
              { name: "Los Angeles Metro", status: "active", stations: 18 },
              { name: "Sacramento Valley", status: "warning", stations: 8 },
            ].map((region, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <p className="font-medium">{region.name}</p>
                  <p className="text-sm text-muted-foreground">{region.stations} monitoring stations</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  region.status === "active" ? "bg-aqi-good/20 text-aqi-good" : "bg-aqi-moderate/20 text-aqi-moderate"
                }`}>
                  {region.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
