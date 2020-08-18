from django.urls import path
from rest_framework.routers import DefaultRouter

from customers.apis import (
		DeActivatedCustomerViewSet,
		CustomerAddressViewSet,
		ActiveCustomerViewSet
	)

router =  DefaultRouter()

router.register(r'deactivated-customers', DeActivatedCustomerViewSet, basename='deactivated-customers')
router.register(r'customer-addresses', CustomerAddressViewSet, basename='customer-addresses')
router.register(r'active-customers', ActiveCustomerViewSet, basename='active-customers')


urlpatterns = router.urls 

