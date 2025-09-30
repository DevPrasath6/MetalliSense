
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Eye, TrendingUp, Zap, Clock, Shield } from 'lucide-react';

interface Anomaly {
  id: string;
  type: 'composition' | 'process' | 'model' | 'equipment';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: Date;
  confidence: number;
  suggestedAction: string;
  affectedElements?: string[];
  status: 'active' | 'investigating' | 'resolved';
}

interface AnomalyPattern {
  pattern: string;
  frequency: number;
  lastOccurrence: Date;
  severity: 'low' | 'medium' | 'high';
}

export const AnomalyDetection = () => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([
    {
      id: '1',
      type: 'composition',
      severity: 'high',
      title: 'Unusual Silicon Volatility',
      description: 'Silicon readings showing abnormal fluctuation pattern (±0.15% in 5 minutes)',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      confidence: 94.2,
      suggestedAction: 'Check stirring system and sampling consistency',
      affectedElements: ['Si'],
      status: 'active'
    },
    {
      id: '2',
      type: 'model',
      severity: 'medium',
      title: 'AI Confidence Drift',
      description: 'Model confidence has decreased by 12% over last hour for carbon predictions',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      confidence: 87.5,
      suggestedAction: 'Review recent training data and recalibrate model',
      affectedElements: ['C'],
      status: 'investigating'
    },
    {
      id: '3',
      type: 'process',
      severity: 'critical',
      title: 'Temperature Spike Detected',
      description: 'Furnace temperature exceeded normal range by 45°C for 3 minutes',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      confidence: 98.7,
      suggestedAction: 'Immediate furnace inspection required - potential refractory issue',
      status: 'active'
    },
    {
      id: '4',
      type: 'equipment',
      severity: 'low',
      title: 'Spectrometer Drift',
      description: 'Minor calibration drift detected in spectrometer readings',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      confidence: 76.3,
      suggestedAction: 'Schedule spectrometer recalibration within 24 hours',
      status: 'resolved'
    }
  ]);

  const [patterns, setPatterns] = useState<AnomalyPattern[]>([
    {
      pattern: 'High Silicon volatility after FeSi additions',
      frequency: 8,
      lastOccurrence: new Date(Date.now() - 2 * 60 * 1000),
      severity: 'medium'
    },
    {
      pattern: 'Model confidence drops during shift changes',
      frequency: 12,
      lastOccurrence: new Date(Date.now() - 6 * 60 * 60 * 1000),
      severity: 'low'
    },
    {
      pattern: 'Temperature spikes correlate with power fluctuations',
      frequency: 3,
      lastOccurrence: new Date(Date.now() - 8 * 60 * 1000),
      severity: 'high'
    }
  ]);

  const [selectedType, setSelectedType] = useState<string>('all');

  // Simulate real-time anomaly detection
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        const newAnomaly: Anomaly = {
          id: Date.now().toString(),
          type: ['composition', 'process', 'model', 'equipment'][Math.floor(Math.random() * 4)] as any,
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
          title: 'New Anomaly Detected',
          description: 'System detected unusual pattern in real-time data',
          timestamp: new Date(),
          confidence: 70 + Math.random() * 30,
          suggestedAction: 'Investigate immediately',
          status: 'active'
        };
        setAnomalies(prev => [newAnomaly, ...prev.slice(0, 9)]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Design-system friendly helpers
  const getSeverityVariant = (severity: string): 'default' | 'secondary' | 'destructive' => {
    switch (severity) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'default'; // primary
      case 'medium':
      case 'low':
      default:
        return 'secondary';
    }
  };

  const getStatusTone = (status: string) => {
    switch (status) {
      case 'active':
        return 'border-destructive bg-destructive/10';
      case 'investigating':
        return 'border-ring bg-ring/10';
      case 'resolved':
        return 'border-secondary bg-secondary/20';
      default:
        return 'border-border bg-muted';
    }
  };

  const getTypeIcon = (type: string) => {
    const common = 'h-4 w-4 text-primary';
    switch (type) {
      case 'composition':
        return <TrendingUp className={common} />;
      case 'process':
        return <Zap className={common} />;
      case 'model':
        return <Shield className={common} />;
      case 'equipment':
        return <Eye className={common} />;
      default:
        return <AlertTriangle className={common} />;
    }
  };

  const filteredAnomalies = selectedType === 'all'
    ? anomalies
    : anomalies.filter(anomaly => anomaly.type === selectedType);

  const activeAnomalies = anomalies.filter(a => a.status === 'active').length;
  const criticalAnomalies = anomalies.filter(a => a.severity === 'critical' && a.status === 'active').length;

  const handleStatusChange = (id: string, newStatus: 'investigating' | 'resolved') => {
    setAnomalies(prev => prev.map(anomaly =>
      anomaly.id === id ? { ...anomaly, status: newStatus } : anomaly
    ));
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-foreground flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
            AI Anomaly Detection System
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="destructive">
              {criticalAnomalies} Critical
            </Badge>
            <Badge variant="default">
              {activeAnomalies} Active
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Detection Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Detection Rate</span>
                <Eye className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">97.3%</div>
              <div className="text-xs text-muted-foreground">Last 24h accuracy</div>
            </div>

            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Response Time</span>
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">1.2s</div>
              <div className="text-xs text-muted-foreground">Avg detection time</div>
            </div>

            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">False Positives</span>
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">2.1%</div>
              <div className="text-xs text-muted-foreground">This week</div>
            </div>

            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Patterns Found</span>
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">{patterns.length}</div>
              <div className="text-xs text-muted-foreground">Active patterns</div>
            </div>
          </div>

          {/* Filter Controls */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Filter by Type</h3>
            <div className="flex flex-wrap gap-2">
              {['all', 'composition', 'process', 'model', 'equipment'].map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className="hover-scale"
                >
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Active Anomalies */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Current Anomalies</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredAnomalies.map((anomaly) => (
                <div key={anomaly.id} className={`p-4 rounded-lg border-l-4 ${getStatusTone(anomaly.status)} animate-fade-in`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(anomaly.type)}
                      <div>
                        <h4 className="font-medium text-foreground">{anomaly.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={getSeverityVariant(anomaly.severity)}>
                            {anomaly.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {anomaly.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {anomaly.confidence.toFixed(1)}% confidence
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {anomaly.status === 'active' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStatusChange(anomaly.id, 'investigating')}
                          >
                            Investigate
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleStatusChange(anomaly.id, 'resolved')}
                          >
                            Resolve
                          </Button>
                        </>
                      )}
                      {anomaly.status === 'investigating' && (
                        <Button 
                          size="sm"
                          onClick={() => handleStatusChange(anomaly.id, 'resolved')}
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">{anomaly.description}</p>

                  <div className="bg-muted rounded p-3 mb-2">
                    <div className="text-sm font-medium text-foreground mb-1">Suggested Action:</div>
                    <div className="text-sm text-muted-foreground">{anomaly.suggestedAction}</div>
                  </div>

                  {anomaly.affectedElements && (
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs text-muted-foreground">Affected Elements:</span>
                      {anomaly.affectedElements.map(element => (
                        <Badge key={element} variant="outline" className="text-xs">
                          {element}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>{anomaly.timestamp.toLocaleString()}</span>
                    <span className="capitalize">Status: {anomaly.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pattern Analysis */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-primary" />
              Recurring Anomaly Patterns
            </h3>
            <div className="space-y-3">
              {patterns.map((pattern, index) => (
                <div key={index} className="bg-background rounded p-3 border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-foreground font-medium">{pattern.pattern}</span>
                    <Badge variant={getSeverityVariant(pattern.severity)}>
                      {pattern.severity}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Frequency:</span>
                      <span className="ml-2 text-foreground">{pattern.frequency} times</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last seen:</span>
                      <span className="ml-2 text-foreground">{pattern.lastOccurrence.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
