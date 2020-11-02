from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from inventory.serializers import (
				InventoryItemListSerializer,
				InventoryItemCreateSerializer,
				InventoryItemDetailSerializer,
			)

from inventory.models import InventoryItem


class InventoryItemViewSet(ModelViewSet):
	serializer_class = InventoryItemListSerializer

	def get_queryset(self, *args, **kwargs):
		queryset = InventoryItem.objects.prefetch_related(
										'category',
										'supplier'
									)
		return queryset


class RawMaterialsViewSet(ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]
    

	def get_serializer_class(self):
		if self.action == 'retrieve':
			return	InventoryItemDetailSerializer
		elif self.action == 'list':
			return InventoryItemListSerializer
		return InventoryItemCreateSerializer

	def get_queryset(self, *args, **kwargs):
		queryset = InventoryItem.objects.prefetch_related(
										'category',
										'supplier'
									).filter(
									type = 'RawMaterial'
								)

		return queryset

 
class EquipmentViewSet(ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]
    

	def get_serializer_class(self):
		if self.action == 'retrieve':
			return	InventoryItemDetailSerializer
		elif self.action == 'list':
			return InventoryItemListSerializer
		return InventoryItemCreateSerializer

	def get_queryset(self, *args, **kwargs):
		queryset = InventoryItem.objects.prefetch_related(
										'category',
										'supplier'
									).filter(
									type = 'Equipment'
								)

		return queryset


class ConsumablesViewSet(ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]
    

	def get_serializer_class(self):
		if self.action == 'retrieve':
			return	InventoryItemDetailSerializer
		elif self.action == 'list':
			return InventoryItemListSerializer
		return InventoryItemCreateSerializer

	def get_queryset(self, *args, **kwargs):
		queryset = InventoryItem.objects.prefetch_related(
										'category',
										'supplier'
									).filter(
									type = 'Consumables'
								)

		return queryset

