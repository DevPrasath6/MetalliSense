import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WordDocumentGenerator } from './WordDocumentGenerator';
import { 
  Brain, 
  Target, 
  Cog, 
  TrendingUp, 
  Database, 
  Shield, 
  Zap,
  Award,
  ChevronRight,
  Download,
  FileText,
  Users,
  Globe,
  BarChart3
} from 'lucide-react';

export const CompetitionDocumentation = () => {
  const [activeSection, setActiveSection] = useState('problem');

  const sections = [
    { id: 'problem', title: 'Problem Statement', icon: Target },
    { id: 'solution', title: 'Proposed Solution', icon: Brain },
    { id: 'methodology', title: 'Methodology', icon: Cog },
    { id: 'technical', title: 'Technical Approach', icon: Database },
    { id: 'impact', title: 'Impact & Benefits', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 glass-card px-6 py-3 rounded-full mb-6">
            <Award className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-semibold text-white">Competition Submission</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            AI-Powered Alloy Advisory System
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Revolutionary industrial AI solution for real-time alloy composition optimization and predictive analytics
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-2 rounded-full">
            <div className="flex space-x-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    onClick={() => setActiveSection(section.id)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      activeSection === section.id 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {section.title}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="glass-card rounded-2xl p-8">
          {activeSection === 'problem' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <Target className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">Problem Statement Summary</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-red-400" />
                      Industry Challenges
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300 space-y-4">
                    <p><strong>1. Manual Composition Analysis:</strong></p>
                    <p>Traditional steel and alloy production relies heavily on manual spectrometer readings and human expertise, leading to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Time delays (15-30 minutes per analysis)</li>
                      <li>Human error in interpretation (±5-10% accuracy variance)</li>
                      <li>Inconsistent quality control across shifts</li>
                      <li>Reactive rather than predictive approach</li>
                    </ul>
                    
                    <p><strong>2. Economic Impact:</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Material waste: $2-5M annually per facility</li>
                      <li>Production downtime: 200-400 hours/year</li>
                      <li>Quality rejection rates: 8-15%</li>
                      <li>Energy inefficiency: 12-18% excess consumption</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                      Market Opportunity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300 space-y-4">
                    <p><strong>Global Steel Market:</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Market size: $2.5 trillion globally</li>
                      <li>Annual production: 1.9 billion tons</li>
                      <li>Growth rate: 3.2% CAGR</li>
                      <li>Automation adoption: &lt;30% currently</li>
                    </ul>
                    
                    <p><strong>Technology Gap:</strong></p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Limited AI integration in metallurgy</li>
                      <li>Fragmented monitoring systems</li>
                      <li>Lack of predictive capabilities</li>
                      <li>Poor real-time decision support</li>
                    </ul>
                    
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-lg mt-4">
                      <p className="text-center font-semibold text-white">
                        Potential Impact: $50-100B in global efficiency gains
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'solution' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <Brain className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">Proposed Solution with Methodology</h2>
              </div>

              <Card className="glass-card border-0 mb-8">
                <CardHeader>
                  <CardTitle className="text-white text-center text-2xl">
                    AI-Powered Alloy Advisory System Architecture
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Database className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Data Ingestion</h3>
                        <p className="text-slate-300 text-sm">Real-time spectrometer data, furnace parameters, environmental conditions</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Brain className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">AI Processing</h3>
                        <p className="text-slate-300 text-sm">Neural networks, predictive models, anomaly detection</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Zap className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Optimization</h3>
                        <p className="text-slate-300 text-sm">Real-time recommendations, process optimization, quality control</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white">Core Methodology</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300 space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-1">1</div>
                        <div>
                          <h4 className="text-white font-semibold">Real-time Data Fusion</h4>
                          <p className="text-sm">Continuous integration of spectrometer readings, furnace sensors, and environmental data</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-1">2</div>
                        <div>
                          <h4 className="text-white font-semibold">AI-Driven Analysis</h4>
                          <p className="text-sm">Deep learning models analyze composition patterns and predict optimal adjustments</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-1">3</div>
                        <div>
                          <h4 className="text-white font-semibold">Predictive Optimization</h4>
                          <p className="text-sm">Proactive recommendations for alloy additions and process parameters</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-1">4</div>
                        <div>
                          <h4 className="text-white font-semibold">Continuous Learning</h4>
                          <p className="text-sm">System improves accuracy through feedback loops and historical data analysis</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white">Key Features</CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-blue-400" />
                        <span>Real-time Spectrometer Integration</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg">
                        <Brain className="h-5 w-5 text-purple-400" />
                        <span>Neural Network Visualization</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg">
                        <Globe className="h-5 w-5 text-green-400" />
                        <span>Global Process Monitoring</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-orange-500/10 rounded-lg">
                        <Shield className="h-5 w-5 text-orange-400" />
                        <span>Anomaly Detection & Alerts</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-red-500/10 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-red-400" />
                        <span>Predictive Maintenance</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'methodology' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <Cog className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">Process Flow & Methodology</h2>
              </div>

              <Card className="glass-card border-0">
                <CardContent className="p-8">
                  <div className="space-y-8">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-white mb-6 text-center">Figure 1: Process Flow Diagram</h3>
                      <div className="flex flex-col space-y-4">
                        {[
                          { step: "Data Collection", desc: "Spectrometer + Furnace Sensors + Environmental Data", color: "blue-500" },
                          { step: "Data Preprocessing", desc: "Cleaning, Normalization, Feature Engineering", color: "purple-500" },
                          { step: "AI Analysis", desc: "Neural Networks + Machine Learning Models", color: "green-500" },
                          { step: "Decision Engine", desc: "Optimization Algorithms + Rule-based Systems", color: "orange-500" },
                          { step: "Recommendations", desc: "Alloy Additions + Process Adjustments", color: "red-500" },
                          { step: "Feedback Loop", desc: "Results Monitoring + Model Improvement", color: "cyan-500" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <div className={`w-12 h-12 bg-${item.color} rounded-full flex items-center justify-center text-white font-bold`}>
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-semibold">{item.step}</h4>
                              <p className="text-slate-300 text-sm">{item.desc}</p>
                            </div>
                            {index < 5 && (
                              <ChevronRight className="h-6 w-6 text-slate-400" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="glass-card border-0">
                        <CardHeader>
                          <CardTitle className="text-white">Machine Learning Pipeline</CardTitle>
                        </CardHeader>
                        <CardContent className="text-slate-300 space-y-3">
                          <p><strong>1. Data Ingestion:</strong> Real-time streaming from multiple sensors</p>
                          <p><strong>2. Feature Engineering:</strong> Extract relevant patterns and correlations</p>
                          <p><strong>3. Model Training:</strong> Supervised learning on historical data</p>
                          <p><strong>4. Inference:</strong> Real-time predictions and recommendations</p>
                          <p><strong>5. Validation:</strong> Continuous model performance monitoring</p>
                        </CardContent>
                      </Card>

                      <Card className="glass-card border-0">
                        <CardHeader>
                          <CardTitle className="text-white">Quality Assurance Framework</CardTitle>
                        </CardHeader>
                        <CardContent className="text-slate-300 space-y-3">
                          <p><strong>Statistical Process Control:</strong> Real-time SPC charts and alerts</p>
                          <p><strong>Predictive Quality:</strong> Forecast final product properties</p>
                          <p><strong>Deviation Analysis:</strong> Identify and correct process drift</p>
                          <p><strong>Compliance Monitoring:</strong> Ensure adherence to specifications</p>
                          <p><strong>Continuous Improvement:</strong> Feedback-driven optimization</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'technical' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <Database className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">Technical Approach</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white">Frontend Technologies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">React 18.3+ with TypeScript</Badge>
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">Vite Build System</Badge>
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/30">Tailwind CSS + Shadcn/UI</Badge>
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">Recharts for Visualization</Badge>
                      <Badge className="bg-red-500/20 text-red-300 border-red-400/30">Lucide React Icons</Badge>
                      <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">React Query for State</Badge>
                    </div>
                    <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">Key Features:</h4>
                      <ul className="text-slate-300 text-sm space-y-1">
                        <li>• Real-time data visualization</li>
                        <li>• Responsive glassmorphism design</li>
                        <li>• Interactive neural network display</li>
                        <li>• Live global monitoring dashboard</li>
                        <li>• Progressive Web App capabilities</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white">Backend & AI Technologies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <Badge className="bg-orange-500/20 text-orange-300 border-orange-400/30">Django REST Framework</Badge>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">Python 3.9+ Scientific Stack</Badge>
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">TensorFlow/PyTorch ML</Badge>
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/30">PostgreSQL Database</Badge>
                      <Badge className="bg-red-500/20 text-red-300 border-red-400/30">Redis for Caching</Badge>
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">Celery Task Queue</Badge>
                    </div>
                    <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                      <h4 className="text-white font-semibold mb-2">AI/ML Stack:</h4>
                      <ul className="text-slate-300 text-sm space-y-1">
                        <li>• Scikit-learn for classical ML</li>
                        <li>• TensorFlow for deep learning</li>
                        <li>• NumPy/Pandas for data processing</li>
                        <li>• Real-time anomaly detection</li>
                        <li>• Predictive maintenance models</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white">Hardware Integration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <h4 className="text-blue-400 font-semibold">Spectrometer Integration</h4>
                        <p className="text-slate-300 text-sm">Direct API connection to OES/XRF spectrometer systems</p>
                      </div>
                      <div className="p-3 bg-purple-500/10 rounded-lg">
                        <h4 className="text-purple-400 font-semibold">Furnace Monitoring</h4>
                        <p className="text-slate-300 text-sm">Temperature, pressure, and gas composition sensors</p>
                      </div>
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <h4 className="text-green-400 font-semibold">Industrial IoT</h4>
                        <p className="text-slate-300 text-sm">MQTT/OPC-UA protocols for real-time data streaming</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0">
                  <CardHeader>
                    <CardTitle className="text-white">Deployment & Scalability</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-orange-500/10 rounded-lg">
                        <h4 className="text-orange-400 font-semibold">Containerization</h4>
                        <p className="text-slate-300 text-sm">Docker containers with Kubernetes orchestration</p>
                      </div>
                      <div className="p-3 bg-cyan-500/10 rounded-lg">
                        <h4 className="text-cyan-400 font-semibold">Cloud Infrastructure</h4>
                        <p className="text-slate-300 text-sm">AWS/Azure with auto-scaling and load balancing</p>
                      </div>
                      <div className="p-3 bg-red-500/10 rounded-lg">
                        <h4 className="text-red-400 font-semibold">Edge Computing</h4>
                        <p className="text-slate-300 text-sm">Local processing for sub-second response times</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'impact' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">Impact & Benefits</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="glass-card border-0 hover-lift">
                  <CardHeader>
                    <CardTitle className="text-white text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="h-8 w-8 text-white" />
                      </div>
                      Economic Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="text-3xl font-bold text-green-400 mb-2">$2-5M</div>
                    <p className="text-slate-300">Annual savings per facility through reduced waste and optimized processes</p>
                    <div className="space-y-2 text-sm text-slate-400">
                      <p>• 25-40% reduction in material waste</p>
                      <p>• 15-20% increase in production efficiency</p>
                      <p>• 12-18% energy cost savings</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0 hover-lift">
                  <CardHeader>
                    <CardTitle className="text-white text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      Quality Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="text-3xl font-bold text-blue-400 mb-2">95%+</div>
                    <p className="text-slate-300">Consistency in product quality through AI-driven optimization</p>
                    <div className="space-y-2 text-sm text-slate-400">
                      <p>• 60-80% reduction in quality defects</p>
                      <p>• Real-time composition control</p>
                      <p>• Predictive quality assurance</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0 hover-lift">
                  <CardHeader>
                    <CardTitle className="text-white text-center">
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      Operational Excellence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                    <p className="text-slate-300">Continuous monitoring and optimization without human intervention</p>
                    <div className="space-y-2 text-sm text-slate-400">
                      <p>• Automated decision-making</p>
                      <p>• Reduced operator workload</p>
                      <p>• Consistent performance across shifts</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0 hover-lift">
                  <CardHeader>
                    <CardTitle className="text-white text-center">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                      Response Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="text-3xl font-bold text-red-400 mb-2">&lt;30s</div>
                    <p className="text-slate-300">From analysis to recommendation, enabling immediate corrective action</p>
                    <div className="space-y-2 text-sm text-slate-400">
                      <p>• Real-time data processing</p>
                      <p>• Instant anomaly detection</p>
                      <p>• Proactive problem solving</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0 hover-lift">
                  <CardHeader>
                    <CardTitle className="text-white text-center">
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Globe className="h-8 w-8 text-white" />
                      </div>
                      Environmental Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">30%</div>
                    <p className="text-slate-300">Reduction in carbon footprint through optimized energy usage</p>
                    <div className="space-y-2 text-sm text-slate-400">
                      <p>• Lower energy consumption</p>
                      <p>• Reduced material waste</p>
                      <p>• Sustainable production practices</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card border-0 hover-lift">
                  <CardHeader>
                    <CardTitle className="text-white text-center">
                      <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                      Competitive Advantage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">1st</div>
                    <p className="text-slate-300">To market with comprehensive AI-driven alloy optimization platform</p>
                    <div className="space-y-2 text-sm text-slate-400">
                      <p>• Proprietary algorithms</p>
                      <p>• Industry-specific expertise</p>
                      <p>• Scalable architecture</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card border-0 mt-8">
                <CardHeader>
                  <CardTitle className="text-white text-center text-2xl">Long-term Strategic Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-blue-400">Industry Transformation</h3>
                      <ul className="text-slate-300 space-y-2">
                        <li>• Pioneering AI adoption in metallurgy</li>
                        <li>• Setting new industry standards for quality</li>
                        <li>• Enabling Industry 4.0 transformation</li>
                        <li>• Creating data-driven production culture</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-purple-400">Market Leadership</h3>
                      <ul className="text-slate-300 space-y-2">
                        <li>• First-mover advantage in AI metallurgy</li>
                        <li>• Potential for licensing and partnerships</li>
                        <li>• Expansion to other industrial sectors</li>
                        <li>• Global scalability and market reach</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <WordDocumentGenerator />
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};
