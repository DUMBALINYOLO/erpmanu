from django_filters.rest_framework import FilterSet, DjangoFilterBackend
from django_filters import NumberFilter
from rest_framework import viewsets
from rest_framework import generics, permissions, response
from stock.models import (
                ProcessedProduct,
                SalesGroup,
                ProcessedProductComponent,
                ProcessedProductsStockReceipt,
                ProcessedProductsStockReceiptLine,
                ProcessedProductsStockTake,
                ProcessedProductStockAdjustment,
              )
from .serializers import (
					SalesGroupSerializer,
                    ProcessedProductCreateUpdateSerializer,
                    ProcessedProductListSerializer,
                    ProcessedProductDetailSerializer,
                    ProcessedProductsStockReceiptCreateUpdateSerializer,
                    ProcessedProductsStockReceiptListSerializer,
                    ProcessedProductsStockReceiptDetailSerializer,
                    ProcessedProductStockAdjustmentListSerializer,
                    ProcessedProductsStockTakeCreateUpdateSerializer,
                    ProcessedProductsStockTakeListSerializer,
                    ProcessedProductsStockTakeDetailSerializer

				)









class SalesGroupViewSet(viewsets.ModelViewSet):
    queryset = SalesGroup.objects.all()
    serializer_class = SalesGroupSerializer
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]



class ProcessedProductViewSet(viewsets.ModelViewSet):
    queryset = ProcessedProduct.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'put']:
            return ProcessedProductCreateUpdateSerializer
        elif self.action == 'retrieve':
            return ProcessedProductDetailSerializer
        return ProcessedProductListSerializer



class ProcessedProductsStockReceiptViewSet(viewsets.ModelViewSet):
    queryset = ProcessedProductsStockReceipt.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'put']:
            return ProcessedProductsStockReceiptCreateUpdateSerializer
        elif self.action == 'retrieve':
            return ProcessedProductsStockReceiptDetailSerializer
        return ProcessedProductsStockReceiptListSerializer



class ProcessedProductsStockTakeViewSet(viewsets.ModelViewSet):
    queryset = ProcessedProductsStockTake.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'put']:
            return ProcessedProductsStockTakeCreateUpdateSerializer
        elif self.action == 'retrieve':
            ProcessedProductsStockTakeDetailSerializer
        return ProcessedProductsStockTakeListSerializer


class ProcessedProductStockAdjustmentViewSet(viewsets.ModelViewSet):
    queryset = ProcessedProductStockAdjustment.objects.all()
    serializer_class = ProcessedProductStockAdjustmentListSerializer
    






