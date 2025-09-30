
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Target,
  Calendar,
  Zap,
  Activity,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const predictionData = [
  { time: '00:00', demand: 85, capacity: 90, efficiency: 92 },
  { time: '04:00', demand: 78, capacity: 88, efficiency: 89 },
  { time: '08:00', demand: 95, capacity: 92, efficiency: 94 },
  { time: '12:00', demand: 88, capacity: 85, efficiency: 88 },
  { time: '16:00', demand: 92, capacity: 95, efficiency: 96 },
  { time: '20:00', demand: 87, capacity: 90, efficiency: 91 },
];

const trends = [
  { 
    metric: 'Production Efficiency',
    current: 94.2,
    predicted: 96.8,
    trend: 'up',
    confidence: 89,
    icon: Activity,
    color: 'text-green-700'
  },
  { 
    metric: 'Energy Consumption',
    current: 2340,
    predicted: 2180,
    trend: 'down',
    confidence: 92,
    icon: Zap,
    color: 'text-blue-700'
  },
  { 
    metric: 'Quality Score',
    current: 87.5,
    predicted: 91.2,
    trend: 'up',
    confidence: 85,
    icon: Target,
    color: 'text-purple-700'
  },
  { 
    metric: 'Maintenance Need',
    current: 15,
    predicted: 28,
    trend: 'up',
    confidence: 78,
    icon: AlertCircle,
    color: 'text-red-700'
  }
];

export const PredictiveAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<Date | null>(null);

  const runPredictiveAnalysis = () => {
    console.log('Starting predictive analysis...');
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setLastAnalysis(new Date());
      console.log('Predictive analysis completed successfully!');
      alert('Predictive analysis completed! New insights: Production efficiency expected to increase by 2.6% in next 24 hours. Energy consumption optimized for 7% reduction.');
    }, 3000);
  };

  return (
    <Card className="bg-card border-border shadow-elegant">
      <CardHeader className="pb-4 bg-gradient-to-r from-muted/50 to-background border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground font-semibold flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-elegant">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-gradient">Predictive Analytics</span>
                <div className="text-sm text-muted-foreground font-normal">Advanced forecasting and trend analysis</div>
              </div>
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="bg-background border border-border text-foreground rounded px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-ring"
            >
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
            </select>
            <Button 
              onClick={runPredictiveAnalysis}
              disabled={isAnalyzing}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-elegant"
            >
              {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
            </Button>
          </div>
        </div>
        {lastAnalysis && (
          <p className="text-sm text-muted-foreground mt-2">
            Last analysis: {lastAnalysis.toLocaleTimeString()}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="p-8 space-y-6">
        {/* Prediction Chart */}
        <div className="bg-muted/50 border border-border rounded-2xl p-6 shadow-elegant">
          <h3 className="text-foreground font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Production Forecast
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis dataKey="time" stroke="#475569" />
                <YAxis stroke="#475569" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    color: '#1e293b'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="demand" 
                  stackId="1"
                  stroke="#475569" 
                  fill="url(#gradientDemand)"
                />
                <Area 
                  type="monotone" 
                  dataKey="capacity" 
                  stackId="2"
                  stroke="#64748b" 
                  fill="url(#gradientCapacity)"
                />
                <defs>
                  <linearGradient id="gradientDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#475569" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#475569" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradientCapacity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend Predictions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trends.map((trend, index) => {
            const IconComponent = trend.icon;
            const isPositiveTrend = trend.trend === 'up';
            const changePercent = ((trend.predicted - trend.current) / trend.current * 100).toFixed(1);
            
            return (
              <div key={index} className="bg-slate-50 border border-slate-300 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <IconComponent className={`h-5 w-5 ${trend.color}`} />
                    <span className="text-slate-900 font-semibold text-sm">{trend.metric}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${isPositiveTrend ? 'text-green-700' : 'text-red-700'}`}>
                    {isPositiveTrend ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="text-sm font-semibold">{changePercent}%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-700 font-medium">Current: {trend.current}</span>
                    <span className="text-slate-700 font-medium">Predicted: {trend.predicted}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600">Confidence</span>
                      <span className="text-slate-900 font-semibold">{trend.confidence}%</span>
                    </div>
                    <Progress 
                      value={trend.confidence} 
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Recommendations */}
        <div className="bg-slate-50 border border-slate-300 rounded-lg p-4">
          <h3 className="text-slate-900 font-semibold mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-slate-700" />
            AI Recommendations
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3 p-3 bg-white border border-slate-200 rounded-lg">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <span className="text-slate-800 font-medium">Increase furnace temperature by 2°C in next 4 hours to optimize efficiency by 3.2%</span>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-white border border-slate-200 rounded-lg">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <span className="text-slate-800 font-medium">Schedule maintenance for Zone 3 within 5 days to prevent 8% quality drop</span>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-white border border-slate-200 rounded-lg">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <span className="text-slate-800 font-medium">Adjust alloy composition ratio to achieve 95% quality target within 6 hours</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
