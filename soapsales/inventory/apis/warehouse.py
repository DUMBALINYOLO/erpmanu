
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from inventory.models import WareHouse, InventoryStockItem, StorageMedia

from inventory.serializers import (
			InventoryStockItemCreateSerializer,
			InventoryStockItemListSerializer,
			WareHouseDetailSerializer,
			WareHouseListSerializer,
			WareHouseCreateUpdateSerializer,
			StorageMediaDetailSerializer,
			StorageMediaCreateUpdateSerializer,
			StorageMediaListSerializer,
	)


class WareHouseViewSet(viewsets.ModelViewSet):

	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]

	def get_serializer_class(self):
		if self.action in ['create', 'patch', 'put']:
		    return WareHouseCreateUpdateSerializer
		elif self.action == 'retrieve':
			return StorageMediaDetailSerializer
		return WareHouseListSerializer


	def get_queryset(self, *args, **kwargs):

		queryset = WareHouse.objects.prefetch_related(
												'inventory_controller'
											).order_by('-id')

		return queryset



class InventoryStockItemViewSet(viewsets.ModelViewSet):

	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]

	def get_serializer_class(self):
		if self.action in ['create', 'patch', 'put']:
			return InventoryStockItemCreateSerializer
		return InventoryStockItemListSerializer


	def get_queryset(self, *args, **kwargs):
		queryset = InventoryStockItem.objects.prefetch_related(
												'item',
												'warehouse',
												'location'
											).order_by('-id')

		return queryset



		
class StorageMediaViewSet(viewsets.ModelViewSet):

	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]

	def get_serializer_class(self):
		if self.action in ['create', 'patch', 'put']:
		    return StorageMediaCreateUpdateSerializer
		elif self.action == 'retrieve':
			return StorageMediaDetailSerializer
		return StorageMediaListSerializer


	def get_queryset(self, *args, **kwargs):
		queryset = StorageMedia.objects.prefetch_related(
												'warehouse',

											).order_by('-id')

		return queryset

