from rest_framework import permissions, viewsets
from rest_framework import status
from accounts.models import *
from accounts.serializers import (
				AssetDetailSerializer,
				CreateAssetsSerializer,
				AssetsListSerializer
			)

class AssetViewSet(viewsets.ModelViewSet):
	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return CreateAssetsSerializer
		elif self.action == 'retrieve':
			AssetDetailSerializer
		return AssetsListSerializer

	def get_queryset(self, *args, **kwargs):
		queryset = Asset.objects.prefetch_related(
										'credit_account', 
										'created_by', 
										'entry'
									)

		return queryset


	def perfom_create(self, serializer):
		return serializer.save(created_by=self.request.user)

		




