
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/DashboardHeader';
import { PredictiveAnalytics } from '@/components/PredictiveAnalytics';

const Predictive = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100">
      <DashboardHeader />
      
      <div className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <PredictiveAnalytics />
        </div>
      </div>
    </div>
  );
};

export default Predictive;
