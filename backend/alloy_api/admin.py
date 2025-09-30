
from django.contrib import admin
from .models import AlloyComposition, ProcessData, Inventory, Alert

@admin.register(AlloyComposition)
class AlloyCompositionAdmin(admin.ModelAdmin):
    list_display = ['name', 'grade', 'created_at']
    list_filter = ['grade', 'created_at']
    search_fields = ['name', 'grade']

@admin.register(ProcessData)
class ProcessDataAdmin(admin.ModelAdmin):
    list_display = ['furnace_id', 'temperature', 'pressure', 'timestamp']
    list_filter = ['furnace_id', 'timestamp']
    ordering = ['-timestamp']

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ['material_name', 'material_type', 'quantity', 'unit', 'supplier']
    list_filter = ['material_type', 'supplier', 'quality_grade']
    search_fields = ['material_name', 'supplier']

@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ['title', 'severity', 'source', 'is_resolved', 'created_at']
    list_filter = ['severity', 'is_resolved', 'source']
    search_fields = ['title', 'message']
    actions = ['mark_resolved']

    def mark_resolved(self, request, queryset):
        from django.utils import timezone
        queryset.update(is_resolved=True, resolved_at=timezone.now())
    mark_resolved.short_description = "Mark selected alerts as resolved"
