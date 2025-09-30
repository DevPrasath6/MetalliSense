
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Activity, TrendingUp, Sparkles, Cpu, Network } from 'lucide-react';

interface Node {
  id: string;
  x: number;
  y: number;
  layer: number;
  value: number;
  isActive: boolean;
}

interface Connection {
  from: string;
  to: string;
  weight: number;
  isActive: boolean;
}

export const NeuralNetworkVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [accuracy, setAccuracy] = useState(94.7);
  const [epoch, setEpoch] = useState(1247);

  useEffect(() => {
    // Initialize neural network structure
    const newNodes: Node[] = [];
    const newConnections: Connection[] = [];
    
    // Input layer (4 nodes)
    for (let i = 0; i < 4; i++) {
      newNodes.push({
        id: `input-${i}`,
        x: 60,
        y: 100 + i * 60,
        layer: 0,
        value: Math.random(),
        isActive: false
      });
    }
    
    // Hidden layers (3 layers, 6-8-6 nodes)
    const hiddenSizes = [6, 8, 6];
    hiddenSizes.forEach((size, layerIndex) => {
      for (let i = 0; i < size; i++) {
        newNodes.push({
          id: `hidden-${layerIndex}-${i}`,
          x: 170 + layerIndex * 110,
          y: 80 + i * 40,
          layer: layerIndex + 1,
          value: Math.random(),
          isActive: false
        });
      }
    });
    
    // Output layer (3 nodes)
    for (let i = 0; i < 3; i++) {
      newNodes.push({
        id: `output-${i}`,
        x: 500,
        y: 120 + i * 60,
        layer: 4,
        value: Math.random(),
        isActive: false
      });
    }
    
    // Create connections
    newNodes.forEach(node => {
      const nextLayerNodes = newNodes.filter(n => n.layer === node.layer + 1);
      nextLayerNodes.forEach(nextNode => {
        newConnections.push({
          from: node.id,
          to: nextNode.id,
          weight: (Math.random() - 0.5) * 2,
          isActive: false
        });
      });
    });
    
    setNodes(newNodes);
    setConnections(newConnections);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      // Clean professional background matching design system using CSS variables
      const getVarColor = (name: string, alpha = 1) => {
        const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        if (!v) return `rgba(226, 232, 240, ${alpha})`;
        const [h, s, l] = v.split(' ');
        return alpha === 1 ? `hsl(${h}, ${s}, ${l})` : `hsla(${h}, ${s}, ${l}, ${alpha})`;
      };

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, getVarColor('--background'));
      gradient.addColorStop(0.5, getVarColor('--secondary'));
      gradient.addColorStop(1, getVarColor('--background'));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle grid pattern
      ctx.strokeStyle = getVarColor('--border', 0.3);
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw connections with glow
      connections.forEach(conn => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        
        if (fromNode && toNode) {
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          
          const opacity = conn.isActive ? 0.9 : 0.3;
          const weight = Math.abs(conn.weight);
          
          // Professional glow effect using theme colors
          ctx.shadowColor = conn.weight > 0 ? getVarColor('--primary') : getVarColor('--destructive');
          ctx.shadowBlur = conn.isActive ? 8 : 3;
          
          ctx.strokeStyle = conn.weight > 0 
            ? getVarColor('--primary', opacity) 
            : getVarColor('--destructive', opacity);
          ctx.lineWidth = weight * 2 + 1;
          ctx.stroke();
          
          ctx.shadowBlur = 0;
        }
      });
      
      // Draw nodes with enhanced effects
      nodes.forEach(node => {
        const radius = node.isActive ? 16 : 12;
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 8, 0, 2 * Math.PI);
        const glowIntensity = node.value * 0.5 + 0.2;
        
        if (node.layer === 0) {
          ctx.fillStyle = `hsla(158, 64%, 52%, ${glowIntensity * 0.2})`;
        } else if (node.layer === 4) {
          ctx.fillStyle = `hsla(258, 90%, 66%, ${glowIntensity * 0.2})`;
        } else {
          ctx.fillStyle = `hsla(214, 95%, 65%, ${glowIntensity * 0.2})`;
        }
        ctx.fill();
        
        // Main node
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        
        const intensity = node.value;
        if (node.layer === 0) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);
          gradient.addColorStop(0, `rgba(16, 185, 129, ${0.8 + intensity * 0.2})`);
          gradient.addColorStop(1, `rgba(5, 150, 105, ${0.6 + intensity * 0.4})`);
          ctx.fillStyle = gradient;
        } else if (node.layer === 4) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);
          gradient.addColorStop(0, `rgba(168, 85, 247, ${0.8 + intensity * 0.2})`);
          gradient.addColorStop(1, `rgba(124, 58, 237, ${0.6 + intensity * 0.4})`);
          ctx.fillStyle = gradient;
        } else {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius);
          gradient.addColorStop(0, `rgba(59, 130, 246, ${0.8 + intensity * 0.2})`);
          gradient.addColorStop(1, `rgba(37, 99, 235, ${0.6 + intensity * 0.4})`);
          ctx.fillStyle = gradient;
        }
        
        ctx.fill();
        
        // Border
        ctx.strokeStyle = '#ffffff40';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Activity pulse
        if (node.isActive) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 4, 0, 2 * Math.PI);
          ctx.strokeStyle = '#ffffff80';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, [nodes, connections]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTraining) {
        // Simulate training animation
        setNodes(prev => prev.map(node => ({
          ...node,
          value: Math.random(),
          isActive: Math.random() > 0.7
        })));
        
        setConnections(prev => prev.map(conn => ({
          ...conn,
          isActive: Math.random() > 0.8,
          weight: conn.weight + (Math.random() - 0.5) * 0.1
        })));
        
        setAccuracy(prev => Math.min(99.9, prev + Math.random() * 0.1));
        setEpoch(prev => prev + 1);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [isTraining]);

  const startTraining = () => {
    setIsTraining(true);
    setTimeout(() => setIsTraining(false), 10000);
  };

  return (
    <Card className="bg-white border-subtle shadow-elegant overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-white border-b border-subtle">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-foreground flex items-center font-semibold">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white mr-3 shadow-elegant">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <span className="text-gradient">
                Neural Network Architecture
              </span>
              <div className="text-sm text-muted-foreground font-normal">Deep Learning Engine</div>
            </div>
          </CardTitle>
          <div className="flex items-center space-x-4">
            <div className="bg-subtle border border-subtle px-4 py-2 rounded-full">
              <div className="flex items-center space-x-2">
                <Cpu className="h-4 w-4 text-primary" />
                <span className="text-sm font-mono font-bold text-foreground">
                  Epoch: {epoch.toLocaleString()}
                </span>
              </div>
            </div>
            <Button 
              onClick={startTraining}
              disabled={isTraining}
              className="bg-primary hover:bg-primary/90 text-white shadow-elegant border-0"
            >
              {isTraining ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-pulse" />
                  Training...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Train Model
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Neural Network Canvas */}
          <div className="xl:col-span-2">
            <div className="bg-subtle border border-subtle p-6 rounded-2xl shadow-elegant">
              <canvas
                ref={canvasRef}
                width={560}
                height={360}
                className="w-full h-auto rounded-xl"
              />
              <div className="flex justify-between mt-6 text-sm">
                <div className="flex items-center space-x-3 bg-subtle border border-subtle px-4 py-2 rounded-full">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-elegant"></div>
                  <span className="text-muted-foreground font-medium">Input Layer (4)</span>
                </div>
                <div className="flex items-center space-x-3 bg-subtle border border-subtle px-4 py-2 rounded-full">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-primary shadow-elegant"></div>
                  <span className="text-muted-foreground font-medium">Hidden (6-8-6)</span>
                </div>
                <div className="flex items-center space-x-3 bg-subtle border border-subtle px-4 py-2 rounded-full">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-secondary to-accent shadow-elegant"></div>
                  <span className="text-muted-foreground font-medium">Output (3)</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Metrics Panel */}
          <div className="space-y-6">
            <div className="bg-subtle border border-subtle p-6 rounded-2xl shadow-elegant">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Model Accuracy
                </h3>
                <div className="px-3 py-1 bg-primary/20 rounded-full">
                  <span className="text-xs text-primary font-semibold">OPTIMAL</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-foreground mb-4">
                {accuracy.toFixed(1)}%
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-500 shadow-elegant"
                  style={{ width: `${accuracy}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-subtle border border-subtle p-6 rounded-2xl shadow-elegant">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Network className="h-5 w-5 mr-2 text-primary" />
                Network Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Nodes:</span>
                  <span className="font-mono font-bold text-foreground text-lg">27</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Connections:</span>
                  <span className="font-mono font-bold text-foreground text-lg">164</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Parameters:</span>
                  <span className="font-mono font-bold text-foreground text-lg">2.1K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Loss Function:</span>
                  <span className="font-mono font-bold text-destructive text-lg">0.032</span>
                </div>
              </div>
            </div>
            
            <div className="bg-subtle border border-subtle p-6 rounded-2xl shadow-elegant">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                AI Intelligence
              </h3>
              <div className="text-sm text-muted-foreground space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Optimal convergence achieved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Feature importance: C {'>'} Si {'>'} Mn</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Prediction confidence: 94.7%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Next optimization: 2.3 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
