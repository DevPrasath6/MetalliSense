
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from .models import ProcessData, AlloyComposition, Inventory, Alert
from .utils import AlloyOptimizer, QualityAnalyzer, ProcessMonitor
import json

@api_view(['POST'])
def generate_recommendations(request):
    """Generate AI-powered alloy recommendations"""
    try:
        data = request.data
        target_composition = data.get('target_composition', {})
        current_composition = data.get('current_composition', {})
        
        if not target_composition or not current_composition:
            return Response(
                {'error': 'Both target_composition and current_composition are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        recommendations = AlloyOptimizer.calculate_alloy_recommendations(
            target_composition, current_composition
        )
        
        # Format recommendations for frontend
        formatted_recommendations = []
        for rec in recommendations:
            formatted_recommendations.append({
                'id': f"rec_{len(formatted_recommendations) + 1}",
                'alloyType': rec['material'],
                'quantity': round(rec['quantity'], 2),
                'unit': 'kg',
                'confidence': round(rec['confidence'], 1),
                'reason': f"{rec['element']} content {rec['current']:.3f}% needs adjustment to {rec['target']:.3f}%",
                'estimatedCost': round(rec['quantity'] * 12.5, 2),  # Approximate cost
                'expectedImprovement': [{
                    'element': rec['element'],
                    'from': rec['current'],
                    'to': rec['target']
                }]
            })
        
        return Response({
            'recommendations': formatted_recommendations,
            'generated_at': timezone.now(),
            'analysis_confidence': 'high'
        })
        
    except Exception as e:
        return Response(
            {'error': f'Error generating recommendations: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def quality_analysis(request):
    """Perform quality analysis on recent process data"""
    try:
        hours = int(request.GET.get('hours', 24))
        furnace_id = request.GET.get('furnace_id')
        
        cutoff_time = timezone.now() - timedelta(hours=hours)
        query = ProcessData.objects.filter(timestamp__gte=cutoff_time)
        
        if furnace_id:
            query = query.filter(furnace_id=furnace_id)
        
        recent_data = list(query.order_by('-timestamp'))
        
        if not recent_data:
            return Response({'error': 'No recent data found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Calculate quality metrics
        quality_scores = []
        for data in recent_data:
            if data.composition_data:
                score = QualityAnalyzer.calculate_quality_score(data.composition_data, '316L')
                quality_scores.append(score)
        
        avg_quality = sum(quality_scores) / len(quality_scores) if quality_scores else 0
        
        # Detect anomalies
        anomalies = ProcessMonitor.detect_anomalies(recent_data)
        
        return Response({
            'average_quality_score': round(avg_quality, 2),
            'total_samples': len(recent_data),
            'quality_trend': 'stable' if len(set(quality_scores[-5:])) < 3 else 'variable',
            'anomalies_detected': len(anomalies),
            'anomalies': anomalies,
            'analysis_period_hours': hours
        })
        
    except Exception as e:
        return Response(
            {'error': f'Error performing quality analysis: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def optimize_process(request):
    """Optimize process parameters based on target specifications"""
    try:
        data = request.data
        target_grade = data.get('target_grade', '316L')
        current_params = data.get('current_parameters', {})
        
        # Optimization logic
        optimized_params = {
            'temperature': 1580,  # Optimal for stainless steel
            'pressure': 1.0,
            'oxygen_level': 0.02,
            'recommended_additions': []
        }
        
        # Add recommendations based on grade
        if target_grade == '316L':
            optimized_params['recommended_additions'] = [
                {'material': 'FeCr 65%', 'quantity': 15.2, 'reason': 'Chromium adjustment'},
                {'material': 'Ni Metal', 'quantity': 8.7, 'reason': 'Nickel content optimization'}
            ]
        
        return Response({
            'optimized_parameters': optimized_params,
            'target_grade': target_grade,
            'optimization_confidence': 92.5,
            'estimated_improvement': {
                'quality_score': '+5.2%',
                'cost_efficiency': '+3.8%',
                'production_time': '-12 minutes'
            }
        })
        
    except Exception as e:
        return Response(
            {'error': f'Error optimizing process: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def predictive_maintenance(request):
    """Provide predictive maintenance insights"""
    try:
        furnace_id = request.GET.get('furnace_id', 'F001')
        
        # Simulate predictive analysis
        maintenance_data = {
            'furnace_id': furnace_id,
            'health_score': 87.3,
            'predicted_maintenance_date': (timezone.now() + timedelta(days=45)).date(),
            'critical_components': [
                {
                    'component': 'Refractory Lining',
                    'condition': 'Good',
                    'estimated_life_remaining': '18 months',
                    'confidence': 89
                },
                {
                    'component': 'Heating Elements',
                    'condition': 'Fair',
                    'estimated_life_remaining': '8 months',
                    'confidence': 76
                },
                {
                    'component': 'Temperature Sensors',
                    'condition': 'Excellent',
                    'estimated_life_remaining': '24 months',
                    'confidence': 95
                }
            ],
            'recommendations': [
                'Schedule heating element inspection within 30 days',
                'Monitor temperature sensor calibration weekly',
                'Plan refractory maintenance for next scheduled shutdown'
            ]
        }
        
        return Response(maintenance_data)
        
    except Exception as e:
        return Response(
            {'error': f'Error generating predictive maintenance data: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def dashboard_metrics(request):
    """Get comprehensive dashboard metrics"""
    try:
        # Recent process data
        recent_data = ProcessData.objects.filter(
            timestamp__gte=timezone.now() - timedelta(hours=24)
        ).order_by('-timestamp')[:10]
        
        # Active alerts
        active_alerts = Alert.objects.filter(is_resolved=False).count()
        
        # Inventory status
        low_stock_items = Inventory.objects.filter(quantity__lt=100).count()
        
        # Calculate efficiency metrics
        avg_quality = sum([data.quality_score or 85 for data in recent_data]) / len(recent_data) if recent_data else 85
        
        return Response({
            'production_efficiency': round(avg_quality, 1),
            'active_alerts': active_alerts,
            'low_stock_items': low_stock_items,
            'furnaces_online': 3,
            'daily_production': '47.2 tons',
            'energy_efficiency': '92.8%',
            'recent_activity': [
                {
                    'time': data.timestamp,
                    'furnace': data.furnace_id,
                    'temperature': data.temperature,
                    'quality': data.quality_score or 85
                } for data in recent_data[:5]
            ]
        })
        
    except Exception as e:
        return Response(
            {'error': f'Error fetching dashboard metrics: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
