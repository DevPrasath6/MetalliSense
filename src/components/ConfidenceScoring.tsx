
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Thermometer, Activity, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface ConfidenceFactors {
  temperatureStability: number;
  stirringConsistency: number;
  historicalAccuracy: number;
  sampleQuality: number;
  timeStability: number;
  furnaceCondition: number;
}

interface RecommendationConfidence {
  element: string;
  recommendation: string;
  overallConfidence: number;
  factors: ConfidenceFactors;
  riskLevel: 'low' | 'medium' | 'high';
  reliability: 'excellent' | 'good' | 'fair' | 'poor';
}

export const ConfidenceScoring = () => {
  const [selectedElement, setSelectedElement] = useState('C');

  const confidenceData: RecommendationConfidence[] = [
    {
      element: 'C',
      recommendation: 'Add 2.3 kg Carbon',
      overallConfidence: 94.2,
      factors: {
        temperatureStability: 96.8,
        stirringConsistency: 91.5,
        historicalAccuracy: 94.1,
        sampleQuality: 98.2,
        timeStability: 87.3,
        furnaceCondition: 93.6
      },
      riskLevel: 'low',
      reliability: 'excellent'
    },
    {
      element: 'Si',
      recommendation: 'Add 1.7 kg Silicon',
      overallConfidence: 87.6,
      factors: {
        temperatureStability: 89.4,
        stirringConsistency: 85.2,
        historicalAccuracy: 91.8,
        sampleQuality: 96.1,
        timeStability: 82.7,
        furnaceCondition: 90.4
      },
      riskLevel: 'medium',
      reliability: 'good'
    },
    {
      element: 'Mn',
      recommendation: 'Add 0.8 kg Manganese',
      overallConfidence: 76.3,
      factors: {
        temperatureStability: 78.2,
        stirringConsistency: 71.4,
        historicalAccuracy: 83.7,
        sampleQuality: 89.3,
        timeStability: 69.8,
        furnaceCondition: 85.4
      },
      riskLevel: 'high',
      reliability: 'fair'
    }
  ];

  const furnaceConditions = {
    temperature: { value: 1587, stability: 96.8, status: 'optimal' },
    stirring: { rpm: 45, consistency: 91.5, status: 'good' },
    power: { current: 2450, efficiency: 94.2, status: 'optimal' },
    atmosphere: { oxygen: 0.02, pressure: 1.01, status: 'controlled' }
  };

  const currentConfidence = confidenceData.find(item => item.element === selectedElement);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'excellent': return 'bg-green-600';
      case 'good': return 'bg-blue-600';
      case 'fair': return 'bg-yellow-600';
      default: return 'bg-red-600';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      default: return 'bg-red-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'good': return <CheckCircle className="h-4 w-4 text-blue-400" />;
      case 'controlled': return <CheckCircle className="h-4 w-4 text-cyan-400" />;
      default: return <AlertCircle className="h-4 w-4 text-yellow-400" />;
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-400" />
          AI Confidence Scoring System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Element Selection */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Element Analysis</h3>
            <div className="flex gap-2">
              {confidenceData.map((item) => (
                <button
                  key={item.element}
                  onClick={() => setSelectedElement(item.element)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedElement === item.element
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {item.element}
                  <span className={`ml-2 text-sm ${getConfidenceColor(item.overallConfidence)}`}>
                    {item.overallConfidence}%
                  </span>
                </button>
              ))}
            </div>
          </div>

          {currentConfidence && (
            <>
              {/* Overall Confidence */}
              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-white">Overall Confidence Score</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className={getRiskColor(currentConfidence.riskLevel)}>
                      {currentConfidence.riskLevel.toUpperCase()} RISK
                    </Badge>
                    <Badge className={getReliabilityColor(currentConfidence.reliability)}>
                      {currentConfidence.reliability.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <div className={`text-4xl font-bold mb-2 ${getConfidenceColor(currentConfidence.overallConfidence)}`}>
                    {currentConfidence.overallConfidence}%
                  </div>
                  <div className="text-slate-300 text-lg">
                    {currentConfidence.recommendation}
                  </div>
                </div>

                <Progress value={currentConfidence.overallConfidence} className="h-3" />
              </div>

              {/* Confidence Factors Breakdown */}
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-medium text-white mb-4">Confidence Factors Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(currentConfidence.factors).map(([factor, value]) => (
                    <div key={factor} className="bg-slate-800 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-300 capitalize">
                          {factor.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className={`font-mono ${getConfidenceColor(value)}`}>
                          {value.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={value} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Furnace Conditions Impact */}
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-medium text-white mb-4 flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-purple-400" />
                  Real-time Furnace Conditions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Thermometer className="h-4 w-4 text-red-400 mr-2" />
                        <span className="text-sm text-slate-300">Temperature</span>
                      </div>
                      {getStatusIcon(furnaceConditions.temperature.status)}
                    </div>
                    <div className="text-white font-mono text-lg">
                      {furnaceConditions.temperature.value}°C
                    </div>
                    <div className="text-xs text-slate-400">
                      Stability: {furnaceConditions.temperature.stability}%
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 text-blue-400 mr-2" />
                        <span className="text-sm text-slate-300">Stirring</span>
                      </div>
                      {getStatusIcon(furnaceConditions.stirring.status)}
                    </div>
                    <div className="text-white font-mono text-lg">
                      {furnaceConditions.stirring.rpm} RPM
                    </div>
                    <div className="text-xs text-slate-400">
                      Consistency: {furnaceConditions.stirring.consistency}%
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 text-yellow-400 mr-2" />
                        <span className="text-sm text-slate-300">Power</span>
                      </div>
                      {getStatusIcon(furnaceConditions.power.status)}
                    </div>
                    <div className="text-white font-mono text-lg">
                      {furnaceConditions.power.current} kW
                    </div>
                    <div className="text-xs text-slate-400">
                      Efficiency: {furnaceConditions.power.efficiency}%
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-sm text-slate-300">Atmosphere</span>
                      </div>
                      {getStatusIcon(furnaceConditions.atmosphere.status)}
                    </div>
                    <div className="text-white font-mono text-lg">
                      {furnaceConditions.atmosphere.oxygen}% O₂
                    </div>
                    <div className="text-xs text-slate-400">
                      Pressure: {furnaceConditions.atmosphere.pressure} bar
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidence History */}
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-medium text-white mb-3 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-cyan-400" />
                  Confidence Trend (Last 24 Hours)
                </h3>
                <div className="space-y-2">
                  {['2 hours ago', '6 hours ago', '12 hours ago', '24 hours ago'].map((time, index) => {
                    const confidence = currentConfidence.overallConfidence - (index * 3) + Math.random() * 4 - 2;
                    return (
                      <div key={time} className="flex justify-between items-center py-1">
                        <span className="text-sm text-slate-400">{time}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-slate-600 rounded-full h-2">
                            <div 
                              className="bg-blue-400 h-2 rounded-full" 
                              style={{ width: `${confidence}%` }}
                            />
                          </div>
                          <span className={`text-sm font-mono ${getConfidenceColor(confidence)}`}>
                            {confidence.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
