
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, Target, TrendingUp, CheckCircle } from 'lucide-react';

interface GradeSpec {
  grade: string;
  elements: {
    [key: string]: { min: number; max: number; target: number };
  };
  priority: 'high' | 'medium' | 'low';
  learningAccuracy: number;
  totalHeats: number;
  successfulHeats: number;
}

interface GradeLearning {
  grade: string;
  confidence: number;
  adaptations: string[];
  lastUpdated: string;
  improvementTrend: number;
}

export const MultiGradeLearning = () => {
  const [selectedGrade, setSelectedGrade] = useState('AISI 1045');

  const gradeSpecs: GradeSpec[] = [
    {
      grade: 'AISI 1045',
      elements: {
        'C': { min: 0.43, max: 0.50, target: 0.46 },
        'Si': { min: 0.15, max: 0.35, target: 0.25 },
        'Mn': { min: 0.60, max: 0.90, target: 0.75 },
        'P': { max: 0.040, min: 0, target: 0.020 },
        'S': { max: 0.050, min: 0, target: 0.025 }
      },
      priority: 'high',
      learningAccuracy: 96.5,
      totalHeats: 145,
      successfulHeats: 140
    },
    {
      grade: 'AISI 4140',
      elements: {
        'C': { min: 0.38, max: 0.43, target: 0.40 },
        'Si': { min: 0.15, max: 0.35, target: 0.25 },
        'Mn': { min: 0.75, max: 1.00, target: 0.87 },
        'Cr': { min: 0.80, max: 1.10, target: 0.95 },
        'Mo': { min: 0.15, max: 0.25, target: 0.20 }
      },
      priority: 'high',
      learningAccuracy: 94.2,
      totalHeats: 89,
      successfulHeats: 84
    },
    {
      grade: 'AISI 8620',
      elements: {
        'C': { min: 0.18, max: 0.23, target: 0.20 },
        'Si': { min: 0.15, max: 0.35, target: 0.25 },
        'Mn': { min: 0.70, max: 1.00, target: 0.85 },
        'Ni': { min: 0.40, max: 0.70, target: 0.55 },
        'Cr': { min: 0.40, max: 0.60, target: 0.50 },
        'Mo': { min: 0.15, max: 0.25, target: 0.20 }
      },
      priority: 'medium',
      learningAccuracy: 91.8,
      totalHeats: 34,
      successfulHeats: 31
    }
  ];

  const gradeLearning: GradeLearning[] = [
    {
      grade: 'AISI 1045',
      confidence: 96.5,
      adaptations: [
        'Optimized Si addition timing for faster dissolution',
        'Adjusted Mn target based on scrap composition patterns',
        'Learned correlation between furnace temperature and C recovery'
      ],
      lastUpdated: '2 hours ago',
      improvementTrend: 12.3
    },
    {
      grade: 'AISI 4140',
      confidence: 94.2,
      adaptations: [
        'Fine-tuned Cr addition strategy for alloy scrap batches',
        'Improved Mo recovery prediction model',
        'Adapted for high-frequency induction melting'
      ],
      lastUpdated: '45 minutes ago',
      improvementTrend: 8.7
    },
    {
      grade: 'AISI 8620',
      confidence: 91.8,
      adaptations: [
        'Learning Ni behavior in different scrap mixes',
        'Adjusting for complex alloy interactions',
        'Building confidence with more heat data'
      ],
      lastUpdated: '1 hour ago',
      improvementTrend: 15.2
    }
  ];

  const currentGrade = gradeSpecs.find(spec => spec.grade === selectedGrade);
  const currentLearning = gradeLearning.find(learning => learning.grade === selectedGrade);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      default: return 'bg-green-600';
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center">
          <GraduationCap className="h-5 w-5 mr-2 text-purple-400" />
          Multi-Grade AI Learning System
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Grade Selection */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Steel Grade Selection</h3>
            <div className="flex flex-wrap gap-2">
              {gradeSpecs.map((spec) => (
                <Button
                  key={spec.grade}
                  variant={selectedGrade === spec.grade ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedGrade(spec.grade)}
                  className={selectedGrade === spec.grade ? "bg-purple-600 hover:bg-purple-700" : "border-slate-600 hover:bg-slate-700"}
                >
                  {spec.grade}
                  <Badge className={`ml-2 ${getPriorityColor(spec.priority)}`}>
                    {spec.priority}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {currentGrade && currentLearning && (
            <>
              {/* Grade Specifications */}
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-medium text-white mb-3 flex items-center">
                  <Target className="h-4 w-4 mr-2 text-cyan-400" />
                  {currentGrade.grade} Specifications
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {Object.entries(currentGrade.elements).map(([element, spec]) => (
                    <div key={element} className="bg-slate-800 rounded p-3">
                      <div className="font-semibold text-white text-center mb-2">{element}</div>
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Min:</span>
                          <span className="text-white font-mono">{spec.min.toFixed(3)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Target:</span>
                          <span className="text-cyan-400 font-mono">{spec.target.toFixed(3)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Max:</span>
                          <span className="text-white font-mono">{spec.max.toFixed(3)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Performance */}
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-medium text-white mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                  AI Learning Performance for {currentGrade.grade}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-slate-800 rounded p-3">
                    <div className="text-sm text-slate-300 mb-1">Learning Accuracy</div>
                    <div className="text-2xl font-bold text-green-400 mb-2">
                      {currentGrade.learningAccuracy}%
                    </div>
                    <Progress value={currentGrade.learningAccuracy} className="h-2" />
                  </div>
                  
                  <div className="bg-slate-800 rounded p-3">
                    <div className="text-sm text-slate-300 mb-1">Success Rate</div>
                    <div className="text-2xl font-bold text-cyan-400 mb-2">
                      {((currentGrade.successfulHeats / currentGrade.totalHeats) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-slate-400">
                      {currentGrade.successfulHeats}/{currentGrade.totalHeats} heats
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 rounded p-3">
                    <div className="text-sm text-slate-300 mb-1">Improvement Trend</div>
                    <div className="text-2xl font-bold text-purple-400 mb-2">
                      +{currentLearning.improvementTrend}%
                    </div>
                    <div className="text-xs text-slate-400">vs. last month</div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Last updated: {currentLearning.lastUpdated}
                </div>
              </div>

              {/* AI Adaptations */}
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-medium text-white mb-3">Recent AI Adaptations</h3>
                <div className="space-y-3">
                  {currentLearning.adaptations.map((adaptation, index) => (
                    <div key={index} className="flex items-start space-x-3 bg-slate-800 rounded p-3">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-white">{adaptation}</p>
                        <div className="text-xs text-slate-400 mt-1">
                          Confidence boost: +{(Math.random() * 5 + 1).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Train on Current Heat
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700">
                  Export Learning Data
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 hover:bg-slate-700">
                  Reset Grade Model
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
