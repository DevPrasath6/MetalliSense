
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/DashboardHeader';
import { InventoryManagement } from '@/components/InventoryManagement';

const Inventory = () => {
  useEffect(() => {
    document.title = 'Inventory Management - Alloy Alchemy Advisor';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Track stock levels, thresholds, and suppliers with clear, consistent UI.');
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
        <header className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="hover:bg-muted">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </header>

        <section aria-labelledby="inventory-title" className="max-w-7xl mx-auto animate-fade-in">
          <h1 id="inventory-title" className="sr-only">Inventory Management System</h1>
          <InventoryManagement />
        </section>
      </main>
    </div>
  );
};

export default Inventory;
