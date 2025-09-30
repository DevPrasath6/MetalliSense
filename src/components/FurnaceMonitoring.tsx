
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Flame, Thermometer, Zap, Wind, Gauge, AlertTriangle, TrendingUp, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface FurnaceZone {
  id: string;
  name: string;
  temperature: number;
  targetTemp: number;
  tolerance: number;
  status: 'optimal' | 'warning' | 'critical';
}

interface PowerMetrics {
  current: number;
  average: number;
  peak: number;
  efficiency: number;
}

interface GasFlow {
  oxygen: number;
  argon: number;
  nitrogen: number;
  totalFlow: number;
}

export const FurnaceMonitoring = () => {
  const [furnaceZones, setFurnaceZones] = useState<FurnaceZone[]>([
    { id: '1', name: 'Arc Zone', temperature: 1650, targetTemp: 1650, tolerance: 25, status: 'optimal' },
    { id: '2', name: 'Ladle Zone', temperature: 1580, targetTemp: 1590, tolerance: 20, status: 'warning' },
    { id: '3', name: 'Tapping Zone', temperature: 1620, targetTemp: 1615, tolerance: 15, status: 'optimal' },
    { id: '4', name: 'Slag Zone', temperature: 1480, targetTemp: 1500, tolerance: 30, status: 'warning' }
  ]);

  const [powerMetrics, setPowerMetrics] = useState<PowerMetrics>({
    current: 45.8,
    average: 43.2,
    peak: 52.1,
    efficiency: 87.4
  });

  const [gasFlow, setGasFlow] = useState<GasFlow>({
    oxygen: 125.6,
    argon: 45.2,
    nitrogen: 18.9,
    totalFlow: 189.7
  });

  const [temperatureHistory, setTemperatureHistory] = useState([
    { time: '10:00', arcZone: 1645, ladleZone: 1575, tappingZone: 1610, slagZone: 1485 },
    { time: '10:05', arcZone: 1648, ladleZone: 1578, tappingZone: 1615, slagZone: 1480 },
    { time: '10:10', arcZone: 1650, ladleZone: 1580, tappingZone: 1620, slagZone: 1478 },
    { time: '10:15', arcZone: 1652, ladleZone: 1582, tappingZone: 1618, slagZone: 1485 },
    { time: '10:20', arcZone: 1650, ladleZone: 1580, tappingZone: 1620, slagZone: 1480 }
  ]);

  const [powerHistory, setPowerHistory] = useState([
    { time: '10:00', power: 42.5, efficiency: 85.2 },
    { time: '10:05', power: 44.1, efficiency: 86.8 },
    { time: '10:10', power: 45.8, efficiency: 87.4 },
    { time: '10:15', power: 47.2, efficiency: 88.1 },
    { time: '10:20', power: 45.8, efficiency: 87.4 }
  ]);

  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update furnace zones
      setFurnaceZones(prev => prev.map(zone => {
        const tempVariation = (Math.random() - 0.5) * 10;
        const newTemp = zone.temperature + tempVariation;
        const deviation = Math.abs(newTemp - zone.targetTemp);
        
        let status: 'optimal' | 'warning' | 'critical' = 'optimal';
        if (deviation > zone.tolerance) status = 'critical';
        else if (deviation > zone.tolerance * 0.7) status = 'warning';

        return { ...zone, temperature: newTemp, status };
      }));

      // Update power metrics
      setPowerMetrics(prev => ({
        ...prev,
        current: prev.current + (Math.random() - 0.5) * 2,
        efficiency: Math.max(80, Math.min(95, prev.efficiency + (Math.random() - 0.5) * 1))
      }));

      // Update gas flow
      setGasFlow(prev => ({
        ...prev,
        oxygen: prev.oxygen + (Math.random() - 0.5) * 5,
        argon: prev.argon + (Math.random() - 0.5) * 2,
        nitrogen: prev.nitrogen + (Math.random() - 0.5) * 1
      }));

      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getZoneStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 85) return 'text-green-400';
    if (efficiency >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const criticalZones = furnaceZones.filter(zone => zone.status === 'critical').length;
  const warningZones = furnaceZones.filter(zone => zone.status === 'warning').length;
  const avgTemperature = furnaceZones.reduce((sum, zone) => sum + zone.temperature, 0) / furnaceZones.length;

  return (
    <Card className="bg-white border-subtle shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-foreground flex items-center">
            <Flame className="h-5 w-5 mr-2 text-primary" />
            Real-time Furnace Monitoring
          </CardTitle>
          <div className="flex items-center space-x-2">
            {criticalZones > 0 && (
              <Badge className="bg-red-600">
                {criticalZones} Critical
              </Badge>
            )}
            {warningZones > 0 && (
              <Badge className="bg-yellow-600">
                {warningZones} Warning
              </Badge>
            )}
            <Badge variant="outline" className="text-xs text-muted-foreground border-subtle">
              Updated: {lastUpdated.toLocaleTimeString()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-subtle border border-subtle rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Avg Temperature</span>
                <Thermometer className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {avgTemperature.toFixed(0)}°C
              </div>
              <div className="text-xs text-muted-foreground">Across all zones</div>
            </div>

            <div className="bg-subtle border border-subtle rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Power Draw</span>
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {powerMetrics.current.toFixed(1)} MW
              </div>
              <div className="text-xs text-muted-foreground">Current consumption</div>
            </div>

            <div className="bg-subtle border border-subtle rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Efficiency</span>
                <Gauge className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {powerMetrics.efficiency.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Energy efficiency</div>
            </div>

            <div className="bg-subtle border border-subtle rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Gas Flow</span>
                <Wind className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {gasFlow.totalFlow.toFixed(1)} L/min
              </div>
              <div className="text-xs text-muted-foreground">Total flow rate</div>
            </div>
          </div>

          {/* Temperature Zones */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Thermometer className="h-4 w-4 mr-2 text-primary" />
              Temperature Zones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {furnaceZones.map((zone) => (
                <div key={zone.id} className="bg-subtle border border-subtle rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{zone.name}</h4>
                    <div className={`w-3 h-3 rounded-full ${getZoneStatusColor(zone.status)}`} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current:</span>
                      <span className="text-foreground font-mono text-lg">
                        {zone.temperature.toFixed(0)}°C
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Target:</span>
                      <span className="text-primary font-mono">
                        {zone.targetTemp}°C
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <Progress 
                        value={Math.min(100, Math.max(0, 
                          ((zone.temperature - (zone.targetTemp - zone.tolerance)) / (zone.tolerance * 2)) * 100
                        ))} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{zone.targetTemp - zone.tolerance}°C</span>
                        <span>{zone.targetTemp + zone.tolerance}°C</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground capitalize">
                      Status: {zone.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Temperature Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-subtle border border-subtle rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                Temperature Trends
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={temperatureHistory}>
                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                   <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                   <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[1450, 1680]} />
                   <Tooltip 
                     contentStyle={{ 
                       backgroundColor: 'hsl(var(--background))', 
                       border: '1px solid hsl(var(--border))',
                       borderRadius: '6px',
                       color: 'hsl(var(--foreground))'
                     }}
                   />
                  <Line type="monotone" dataKey="arcZone" stroke="#f97316" strokeWidth={2} name="Arc Zone" />
                  <Line type="monotone" dataKey="ladleZone" stroke="#06b6d4" strokeWidth={2} name="Ladle Zone" />
                  <Line type="monotone" dataKey="tappingZone" stroke="#10b981" strokeWidth={2} name="Tapping Zone" />
                  <Line type="monotone" dataKey="slagZone" stroke="#8b5cf6" strokeWidth={2} name="Slag Zone" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-subtle border border-subtle rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-primary" />
                Power & Efficiency
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={powerHistory}>
                   <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                   <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                   <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                   <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                   <Tooltip 
                     contentStyle={{ 
                       backgroundColor: 'hsl(var(--background))', 
                       border: '1px solid hsl(var(--border))',
                       borderRadius: '6px',
                       color: 'hsl(var(--foreground))'
                     }}
                   />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="power" 
                    stroke="#eab308" 
                    fill="#eab308" 
                    fillOpacity={0.3}
                    name="Power (MW)"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Efficiency (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gas Flow Monitoring */}
          <div className="bg-subtle border border-subtle rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <Wind className="h-4 w-4 mr-2 text-primary" />
              Gas Flow Rates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-muted border border-subtle rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Oxygen</span>
                  <Badge className="bg-primary">O₂</Badge>
                </div>
                <div className="text-xl font-bold text-foreground">
                  {gasFlow.oxygen.toFixed(1)} L/min
                </div>
                <Progress value={(gasFlow.oxygen / 150) * 100} className="h-2 mt-2" />
              </div>

              <div className="bg-muted border border-subtle rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Argon</span>
                  <Badge className="bg-secondary">Ar</Badge>
                </div>
                <div className="text-xl font-bold text-foreground">
                  {gasFlow.argon.toFixed(1)} L/min
                </div>
                <Progress value={(gasFlow.argon / 60) * 100} className="h-2 mt-2" />
              </div>

              <div className="bg-muted border border-subtle rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Nitrogen</span>
                  <Badge className="bg-accent">N₂</Badge>
                </div>
                <div className="text-xl font-bold text-foreground">
                  {gasFlow.nitrogen.toFixed(1)} L/min
                </div>
                <Progress value={(gasFlow.nitrogen / 25) * 100} className="h-2 mt-2" />
              </div>

              <div className="bg-muted border border-subtle rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Total Flow</span>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-xl font-bold text-foreground">
                  {gasFlow.totalFlow.toFixed(1)} L/min
                </div>
                <div className="text-xs text-muted-foreground mt-1">Combined flow rate</div>
              </div>
            </div>
          </div>

          {/* Control Actions */}
          <div className="flex justify-between items-center bg-subtle border border-subtle rounded-lg p-4">
            <div>
              <h3 className="font-medium text-foreground">Furnace Control</h3>
              <p className="text-sm text-muted-foreground">Manual adjustments and emergency controls</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-subtle hover:bg-muted">
                <Settings className="h-4 w-4 mr-1" />
                Adjust Settings
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Flame className="h-4 w-4 mr-1" />
                Optimize Heat
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
