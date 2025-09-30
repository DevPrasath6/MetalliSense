
from djongo import models
from django.utils import timezone

class AlloyComposition(models.Model):
    name = models.CharField(max_length=100)
    grade = models.CharField(max_length=50)
    elements = models.JSONField(default=dict)  # e.g., {"Fe": 70.5, "Cr": 18.2, "Ni": 8.1}
    properties = models.JSONField(default=dict)  # mechanical properties
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'alloy_compositions'

    def __str__(self):
        return f"{self.name} - {self.grade}"

class ProcessData(models.Model):
    furnace_id = models.CharField(max_length=50)
    temperature = models.FloatField()
    pressure = models.FloatField()
    oxygen_level = models.FloatField()
    composition_data = models.JSONField(default=dict)
    timestamp = models.DateTimeField(default=timezone.now)
    quality_score = models.FloatField(null=True, blank=True)

    class Meta:
        db_table = 'process_data'

    def __str__(self):
        return f"Furnace {self.furnace_id} - {self.timestamp}"

class Inventory(models.Model):
    material_name = models.CharField(max_length=100)
    material_type = models.CharField(max_length=50)  # raw, alloy, additive
    quantity = models.FloatField()
    unit = models.CharField(max_length=20)
    supplier = models.CharField(max_length=100)
    quality_grade = models.CharField(max_length=20)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'inventory'

    def __str__(self):
        return f"{self.material_name} - {self.quantity} {self.unit}"

class Alert(models.Model):
    SEVERITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]
    
    title = models.CharField(max_length=200)
    message = models.TextField()
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES)
    source = models.CharField(max_length=100)  # furnace_id, system, etc.
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    resolved_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'alerts'

    def __str__(self):
        return f"{self.title} - {self.severity}"
