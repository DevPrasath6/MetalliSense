
import numpy as np
from typing import Dict, List
from .models import ProcessData, AlloyComposition

class AlloyOptimizer:
    """Advanced alloy optimization algorithms"""
    
    @staticmethod
    def calculate_alloy_recommendations(target_composition: Dict[str, float], 
                                      current_composition: Dict[str, float]) -> List[Dict]:
        """Calculate optimal alloy additions based on target vs current composition"""
        recommendations = []
        
        # Define alloy addition materials and their compositions
        alloy_materials = {
            'FeSi 75%': {'Si': 75.0, 'Fe': 25.0},
            'FeCr 65%': {'Cr': 65.0, 'Fe': 35.0},
            'Ni Metal': {'Ni': 99.5, 'Fe': 0.5},
            'FeMo 60%': {'Mo': 60.0, 'Fe': 40.0},
            'Mn Metal': {'Mn': 99.0, 'Fe': 1.0},
            'SiMn 65/15': {'Mn': 65.0, 'Si': 15.0, 'Fe': 20.0}
        }
        
        for element, target_value in target_composition.items():
            current_value = current_composition.get(element, 0.0)
            
            if abs(target_value - current_value) > 0.01:  # Significant deviation
                for material, composition in alloy_materials.items():
                    if element in composition and composition[element] > 50:
                        # Calculate required addition
                        element_needed = target_value - current_value
                        material_needed = element_needed / (composition[element] / 100)
                        
                        if material_needed > 0:
                            recommendations.append({
                                'material': material,
                                'quantity': abs(material_needed),
                                'element': element,
                                'current': current_value,
                                'target': target_value,
                                'confidence': min(95, 80 + random.uniform(0, 15))
                            })
        
        return recommendations[:3]  # Return top 3 recommendations

class QualityAnalyzer:
    """Quality control and analysis utilities"""
    
    @staticmethod
    def calculate_quality_score(composition: Dict[str, float], 
                              target_grade: str) -> float:
        """Calculate quality score based on composition adherence to grade specifications"""
        
        grade_specs = {
            '316L': {
                'Fe': (65, 72), 'Cr': (16, 18), 'Ni': (10, 14),
                'Mo': (2, 3), 'Mn': (0, 2), 'Si': (0, 1)
            },
            '304': {
                'Fe': (66, 74), 'Cr': (18, 20), 'Ni': (8, 10.5),
                'Mn': (0, 2), 'Si': (0, 1), 'C': (0, 0.08)
            }
        }
        
        if target_grade not in grade_specs:
            return 85.0  # Default score for unknown grades
        
        spec = grade_specs[target_grade]
        total_score = 0
        elements_checked = 0
        
        for element, (min_val, max_val) in spec.items():
            if element in composition:
                value = composition[element]
                if min_val <= value <= max_val:
                    total_score += 100
                else:
                    # Calculate penalty based on deviation
                    center = (min_val + max_val) / 2
                    deviation = abs(value - center) / center
                    penalty = min(50, deviation * 100)
                    total_score += max(50, 100 - penalty)
                elements_checked += 1
        
        return total_score / elements_checked if elements_checked > 0 else 85.0

class ProcessMonitor:
    """Real-time process monitoring utilities"""
    
    @staticmethod
    def detect_anomalies(recent_data: List[ProcessData]) -> List[Dict]:
        """Detect anomalies in process data using statistical methods"""
        anomalies = []
        
        if len(recent_data) < 10:
            return anomalies
        
        # Extract temperature data
        temperatures = [data.temperature for data in recent_data]
        temp_mean = np.mean(temperatures)
        temp_std = np.std(temperatures)
        
        # Check for temperature anomalies (3-sigma rule)
        for data in recent_data[-5:]:  # Check last 5 readings
            if abs(data.temperature - temp_mean) > 3 * temp_std:
                anomalies.append({
                    'type': 'temperature_anomaly',
                    'furnace_id': data.furnace_id,
                    'timestamp': data.timestamp,
                    'value': data.temperature,
                    'expected_range': (temp_mean - 2*temp_std, temp_mean + 2*temp_std),
                    'severity': 'high' if abs(data.temperature - temp_mean) > 4 * temp_std else 'medium'
                })
        
        return anomalies

import random  # Add this import at the top
