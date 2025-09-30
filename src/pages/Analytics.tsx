
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ProcessAnalytics } from '@/components/ProcessAnalytics';
import { HistoricalData } from '@/components/HistoricalData';
import { NeuralNetworkVisualizer } from '@/components/NeuralNetworkVisualizer';
import { LiveMetricsGlobe } from '@/components/LiveMetricsGlobe';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-slate-50 gradient-mesh">
      <DashboardHeader />
      
      <div className="relative container mx-auto px-6 py-6">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button className="glass-button border-0 hover:bg-white/90 text-slate-700 hover:text-slate-900 shadow-soft hover-lift">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="glass-card px-4 py-2 rounded-full flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">Analytics Suite</span>
            <Sparkles className="h-4 w-4 text-purple-600 animate-pulse-slow" />
          </div>
        </div>

        {/* All Analytics Features Vertically Aligned */}
        <div className="space-y-8">
          <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            <NeuralNetworkVisualizer />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <LiveMetricsGlobe />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <ProcessAnalytics />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <HistoricalData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
