import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Wind, AlertCircle, Sparkles, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const mockPM25Data = [
  { date: "Week 1", value: 15 },
  { date: "Week 2", value: 12 },
  { date: "Week 3", value: 18 },
  { date: "Week 4", value: 11 },
];

const mockOzoneData = [
  { date: "Week 1", value: 45 },
  { date: "Week 2", value: 38 },
  { date: "Week 3", value: 52 },
  { date: "Week 4", value: 42 },
];

const HealthInsights = () => {
  const [aiInsight, setAiInsight] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateAIInsight = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-health-advisory', {
        body: {
          aqi: 42,
          location: "San Francisco, California",
          pollutants: {
            pm25: 11.2,
            pm10: 23.5,
            o3: 45,
            no2: 18,
            co: 0.4,
            so2: 2.1
          }
        }
      });

      if (error) throw error;

      setAiInsight(data.advisory);
      toast({
        title: "AI Advisory Generated",
        description: "Your personalized health insight is ready.",
      });
    } catch (error) {
      console.error("Error generating AI insight:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI advisory. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-3 mb-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Health Insights</h1>
          </div>
          <p className="text-muted-foreground">AI-powered analysis and personalized recommendations</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* AI Health Advisory */}
          <Card className="lg:col-span-2 p-6 animate-fade-in border-2 border-primary/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">AI Health Advisory</h2>
              </div>
              <Button 
                onClick={generateAIInsight} 
                disabled={isLoading}
                size="sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Insight
                  </>
                )}
              </Button>
            </div>

            {aiInsight ? (
              <div className="prose prose-sm max-w-none">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-foreground whitespace-pre-wrap">{aiInsight}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Brain className="h-16 w-16 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground mb-2">No AI advisory generated yet</p>
                <p className="text-sm text-muted-foreground">Click "Generate Insight" to get personalized health recommendations</p>
              </div>
            )}
          </Card>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card className="p-6 animate-fade-in">
              <div className="flex items-center space-x-2 mb-4">
                <Wind className="h-5 w-5 text-aqi-good" />
                <h3 className="font-semibold">Risk Level</h3>
              </div>
              <p className="text-3xl font-bold text-aqi-good mb-2">Low</p>
              <p className="text-sm text-muted-foreground">
                Current air quality poses minimal health risk
              </p>
            </Card>

            <Card className="p-6 animate-fade-in">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-5 w-5 text-secondary" />
                <h3 className="font-semibold">Weekly Trend</h3>
              </div>
              <p className="text-3xl font-bold text-secondary mb-2">Improving</p>
              <p className="text-sm text-muted-foreground">
                15% better than last week
              </p>
            </Card>

            <Card className="p-6 animate-fade-in">
              <div className="flex items-center space-x-2 mb-4">
                <Wind className="h-5 w-5 text-chart-1" />
                <h3 className="font-semibold">Wind Quality</h3>
              </div>
              <p className="text-3xl font-bold text-chart-1 mb-2">Favorable</p>
              <p className="text-sm text-muted-foreground">
                Good dispersion conditions
              </p>
            </Card>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">PM2.5 Levels (30 Days)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mockPM25Data}>
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
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Ozone Levels (30 Days)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={mockOzoneData}>
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
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="p-6 mt-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-aqi-good/10 border border-aqi-good/20">
              <h4 className="font-medium text-aqi-good mb-2">✓ Safe for Exercise</h4>
              <p className="text-sm text-muted-foreground">
                Air quality is excellent for all outdoor activities
              </p>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-medium text-primary mb-2">ℹ Open Windows</h4>
              <p className="text-sm text-muted-foreground">
                Good time to ventilate your indoor spaces
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
              <h4 className="font-medium text-secondary mb-2">👨‍👩‍👧‍👦 Family Friendly</h4>
              <p className="text-sm text-muted-foreground">
                Safe for children and elderly to spend time outdoors
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <h4 className="font-medium mb-2">🌱 Plants Thriving</h4>
              <p className="text-sm text-muted-foreground">
                Excellent conditions for plant growth and photosynthesis
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HealthInsights;
