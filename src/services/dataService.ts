
import { supabase } from './supabase';

export interface ProcessReading {
  id: string;
  timestamp: Date;
  furnace_id: string;
  temperature: number;
  pressure: number;
  oxygen_level: number;
  composition: Record<string, number>;
  quality_score?: number;
}

export interface AlloyRecommendation {
  id: string;
  target_composition: Record<string, number>;
  current_composition: Record<string, number>;
  recommendations: Array<{
    element: string;
    adjustment: number;
    confidence: number;
  }>;
  cost_impact: number;
  quality_improvement: number;
  created_at: Date;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  is_resolved: boolean;
  created_at: Date;
  resolved_at?: Date;
}

class DataService {
  // Process Data Management
  async getRecentProcessData(hours: number = 24): Promise<ProcessReading[]> {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    const { data, error } = await supabase
      .from('process_data')
      .select('*')
      .gte('timestamp', cutoffTime.toISOString())
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching process data:', error);
      return this.getMockProcessData();
    }

    return data || this.getMockProcessData();
  }

  async addProcessReading(reading: Omit<ProcessReading, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('process_data')
      .insert([{
        timestamp: reading.timestamp.toISOString(),
        furnace_id: reading.furnace_id,
        temperature: reading.temperature,
        pressure: reading.pressure,
        oxygen_level: reading.oxygen_level,
        composition_data: reading.composition,
        quality_score: reading.quality_score
      }]);

    if (error) {
      console.error('Error adding process reading:', error);
    }
  }

  // Alloy Recommendations
  async getRecommendations(): Promise<AlloyRecommendation[]> {
    const { data, error } = await supabase
      .from('alloy_recommendations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching recommendations:', error);
      return this.getMockRecommendations();
    }

    return data || this.getMockRecommendations();
  }

  async generateRecommendation(
    targetComposition: Record<string, number>,
    currentComposition: Record<string, number>
  ): Promise<AlloyRecommendation> {
    // Simulate AI recommendation generation
    const recommendations = Object.keys(targetComposition).map(element => {
      const target = targetComposition[element];
      const current = currentComposition[element] || 0;
      const adjustment = target - current;
      const confidence = Math.random() * 20 + 80; // 80-100% confidence

      return {
        element,
        adjustment,
        confidence
      };
    });

    const costImpact = recommendations.reduce((sum, rec) => 
      sum + Math.abs(rec.adjustment) * 10, 0
    );

    const qualityImprovement = Math.random() * 15 + 5; // 5-20% improvement

    const recommendation: AlloyRecommendation = {
      id: crypto.randomUUID(),
      target_composition: targetComposition,
      current_composition: currentComposition,
      recommendations,
      cost_impact: costImpact,
      quality_improvement: qualityImprovement,
      created_at: new Date()
    };

    // Store in database
    const { error } = await supabase
      .from('alloy_recommendations')
      .insert([{
        target_composition: targetComposition,
        current_composition: currentComposition,
        recommendations: recommendations,
        cost_impact: costImpact,
        quality_improvement: qualityImprovement
      }]);

    if (error) {
      console.error('Error storing recommendation:', error);
    }

    return recommendation;
  }

  // Alert Management
  async getActiveAlerts(): Promise<Alert[]> {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .eq('is_resolved', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching alerts:', error);
      return this.getMockAlerts();
    }

    return data || this.getMockAlerts();
  }

  async createAlert(alert: Omit<Alert, 'id' | 'created_at' | 'is_resolved'>): Promise<void> {
    const { error } = await supabase
      .from('alerts')
      .insert([{
        title: alert.title,
        message: alert.message,
        severity: alert.severity,
        source: alert.source,
        is_resolved: false
      }]);

    if (error) {
      console.error('Error creating alert:', error);
    }
  }

  async resolveAlert(alertId: string): Promise<void> {
    const { error } = await supabase
      .from('alerts')
      .update({
        is_resolved: true,
        resolved_at: new Date().toISOString()
      })
      .eq('id', alertId);

    if (error) {
      console.error('Error resolving alert:', error);
    }
  }

  // Analytics and Reporting
  async getSystemAnalytics() {
    const [processData, alerts, recommendations] = await Promise.all([
      this.getRecentProcessData(24),
      this.getActiveAlerts(),
      this.getRecommendations()
    ]);

    const totalReadings = processData.length;
    const avgQuality = processData.reduce((sum, reading) => 
      sum + (reading.quality_score || 0), 0) / totalReadings;
    const criticalAlerts = alerts.filter(alert => alert.severity === 'critical').length;
    const avgConfidence = recommendations.reduce((sum, rec) => 
      sum + rec.recommendations.reduce((recSum, r) => recSum + r.confidence, 0) / rec.recommendations.length, 0
    ) / recommendations.length;

    return {
      totalReadings,
      avgQuality: avgQuality || 0,
      criticalAlerts,
      avgConfidence: avgConfidence || 0,
      systemUptime: 99.2,
      energyEfficiency: 87.5,
      costSavings: 1250.30
    };
  }

  // Mock data fallbacks
  private getMockProcessData(): ProcessReading[] {
    return Array.from({ length: 20 }, (_, i) => ({
      id: `mock-${i}`,
      timestamp: new Date(Date.now() - i * 300000), // 5 minute intervals
      furnace_id: 'FURNACE_001',
      temperature: 1650 + Math.random() * 20 - 10,
      pressure: 2.5 + Math.random() * 0.5 - 0.25,
      oxygen_level: 125 + Math.random() * 10 - 5,
      composition: {
        C: 3.5 + Math.random() * 0.2 - 0.1,
        Si: 2.2 + Math.random() * 0.3 - 0.15,
        Mn: 0.7 + Math.random() * 0.1 - 0.05,
        Cr: 0.2 + Math.random() * 0.05 - 0.025
      },
      quality_score: 85 + Math.random() * 15
    }));
  }

  private getMockRecommendations(): AlloyRecommendation[] {
    return [
      {
        id: 'mock-rec-1',
        target_composition: { C: 3.5, Si: 2.2, Mn: 0.7, Cr: 0.2 },
        current_composition: { C: 3.45, Si: 2.12, Mn: 0.68, Cr: 0.18 },
        recommendations: [
          { element: 'C', adjustment: 0.05, confidence: 94 },
          { element: 'Si', adjustment: 0.08, confidence: 89 },
          { element: 'Mn', adjustment: 0.02, confidence: 92 },
          { element: 'Cr', adjustment: 0.02, confidence: 87 }
        ],
        cost_impact: 125.50,
        quality_improvement: 12.5,
        created_at: new Date(Date.now() - 600000)
      }
    ];
  }

  private getMockAlerts(): Alert[] {
    return [
      {
        id: 'mock-alert-1',
        title: 'Temperature Deviation',
        message: 'Furnace temperature has exceeded normal range',
        severity: 'high',
        source: 'FURNACE_001',
        is_resolved: false,
        created_at: new Date(Date.now() - 300000)
      },
      {
        id: 'mock-alert-2',
        title: 'Low Inventory Warning',
        message: 'Silicon carbide inventory below threshold',
        severity: 'medium',
        source: 'INVENTORY_SYSTEM',
        is_resolved: false,
        created_at: new Date(Date.now() - 900000)
      }
    ];
  }
}

export const dataService = new DataService();
