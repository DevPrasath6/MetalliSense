
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Satellite, Zap, Activity, Signal, Wifi, Database } from 'lucide-react';

interface DataPoint {
  id: string;
  lat: number;
  lng: number;
  value: number;
  label: string;
  color: string;
  status: 'online' | 'warning' | 'offline';
}

export const LiveMetricsGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [dataPoints] = useState<DataPoint[]>([
    { id: '1', lat: 40.7128, lng: -74.0060, value: 94.2, label: 'New York Plant', color: '#10b981', status: 'online' },
    { id: '2', lat: 51.5074, lng: -0.1278, value: 87.5, label: 'London Facility', color: '#3b82f6', status: 'online' },
    { id: '3', lat: 35.6762, lng: 139.6503, value: 91.8, label: 'Tokyo Center', color: '#8b5cf6', status: 'online' },
    { id: '4', lat: -33.8688, lng: 151.2093, value: 89.3, label: 'Sydney Hub', color: '#f59e0b', status: 'warning' },
    { id: '5', lat: 52.5200, lng: 13.4050, value: 92.1, label: 'Berlin Unit', color: '#ef4444', status: 'warning' },
    { id: '6', lat: 37.7749, lng: -122.4194, value: 96.7, label: 'SF Research', color: '#06b6d4', status: 'online' },
  ]);

  const [metrics, setMetrics] = useState({
    globalEfficiency: 91.2,
    activeFurnaces: 47,
    totalProduction: 12847,
    qualityScore: 94.8,
    dataTransfer: 2.4,
    uptime: 99.97
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    const animate = () => {
      // Dark futuristic background
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2);
      bgGradient.addColorStop(0, '#0f172a');
      bgGradient.addColorStop(0.7, '#1e293b');
      bgGradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Outer glow ring
      ctx.save();
      ctx.shadowColor = '#3b82f6';
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 20, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Main globe with enhanced glow
      ctx.save();
      ctx.shadowColor = '#3b82f6';
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      const globeGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      globeGradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
      globeGradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.05)');
      globeGradient.addColorStop(1, 'rgba(59, 130, 246, 0.2)');
      ctx.fillStyle = globeGradient;
      ctx.fill();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Enhanced grid lines with rotation
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
      ctx.lineWidth = 1;

      // Longitude lines with 3D effect
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI * 2) / 12 + rotation;
        const xOffset = Math.cos(angle) * radius * 0.8;
        const perspective = Math.sin(angle) * 0.5 + 0.5;
        
        ctx.save();
        ctx.globalAlpha = perspective * 0.7 + 0.3;
        ctx.beginPath();
        ctx.ellipse(centerX + xOffset * 0.3, centerY, Math.abs(xOffset), radius * 0.9, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
      }

      // Latitude lines with enhanced visibility
      for (let i = 1; i < 5; i++) {
        const y = (radius * i) / 5;
        const opacity = 0.4 + (Math.sin(rotation * 2 + i) * 0.2);
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - y, radius * 0.9, radius * 0.25, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + y, radius * 0.9, radius * 0.25, 0, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
      }

      // Enhanced data points with connection lines
      dataPoints.forEach((point, index) => {
        const angle = (point.lng / 180) * Math.PI + rotation;
        const latRad = (point.lat / 90) * (Math.PI / 2);
        
        const x = centerX + Math.cos(angle) * Math.cos(latRad) * radius * 0.85;
        const y = centerY + Math.sin(latRad) * radius * 0.7;

        // Connection line to center
        ctx.save();
        ctx.strokeStyle = `${point.color}40`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.restore();

        // Enhanced pulsing point
        const pulseSize = 6 + Math.sin(Date.now() * 0.004 + index) * 3;
        const glowSize = pulseSize * 2;
        
        // Outer glow
        ctx.save();
        ctx.shadowColor = point.color;
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(x, y, glowSize, 0, 2 * Math.PI);
        ctx.fillStyle = `${point.color}20`;
        ctx.fill();
        ctx.restore();

        // Main point
        ctx.save();
        ctx.shadowColor = point.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, 2 * Math.PI);
        ctx.fillStyle = point.color;
        ctx.fill();
        ctx.restore();

        // Status ring
        if (point.status === 'online') {
          ctx.beginPath();
          ctx.arc(x, y, pulseSize + 3, 0, 2 * Math.PI);
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Value label with better positioning
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px Inter';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 4;
        ctx.fillText(`${point.value}%`, x, y - pulseSize - 8);
        ctx.restore();
      });

      // Orbital rings
      for (let i = 0; i < 3; i++) {
        const orbitRadius = radius + 30 + i * 15;
        const orbitSpeed = (rotation * (0.5 + i * 0.3)) % (Math.PI * 2);
        
        ctx.save();
        ctx.globalAlpha = 0.3 - i * 0.1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Orbital dots
        const dotX = centerX + Math.cos(orbitSpeed) * orbitRadius;
        const dotY = centerY + Math.sin(orbitSpeed) * orbitRadius;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, 2 * Math.PI);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
        ctx.restore();
      }

      setRotation(prev => prev + 0.008);
      requestAnimationFrame(animate);
    };

    animate();
  }, [dataPoints, rotation]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        globalEfficiency: Math.max(85, Math.min(98, prev.globalEfficiency + (Math.random() - 0.5) * 0.5)),
        activeFurnaces: Math.max(40, Math.min(55, prev.activeFurnaces + Math.floor((Math.random() - 0.5) * 2))),
        totalProduction: Math.max(10000, prev.totalProduction + Math.floor((Math.random() - 0.5) * 100)),
        qualityScore: Math.max(90, Math.min(99, prev.qualityScore + (Math.random() - 0.5) * 0.3)),
        dataTransfer: Math.max(1, Math.min(5, prev.dataTransfer + (Math.random() - 0.5) * 0.2)),
        uptime: Math.max(99.5, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.01))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-slate-900/95 backdrop-blur-xl border-slate-700/50 shadow-2xl shadow-cyan-500/10 overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-b border-slate-700/50">
        <CardTitle className="text-xl text-white flex items-center font-semibold">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white mr-3 shadow-lg shadow-cyan-500/25">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Global Operations Hub
            </span>
            <div className="text-sm text-slate-400 font-normal">Real-time Monitoring</div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-8 space-y-8">
        {/* Globe Visualization */}
        <div className="flex justify-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50"
            />
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-slate-800/80 backdrop-blur-sm px-3 py-2 rounded-full border border-slate-600/50">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
              <span className="text-xs font-medium text-emerald-400">LIVE</span>
            </div>
          </div>
        </div>

        {/* Enhanced Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-xl p-5 rounded-2xl border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
            <div className="flex items-center justify-between mb-3">
              <Activity className="h-6 w-6 text-emerald-400" />
              <span className="text-xs text-emerald-300 font-semibold bg-emerald-500/20 px-2 py-1 rounded-full">
                ↗ +2.1%
              </span>
            </div>
            <div className="text-3xl font-bold text-emerald-400 mb-1">
              {metrics.globalEfficiency.toFixed(1)}%
            </div>
            <div className="text-sm text-slate-400">Global Efficiency</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl p-5 rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/5">
            <div className="flex items-center justify-between mb-3">
              <Zap className="h-6 w-6 text-blue-400" />
              <span className="text-xs text-blue-300 font-semibold bg-blue-500/20 px-2 py-1 rounded-full">
                ACTIVE
              </span>
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-1">
              {metrics.activeFurnaces}
            </div>
            <div className="text-sm text-slate-400">Furnaces Online</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl p-5 rounded-2xl border border-purple-500/20 shadow-lg shadow-purple-500/5">
            <div className="flex items-center justify-between mb-3">
              <Database className="h-6 w-6 text-purple-400" />
              <span className="text-xs text-purple-300 font-semibold bg-purple-500/20 px-2 py-1 rounded-full">
                ↗ +1.8%
              </span>
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-1">
              {metrics.totalProduction.toLocaleString()}
            </div>
            <div className="text-sm text-slate-400">Units/Hour</div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 backdrop-blur-xl p-5 rounded-2xl border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
            <div className="flex items-center justify-between mb-3">
              <Signal className="h-6 w-6 text-cyan-400" />
              <span className="text-xs text-cyan-300 font-semibold bg-cyan-500/20 px-2 py-1 rounded-full">
                EXCELLENT
              </span>
            </div>
            <div className="text-3xl font-bold text-cyan-400 mb-1">
              {metrics.qualityScore.toFixed(1)}%
            </div>
            <div className="text-sm text-slate-400">Quality Score</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl p-5 rounded-2xl border border-orange-500/20 shadow-lg shadow-orange-500/5">
            <div className="flex items-center justify-between mb-3">
              <Wifi className="h-6 w-6 text-orange-400" />
              <span className="text-xs text-orange-300 font-semibold bg-orange-500/20 px-2 py-1 rounded-full">
                {metrics.dataTransfer.toFixed(1)} GB/s
              </span>
            </div>
            <div className="text-3xl font-bold text-orange-400 mb-1">
              {metrics.uptime.toFixed(2)}%
            </div>
            <div className="text-sm text-slate-400">System Uptime</div>
          </div>

          <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-xl p-5 rounded-2xl border border-pink-500/20 shadow-lg shadow-pink-500/5">
            <div className="flex items-center justify-between mb-3">
              <Satellite className="h-6 w-6 text-pink-400" />
              <span className="text-xs text-pink-300 font-semibold bg-pink-500/20 px-2 py-1 rounded-full">
                6 ACTIVE
              </span>
            </div>
            <div className="text-3xl font-bold text-pink-400 mb-1">
              {dataPoints.length}
            </div>
            <div className="text-sm text-slate-400">Global Sites</div>
          </div>
        </div>

        {/* Enhanced Facility Status */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Satellite className="h-5 w-5 mr-2 text-cyan-400" />
            Facility Network Status
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {dataPoints.map((point) => (
              <div 
                key={point.id} 
                className="flex items-center justify-between p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div 
                      className="w-4 h-4 rounded-full shadow-lg"
                      style={{ backgroundColor: point.color, boxShadow: `0 0 20px ${point.color}40` }}
                    ></div>
                    {point.status === 'online' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white">{point.label}</span>
                    <div className="text-xs text-slate-400 capitalize">{point.status}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-white">{point.value}%</span>
                  <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 shadow-sm"
                      style={{ 
                        width: `${point.value}%`,
                        backgroundColor: point.color,
                        boxShadow: `0 0 8px ${point.color}60`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
