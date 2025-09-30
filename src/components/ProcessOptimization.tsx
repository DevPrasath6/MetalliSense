
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Settings, 
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface OptimizationMetric {
  name: string;
  current: number;
  target: number;
  unit: string;
  status: 'optimal' | 'improving' | 'attention';
  trend: number;
}

interface OptimizationRecommendation {
  id: string;
  action: string;
  impact: string;
  confidence: number;
  estimatedTime: number;
  priority: 'high' | 'medium' | 'low';
}

export const ProcessOptimization = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [lastOptimized, setLastOptimized] = useState<Date | null>(null);

  const [metrics, setMetrics] = useState<OptimizationMetric[]>([
    {
      name: 'Energy Efficiency',
      current: 87.3,
      target: 92.0,
      unit: '%',
      status: 'improving',
      trend: 2.1
    },
    {
      name: 'Temperature Stability',
      current: 1547,
      target: 1550,
      unit: '°C',
      status: 'optimal',
      trend: 0.2
    },
    {
      name: 'Alloy Utilization',
      current: 94.8,
      target: 96.0,
      unit: '%',
      status: 'improving',
      trend: 1.5
    },
    {
      name: 'Cycle Time',
      current: 42.3,
      target: 38.0,
      unit: 'min',
      status: 'attention',
      trend: -1.8
    }
  ]);

  const [recommendations] = useState<OptimizationRecommendation[]>([
    {
      id: '1',
      action: 'Increase furnace temperature by 3°C',
      impact: 'Reduce cycle time by 4-6 minutes',
      confidence: 94,
      estimatedTime: 15,
      priority: 'high'
    },
    {
      id: '2',
      action: 'Adjust oxygen flow rate to 2.8 L/min',
      impact: 'Improve energy efficiency by 2-3%',
      confidence: 89,
      estimatedTime: 8,
      priority: 'medium'
    },
    {
      id: '3',
      action: 'Optimize alloy addition sequence',
      impact: 'Increase utilization by 1.2%',
      confidence: 91,
      estimatedTime: 12,
      priority: 'medium'
    }
  ]);

  const startOptimization = () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);
    
    const interval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          setLastOptimized(new Date());
          
          // Simulate improvements
          setMetrics(current => current.map(metric => ({
            ...metric,
            current: metric.current + (Math.random() - 0.3) * 2,
            status: Math.random() > 0.3 ? 'optimal' : metric.status
          })));
          
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const resetOptimization = () => {
    setOptimizationProgress(0);
    setLastOptimized(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-600 bg-green-50';
      case 'improving': return 'text-blue-600 bg-blue-50';
      case 'attention': return 'text-orange-600 bg-orange-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <Card className="bg-white border-slate-200 shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-slate-800 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-slate-600" />
            Real-time Process Optimization
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              onClick={startOptimization}
              disabled={isOptimizing}
              className="bg-slate-600 hover:bg-slate-700 text-white"
            >
              {isOptimizing ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Optimization
                </>
              )}
            </Button>
            <Button
              onClick={resetOptimization}
              variant="outline"
              size="sm"
              className="border-slate-200 text-slate-600"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {lastOptimized && (
          <p className="text-sm text-slate-600 mt-2">
            Last optimized: {lastOptimized.toLocaleTimeString()}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Optimization Progress */}
        {isOptimizing && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-800">Optimization Progress</span>
              <span className="text-sm text-slate-600">{Math.round(optimizationProgress)}%</span>
            </div>
            <Progress value={optimizationProgress} className="h-2" />
          </div>
        )}

        {/* Performance Metrics */}
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Performance Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-800">{metric.name}</span>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-mono text-slate-800">
                    {metric.current.toFixed(1)}{metric.unit}
                  </span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className={`h-4 w-4 ${metric.trend > 0 ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={`text-sm ${metric.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.trend > 0 ? '+' : ''}{metric.trend.toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div className="text-xs text-slate-500">
                  Target: {metric.target}{metric.unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            AI Optimization Recommendations
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={`${getPriorityColor(rec.priority)} text-white text-xs`}>
                        {rec.priority.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-slate-600">
                        {rec.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 mb-1">{rec.action}</p>
                    <p className="text-sm text-slate-600">{rec.impact}</p>
                  </div>
                  <div className="text-right text-xs text-slate-500">
                    ~{rec.estimatedTime}min
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-slate-200 text-slate-600"
                  >
                    Review
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs bg-slate-600 hover:bg-slate-700 text-white"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gradient-subtle border border-slate-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-slate-800 mb-3 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Optimization Status
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Active Optimizations:</span>
              <div className="text-slate-800 font-mono">3/5</div>
            </div>
            <div>
              <span className="text-slate-600">Success Rate:</span>
              <div className="text-slate-800 font-mono">94.2%</div>
            </div>
            <div>
              <span className="text-slate-600">Avg Improvement:</span>
              <div className="text-slate-800 font-mono">+2.8%</div>
            </div>
            <div>
              <span className="text-slate-600">Next Schedule:</span>
              <div className="text-slate-800 font-mono">2h 15m</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
