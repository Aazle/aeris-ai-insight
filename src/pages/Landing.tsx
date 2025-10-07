import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AQICard } from "@/components/AQICard";
import { Wind, TrendingUp, Bell, Brain } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20">
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in-up">
            <div className="flex items-center space-x-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
                <Wind className="h-10 w-10 text-primary-foreground" />
              </div>
              <h1 className="text-5xl font-bold">
                <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
                  AERIS
                </span>
              </h1>
            </div>
            
            <p className="max-w-2xl text-xl text-muted-foreground">
              AI Environmental Resilience & Intelligence System
            </p>
            
            <p className="max-w-3xl text-lg text-foreground/80">
              Monitor air quality, predict environmental hazards, and receive AI-powered health insights 
              to protect yourself and your community.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="shadow-lg">
                <Link to="/dashboard">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Explore Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/air-quality">
                  <Wind className="mr-2 h-5 w-5" />
                  Check Air Quality
                </Link>
              </Button>
            </div>

            {/* Live AQI Widget */}
            <div className="w-full max-w-md mt-12">
              <AQICard 
                aqi={42}
                location="San Francisco, California"
                status="good"
              />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-border hover:shadow-lg transition-shadow animate-fade-in">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                <Wind className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Air Quality</h3>
              <p className="text-muted-foreground">
                Monitor PM2.5, PM10, O3, NO2, CO, and SO2 levels in real-time with accurate data from multiple sources.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mb-4">
                <Brain className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Health Advisory</h3>
              <p className="text-muted-foreground">
                Get personalized health recommendations based on current air quality and your location.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                <Bell className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Alerts</h3>
              <p className="text-muted-foreground">
                Receive proactive notifications when air quality reaches unhealthy levels in your area.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
