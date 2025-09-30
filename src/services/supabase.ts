
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema types
export interface Database {
  public: {
    Tables: {
      process_data: {
        Row: {
          id: string;
          furnace_id: string;
          temperature: number;
          pressure: number;
          oxygen_level: number;
          composition_data: Record<string, number>;
          timestamp: string;
          quality_score: number | null;
        };
        Insert: {
          id?: string;
          furnace_id: string;
          temperature: number;
          pressure: number;
          oxygen_level: number;
          composition_data: Record<string, number>;
          timestamp?: string;
          quality_score?: number | null;
        };
        Update: {
          id?: string;
          furnace_id?: string;
          temperature?: number;
          pressure?: number;
          oxygen_level?: number;
          composition_data?: Record<string, number>;
          timestamp?: string;
          quality_score?: number | null;
        };
      };
      alerts: {
        Row: {
          id: string;
          title: string;
          message: string;
          severity: 'low' | 'medium' | 'high' | 'critical';
          source: string;
          is_resolved: boolean;
          created_at: string;
          resolved_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          message: string;
          severity: 'low' | 'medium' | 'high' | 'critical';
          source: string;
          is_resolved?: boolean;
          created_at?: string;
          resolved_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          message?: string;
          severity?: 'low' | 'medium' | 'high' | 'critical';
          source?: string;
          is_resolved?: boolean;
          created_at?: string;
          resolved_at?: string | null;
        };
      };
      alloy_recommendations: {
        Row: {
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
          created_at: string;
        };
        Insert: {
          id?: string;
          target_composition: Record<string, number>;
          current_composition: Record<string, number>;
          recommendations: Array<{
            element: string;
            adjustment: number;
            confidence: number;
          }>;
          cost_impact: number;
          quality_improvement: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          target_composition?: Record<string, number>;
          current_composition?: Record<string, number>;
          recommendations?: Array<{
            element: string;
            adjustment: number;
            confidence: number;
          }>;
          cost_impact?: number;
          quality_improvement?: number;
          created_at?: string;
        };
      };
    };
  };
}
