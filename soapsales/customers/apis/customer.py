from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from customers.models import Customer, CustomerAddress

from customers.serializers import(
						CustomerAddressCreateUpdateSerializer,
						CustomerAddressSerializer,
						CustomerListSerializer,
						CustomerCreateUpdateSerializer,
						CustomerDetailSerializer

					)


class ActiveCustomerViewSet(viewsets.ModelViewSet):

	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]


	def get_serializer_class(self):
		if self.action in ['create', 'patch', 'put']:
			return CustomerCreateUpdateSerializer
		elif self.action == 'retrieve':
			return CustomerDetailSerializer
		return CustomerListSerializer


	def get_queryset(self, *args, **kwargs):
		queryset = Customer.objects.prefetch_related(
											'account'
										).filter(
											status='active'
									).order_by('-id')

		return queryset


	@action(methods=['POST', ], detail=False)
	def deactivate_customer(self, request, *args, **kwargs):

		customer = self.get_object()
		if customer.status == 'de-activated':
			return Response({'message': 'Customer has already been De Activated'})
		customer.status = 'de-activated'
		customer.save()
		return Response({'message': 'Customer has succesfully been deactivated'})



class DeActivatedCustomerViewSet(viewsets.ModelViewSet):

	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]


	def get_serializer_class(self):
		if self.action in ['create', 'patch', 'put']:
			return CustomerCreateUpdateSerializer
		elif self.action == 'retrieve':
			return CustomerDetailSerializer
		return CustomerListSerializer


	def get_queryset(self, *args, **kwargs):
		queryset = Customer.objects.prefetch_related(
											'account'
										).filter(
											Q(status='de-activated'),
									).order_by('-id')


		return queryset


class CustomerAddressViewSet(viewsets.ModelViewSet):

	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]


	def get_serializer_class(self):
		if self.action in ['create', 'patch', 'put']:
			return CustomerAddressCreateUpdateSerializer
		return CustomerAddressSerializer



	def get_queryset(self, *args, **kwargs):
		queryset = CustomerAddress.objects.prefetch_related(
											'owner'
										).order_by('-id')

		return queryset
