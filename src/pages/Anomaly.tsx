
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/DashboardHeader';
import { AnomalyDetection } from '@/components/AnomalyDetection';

const Anomaly = () => {
  useEffect(() => {
    document.title = 'AI Anomaly Detection - Alloy Alchemy Advisor';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Monitor and resolve process, composition, and equipment anomalies with AI-powered insights.');
    }
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', window.location.href);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-6 py-6">
        <header className="mb-6 flex items-center justify-between">
          <Link to="/">
            <Button variant="outline" size="sm" className="hover:bg-muted">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </header>

        <section aria-labelledby="anomaly-title" className="max-w-6xl mx-auto animate-fade-in">
          <h1 id="anomaly-title" className="sr-only">AI Anomaly Detection System</h1>
          <AnomalyDetection />
        </section>
      </main>
    </div>
  );
};

export default Anomaly;
