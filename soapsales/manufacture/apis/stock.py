from rest_framework import viewsets
from manufacture.models import ManufacturedStockItem
from manufacture.serializers import  ManufacturedStockItemCreateUpdateSerializer, ManufacturedStockItemSerializer


class ManufacturedStockItemViewSet(viewsets.ModelViewSet):

	def get_serializer_class(self):
		if self.action in ['create', 'put', 'patch']:
			return ManufacturedStockItemCreateUpdateSerializer
		return ManufacturedStockItemSerializer


	def get_queryset(self, *args, **kwargs):
		queryset = ManufacturedStockItemSerializer.objects.prefetch_related(
																	'item',
																	'warehouse',
																	'location'
																)

		return queryset
		