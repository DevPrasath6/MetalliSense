
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertTriangle, Download, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

interface AlloyRecommendation {
  id: string;
  alloyType: string;
  quantity: number;
  unit: string;
  confidence: number;
  reason: string;
  estimatedCost: number;
  expectedImprovement: {
    element: string;
    from: number;
    to: number;
  }[];
}

export const AlloyRecommendationPanel = () => {
  const [recommendations] = useState<AlloyRecommendation[]>([
    {
      id: '1',
      alloyType: 'FeSi 75%',
      quantity: 12.5,
      unit: 'kg',
      confidence: 94,
      reason: 'Silicon content 0.08% below target. Historical data shows FeSi 75% most effective.',
      estimatedCost: 185.50,
      expectedImprovement: [
        { element: 'Si', from: 2.12, to: 2.20 }
      ]
    },
    {
      id: '2',
      alloyType: 'Mn Metal',
      quantity: 3.2,
      unit: 'kg',
      confidence: 87,
      reason: 'Minor manganese adjustment needed for optimal hardenability.',
      estimatedCost: 45.20,
      expectedImprovement: [
        { element: 'Mn', from: 0.68, to: 0.70 }
      ]
    }
  ]);

  const [approvalStatus, setApprovalStatus] = useState<{[key: string]: 'pending' | 'approved' | 'rejected'}>({});
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleApproval = (id: string, status: 'approved' | 'rejected') => {
    setApprovalStatus(prev => ({ ...prev, [id]: status }));
    console.log(`Recommendation ${id} ${status}`);
  };

  const generatePDFReport = async () => {
    setIsGeneratingPDF(true);
    
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 6;
      let yPosition = 30;
      let currentPage = 1;

      const addNewPageIfNeeded = (requiredSpace: number = 20) => {
        if (yPosition + requiredSpace > pageHeight - 30) {
          pdf.addPage();
          currentPage++;
          yPosition = 30;
          return true;
        }
        return false;
      };

      const addFooter = () => {
        const totalPages = pdf.internal.pages.length - 1; // -1 because pages array includes a null first element
        pdf.setFontSize(10);
        pdf.setTextColor(156, 163, 175);
        pdf.text(`Page ${currentPage} of ${totalPages}`, pageWidth - margin - 30, pageHeight - 10);
        pdf.text('Alloy Alchemy Advisor - Confidential', margin, pageHeight - 10);
      };

      // Header
      pdf.setFontSize(20);
      pdf.setTextColor(51, 65, 85);
      pdf.text('Comprehensive Alloy Recommendation Report', margin, yPosition);
      
      // Date and Time
      yPosition += 15;
      pdf.setFontSize(12);
      pdf.setTextColor(100, 116, 139);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, margin, yPosition);
      
      yPosition += 10;
      pdf.text(`Report ID: ALR-${Date.now()}`, margin, yPosition);
      
      // Executive Summary Section
      addNewPageIfNeeded(50);
      yPosition += 20;
      pdf.setFontSize(16);
      pdf.setTextColor(51, 65, 85);
      pdf.text('Executive Summary', margin, yPosition);
      
      yPosition += 15;
      pdf.setFontSize(11);
      pdf.setTextColor(71, 85, 105);
      const totalCost = recommendations.reduce((sum, rec) => sum + rec.estimatedCost, 0);
      const avgConfidence = recommendations.reduce((sum, rec) => sum + rec.confidence, 0) / recommendations.length;
      
      const summaryItems = [
        `Total Recommendations: ${recommendations.length}`,
        `Total Estimated Cost: $${totalCost.toFixed(2)}`,
        `Average Confidence Score: ${avgConfidence.toFixed(1)}%`,
        `High Confidence Recommendations (>90%): ${recommendations.filter(r => r.confidence > 90).length}`,
        `Medium Confidence Recommendations (80-90%): ${recommendations.filter(r => r.confidence >= 80 && r.confidence <= 90).length}`,
        `Lower Confidence Recommendations (<80%): ${recommendations.filter(r => r.confidence < 80).length}`
      ];

      summaryItems.forEach(item => {
        addNewPageIfNeeded(10);
        pdf.text(`• ${item}`, margin + 5, yPosition);
        yPosition += lineHeight + 2;
      });

      // Cost Analysis Section
      addNewPageIfNeeded(40);
      yPosition += 15;
      pdf.setFontSize(16);
      pdf.setTextColor(51, 65, 85);
      pdf.text('Cost Analysis', margin, yPosition);
      
      yPosition += 15;
      pdf.setFontSize(11);
      pdf.setTextColor(71, 85, 105);
      
      const costBreakdown = recommendations.map(rec => ({
        alloy: rec.alloyType,
        cost: rec.estimatedCost,
        percentage: (rec.estimatedCost / totalCost * 100).toFixed(1)
      }));

      costBreakdown.forEach(item => {
        addNewPageIfNeeded(8);
        pdf.text(`${item.alloy}: $${item.cost.toFixed(2)} (${item.percentage}%)`, margin + 5, yPosition);
        yPosition += lineHeight + 1;
      });

      // Detailed Recommendations Section
      addNewPageIfNeeded(30);
      yPosition += 20;
      pdf.setFontSize(16);
      pdf.setTextColor(51, 65, 85);
      pdf.text('Detailed Recommendations', margin, yPosition);
      
      recommendations.forEach((rec, index) => {
        addNewPageIfNeeded(60);
        yPosition += 20;
        
        pdf.setFontSize(14);
        pdf.setTextColor(51, 65, 85);
        pdf.text(`${index + 1}. ${rec.alloyType}`, margin, yPosition);
        
        yPosition += 12;
        pdf.setFontSize(11);
        pdf.setTextColor(71, 85, 105);
        
        const details = [
          `Quantity Required: ${rec.quantity} ${rec.unit}`,
          `Confidence Level: ${rec.confidence}%`,
          `Estimated Cost: $${rec.estimatedCost.toFixed(2)}`,
          `Current Status: ${approvalStatus[rec.id] || 'Pending Review'}`,
          `Priority Level: ${rec.confidence > 90 ? 'High' : rec.confidence > 80 ? 'Medium' : 'Standard'}`
        ];
        
        details.forEach(detail => {
          addNewPageIfNeeded(8);
          pdf.text(`• ${detail}`, margin + 10, yPosition);
          yPosition += lineHeight + 1;
        });
        
        addNewPageIfNeeded(15);
        yPosition += 8;
        pdf.setFont(undefined, 'bold');
        pdf.text('Technical Justification:', margin + 10, yPosition);
        pdf.setFont(undefined, 'normal');
        yPosition += lineHeight + 2;
        
        // Wrap text for reason
        const maxWidth = pageWidth - margin * 2 - 20;
        const splitReason = pdf.splitTextToSize(rec.reason, maxWidth);
        splitReason.forEach((line: string) => {
          addNewPageIfNeeded(8);
          pdf.text(line, margin + 15, yPosition);
          yPosition += lineHeight;
        });
        
        addNewPageIfNeeded(20);
        yPosition += 10;
        pdf.setFont(undefined, 'bold');
        pdf.text('Expected Chemical Improvements:', margin + 10, yPosition);
        pdf.setFont(undefined, 'normal');
        yPosition += lineHeight + 2;
        
        rec.expectedImprovement.forEach(improvement => {
          addNewPageIfNeeded(8);
          const improvementText = `${improvement.element}: ${improvement.from.toFixed(3)}% → ${improvement.to.toFixed(3)}% (Δ +${(improvement.to - improvement.from).toFixed(3)}%)`;
          pdf.text(`• ${improvementText}`, margin + 15, yPosition);
          yPosition += lineHeight + 1;
        });

        // Add separator line
        addNewPageIfNeeded(10);
        yPosition += 5;
        pdf.setDrawColor(200, 200, 200);
        pdf.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 5;
      });

      // Technical Specifications Section
      addNewPageIfNeeded(40);
      yPosition += 20;
      pdf.setFontSize(16);
      pdf.setTextColor(51, 65, 85);
      pdf.text('Technical Specifications & Standards', margin, yPosition);
      
      yPosition += 15;
      pdf.setFontSize(11);
      pdf.setTextColor(71, 85, 105);
      
      const technicalSpecs = [
        'Analysis Method: X-Ray Fluorescence (XRF) Spectrometry',
        'Measurement Accuracy: ±0.01% for major elements',
        'Temperature Range: 1450°C - 1650°C',
        'Atmospheric Conditions: Controlled inert gas environment',
        'Quality Standards: ISO 9001:2015, ASTM E1019',
        'Calibration: NIST-traceable reference materials',
        'Sampling Frequency: Every 15 minutes during active production'
      ];

      technicalSpecs.forEach(spec => {
        addNewPageIfNeeded(8);
        pdf.text(`• ${spec}`, margin + 5, yPosition);
        yPosition += lineHeight + 1;
      });

      // Add footers to all pages
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(156, 163, 175);
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 30, pageHeight - 10);
        pdf.text('Alloy Alchemy Advisor - Confidential', margin, pageHeight - 10);
      }
      
      // Save the PDF
      const fileName = `comprehensive_alloy_recommendations_${new Date().toISOString().split('T')[0]}_${Date.now()}.pdf`;
      pdf.save(fileName);
      
      console.log('Comprehensive PDF report generated successfully!');
      alert(`Multi-page PDF report generated successfully!\nPages: ${totalPages}\nFile: ${fileName}`);
      
    } catch (error) {
      console.error('Error generating comprehensive PDF:', error);
      alert('Error generating comprehensive PDF report. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-700 bg-green-50 border-green-200';
    if (confidence >= 80) return 'text-blue-700 bg-blue-50 border-blue-200';
    return 'text-orange-700 bg-orange-50 border-orange-200';
  };

  return (
    <Card className="bg-card border-border shadow-elegant">
      <CardHeader className="pb-4 bg-gradient-to-r from-muted/50 to-background border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-foreground flex items-center font-semibold">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-white mr-3 shadow-elegant">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <span className="text-gradient">AI Alloy Recommendations</span>
              <div className="text-sm text-muted-foreground font-normal">Machine learning-powered composition optimization</div>
            </div>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          {recommendations.map((rec) => {
            const status = approvalStatus[rec.id] || 'pending';
            
            return (
              <div key={rec.id} className="bg-muted/50 border border-border rounded-2xl p-6 space-y-4 shadow-elegant">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-foreground text-lg">{rec.alloyType}</h3>
                      <Badge 
                        variant="outline" 
                        className={`${getConfidenceColor(rec.confidence)} font-medium border`}
                      >
                        {rec.confidence}% Confidence
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground font-medium">Quantity:</span>
                        <span className="ml-2 text-foreground font-mono font-semibold">
                          {rec.quantity} {rec.unit}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground font-medium">Est. Cost:</span>
                        <span className="ml-2 text-foreground font-mono font-semibold">
                          ${rec.estimatedCost.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => handleApproval(rec.id, 'approved')}
                          className="bg-green-600 hover:bg-green-700 text-white font-medium shadow-elegant"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleApproval(rec.id, 'rejected')}
                          className="border-border text-destructive hover:bg-destructive/10 font-medium"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    
                    {status === 'approved' && (
                      <Badge className="bg-green-600 text-white font-medium">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approved
                      </Badge>
                    )}
                    
                    {status === 'rejected' && (
                      <Badge className="bg-red-600 text-white font-medium">
                        <XCircle className="h-3 w-3 mr-1" />
                        Rejected
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-foreground font-medium">{rec.reason}</p>
                  
                  <div className="bg-background border border-border rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Expected Improvements:</h4>
                    <div className="space-y-2">
                      {rec.expectedImprovement.map((improvement, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground font-medium">{improvement.element}:</span>
                          <span className="text-foreground font-mono font-semibold">
                            {improvement.from.toFixed(3)}% → {improvement.to.toFixed(3)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Action Buttons */}
          <div className="flex justify-between items-center bg-muted/50 border border-border rounded-2xl p-6 shadow-elegant">
            <div>
              <h3 className="font-semibold text-foreground">Report Generation</h3>
              <p className="text-sm text-muted-foreground">Download comprehensive recommendation analysis</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-border hover:bg-muted text-foreground font-medium"
                onClick={generatePDFReport}
                disabled={isGeneratingPDF}
              >
                <Download className="h-4 w-4 mr-1" />
                {isGeneratingPDF ? 'Generating PDF...' : 'Generate PDF Report'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
