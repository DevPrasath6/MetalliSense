import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, AlertTriangle, XCircle, Award, FileCheck, TrendingUp, Settings, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface QualityMetric {
  id: string;
  name: string;
  current: number;
  target: number;
  tolerance: number;
  unit: string;
  status: 'pass' | 'warning' | 'fail';
  trend: 'up' | 'down' | 'stable';
}

interface ComplianceStandard {
  id: string;
  name: string;
  standard: string;
  compliance: number;
  lastAudit: Date;
  nextAudit: Date;
  status: 'compliant' | 'warning' | 'non-compliant';
}

interface QualityTest {
  id: string;
  testType: string;
  batchId: string;
  timestamp: Date;
  result: 'pass' | 'fail';
  score: number;
  inspector: string;
}

export const QualityControl = () => {
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetric[]>([
    { id: '1', name: 'Carbon Content', current: 0.42, target: 0.40, tolerance: 0.05, unit: '%', status: 'pass', trend: 'stable' },
    { id: '2', name: 'Tensile Strength', current: 485, target: 500, tolerance: 25, unit: 'MPa', status: 'warning', trend: 'down' },
    { id: '3', name: 'Hardness (HRC)', current: 22, target: 20, tolerance: 3, unit: 'HRC', status: 'pass', trend: 'up' },
    { id: '4', name: 'Surface Finish', current: 1.2, target: 1.0, tolerance: 0.3, unit: 'μm', status: 'warning', trend: 'stable' },
    { id: '5', name: 'Dimensional Accuracy', current: 0.02, target: 0.01, tolerance: 0.02, unit: 'mm', status: 'pass', trend: 'stable' }
  ]);

  const [complianceStandards, setComplianceStandards] = useState<ComplianceStandard[]>([
    { id: '1', name: 'ISO 9001:2015', standard: 'Quality Management', compliance: 98, lastAudit: new Date('2024-01-15'), nextAudit: new Date('2024-07-15'), status: 'compliant' },
    { id: '2', name: 'ASTM A36', standard: 'Structural Steel', compliance: 95, lastAudit: new Date('2024-02-10'), nextAudit: new Date('2024-08-10'), status: 'compliant' },
    { id: '3', name: 'EN 10025', standard: 'Hot Rolled Products', compliance: 89, lastAudit: new Date('2024-01-20'), nextAudit: new Date('2024-07-20'), status: 'warning' },
    { id: '4', name: 'JIS G3101', standard: 'General Structure', compliance: 92, lastAudit: new Date('2024-02-05'), nextAudit: new Date('2024-08-05'), status: 'compliant' }
  ]);

  const [recentTests, setRecentTests] = useState<QualityTest[]>([
    { id: '1', testType: 'Tensile Test', batchId: 'B2024-001', timestamp: new Date(), result: 'pass', score: 94, inspector: 'J. Smith' },
    { id: '2', testType: 'Hardness Test', batchId: 'B2024-001', timestamp: new Date(Date.now() - 300000), result: 'pass', score: 96, inspector: 'M. Johnson' },
    { id: '3', testType: 'Chemical Analysis', batchId: 'B2024-002', timestamp: new Date(Date.now() - 600000), result: 'fail', score: 78, inspector: 'A. Davis' },
    { id: '4', testType: 'Surface Inspection', batchId: 'B2024-002', timestamp: new Date(Date.now() - 900000), result: 'pass', score: 88, inspector: 'R. Wilson' }
  ]);

  const [qualityTrend, setQualityTrend] = useState([
    { time: '08:00', overall: 94, tensile: 92, hardness: 95, surface: 93 },
    { time: '10:00', overall: 95, tensile: 94, hardness: 96, surface: 94 },
    { time: '12:00', overall: 93, tensile: 90, hardness: 94, surface: 95 },
    { time: '14:00', overall: 96, tensile: 95, hardness: 97, surface: 96 },
    { time: '16:00', overall: 94, tensile: 93, hardness: 95, surface: 94 }
  ]);

  const [lastUpdated, setLastUpdated] = useState(new Date());

  const [isConfiguringTests, setIsConfiguringTests] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const configureTests = () => {
    setIsConfiguringTests(true);
    setTimeout(() => {
      setIsConfiguringTests(false);
      alert('Test configuration updated successfully! New quality parameters applied.');
    }, 2000);
  };

  const generateQualityReport = () => {
    setIsGeneratingReport(true);
    
    const reportData = {
      timestamp: new Date().toISOString(),
      overallQuality: overallQuality,
      passRate: passRate,
      qualityMetrics: qualityMetrics,
      complianceStandards: complianceStandards,
      recentTests: recentTests,
      qualityTrend: qualityTrend
    };
    
    setTimeout(() => {
      const jsonString = JSON.stringify(reportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quality_control_report_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setIsGeneratingReport(false);
      alert('Quality control report generated and downloaded successfully!');
    }, 1500);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update quality metrics
      setQualityMetrics(prev => prev.map(metric => {
        const variation = (Math.random() - 0.5) * 0.1;
        const newCurrent = metric.current + variation;
        const deviation = Math.abs(newCurrent - metric.target);
        
        let status: 'pass' | 'warning' | 'fail' = 'pass';
        if (deviation > metric.tolerance) status = 'fail';
        else if (deviation > metric.tolerance * 0.7) status = 'warning';

        return { ...metric, current: newCurrent, status };
      }));

      setLastUpdated(new Date());
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'fail': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'non-compliant': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const overallQuality = qualityMetrics.reduce((sum, metric) => {
    const score = metric.status === 'pass' ? 100 : metric.status === 'warning' ? 85 : 60;
    return sum + score;
  }, 0) / qualityMetrics.length;

  const passRate = (recentTests.filter(test => test.result === 'pass').length / recentTests.length) * 100;

  const complianceData = complianceStandards.map(std => ({
    name: std.name.replace(/:\d+/, ''),
    compliance: std.compliance,
    fill: std.status === 'compliant' ? '#10b981' : std.status === 'warning' ? '#f59e0b' : '#ef4444'
  }));

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

  return (
    <Card className="bg-white border-subtle shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-foreground flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Quality Control Integration
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge className={overallQuality >= 95 ? "bg-primary" : overallQuality >= 85 ? "bg-secondary" : "bg-destructive"}>
              Quality: {overallQuality.toFixed(0)}%
            </Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground border-subtle">
              Updated: {lastUpdated.toLocaleTimeString()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Key Quality Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-subtle border border-subtle rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Overall Quality</span>
                <Award className="h-4 w-4 text-primary" />
              </div>
              <div className={`text-2xl font-bold ${getMetricStatusColor(overallQuality >= 95 ? 'pass' : overallQuality >= 85 ? 'warning' : 'fail')}`}>
                {overallQuality.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Quality score</div>
            </div>

            <div className="bg-subtle border border-subtle rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Test Pass Rate</span>
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {passRate.toFixed(0)}%
              </div>
              <div className="text-xs text-muted-foreground">Last 24 hours</div>
            </div>

            <div className="bg-subtle border border-subtle rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Active Standards</span>
                <FileCheck className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {complianceStandards.length}
              </div>
              <div className="text-xs text-muted-foreground">Compliance standards</div>
            </div>

            <div className="bg-subtle border border-subtle rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Avg Compliance</span>
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {(complianceStandards.reduce((sum, std) => sum + std.compliance, 0) / complianceStandards.length).toFixed(0)}%
              </div>
              <div className="text-xs text-muted-foreground">Across all standards</div>
            </div>
          </div>

          {/* Quality Metrics */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-primary" />
              Real-time Quality Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {qualityMetrics.map((metric) => (
                <div key={metric.id} className="bg-subtle border border-subtle rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground text-sm">{metric.name}</h4>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs">{getTrendIcon(metric.trend)}</span>
                      <div className={`w-2 h-2 rounded-full ${
                        metric.status === 'pass' ? 'bg-green-500' : 
                        metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Current:</span>
                      <span className={`font-mono text-sm ${getMetricStatusColor(metric.status)}`}>
                        {metric.current.toFixed(2)} {metric.unit}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Target:</span>
                      <span className="text-primary font-mono text-sm">
                        {metric.target} {metric.unit}
                      </span>
                    </div>
                    
                    <Progress 
                      value={Math.min(100, Math.max(0, 
                        100 - (Math.abs(metric.current - metric.target) / metric.tolerance * 50)
                      ))} 
                      className="h-2"
                    />
                    
                    <div className="text-xs text-muted-foreground capitalize">
                      Status: {metric.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Trends and Compliance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-subtle border border-subtle rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                Quality Trends
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={qualityTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[85, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Line type="monotone" dataKey="overall" stroke="#10b981" strokeWidth={2} name="Overall" />
                  <Line type="monotone" dataKey="tensile" stroke="#06b6d4" strokeWidth={2} name="Tensile" />
                  <Line type="monotone" dataKey="hardness" stroke="#8b5cf6" strokeWidth={2} name="Hardness" />
                  <Line type="monotone" dataKey="surface" stroke="#f59e0b" strokeWidth={2} name="Surface" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-subtle border border-subtle rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-primary" />
                Compliance Overview
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={complianceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="compliance"
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Compliance Standards */}
          <div className="bg-subtle border border-subtle rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <FileCheck className="h-4 w-4 mr-2 text-primary" />
              Compliance Standards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complianceStandards.map((standard) => (
                <div key={standard.id} className="bg-muted border border-subtle rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">{standard.name}</h4>
                    <Badge className={getComplianceStatusColor(standard.status)}>
                      {standard.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Standard:</span>
                      <span className="text-foreground text-xs">{standard.standard}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Compliance:</span>
                      <span className="text-foreground font-mono">{standard.compliance}%</span>
                    </div>
                    
                    <Progress value={standard.compliance} className="h-2" />
                    
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Last Audit: {standard.lastAudit.toLocaleDateString()}</span>
                      <span>Next: {standard.nextAudit.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Quality Tests */}
          <div className="bg-subtle border border-subtle rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-primary" />
              Recent Quality Tests
            </h3>
            <div className="space-y-2">
              {recentTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between bg-muted border border-subtle rounded p-3">
                  <div className="flex items-center space-x-3">
                    {test.result === 'pass' ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                    <div>
                      <div className="text-sm font-medium text-foreground">{test.testType}</div>
                      <div className="text-xs text-muted-foreground">Batch: {test.batchId} • {test.inspector}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-sm font-mono ${test.result === 'pass' ? 'text-green-400' : 'text-red-400'}`}>
                      {test.score}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {test.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Control Actions */}
          <div className="flex justify-between items-center bg-gradient-subtle border border-subtle rounded-lg p-4">
            <div>
              <h3 className="font-medium text-foreground">Quality Control Actions</h3>
              <p className="text-sm text-muted-foreground">Manage quality standards and initiate tests</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-subtle hover:bg-accent"
                onClick={configureTests}
                disabled={isConfiguringTests}
              >
                <Settings className="h-4 w-4 mr-1" />
                {isConfiguringTests ? 'Configuring...' : 'Configure Tests'}
              </Button>
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90"
                onClick={generateQualityReport}
                disabled={isGeneratingReport}
              >
                <Download className="h-4 w-4 mr-1" />
                {isGeneratingReport ? 'Generating...' : 'Generate Report'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
