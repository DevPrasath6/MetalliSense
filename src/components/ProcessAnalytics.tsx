
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Database, Settings, Zap, RefreshCw, CheckCircle, Download } from 'lucide-react';
import jsPDF from 'jspdf';

export const ProcessAnalytics = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [lastOptimized, setLastOptimized] = useState<Date | null>(null);
  const [lastConfigured, setLastConfigured] = useState<Date | null>(null);
  
  const analytics = {
    modelAccuracy: 94.2,
    recommendationsToday: 23,
    successfulAdditions: 21,
    costSavings: 1250.30,
    avgResponseTime: 2.3,
    systemUptime: 99.8
  };

  const optimizeHeat = () => {
    console.log('Starting heat optimization...');
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setLastOptimized(new Date());
      console.log('Heat optimization completed successfully!');
      alert('Heat optimization completed! Furnace temperature adjusted to 1547°C for optimal efficiency.');
    }, 2000);
  };

  const adjustSettings = () => {
    console.log('Adjusting system settings...');
    setIsConfiguring(true);
    setTimeout(() => {
      setIsConfiguring(false);
      setLastConfigured(new Date());
      console.log('Settings configuration completed successfully!');
      alert('System configuration updated! Process parameters optimized for current conditions.');
    }, 1500);
  };

  const generateAnalyticsReport = async () => {
    setIsGeneratingReport(true);
    
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      let yPosition = 30;

      // Header
      pdf.setFontSize(20);
      pdf.setTextColor(51, 65, 85);
      pdf.text('Process Analytics Report', margin, yPosition);
      
      // Date
      yPosition += 15;
      pdf.setFontSize(12);
      pdf.setTextColor(100, 116, 139);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, yPosition);
      
      // Analytics Data
      yPosition += 25;
      pdf.setFontSize(16);
      pdf.setTextColor(51, 65, 85);
      pdf.text('Performance Metrics', margin, yPosition);
      
      yPosition += 15;
      pdf.setFontSize(12);
      pdf.setTextColor(71, 85, 105);
      
      const metrics = [
        `Model Accuracy: ${analytics.modelAccuracy}%`,
        `Recommendations Today: ${analytics.recommendationsToday}`,
        `Successful Additions: ${analytics.successfulAdditions}`,
        `Success Rate: ${((analytics.successfulAdditions / analytics.recommendationsToday) * 100).toFixed(1)}%`,
        `Cost Savings Today: $${analytics.costSavings.toFixed(2)}`,
        `Average Response Time: ${analytics.avgResponseTime}s`,
        `System Uptime: ${analytics.systemUptime}%`
      ];
      
      metrics.forEach(metric => {
        pdf.text(metric, margin, yPosition);
        yPosition += 10;
      });
      
      // Recent Actions
      if (lastOptimized || lastConfigured) {
        yPosition += 15;
        pdf.setFontSize(16);
        pdf.setTextColor(51, 65, 85);
        pdf.text('Recent Actions', margin, yPosition);
        
        yPosition += 15;
        pdf.setFontSize(12);
        pdf.setTextColor(71, 85, 105);
        
        if (lastOptimized) {
          pdf.text(`Heat Optimization: ${lastOptimized.toLocaleString()}`, margin, yPosition);
          yPosition += 10;
        }
        if (lastConfigured) {
          pdf.text(`System Configuration: ${lastConfigured.toLocaleString()}`, margin, yPosition);
          yPosition += 10;
        }
      }
      
      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(156, 163, 175);
      pdf.text('Alloy Alchemy Advisor - Process Analytics', margin, pdf.internal.pageSize.getHeight() - 10);
      
      const fileName = `process_analytics_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      console.log('Analytics PDF report generated successfully!');
      alert('Process analytics PDF report has been generated and downloaded successfully!');
      
    } catch (error) {
      console.error('Error generating analytics PDF:', error);
      alert('Error generating analytics PDF report. Please try again.');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="bg-white">
        <CardTitle className="text-xl text-slate-900 font-semibold flex items-center">
          <Database className="h-5 w-5 mr-2 text-slate-700" />
          Analytics Suite
        </CardTitle>
        <p className="text-sm text-slate-600 mt-2">
          Real-time process monitoring and intelligent control systems
        </p>
      </CardHeader>
      <CardContent className="bg-white">
        <div className="space-y-4">
          {/* Model Performance */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-3">AI Model Performance</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-slate-700 font-medium">Accuracy</span>
                  <span className="text-sm text-slate-900 font-semibold">
                    {analytics.modelAccuracy}%
                  </span>
                </div>
                <Progress value={analytics.modelAccuracy} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-700 font-medium">Recommendations Today:</span>
                  <div className="text-slate-900 font-mono text-lg font-bold">
                    {analytics.recommendationsToday}
                  </div>
                </div>
                <div>
                  <span className="text-slate-700 font-medium">Success Rate:</span>
                  <div className="text-slate-900 font-mono text-lg font-bold">
                    {((analytics.successfulAdditions / analytics.recommendationsToday) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Savings */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-3">Cost Impact Analysis</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-700 font-medium">Today's Savings:</span>
                <span className="text-slate-900 font-mono text-lg font-bold">
                  ${analytics.costSavings.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700 font-medium">Avg Response Time:</span>
                <span className="text-slate-900 font-mono font-semibold">
                  {analytics.avgResponseTime}s
                </span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-3">System Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-medium">Uptime:</span>
                <Badge className="bg-green-600 text-white font-medium">
                  {analytics.systemUptime}%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-medium">Data Quality:</span>
                <Badge className="bg-blue-600 text-white font-medium">
                  Excellent
                </Badge>
              </div>
            </div>
          </div>

          {/* Control Actions */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-3">Process Controls</h3>
            <div className="space-y-3">
              <Button 
                onClick={optimizeHeat}
                disabled={isOptimizing}
                className="w-full justify-start bg-orange-600 hover:bg-orange-700 text-white font-medium"
              >
                <Zap className="h-4 w-4 mr-2" />
                {isOptimizing ? 'Optimizing Heat...' : 'Optimize Heat'}
              </Button>
              
              <Button 
                onClick={adjustSettings}
                disabled={isConfiguring}
                className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                <Settings className="h-4 w-4 mr-2" />
                {isConfiguring ? 'Configuring System...' : 'Configure System'}
              </Button>

              <Button 
                onClick={generateAnalyticsReport}
                disabled={isGeneratingReport}
                className="w-full justify-start bg-slate-700 hover:bg-slate-800 text-white font-medium"
              >
                <Download className="h-4 w-4 mr-2" />
                {isGeneratingReport ? 'Generating PDF...' : 'Generate Analytics Report'}
              </Button>

              {(lastOptimized || lastConfigured) && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">Recent Actions:</span>
                  </div>
                  <div className="mt-2 text-xs text-green-700 space-y-1">
                    {lastOptimized && (
                      <div>Heat optimized: {lastOptimized.toLocaleTimeString()}</div>
                    )}
                    {lastConfigured && (
                      <div>System configured: {lastConfigured.toLocaleTimeString()}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
