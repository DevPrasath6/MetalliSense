
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wifi, 
  WifiOff, 
  Server, 
  Radio,
  Settings,
  AlertCircle,
  CheckCircle,
  Activity,
  Zap
} from 'lucide-react';

interface DeviceConnection {
  id: string;
  name: string;
  type: 'OPC-UA' | 'Modbus TCP' | 'Ethernet/IP';
  address: string;
  status: 'connected' | 'disconnected' | 'error';
  dataPoints: number;
  lastUpdate: Date;
  latency: number;
}

interface DataPoint {
  tag: string;
  value: number | string;
  quality: 'good' | 'uncertain' | 'bad';
  timestamp: Date;
  unit?: string;
}

export const IndustrialCommunication = () => {
  const [connections, setConnections] = useState<DeviceConnection[]>([
    {
      id: '1',
      name: 'Spectrometer Unit A',
      type: 'OPC-UA',
      address: '192.168.1.100:4840',
      status: 'connected',
      dataPoints: 24,
      lastUpdate: new Date(),
      latency: 45
    },
    {
      id: '2',
      name: 'Alloy Feeder System',
      type: 'Modbus TCP',
      address: '192.168.1.101:502',
      status: 'connected',
      dataPoints: 18,
      lastUpdate: new Date(),
      latency: 32
    },
    {
      id: '3',
      name: 'Furnace Controller',
      type: 'Ethernet/IP',
      address: '192.168.1.102:44818',
      status: 'connected',
      dataPoints: 36,
      lastUpdate: new Date(),
      latency: 28
    },
    {
      id: '4',
      name: 'Temperature Sensors',
      type: 'Modbus TCP',
      address: '192.168.1.103:502',
      status: 'error',
      dataPoints: 12,
      lastUpdate: new Date(Date.now() - 300000),
      latency: 0
    }
  ]);

  const [liveData, setLiveData] = useState<DataPoint[]>([
    { tag: 'SPEC_C_CONTENT', value: 3.45, quality: 'good', timestamp: new Date(), unit: '%' },
    { tag: 'SPEC_SI_CONTENT', value: 2.12, quality: 'good', timestamp: new Date(), unit: '%' },
    { tag: 'FURNACE_TEMP', value: 1547, quality: 'good', timestamp: new Date(), unit: '°C' },
    { tag: 'FEEDER_FLOW_RATE', value: 8.5, quality: 'good', timestamp: new Date(), unit: 'kg/min' },
    { tag: 'OXYGEN_LEVEL', value: 21.2, quality: 'uncertain', timestamp: new Date(), unit: '%' },
    { tag: 'PRESSURE_VESSEL', value: 2.8, quality: 'good', timestamp: new Date(), unit: 'bar' }
  ]);

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => prev.map(point => ({
        ...point,
        value: typeof point.value === 'number' 
          ? Math.max(0, point.value + (Math.random() - 0.5) * 0.1)
          : point.value,
        timestamp: new Date(),
        quality: Math.random() > 0.1 ? 'good' : 'uncertain'
      })));

      setConnections(prev => prev.map(conn => ({
        ...conn,
        lastUpdate: conn.status === 'connected' ? new Date() : conn.lastUpdate,
        latency: conn.status === 'connected' ? Math.floor(20 + Math.random() * 30) : 0
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const startNetworkScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 300);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-50';
      case 'disconnected': return 'text-slate-600 bg-slate-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'disconnected': return <WifiOff className="h-4 w-4 text-slate-600" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Radio className="h-4 w-4 text-slate-600" />;
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'good': return 'text-green-600';
      case 'uncertain': return 'text-orange-600';
      case 'bad': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  const connectedDevices = connections.filter(conn => conn.status === 'connected').length;
  const totalDataPoints = connections.reduce((sum, conn) => sum + conn.dataPoints, 0);
  const avgLatency = Math.round(connections.filter(conn => conn.status === 'connected')
    .reduce((sum, conn) => sum + conn.latency, 0) / connectedDevices);

  return (
    <Card className="bg-white border-slate-200 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800 flex items-center">
          <Server className="h-5 w-5 mr-2 text-slate-600" />
          Industrial Communication Hub
        </CardTitle>
        <p className="text-sm text-slate-700 mt-2">
          Real-time data integration via OPC-UA, Modbus TCP, and Ethernet/IP protocols
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* System Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-slate-800">{connectedDevices}/4</div>
            <div className="text-sm text-slate-600">Connected Devices</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-slate-800">{totalDataPoints}</div>
            <div className="text-sm text-slate-600">Data Points</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-slate-800">{avgLatency}ms</div>
            <div className="text-sm text-slate-600">Avg Latency</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Activity className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
          </div>
        </div>

        {/* Network Scan */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-slate-800">Network Discovery</h3>
            <Button
              onClick={startNetworkScan}
              disabled={isScanning}
              size="sm"
              className="bg-slate-600 hover:bg-slate-700 text-white"
            >
              {isScanning ? (
                <>
                  <Wifi className="h-4 w-4 mr-2 animate-pulse" />
                  Scanning...
                </>
              ) : (
                <>
                  <Radio className="h-4 w-4 mr-2" />
                  Scan Network
                </>
              )}
            </Button>
          </div>
          
          {isScanning && (
            <div className="space-y-2">
              <Progress value={scanProgress} className="h-2" />
              <div className="text-xs text-slate-600 text-center">
                Discovering industrial devices... {Math.round(scanProgress)}%
              </div>
            </div>
          )}
        </div>

        {/* Device Connections */}
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4">Device Connections</h3>
          <div className="space-y-3">
            {connections.map((conn) => (
              <div key={conn.id} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(conn.status)}
                    <div>
                      <h4 className="text-sm font-medium text-slate-800">{conn.name}</h4>
                      <p className="text-xs text-slate-600">{conn.address}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className={getStatusColor(conn.status)}>
                      {conn.status.toUpperCase()}
                    </Badge>
                    <div className="text-xs text-slate-600">{conn.type}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-600">Data Points:</span>
                    <div className="font-mono text-slate-800">{conn.dataPoints}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Latency:</span>
                    <div className="font-mono text-slate-800">{conn.latency}ms</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Last Update:</span>
                    <div className="font-mono text-slate-800">
                      {conn.lastUpdate.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Data Stream */}
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center">
            <Zap className="h-4 w-4 mr-2" />
            Live Data Stream
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
            <div className="text-green-400 mb-2">Real-time Industrial Data Feed:</div>
            {liveData.map((point, index) => (
              <div key={index} className="flex justify-between items-center py-1 border-b border-slate-700 last:border-b-0">
                <span className="text-slate-300">{point.tag}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white">
                    {typeof point.value === 'number' ? point.value.toFixed(2) : point.value}
                    {point.unit && ` ${point.unit}`}
                  </span>
                  <span className={`text-xs ${getQualityColor(point.quality)}`}>
                    {point.quality.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protocol Configuration */}
        <div className="bg-gradient-subtle border border-slate-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-slate-800 mb-3 flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Protocol Configuration
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">OPC-UA Security:</span>
              <div className="text-slate-800 font-mono">Sign & Encrypt</div>
            </div>
            <div>
              <span className="text-slate-600">Modbus Timeout:</span>
              <div className="text-slate-800 font-mono">5000ms</div>
            </div>
            <div>
              <span className="text-slate-600">Update Rate:</span>
              <div className="text-slate-800 font-mono">500ms</div>
            </div>
            <div>
              <span className="text-slate-600">Buffer Size:</span>
              <div className="text-slate-800 font-mono">1024 bytes</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
