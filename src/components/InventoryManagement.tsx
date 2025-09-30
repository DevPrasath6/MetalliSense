
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Package, AlertCircle, TrendingDown, TrendingUp, Plus, Minus } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  minThreshold: number;
  maxCapacity: number;
  unit: string;
  costPerUnit: number;
  lastRestocked: Date;
  supplier: string;
  usage24h: number;
  estimatedDaysLeft: number;
}

export const InventoryManagement = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'FeSi 75%',
      currentStock: 250,
      minThreshold: 100,
      maxCapacity: 500,
      unit: 'kg',
      costPerUnit: 14.80,
      lastRestocked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      supplier: 'Alloy Corp',
      usage24h: 12.5,
      estimatedDaysLeft: 20
    },
    {
      id: '2',
      name: 'Mn Metal',
      currentStock: 45,
      minThreshold: 50,
      maxCapacity: 200,
      unit: 'kg',
      costPerUnit: 18.50,
      lastRestocked: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      supplier: 'Manganese Ltd',
      usage24h: 3.2,
      estimatedDaysLeft: 14
    },
    {
      id: '3',
      name: 'FeCr LC',
      currentStock: 180,
      minThreshold: 80,
      maxCapacity: 300,
      unit: 'kg',
      costPerUnit: 22.30,
      lastRestocked: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      supplier: 'Chrome Solutions',
      usage24h: 8.7,
      estimatedDaysLeft: 21
    },
    {
      id: '4',
      name: 'SiC (Silicon Carbide)',
      currentStock: 25,
      minThreshold: 30,
      maxCapacity: 100,
      unit: 'kg',
      costPerUnit: 35.60,
      lastRestocked: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      supplier: 'Silicon Tech',
      usage24h: 2.1,
      estimatedDaysLeft: 12
    },
    {
      id: '5',
      name: 'Al Wire',
      currentStock: 320,
      minThreshold: 150,
      maxCapacity: 500,
      unit: 'kg',
      costPerUnit: 8.90,
      lastRestocked: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      supplier: 'Aluminum Co',
      usage24h: 15.2,
      estimatedDaysLeft: 21
    }
  ]);

  const getStockStatus = (item: InventoryItem) => {
    const percentage = (item.currentStock / item.maxCapacity) * 100;
    if (item.currentStock <= item.minThreshold) return 'critical';
    if (percentage <= 30) return 'low';
    if (percentage >= 80) return 'high';
    return 'normal';
  };

  const getStatusBadgeVariant = (status: string): 'destructive' | 'secondary' | 'default' => {
    switch (status) {
      case 'critical':
        return 'destructive';
      case 'low':
        return 'secondary';
      case 'high':
      default:
        return 'default';
    }
  };

  const totalInventoryValue = inventory.reduce((sum, item) =>
    sum + (item.currentStock * item.costPerUnit), 0
  );

  const criticalItems = inventory.filter(item => getStockStatus(item) === 'critical').length;
  const lowStockItems = inventory.filter(item => getStockStatus(item) === 'low').length;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl text-foreground flex items-center">
          <Package className="h-5 w-5 mr-2 text-primary" />
          Inventory Management System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Value</p>
                  <p className="text-foreground text-xl font-bold">${totalInventoryValue.toFixed(2)}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Critical Items</p>
                  <p className="text-destructive text-xl font-bold">{criticalItems}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Low Stock</p>
                  <p className="text-foreground text-xl font-bold">{lowStockItems}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Items</p>
                  <p className="text-foreground text-xl font-bold">{inventory.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Inventory Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Current Stock Levels</h3>
            {inventory.map((item) => {
              const status = getStockStatus(item);
              const stockPercentage = (item.currentStock / item.maxCapacity) * 100;
              
              return (
                <div key={item.id} className="bg-muted rounded-lg p-4 animate-fade-in">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <Badge variant={getStatusBadgeVariant(status)}>
                          {status.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Current Stock:</span>
                          <div className="text-foreground font-mono text-lg">
                            {item.currentStock} {item.unit}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Min Threshold:</span>
                          <div className="text-foreground font-mono">
                            {item.minThreshold} {item.unit}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Days Left:</span>
                          <div className="text-foreground font-mono">
                            ~{item.estimatedDaysLeft} days
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Cost/Unit:</span>
                          <div className="text-foreground font-mono">
                            ${item.costPerUnit}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Stock Level</span>
                      <span className="text-foreground">{stockPercentage.toFixed(1)}% of capacity</span>
                    </div>
                    <Progress value={stockPercentage} className="h-2" />
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0 {item.unit}</span>
                      <span>{item.maxCapacity} {item.unit}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between items-center text-sm">
                      <div className="space-x-4">
                        <span className="text-muted-foreground">
                          Supplier: <span className="text-foreground">{item.supplier}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Usage (24h): <span className="text-foreground">{item.usage24h} {item.unit}</span>
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        Last restocked: {item.lastRestocked.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
