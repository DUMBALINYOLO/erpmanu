import json
import json
import os
import urllib
from decimal import Decimal as D
from rest_framework import viewsets
from rest_framework.response import Response
from inventory.models import *
from inventory.serializers import (
                    StockReceiptCreateUpdateSerializer,
                    StockReceiptListSerializer,
                    StockReceiptDetailSerializer,
                    StockAdjustmentListSerializer,
                    StockAdjustmentDetailSerializer,
                    InventoryCheckCreateUpdateSerializer,
                    InventoryCheckListSerializer,
                    InventoryCheckDetailSerializer,

                )





class StockReceiptViewSet(viewsets.ModelViewSet):
    

    def get_serializer_class(self):
        if self.action in ['create', 'put']:
            return StockReceiptCreateUpdateSerializer
        elif self.action == 'retrieve':
            return StockReceiptDetailSerializer
        return StockReceiptListSerializer


    def perform_create(self, serializer):

        return serializer.save(received_by=self.request.user)


    def get_queryset(self, *args, **kwargs):

        queryset = StockReceipt.objects.prefetch_related(
                                                    'order',
                                                    'received_by'
                                                )

        return queryset





class StockAdjustmentViewSet(viewsets.ModelViewSet):
    

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return StockAdjustmentDetailSerializer
        return StockAdjustmentListSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = StockAdjustment.objects.prefetch_related(
                                                    'warehouse_item',
                                                    'inventory_check'
                                                )

        return queryset
    

class InventoryStockTakeViewSet(viewsets.ModelViewSet):
     

    def get_serializer_class(self):
        if self.action in ['create', 'put', 'patch']:
            return InventoryCheckCreateUpdateSerializer
        elif self.action == 'retrieve':
            return InventoryCheckListSerializer
        return InventoryCheckDetailSerializer

    def perform_create(self, serializer):
        
        return serializer.save(adjusted_by=self.request.user)


    def get_queryset(self, *args, **kwargs):
        queryset = InventoryCheck.objects.prefetch_related(
                                                    'adjusted_by',
                                                    'warehouse'
                                                )

        return queryset









