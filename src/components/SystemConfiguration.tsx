import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  Shield, 
  Zap, 
  Thermometer, 
  Gauge, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface SystemSettings {
  targetTemperature: number;
  powerLimit: number;
  autoOptimization: boolean;
  alertThreshold: number;
  safetyMode: boolean;
  samplingRate: number;
}

export const SystemConfiguration = () => {
  const [settings, setSettings] = useState<SystemSettings>({
    targetTemperature: 1650,
    powerLimit: 85,
    autoOptimization: true,
    alertThreshold: 15,
    safetyMode: true,
    samplingRate: 30
  });

  const [isConfiguring, setIsConfiguring] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const saveConfiguration = () => {
    setIsConfiguring(true);
    setTimeout(() => {
      setIsConfiguring(false);
      setLastSaved(new Date());
      console.log('System configuration saved successfully!');
    }, 1500);
  };

  const resetToDefaults = () => {
    setSettings({
      targetTemperature: 1650,
      powerLimit: 85,
      autoOptimization: true,
      alertThreshold: 15,
      safetyMode: true,
      samplingRate: 30
    });
  };

  const updateSetting = <K extends keyof SystemSettings>(
    key: K,
    value: SystemSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="bg-card border-border shadow-elegant">
      <CardHeader className="pb-4 bg-gradient-to-r from-muted/50 to-background border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-foreground flex items-center font-semibold">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white mr-3 shadow-elegant">
              <Settings className="h-6 w-6" />
            </div>
            <div>
              <span className="text-gradient">System Configuration</span>
              <div className="text-sm text-muted-foreground font-normal">Process Control Settings</div>
            </div>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {settings.safetyMode && (
              <Badge className="bg-green-600 text-white">
                <Shield className="h-3 w-3 mr-1" />
                Safe Mode
              </Badge>
            )}
            {lastSaved && (
              <Badge variant="outline" className="text-xs text-muted-foreground border-border">
                Saved: {lastSaved.toLocaleTimeString()}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Temperature Settings */}
          <div className="bg-muted/50 border border-border rounded-2xl p-6 shadow-elegant">
            <h3 className="font-semibold text-foreground mb-6 flex items-center">
              <Thermometer className="h-5 w-5 mr-2 text-primary" />
              Temperature Control
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="targetTemp" className="text-sm font-medium text-foreground">
                  Target Temperature (°C)
                </Label>
                <Input
                  id="targetTemp"
                  type="number"
                  value={settings.targetTemperature}
                  onChange={(e) => updateSetting('targetTemperature', Number(e.target.value))}
                  className="bg-background border-border text-foreground"
                />
                <div className="text-xs text-muted-foreground">
                  Optimal range: 1600-1700°C
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alertThreshold" className="text-sm font-medium text-foreground">
                  Alert Threshold (°C)
                </Label>
                <Input
                  id="alertThreshold"
                  type="number"
                  value={settings.alertThreshold}
                  onChange={(e) => updateSetting('alertThreshold', Number(e.target.value))}
                  className="bg-background border-border text-foreground"
                />
                <div className="text-xs text-muted-foreground">
                  Temperature deviation alert
                </div>
              </div>
            </div>
          </div>

          {/* Power Management */}
          <div className="bg-muted/50 border border-border rounded-2xl p-6 shadow-elegant">
            <h3 className="font-semibold text-foreground mb-6 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-primary" />
              Power Management
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium text-foreground">
                    Power Limit ({settings.powerLimit}%)
                  </Label>
                  <Badge variant="outline" className="text-xs border-border">
                    {settings.powerLimit > 90 ? 'High' : settings.powerLimit > 75 ? 'Medium' : 'Conservative'}
                  </Badge>
                </div>
                <Progress 
                  value={settings.powerLimit} 
                  className="h-3"
                />
                <Input
                  type="range"
                  min="50"
                  max="100"
                  value={settings.powerLimit}
                  onChange={(e) => updateSetting('powerLimit', Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Monitoring Settings */}
          <div className="bg-muted/50 border border-border rounded-2xl p-6 shadow-elegant">
            <h3 className="font-semibold text-foreground mb-6 flex items-center">
              <Gauge className="h-5 w-5 mr-2 text-primary" />
              Monitoring & Automation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Auto Optimization</Label>
                    <div className="text-xs text-muted-foreground">AI-powered process optimization</div>
                  </div>
                  <Switch
                    checked={settings.autoOptimization}
                    onCheckedChange={(checked) => updateSetting('autoOptimization', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Safety Mode</Label>
                    <div className="text-xs text-muted-foreground">Enhanced safety protocols</div>
                  </div>
                  <Switch
                    checked={settings.safetyMode}
                    onCheckedChange={(checked) => updateSetting('safetyMode', checked)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="samplingRate" className="text-sm font-medium text-foreground">
                  Sampling Rate (seconds)
                </Label>
                <Input
                  id="samplingRate"
                  type="number"
                  value={settings.samplingRate}
                  onChange={(e) => updateSetting('samplingRate', Number(e.target.value))}
                  className="bg-background border-border text-foreground"
                />
                <div className="text-xs text-muted-foreground">
                  Data collection frequency
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-muted/50 border border-border rounded-2xl p-6 shadow-elegant">
            <h3 className="font-semibold text-foreground mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              System Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Connection</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-lg font-bold text-foreground">Online</div>
              </div>
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Performance</span>
                  <Badge className="bg-primary text-white text-xs">Optimal</Badge>
                </div>
                <div className="text-lg font-bold text-foreground">94.2%</div>
              </div>
              <div className="bg-background border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <AlertTriangle className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-lg font-bold text-foreground">47.2h</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center bg-muted/50 border border-border rounded-2xl p-6 shadow-elegant">
            <div>
              <h3 className="font-semibold text-foreground">Configuration Actions</h3>
              <p className="text-sm text-muted-foreground">Save or reset system settings</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={resetToDefaults}
                className="border-border hover:bg-muted text-foreground"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Defaults
              </Button>
              <Button 
                onClick={saveConfiguration}
                disabled={isConfiguring}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant"
              >
                {isConfiguring ? (
                  <>
                    <Settings className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Configuration
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};