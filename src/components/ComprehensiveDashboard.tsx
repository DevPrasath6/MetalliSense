
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Target, 
  DollarSign, 
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { dataService } from '@/services/dataService';

export const ComprehensiveDashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalReadings: 0,
    avgQuality: 0,
    criticalAlerts: 0,
    avgConfidence: 0,
    systemUptime: 0,
    energyEfficiency: 0,
    costSavings: 0
  });

  const [processData, setProcessData] = useState<any[]>([]);
  const [qualityTrends, setQualityTrends] = useState<any[]>([]);
  const [elementDistribution, setElementDistribution] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [analyticsData, recentData] = await Promise.all([
        dataService.getSystemAnalytics(),
        dataService.getRecentProcessData(24)
      ]);

      setAnalytics(analyticsData);
      setProcessData(recentData.slice(0, 10).reverse());

      // Generate quality trends
      const trends = recentData.slice(0, 8).map((reading, index) => ({
        time: new Date(reading.timestamp).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        quality: reading.quality_score || 0,
        efficiency: 85 + Math.random() * 10,
        temperature: reading.temperature
      }));
      setQualityTrends(trends);

      // Generate element distribution
      if (recentData.length > 0) {
        const latest = recentData[0];
        const distribution = Object.entries(latest.composition).map(([element, value]) => ({
          element,
          value: Number(value),
          color: element === 'C' ? '#ef4444' : 
                element === 'Si' ? '#3b82f6' : 
                element === 'Mn' ? '#10b981' : '#f59e0b'
        }));
        setElementDistribution(distribution);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const kpiCards = [
    {
      title: 'Process Quality',
      value: `${analytics.avgQuality.toFixed(1)}%`,
      change: '+2.4%',
      isPositive: true,
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'System Uptime',
      value: `${analytics.systemUptime.toFixed(1)}%`,
      change: '+0.1%',
      isPositive: true,
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'Energy Efficiency',
      value: `${analytics.energyEfficiency.toFixed(1)}%`,
      change: '+1.8%',
      isPositive: true,
      icon: Zap,
      color: 'text-yellow-600'
    },
    {
      title: 'Cost Savings',
      value: `$${analytics.costSavings.toFixed(2)}`,
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="bg-background border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.isPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-muted ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quality Trends */}
        <Card className="bg-background border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Quality & Efficiency Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={qualityTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="quality" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3}
                  name="Quality (%)"
                />
                <Area 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="hsl(var(--secondary))" 
                  fill="hsl(var(--secondary))" 
                  fillOpacity={0.3}
                  name="Efficiency (%)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Element Distribution */}
        <Card className="bg-background border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Current Alloy Composition</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={elementDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ element, value }) => `${element}: ${value.toFixed(2)}%`}
                >
                  {elementDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="bg-background border-border">
        <CardHeader>
          <CardTitle>System Health Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Process Metrics</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Data Quality</span>
                    <span className="text-foreground font-medium">98.5%</span>
                  </div>
                  <Progress value={98.5} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Model Accuracy</span>
                    <span className="text-foreground font-medium">{analytics.avgConfidence.toFixed(1)}%</span>
                  </div>
                  <Progress value={analytics.avgConfidence} className="h-2" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Alerts & Issues</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Critical Alerts</span>
                  <Badge className={analytics.criticalAlerts > 0 ? 'bg-red-600' : 'bg-green-600'}>
                    {analytics.criticalAlerts}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">System Status</span>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">Operational</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Performance</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Readings</span>
                  <span className="text-sm text-foreground font-mono">{analytics.totalReadings.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="text-sm text-foreground font-mono">2.3s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Throughput</span>
                  <span className="text-sm text-foreground font-mono">1.2k/hr</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
