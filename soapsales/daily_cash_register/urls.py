from rest_framework.routers import DefaultRouter
from .api import CashRegisterViewSet

router = DefaultRouter()

router.register(r'cash-drawers', CashRegisterViewSet, basename='cash-drawers')

urlpatterns = router.urls
