
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlloyCompositionViewSet, ProcessDataViewSet, InventoryViewSet, AlertViewSet
from . import advanced_views

router = DefaultRouter()
router.register(r'compositions', AlloyCompositionViewSet)
router.register(r'process-data', ProcessDataViewSet)
router.register(r'inventory', InventoryViewSet)
router.register(r'alerts', AlertViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
    # Advanced AI endpoints
    path('ai/recommendations/', advanced_views.generate_recommendations, name='ai_recommendations'),
    path('ai/quality-analysis/', advanced_views.quality_analysis, name='quality_analysis'),
    path('ai/optimize-process/', advanced_views.optimize_process, name='optimize_process'),
    path('ai/predictive-maintenance/', advanced_views.predictive_maintenance, name='predictive_maintenance'),
    path('dashboard/metrics/', advanced_views.dashboard_metrics, name='dashboard_metrics'),
]
