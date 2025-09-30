
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import AlloyComposition, ProcessData, Inventory, Alert
from .serializers import AlloyCompositionSerializer, ProcessDataSerializer, InventorySerializer, AlertSerializer

class AlloyCompositionViewSet(viewsets.ModelViewSet):
    queryset = AlloyComposition.objects.all()
    serializer_class = AlloyCompositionSerializer

    @action(detail=False, methods=['get'])
    def by_grade(self, request):
        grade = request.query_params.get('grade')
        if grade:
            compositions = self.queryset.filter(grade=grade)
            serializer = self.get_serializer(compositions, many=True)
            return Response(serializer.data)
        return Response({'error': 'Grade parameter required'}, status=status.HTTP_400_BAD_REQUEST)

class ProcessDataViewSet(viewsets.ModelViewSet):
    queryset = ProcessData.objects.all()
    serializer_class = ProcessDataSerializer

    @action(detail=False, methods=['get'])
    def recent(self, request):
        hours = int(request.query_params.get('hours', 24))
        cutoff_time = timezone.now() - timezone.timedelta(hours=hours)
        recent_data = self.queryset.filter(timestamp__gte=cutoff_time)
        serializer = self.get_serializer(recent_data, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_furnace(self, request):
        furnace_id = request.query_params.get('furnace_id')
        if furnace_id:
            data = self.queryset.filter(furnace_id=furnace_id)
            serializer = self.get_serializer(data, many=True)
            return Response(serializer.data)
        return Response({'error': 'Furnace ID required'}, status=status.HTTP_400_BAD_REQUEST)

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

    @action(detail=False, methods=['get'])
    def low_stock(self, request):
        threshold = float(request.query_params.get('threshold', 100))
        low_stock_items = self.queryset.filter(quantity__lt=threshold)
        serializer = self.get_serializer(low_stock_items, many=True)
        return Response(serializer.data)

class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer

    @action(detail=False, methods=['get'])
    def active(self, request):
        active_alerts = self.queryset.filter(is_resolved=False)
        serializer = self.get_serializer(active_alerts, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def resolve(self, request, pk=None):
        alert = self.get_object()
        alert.is_resolved = True
        alert.resolved_at = timezone.now()
        alert.save()
        return Response({'status': 'Alert resolved'})
