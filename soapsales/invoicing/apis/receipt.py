from rest_framework import viewsets, permissions
from invoicing.models import CustomerReceipt
from invoicing.serializers import(
						CustomerReceiptListSerializer,
						CustomerReceiptDetailSerializer,	
					)


class CustomerReceiptViewSet(viewsets.ModelViewSet):
	

	def get_serializer_class(self):
		if self.action == 'retrieve':
		    return CustomerReceiptDetailSerializer
		return CustomerReceiptListSerializer


	def get_queryset(sel, *args, **kwargs):

		queryset = CustomerReceipt.objects.prefetch_related(
													'cashier',
													'customer'
												)

		return queryset 


		