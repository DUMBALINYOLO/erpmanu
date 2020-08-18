from rest_framework import viewsets, permissions

from accounts.models import (
    AccountingSettings,
    Tax,
    Currency
)


from accounts.serializers import(
    AccountingSettingsSerializer,
    TaxSerializer,
    CurrencySerializer,
)



class AccountingSettingsViewset(viewsets.ModelViewSet):
    queryset = AccountingSettings.objects.all()
    serializer_class = AccountingSettingsSerializer
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]


class TaxViewset(viewsets.ModelViewSet):
    queryset = Tax.objects.all()
    serializer_class = TaxSerializer
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]



class CurrencyViewset(viewsets.ModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]


    
