
from django.core.management.base import BaseCommand
from django.utils import timezone
from alloy_api.models import AlloyComposition, ProcessData, Inventory, Alert
import random

class Command(BaseCommand):
    help = 'Populate database with sample data for testing'

    def handle(self, *args, **options):
        self.stdout.write('Populating sample data...')
        
        # Create sample alloy compositions
        alloy_compositions = [
            {
                'name': 'Stainless Steel 316L',
                'grade': '316L',
                'elements': {'Fe': 68.5, 'Cr': 17.2, 'Ni': 10.1, 'Mo': 2.1, 'Mn': 1.8, 'Si': 0.3},
                'properties': {'tensile_strength': 515, 'yield_strength': 205, 'elongation': 40}
            },
            {
                'name': 'Stainless Steel 304',
                'grade': '304',
                'elements': {'Fe': 70.0, 'Cr': 18.0, 'Ni': 8.5, 'Mn': 2.0, 'Si': 1.0, 'C': 0.5},
                'properties': {'tensile_strength': 505, 'yield_strength': 215, 'elongation': 40}
            },
            {
                'name': 'Carbon Steel AISI 1045',
                'grade': '1045',
                'elements': {'Fe': 98.5, 'C': 0.45, 'Mn': 0.75, 'Si': 0.25, 'P': 0.03, 'S': 0.05},
                'properties': {'tensile_strength': 625, 'yield_strength': 375, 'elongation': 16}
            }
        ]
        
        for comp_data in alloy_compositions:
            AlloyComposition.objects.get_or_create(
                name=comp_data['name'],
                defaults=comp_data
            )
        
        # Create sample process data
        furnace_ids = ['F001', 'F002', 'F003']
        for _ in range(50):
            ProcessData.objects.create(
                furnace_id=random.choice(furnace_ids),
                temperature=random.uniform(1450, 1650),
                pressure=random.uniform(0.8, 1.2),
                oxygen_level=random.uniform(0.01, 0.05),
                composition_data={
                    'Fe': random.uniform(65, 75),
                    'Cr': random.uniform(16, 20),
                    'Ni': random.uniform(8, 12),
                    'Mo': random.uniform(1.5, 2.5)
                },
                quality_score=random.uniform(85, 98)
            )
        
        # Create sample inventory
        materials = [
            {'name': 'Iron Ore', 'type': 'raw', 'unit': 'tons'},
            {'name': 'Chromium', 'type': 'alloy', 'unit': 'kg'},
            {'name': 'Nickel', 'type': 'alloy', 'unit': 'kg'},
            {'name': 'Molybdenum', 'type': 'alloy', 'unit': 'kg'},
            {'name': 'Silicon', 'type': 'additive', 'unit': 'kg'},
            {'name': 'Manganese', 'type': 'additive', 'unit': 'kg'}
        ]
        
        for material in materials:
            Inventory.objects.get_or_create(
                material_name=material['name'],
                defaults={
                    'material_type': material['type'],
                    'quantity': random.uniform(50, 500),
                    'unit': material['unit'],
                    'supplier': f"Supplier {random.randint(1, 5)}",
                    'quality_grade': random.choice(['A', 'B', 'Premium'])
                }
            )
        
        # Create sample alerts
        alert_templates = [
            {
                'title': 'Temperature Deviation',
                'message': 'Furnace temperature exceeded optimal range',
                'severity': 'high',
                'source': 'F001'
            },
            {
                'title': 'Low Inventory Warning',
                'message': 'Chromium inventory below threshold',
                'severity': 'medium',
                'source': 'inventory'
            },
            {
                'title': 'Quality Control Alert',
                'message': 'Composition deviation detected',
                'severity': 'critical',
                'source': 'quality_control'
            }
        ]
        
        for alert_data in alert_templates:
            Alert.objects.create(**alert_data)
        
        self.stdout.write(self.style.SUCCESS('Sample data populated successfully!'))
