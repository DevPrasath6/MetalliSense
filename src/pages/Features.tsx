
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/DashboardHeader';
import FeatureLauncher from '@/components/FeatureLauncher';

const FeaturesPage: React.FC = () => {
  useEffect(() => {
    document.title = 'All Features - Alloy Alchemy Advisor';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">All Features</h1>
          <Link to="/">
            <Button variant="outline" className="border-border hover:bg-muted">
              Home
            </Button>
          </Link>
        </header>

        <section aria-labelledby="features-grid">
          <h2 id="features-grid" className="sr-only">Navigate to a feature</h2>
          <FeatureLauncher />
        </section>
      </main>
    </div>
  );
};

export default FeaturesPage;
