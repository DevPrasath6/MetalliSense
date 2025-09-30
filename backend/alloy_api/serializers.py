
from rest_framework import serializers
from .models import AlloyComposition, ProcessData, Inventory, Alert

class AlloyCompositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlloyComposition
        fields = '__all__'

class ProcessDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessData
        fields = '__all__'

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = '__all__'
