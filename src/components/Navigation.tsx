import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Wind, Home, Activity, Droplets, Sprout, Bell, Settings, LayoutDashboard } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/air-quality", label: "Air Quality", icon: Wind },
    { path: "/health-insights", label: "Health Insights", icon: Activity },
    { path: "/notifications", label: "Alerts", icon: Bell },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Wind className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            AERIS
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                asChild
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                className="transition-all"
              >
                <Link to={item.path}>
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>

        <Button asChild variant="outline" size="sm" className="hidden md:flex">
          <Link to="/admin">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Admin
          </Link>
        </Button>
      </div>
    </nav>
  );
};
