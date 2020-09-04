from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from invoicing.models import (
							Invoice,
							InvoiceLine,
							SalesGroupPricingDiscount
						)
from invoicing.serializers import (
								SalesGroupPricingDiscountSerializer,
								InvoiceListSerializer,
								InvoiceCreateUpdateSerializer,
								InvoiceDetailSerializer,
								InvoiceLineListSerializer,
							)



class SalesGroupPricingDiscountViewSet(viewsets.ModelViewSet):

	queryset = SalesGroupPricingDiscount.objects.all().order_by('-id')
	serializer_class = SalesGroupPricingDiscountSerializer


class InvoiceViewSet(viewsets.ModelViewSet):
	serializer_class = InvoiceListSerializer

	
	def get_queryset(self, *args, **kwargs):
		queryset = Invoice.objects.prefetch_related(
												'validated_by',
												'cashier',
												'customer',
												'ship_from',
												'entry',
											)
		return queryset







class InvoiceLineViewSet(viewsets.ModelViewSet):
	
	serializer_class = InvoiceLineListSerializer

	def get_queryset(self, *args, **kwargs):
		queryset = InvoiceLine.objects.prefetch_related(
												'invoice',
												'tax',
												'discount',
												'product'
											)

		return queryset





class QuotationViewSet(viewsets.ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]

	def get_serializer_class(self):
		if self.action in ['create', 'put', 'patch']:
			return InvoiceCreateUpdateSerializer
		elif self.action == 'retrieve':
			return  InvoiceDetailSerializer
		return InvoiceListSerializer


	def perform_create(self, serializer):
		return serializer.save(
			cashier=self.request.user, 
			validated_by=self.request.user
			)

	def get_queryset(self, *args, **kwargs):
		queryset = Invoice.objects.prefetch_related(
											'validated_by',
											'cashier',
											'customer',
											'ship_from',
											'entry',
										).filter(
											~Q(status__in =[
														'invoice', 
														'sale', 
														'canceled', 
														'refunded', 
														'paid-partially'
														]) &
											~Q(sale_type__in =[
													'credit',
													'cash'
												])
									)

		return queryset


	@action(methods=['POST', ], detail=False)
	def make_invoice(self, *args, **kwargs):
		quotation = self.get_object()
		quotation.status = 'invoice'
		quotation.sale_type = 'credit'
		quotation.save()
		return Response({
				"message": 'Quotation has been succesfully converted into an Invoice'
			})



class UnverifiedInvoiceViewSet(viewsets.ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]

	def get_serializer_class(self):
		if self.action in ['create', 'put', 'patch']:
			return InvoiceCreateUpdateSerializer
		elif self.action == 'retrieve':
			return  InvoiceDetailSerializer
		return InvoiceListSerializer


	def perform_create(self, serializer):
		return serializer.save(
			cashier=self.request.user, 
			validated_by=self.request.user
			)

	def get_queryset(self, *args, **kwargs):
		queryset = Invoice.objects.prefetch_related(
											'validated_by',
											'cashier',
											'customer',
											'ship_from',
											'entry',
										).filter(
											Q(status__in =[
														'invoice', 
														'paid-partially'
														]) &
											Q(sale_type = 'credit') &
											Q(draft=True)
									).order_by('-id')

		return queryset


	@action(methods=['POST', ], detail=False)
	def verify_invoice(self, *args, **kwargs):
		invoice = self.get_object()
		invoice.draft = False
		invoice.create_entry()
		invoice.update_inventory()
		invoice.save()
		return Response({
				"message": 'Invoice has succesfully been verified'
			})



