
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Activity,
  BarChart3,
  Bell,
  Package,
  Lightbulb,
  TrendingUp,
  Thermometer,
  AlertTriangle,
  Shield,
  Clock,
  BookOpen
} from 'lucide-react';

export const FeatureLauncher: React.FC = () => {
  const items = [
    { title: 'Dashboard', to: '/dashboard', icon: Activity },
    { title: 'Recommendations', to: '/recommendations', icon: Lightbulb },
    { title: 'Analytics', to: '/analytics', icon: BarChart3 },
    { title: 'Alerts', to: '/alerts', icon: Bell },
    { title: 'Inventory', to: '/inventory', icon: Package },
    { title: 'Predictive', to: '/predictive', icon: TrendingUp },
    { title: 'Furnace Monitoring', to: '/furnace', icon: Thermometer },
    { title: 'Anomaly Detection', to: '/anomaly', icon: AlertTriangle },
    { title: 'Quality Control', to: '/quality', icon: Shield },
    { title: 'History', to: '/history', icon: Clock },
    { title: 'Documentation', to: '/documentation', icon: BookOpen },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(({ title, to, icon: Icon }) => (
        <Link key={to} to={to} aria-label={`Go to ${title}`}>
          <Button
            variant="outline"
            className="w-full justify-start border-border hover:bg-muted rounded-lg shadow-sm hover:shadow-md hover-lift transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring h-12"
          >
            <Icon className="h-4 w-4 mr-3 text-muted-foreground" />
            <span className="text-foreground">{title}</span>
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default FeatureLauncher;
