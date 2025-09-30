
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, Sparkles, Activity } from 'lucide-react';

interface ElementReading {
  element: string;
  current: number;
  target: number;
  tolerance: number;
  unit: string;
}

export const SpectrometerPanel = () => {
  const [readings, setReadings] = useState<ElementReading[]>([
    { element: 'C', current: 3.45, target: 3.50, tolerance: 0.10, unit: '%' },
    { element: 'Si', current: 2.12, target: 2.20, tolerance: 0.15, unit: '%' },
    { element: 'Mn', current: 0.68, target: 0.70, tolerance: 0.05, unit: '%' },
    { element: 'P', current: 0.035, target: 0.040, tolerance: 0.010, unit: '%' },
    { element: 'S', current: 0.025, target: 0.030, tolerance: 0.010, unit: '%' },
    { element: 'Cr', current: 0.18, target: 0.20, tolerance: 0.05, unit: '%' },
  ]);

  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setReadings(prev => prev.map(reading => ({
        ...reading,
        current: Math.max(0, reading.current + (Math.random() - 0.5) * 0.02)
      })));
      setLastUpdated(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatus = (reading: ElementReading) => {
    const deviation = Math.abs(reading.current - reading.target);
    if (deviation <= reading.tolerance * 0.5) return 'optimal';
    if (deviation <= reading.tolerance) return 'acceptable';
    return 'critical';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-emerald-500';
      case 'acceptable': return 'bg-blue-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'optimal': return 'from-emerald-500/10 to-emerald-600/5';
      case 'acceptable': return 'from-blue-500/10 to-blue-600/5';
      case 'critical': return 'from-red-500/10 to-red-600/5';
      default: return 'from-slate-500/10 to-slate-600/5';
    }
  };

  const getProgressValue = (reading: ElementReading) => {
    const range = reading.tolerance * 2;
    const position = (reading.current - (reading.target - reading.tolerance)) / range;
    return Math.max(0, Math.min(100, position * 100));
  };

  return (
    <Card className="glass-card border-0 shadow-premium hover-lift">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-slate-900 flex items-center font-semibold">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mr-3 shadow-soft">
              <Database className="h-5 w-5" />
            </div>
            Live Spectrometer Readings
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className="glass-button px-3 py-1 text-xs border-0 font-medium">
              <Activity className="h-3 w-3 mr-1 animate-pulse" />
              Live: {lastUpdated.toLocaleTimeString()}
            </Badge>
            <Sparkles className="h-4 w-4 text-purple-600 animate-pulse-slow" />
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-2 font-medium">
          Real-time AI-powered elemental composition analysis with predictive insights
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {readings.map((reading, index) => {
            const status = getStatus(reading);
            const statusGradient = getStatusGradient(status);
            return (
              <div 
                key={reading.element} 
                className={`glass-card border-0 rounded-xl p-4 space-y-3 hover-glow bg-gradient-to-br ${statusGradient} animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-lg">{reading.element}</h3>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} shadow-soft animate-pulse-slow`} />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-700 font-medium">Current:</span>
                    <span className="text-slate-900 font-mono font-bold">
                      {reading.current.toFixed(3)}{reading.unit}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-700 font-medium">Target:</span>
                    <span className="text-slate-800 font-mono font-medium">
                      {reading.target.toFixed(3)}{reading.unit}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress 
                      value={getProgressValue(reading)} 
                      className="h-2 bg-slate-200/80 shadow-inner"
                    />
                    <div className="flex justify-between text-xs text-slate-600">
                      <span className="font-mono">{(reading.target - reading.tolerance).toFixed(3)}</span>
                      <span className="font-semibold capitalize text-slate-800">{status}</span>
                      <span className="font-mono">{(reading.target + reading.tolerance).toFixed(3)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
