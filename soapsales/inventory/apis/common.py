from rest_framework import viewsets, permissions
from inventory.models import (
					InventorySettings,
					Category
				)
from inventory.serializers import (
						InventorySettingsSerializer,
						CategorySerializer,
						CategoryCreateSerializer,
					)


class InventorySettingsViewset(viewsets.ModelViewSet):
	queryset = InventorySettings.objects.all()
	serializer_class = InventorySettingsSerializer




class CategoryViewset(viewsets.ModelViewSet):
	queryset = Category.objects.filter(parent__isnull=True)
	serializer_class = CategorySerializer
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]

	def get_serializer_class(self):
		if self.action == 'create':
		    return CategoryCreateSerializer
		return CategorySerializer
