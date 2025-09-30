
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ComprehensiveDashboard } from '@/components/ComprehensiveDashboard';
import { SpectrometerPanel } from '@/components/SpectrometerPanel';
import { AlloyRecommendationPanel } from '@/components/AlloyRecommendationPanel';
import { ProcessAnalytics } from '@/components/ProcessAnalytics';
import { AlertPanel } from '@/components/AlertPanel';
import { PredictiveAnalytics } from '@/components/PredictiveAnalytics';
import { FurnaceMonitoring } from '@/components/FurnaceMonitoring';
import { QualityControl } from '@/components/QualityControl';
import { ProcessOptimization } from '@/components/ProcessOptimization';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      
      <DashboardHeader />
      
      <div className="relative z-10">
        {/* Clean Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-12">
            <Link to="/">
              <Button className="bg-background hover:bg-muted text-foreground hover:text-foreground border border-border shadow-sm transition-all duration-200 hover:shadow-md">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <div className="bg-background border border-green-200 px-4 py-2 rounded-full flex items-center space-x-2 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground">System Active</span>
              <Activity className="h-3 w-3 text-green-600" />
            </div>
          </div>

          {/* Elegant Hero Content */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              AI-Powered Alloy Intelligence
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Advanced process monitoring and intelligent recommendations for optimal alloy composition
            </p>
          </div>

          {/* Comprehensive Dashboard Overview */}
          <div className="mb-12 animate-fade-in-up">
            <ComprehensiveDashboard />
          </div>

          {/* Main Content Grid - Clean & Spacious */}
          <div className="space-y-12">
            {/* All Features Vertically Aligned */}
            <div className="space-y-8">
              <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <SpectrometerPanel />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <PredictiveAnalytics />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <AlloyRecommendationPanel />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <ProcessAnalytics />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <FurnaceMonitoring />
              </div>
            </div>

            {/* Control Systems - Vertical Stack for Better Flow */}
            <div className="space-y-8">
              <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <QualityControl />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '700ms' }}>
                <ProcessOptimization />
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                <AlertPanel />
              </div>
            </div>
          </div>
        </div>

        {/* Clean Footer */}
        <div className="bg-background/80 backdrop-blur-sm border-t border-border mt-20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Sparkles className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  Intelligent Process Control
                </h3>
              </div>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Leveraging advanced AI algorithms to optimize alloy composition, 
                reduce costs, and ensure consistent quality in industrial processes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
