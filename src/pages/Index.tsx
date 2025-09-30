
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, BarChart3, Bell, Package, Lightbulb, TrendingUp, 
  Activity, Shield, Zap, Brain, Sparkles, ArrowRight, 
  Play, Pause, RotateCcw, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FeatureLauncher from '@/components/FeatureLauncher';

const Index = () => {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const features = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "AI-Powered Dashboard",
      description: "Real-time intelligent monitoring with predictive insights",
      href: "/dashboard",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0ms"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Deep learning algorithms for process optimization",
      href: "/analytics",
      gradient: "from-indigo-500 to-purple-500",
      delay: "100ms"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Neural Networks",
      description: "Machine learning for alloy composition prediction",
      href: "/recommendations",
      gradient: "from-purple-500 to-pink-500",
      delay: "200ms"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Predictive Modeling",
      description: "Future trend forecasting with 99.2% accuracy",
      href: "/predictive",
      gradient: "from-emerald-500 to-teal-500",
      delay: "300ms"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality Assurance",
      description: "Automated quality control and anomaly detection",
      href: "/quality",
      gradient: "from-orange-500 to-red-500",
      delay: "400ms"
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Smart Alerts",
      description: "Intelligent notification system with ML prioritization",
      href: "/alerts",
      gradient: "from-rose-500 to-pink-500",
      delay: "500ms"
    }
  ];

  const metrics = [
    { value: "99.9%", label: "System Uptime", description: "Enterprise-grade reliability" },
    { value: "94.7%", label: "AI Accuracy", description: "Machine learning precision" },
    { value: "2.1ms", label: "Response Time", description: "Ultra-low latency processing" },
    { value: "24/7", label: "Monitoring", description: "Continuous intelligent oversight" }
  ];

  const testimonials = [
    {
      quote: "Revolutionary AI platform that transformed our metallurgy operations",
      author: "Dr. Sarah Chen",
      role: "Chief Metallurgist, TechAlloy Corp"
    },
    {
      quote: "Unprecedented precision in alloy composition prediction",
      author: "Michael Rodriguez",
      role: "Process Engineer, Advanced Materials Ltd"
    },
    {
      quote: "The future of intelligent metallurgy is here",
      author: "Prof. James Wilson",
      role: "Materials Science Institute"
    }
  ];

  useEffect(() => {
    document.title = 'Alloy Alchemy Advisor — AI Metallurgy Platform';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'AI metallurgy platform with real-time dashboard, analytics, recommendations, and predictive insights.');
    }
  }, []);

  useEffect(() => {
    if (isAutoRotating) {
      const interval = setInterval(() => {
        setCurrentMetric((prev) => (prev + 1) % metrics.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoRotating, metrics.length]);

  return (
    <div className="min-h-screen bg-slate-50 gradient-mesh">
      {/* Unique Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="glass-card p-3 rounded-xl status-indicator">
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">
                  Alloy Alchemy Advisor
                </h1>
                <p className="text-sm text-slate-600 font-medium">AI Intelligence Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="glass-button px-4 py-2 rounded-full flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700">System Optimal</span>
              </div>
              
              <Button className="glass-button border-0 hover:bg-white/90 text-slate-700 hover:text-slate-900">
                <Shield className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Unique Hero Section */}
      <main className="pt-24">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-40"></div>
          <div className="container mx-auto px-6 py-20">
            <div className="text-center max-w-5xl mx-auto">
              {/* Floating Badge */}
              <div className="inline-flex items-center space-x-3 glass-card px-6 py-3 rounded-full mb-8 animate-fade-in-up">
                <Brain className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">Next-Generation AI Metallurgy</span>
                <Sparkles className="h-4 w-4 text-purple-500 animate-pulse-slow" />
              </div>
              
              {/* Hero Title */}
              <h1 className="text-7xl md:text-8xl font-bold mb-6 animate-slide-up">
                <span className="text-gradient">Intelligent</span>
                <br />
                <span className="text-slate-900 text-shadow">Alloy Mastery</span>
              </h1>
              
              {/* Hero Description */}
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up">
                Revolutionary AI-powered platform combining machine learning, predictive analytics, 
                and real-time optimization for the future of metallurgical excellence.
              </p>
              
              {/* Hero Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up">
                <Link to="/dashboard">
                  <Button size="lg" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-soft hover-lift group">
                    <Activity className="h-5 w-5 mr-3 group-hover:animate-pulse" />
                    Launch AI Dashboard
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/recommendations">
                  <Button variant="outline" size="lg" className="glass-button px-8 py-4 border-2 border-white/40 hover-glass">
                    <Zap className="h-5 w-5 mr-3 text-purple-600" />
                    Explore AI Insights
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="secondary" size="lg" className="px-8 py-4 hover:opacity-90">
                    <ChevronDown className="h-5 w-5 mr-3" />
                    All Features
                  </Button>
                </Link>
              </div>

              {/* Rotating Metrics Display */}
              <div className="glass-card p-8 rounded-2xl max-w-md mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800">Live Performance</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                    className="text-slate-600 hover:text-slate-800"
                  >
                    {isAutoRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">
                    {metrics[currentMetric].value}
                  </div>
                  <div className="text-lg font-medium text-slate-800 mb-1">
                    {metrics[currentMetric].label}
                  </div>
                  <div className="text-sm text-slate-600">
                    {metrics[currentMetric].description}
                  </div>
                </div>
                
                <div className="flex justify-center space-x-2 mt-4">
                  {metrics.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMetric(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentMetric ? 'bg-blue-600 w-6' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Launch Section */}
        <section aria-labelledby="quick-launch" className="py-12 bg-background">
          <div className="container mx-auto px-6">
            <h2 id="quick-launch" className="text-2xl font-semibold text-foreground mb-6">Quick Launch</h2>
            <FeatureLauncher />
          </div>
        </section>

        
        {/* Unique Features Grid */}
        <section className="py-20 bg-white/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Advanced AI Capabilities
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Cutting-edge features powered by neural networks and machine learning
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Link 
                  key={index} 
                  to={feature.href} 
                  className="group"
                  style={{ animationDelay: feature.delay }}
                >
                  <Card className="h-full glass-card border-0 hover-lift hover-glow group-hover:scale-105 transition-all duration-500">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-soft`}>
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl text-slate-900 group-hover:text-gradient transition-all duration-300">
                            {feature.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-600 text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                      <div className="flex items-center mt-4 text-blue-600 font-medium group-hover:text-indigo-600 transition-colors">
                        <span>Explore Feature</span>
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Unique Testimonials Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Trusted by Industry Leaders
              </h2>
              <p className="text-xl text-slate-600">
                What experts are saying about our AI platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="glass-card border-0 hover-lift">
                  <CardContent className="p-8">
                    <blockquote className="text-lg text-slate-700 mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-slate-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Unique CTA Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold mb-6">
                Ready to Transform Your Operations?
              </h2>
              <p className="text-xl text-blue-100 mb-12 leading-relaxed">
                Join the future of intelligent metallurgy with our AI-powered platform. 
                Experience unprecedented precision and efficiency.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button size="lg" className="px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 shadow-soft hover-lift">
                    <Sparkles className="h-5 w-5 mr-3" />
                    Start Free Trial
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-4 border-white/30 text-white hover:bg-white/10 glass-button">
                  <Activity className="h-5 w-5 mr-3" />
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
