from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from inventory.models import Supplier, SupplierAddress
from inventory.serializers import (
						CreateUpdateSupplierSerializer,
						ListSupplierSerializer,
						SupplierDetailSerializer,
						SupplierAddressCreateUpdateSerializer,
						SupplierAddressSerializer
					)


class ActiveSupplierViewSet(viewsets.ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]

	lookup_field = 'id'

	def get_serializer_class(self):
		if self.action in ['create', 'put', 'patch']:
		    return CreateUpdateSupplierSerializer
		elif self.action == 'retrieve':
			return SupplierDetailSerializer
		return ListSupplierSerializer


	def get_queryset(self, *args, **kwargs):

		queryset = Supplier.objects.prefetch_related(
												'account'
											).filter(
												Q(status='active')
										).order_by('-id')

		return queryset


	@action(methods=['POST', 'GET', 'PUT'], detail=True)
	def deactivate_supplier(self, request, *args, **kwargs):

		supplier = self.get_object()
		if supplier.status == 'de-activated':
			return Response({'message': 'Supplier has already been De Activated'})
		supplier.status = 'de-activated'
		supplier.save()
		return Response({'message': 'Supplier has succesfully been deactivated'})


class DeActivedSupplierViewSet(viewsets.ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]
	lookup_field = 'id'

	def get_serializer_class(self):
		if self.action in ['create', 'put', 'patch']:
		    return CreateUpdateSupplierSerializer
		elif self.action == 'retrieve':
			return SupplierDetailSerializer
		return ListSupplierSerializer


	def get_queryset(self, *args, **kwargs):

		queryset = Supplier.objects.prefetch_related(
												'account'
											).filter(
												Q(status='de-activated')
										).order_by('-id')

		return queryset

	@action(methods=['POST', 'GET', 'PUT'], detail=True)
	def activate_supplier(self, request, *args, **kwargs):

		supplier = self.get_object()
		if supplier.status == 'active':
			return Response({'message': 'Supplier has already been De Activated'})
		supplier.status = 'active'
		supplier.save()
		return Response({'message': 'Supplier has succesfully been activated'})



class SupplierAddressViewSet(viewsets.ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]

	def get_serializer_class(self):
		if self.action in ['create', 'put', 'patch']:
		    return SupplierAddressCreateUpdateSerializer
		return SupplierAddressSerializer


	def get_queryset(self, *args, **kwargs):

		queryset = SupplierAddress.objects.prefetch_related(
												'owner'
											).order_by('-id')

		return queryset




