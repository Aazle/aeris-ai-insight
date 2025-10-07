import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Mail, Smartphone, AlertTriangle, Wind, Settings as SettingsIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Notifications = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [threshold, setThreshold] = useState("moderate");
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const recentNotifications = [
    {
      id: 1,
      type: "aqi",
      title: "AQI Threshold Exceeded",
      message: "Air quality has reached moderate levels in your area",
      time: "2 hours ago",
      icon: Wind,
      color: "text-aqi-moderate"
    },
    {
      id: 2,
      type: "weather",
      title: "Weather Update",
      message: "Favorable wind conditions expected today",
      time: "5 hours ago",
      icon: Wind,
      color: "text-primary"
    },
    {
      id: 3,
      type: "health",
      title: "Health Advisory",
      message: "Sensitive groups should limit outdoor activity",
      time: "1 day ago",
      icon: AlertTriangle,
      color: "text-accent"
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-3 mb-2">
            <Bell className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Notifications</h1>
          </div>
          <p className="text-muted-foreground">Manage your alerts and notification preferences</p>
        </div>

        <div className="grid gap-6">
          {/* Alert Settings */}
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center space-x-2 mb-6">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Alert Settings</h2>
            </div>

            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="email" className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                  </div>
                </div>
                <Switch 
                  id="email"
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                />
              </div>

              {/* SMS Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label htmlFor="sms" className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts via text message</p>
                  </div>
                </div>
                <Switch 
                  id="sms"
                  checked={smsEnabled}
                  onCheckedChange={setSmsEnabled}
                />
              </div>

              {/* Alert Threshold */}
              <div className="space-y-2">
                <Label>Alert Threshold</Label>
                <Select value={threshold} onValueChange={setThreshold}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good (AQI 0-50)</SelectItem>
                    <SelectItem value="moderate">Moderate (AQI 51-100)</SelectItem>
                    <SelectItem value="unhealthy">Unhealthy (AQI 101-150)</SelectItem>
                    <SelectItem value="very-unhealthy">Very Unhealthy (AQI 151+)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  You'll be notified when AQI exceeds this level
                </p>
              </div>

              <Button onClick={handleSaveSettings} className="w-full">
                Save Preferences
              </Button>
            </div>
          </Card>

          {/* Recent Notifications */}
          <Card className="p-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-6">Recent Alerts</h2>
            <div className="space-y-4">
              {recentNotifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div 
                    key={notification.id}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-muted ${notification.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
