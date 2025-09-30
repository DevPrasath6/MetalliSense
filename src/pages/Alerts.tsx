
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/DashboardHeader';
import { AlertPanel } from '@/components/AlertPanel';

const Alerts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <DashboardHeader />
      
      <div className="relative container mx-auto px-6 py-6">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700 transition-all duration-300 hover:shadow-sm backdrop-blur-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <AlertPanel />
        </div>
      </div>
    </div>
  );
};

export default Alerts;
