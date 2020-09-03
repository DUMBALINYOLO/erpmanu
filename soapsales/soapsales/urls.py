
from django.contrib import admin
from django.urls import path, include, re_path

from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # path('api-auth/', include('rest_framework.urls')),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    re_path(r'api/accounting/', include('accounts.urls')),
    re_path(r'api/manufacture/', include('manufacture.urls')),
    re_path(r'api/inventory/', include('inventory.urls')),
    re_path(r'api/events/', include('event.urls')),
    re_path(r'api/sales/', include('invoicing.urls')),
    re_path('api/employees/', include('employees.urls')),
    re_path('api/customers/', include('customers.urls')),
    path('api/config/', include('basedata.urls')),

] 

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]