from rest_framework import viewsets, permissions
from invoicing.models import Payment
from invoicing.serializers import(
						PaymentListSerializer,
						PaymentCreateSerializer,
						PaymentDetailSerializer		
					)


class PaymentViewSet(viewsets.ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]



	def get_serializer_class(self):
		if self.action == 'list':
		    return PaymentListSerializer
		elif self.action == 'create':
			return PaymentCreateSerializer
		return PaymentDetailSerializer

	# def perform_create(self, serializer):

	# 	return serializer.save(cashier=self.request.user)


	def get_queryset(self, *args, **kwargs):

		queryset = Payment.objects.prefetch_related(
												'invoice',
												'cashier',
												'entry',
												'cash',
												'receipt'
											)
		return queryset