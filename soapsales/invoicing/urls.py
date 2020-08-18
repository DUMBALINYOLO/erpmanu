from rest_framework.routers import DefaultRouter
from invoicing.apis import (
		CreditNoteViewSet,
		PaymentViewSet,

		QuotationViewSet,
		SalesGroupPricingDiscountViewSet,
		UnverifiedInvoiceViewSet,
		OverdueInvoiceViewSet,
		VoidedInvoiceViewSet,
		RefundedInvoiceViewSet,
		FullyPaidNotSaleInvoiceViewSet,
		SaleViewSet,

		InvoiceLineViewSet,
		CustomerReceiptViewSet,

	)

router = DefaultRouter()

router.register(r'creditnotes', CreditNoteViewSet, basename='creditnotes')
router.register(r'payments', PaymentViewSet, basename='payments')
router.register(r'receipts', CustomerReceiptViewSet, basename='receipts')
router.register(r'invoicelines', InvoiceLineViewSet, basename='invoicelines')

#take from here
router.register(r'sales-groups-pricing-discounts', SalesGroupPricingDiscountViewSet, basename='sales-groups-pricing-discounts')
router.register(r'quotations', QuotationViewSet, basename='quotations')
router.register(r'unverified-invoices', UnverifiedInvoiceViewSet, basename='unverified-invoices')
router.register(r'overdue-invoices', OverdueInvoiceViewSet, basename='overdue-invoices')
router.register(r'voided-invoices', VoidedInvoiceViewSet, basename='voided-invoices')
router.register(r'refunded-invoices', RefundedInvoiceViewSet, basename='refunded-invoices')
router.register(r'fullypaid-not-yet-sales-invoices', FullyPaidNotSaleInvoiceViewSet, basename='fullypaid-not-yet-sales-invoices')
router.register(r'sales', SaleViewSet, basename='sales')




urlpatterns = router.urls


