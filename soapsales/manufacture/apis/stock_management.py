from django_filters.rest_framework import FilterSet, DjangoFilterBackend
from django_filters import NumberFilter
from rest_framework import viewsets
from rest_framework import generics, permissions, response
from manufacture.models import (
        
                ProcessedProductsStockReceipt,
                ProcessedProductsStockTake,
                ProcessedProductStockAdjustment,
              )
from manufacture.serializers import (

                    ProcessedProductsStockReceiptCreateUpdateSerializer,
                    ProcessedProductsStockReceiptListSerializer,
                    ProcessedProductsStockReceiptDetailSerializer,
                    ProcessedProductStockAdjustmentListSerializer,
                    ProcessedProductsStockTakeCreateUpdateSerializer,
                    ProcessedProductsStockTakeListSerializer,
                    ProcessedProductsStockTakeDetailSerializer

				)




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
    