class OverdueInvoiceViewSet(viewsets.ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]

	def get_serializer_class(self):
		if self.action in ['create', 'put', 'patch']:
			return InvoiceCreateUpdateSerializer
		elif self.action == 'retrieve':
			return  InvoiceDetailSerializer
		return InvoiceListSerializer



	def get_queryset(self, *args, **kwargs):
		unfiltered_queryset = Invoice.objects.prefetch_related(
											'validated_by',
											'cashier',
											'customer',
											'ship_from',
											'entry',
										).filter(
											Q(status__in =[
														'invoice', 
														'paid-partially'
														]) &
											Q(sale_type = 'credit')
									).order_by('-id')

		queryset = []

		for query in unfiltered_queryset:
			if query.overdue:
				queryset.append(query)

		return queryset



class VoidedInvoiceViewSet(viewsets.ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]

	def get_serializer_class(self):
		if self.action in ['create', 'put', 'patch']:
			return InvoiceCreateUpdateSerializer
		elif self.action == 'retrieve':
			return  InvoiceDetailSerializer
		return InvoiceListSerializer


	def get_queryset(self, *args, **kwargs):
		queryset = Invoice.objects.prefetch_related(
											'validated_by',
											'cashier',
											'customer',
											'ship_from',
											'entry',
										).filter(
											Q(status = 'canceled') &
											Q(sale_type__in = ['cash', 'credit']) &
											Q(is_voided=True)
									).order_by('-id')

		return queryset




class RefundedInvoiceViewSet(viewsets.ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]

	def get_serializer_class(self):
		if self.action in ['create', 'put', 'patch']:
			return InvoiceCreateUpdateSerializer
		elif self.action == 'retrieve':
			return  InvoiceDetailSerializer
		return InvoiceListSerializer


	def get_queryset(self, *args, **kwargs):
		queryset = Invoice.objects.prefetch_related(
											'validated_by',
											'cashier',
											'customer',
											'ship_from',
											'entry',
										).filter(
											Q(status = 'refunded') &
											Q(sale_type__in = ['cash', 'credit']),

									).order_by('-id')

		return queryset



class FullyPaidNotSaleInvoiceViewSet(viewsets.ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]

	def get_serializer_class(self):
		if self.action in ['create', 'put', 'patch']:
			return InvoiceCreateUpdateSerializer
		elif self.action == 'retrieve':
			return  InvoiceDetailSerializer
		return InvoiceListSerializer


	def perform_create(self, serializer):
		return serializer.save(
			cashier=self.request.user, 
			validated_by=self.request.user
			)

	def get_queryset(self, *args, **kwargs):
		unfiltered_queryset = Invoice.objects.prefetch_related(
											'validated_by',
											'cashier',
											'customer',
											'ship_from',
											'entry',
										).filter(
											Q(status__in =[
														'invoice', 
														'paid-partially'
														]) &
											Q(sale_type__in = ['credit', 'cash'])
									).order_by('-id')

		queryset = []

		for query in unfiltered_queryset:
			if query.total_paid >= total:
				queryset.append(query)

		return queryset

	@action(methods=['POST', ], detail=False)
	def make_sale(self, *args, **kwargs):
		invoice = self.get_object()
		invoice.status = 'sale'
		if not invoice.sale_type == 'cash':
			invoice.sale_type = 'cash'
		invoice.save()

		return Response({
				'message': 'Invoice has been succesfully converted into a Sale'
			})
		



class SaleViewSet(viewsets.ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]

	def get_serializer_class(self):
		if self.action in ['create', 'put', 'patch']:
			return InvoiceCreateUpdateSerializer
		elif self.action == 'retrieve':
			return  InvoiceDetailSerializer
		return InvoiceListSerializer



	def get_queryset(self, *args, **kwargs):
		queryset = Invoice.objects.prefetch_related(
											'validated_by',
											'cashier',
											'customer',
											'ship_from',
											'entry',
										).filter(
											~Q(status__in =[
														'invoice', 
														'paid-partially',
														'refunded',
														'canceled',
														'quotation',
														]) &
											~Q(sale_type = 'credit') &
											~Q(is_voided=True) &
											~Q(draft=True)
									).order_by('-id')

		return queryset
		

