
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Bell, 
  User, 
  Activity, 
  Zap, 
  Shield,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { SettingsDialog } from './SettingsDialog';
import { dataService } from '@/services/dataService';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger } from '@/components/ui/navigation-menu';

export const DashboardHeader = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState(0);
  const [systemStatus, setSystemStatus] = useState({
    isOnline: true,
    uptime: '47.2h',
    efficiency: 87.5
  });

  useEffect(() => {
    const fetchAlerts = async () => {
      const alerts = await dataService.getActiveAlerts();
      setActiveAlerts(alerts.length);
    };
    
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo, Title and Navigation */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Alloy Alchemy Advisor
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    AI-Powered Metallurgical Intelligence
                  </p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:block">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-2 p-4 md:w-[600px] lg:w-[800px] grid-cols-2">
                          <Link to="/dashboard" className="story-link text-sm text-foreground px-2 py-1 rounded hover:bg-accent">Dashboard</Link>
                          <Link to="/recommendations" className="story-link text-sm text-foreground px-2 py-1 rounded hover:bg-accent">Recommendations</Link>
                          <Link to="/analytics" className="story-link text-sm text-foreground px-2 py-1 rounded hover:bg-accent">Analytics</Link>
                          <Link to="/alerts" className="story-link text-sm text-foreground px-2 py-1 rounded hover:bg-accent">Alerts</Link>
                          <Link to="/inventory" className="story-link text-sm text-foreground px-2 py-1 rounded hover:bg-accent">Inventory</Link>
                          <Link to="/predictive" className="story-link text-sm text-foreground px-2 py-1 rounded hover:bg-accent">Predictive</Link>
                          <Link to="/furnace" className="story-link text-sm text-foreground px-2 py-1 rounded hover:bg-accent">Furnace Monitoring</Link>
                          <Link to="/anomaly" className="story-link text-sm text-foreground px-2 py-1 rounded hover:bg-accent">Anomaly Detection</Link>
                          <Link to="/quality" className="story-link text-sm text-foreground px-2 py-1 rounded hover:bg-accent">Quality Control</Link>
                          <Link to="/history" className="story-link text-sm text-foreground px-2 py-1 rounded hover:bg-accent">History</Link>
                          <Link to="/documentation" className="story-link text-sm text-foreground px-2 py-1 rounded hover:bg-accent">Documentation</Link>
                          <Link to="/features" className="story-link text-sm text-foreground px-2 py-1 rounded hover:bg-accent">All Features</Link>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </nav>
            </div>

            {/* System Status */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${systemStatus.isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-sm font-medium text-foreground">
                  {systemStatus.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Activity className="h-4 w-4" />
                <span>Uptime: {systemStatus.uptime}</span>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>Efficiency: {systemStatus.efficiency}%</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Alerts */}
              <Button
                variant="outline"
                size="sm"
                className="relative border-border hover:bg-muted"
              >
                <Bell className="h-4 w-4" />
                {activeAlerts > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    {activeAlerts}
                  </Badge>
                )}
              </Button>

              {/* Settings */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSettingsOpen(true)}
                className="border-border hover:bg-muted"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>

              {/* Admin (opens Django Admin) */}
              <a
                href="http://localhost:8000/admin/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border hover:bg-muted"
                >
                  <User className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </a>

              {/* Security Status */}
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 border border-green-200 rounded-md">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Secure</span>
              </div>
            </div>
          </div>

          {/* Mobile System Status */}
          <div className="md:hidden mt-3 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${systemStatus.isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-foreground">{systemStatus.isOnline ? 'Online' : 'Offline'}</span>
              </div>
              <span className="text-muted-foreground">↗ {systemStatus.uptime}</span>
              <span className="text-muted-foreground">⚡ {systemStatus.efficiency}%</span>
            </div>
            
            {activeAlerts > 0 && (
              <div className="flex items-center space-x-1 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>{activeAlerts} Alert{activeAlerts !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
};
