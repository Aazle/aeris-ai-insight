import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, MapPin, Gauge, Database, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [location, setLocation] = useState("San Francisco, California");
  const [units, setUnits] = useState("metric");
  const [refreshRate, setRefreshRate] = useState("5");
  const [chartType, setChartType] = useState("area");
  const [email, setEmail] = useState("user@example.com");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-3 mb-2">
            <SettingsIcon className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Settings</h1>
          </div>
          <p className="text-muted-foreground">Customize your AERIS experience</p>
        </div>

        <div className="space-y-6">
          {/* Location Preferences */}
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Location Preferences</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Default Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location..."
                />
                <p className="text-sm text-muted-foreground">
                  This location will be used for monitoring by default
                </p>
              </div>
            </div>
          </Card>

          {/* Measurement Units */}
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <Gauge className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Measurement Units</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Unit System</Label>
                <Select value={units} onValueChange={setUnits}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric (µg/m³, °C)</SelectItem>
                    <SelectItem value="imperial">Imperial (lb/ft³, °F)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Data Source Configuration */}
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <Database className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Data Source</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Primary Data Source</Label>
                <Select defaultValue="openaq">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openaq">OpenAQ</SelectItem>
                    <SelectItem value="iqair">IQAir</SelectItem>
                    <SelectItem value="airnow">AirNow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Display Preferences */}
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <BarChart className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Display Preferences</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Data Refresh Rate</Label>
                <Select value={refreshRate} onValueChange={setRefreshRate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Chart Display Type</Label>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Account Settings */}
          <Card className="p-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-6">Account</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <Button onClick={handleSave} size="lg" className="w-full">
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
