
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/DashboardHeader';
import { AlloyRecommendationPanel } from '@/components/AlloyRecommendationPanel';
import { ConfidenceScoring } from '@/components/ConfidenceScoring';
import { MultiGradeLearning } from '@/components/MultiGradeLearning';

const Recommendations = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          <AlloyRecommendationPanel />
          <ConfidenceScoring />
          <MultiGradeLearning />
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
