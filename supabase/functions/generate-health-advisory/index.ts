import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { aqi, location, pollutants } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    const systemPrompt = `You are an environmental health expert. Provide personalized health advisory based on air quality data. Be concise, clear, and actionable.`;
    
    const userPrompt = `Location: ${location}
AQI: ${aqi}
Pollutants:
- PM2.5: ${pollutants.pm25} µg/m³
- PM10: ${pollutants.pm10} µg/m³
- O3: ${pollutants.o3} ppb
- NO2: ${pollutants.no2} ppb
- CO: ${pollutants.co} ppm
- SO2: ${pollutants.so2} ppb

Provide a health advisory with:
1. Overall air quality assessment
2. Health risks for general population
3. Specific advice for sensitive groups (children, elderly, respiratory conditions)
4. Recommended outdoor activities`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    const data = await response.json();
    const advisory = data.choices[0].message.content;

    return new Response(JSON.stringify({ advisory }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
