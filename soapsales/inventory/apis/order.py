from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from inventory.models import *
from inventory.serializers import (
                    OrderCreateSerializer,
                    OrderDetailSerializer,
                    OrderListSerializer,
                    OrderPaymentSerializer,
                    OrderPaymentCreateSerializer,
                    OrderItemListSerializer
    )



class OrderViewSet(viewsets.ModelViewSet):
    
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]

    def get_serializer_class(self):
        if self.action == 'list':
            return OrderListSerializer
        elif self.action == 'retrieve':
            return OrderDetailSerializer
        return OrderCreateSerializer

    def perform_create(self, serializer):

        return serializer.save(
                        validated_by=self.request.user,
                        issuing_inventory_controller=self.request.user
                    )



    def get_queryset(self, *args, **kwargs):

        queryset = Order.objects.prefetch_related(
                                            'validated_by',
                                            'supplier',
                                            'ship_to',
                                            'tax',
                                            'issuing_inventory_controller',
                                            'entry',
                                            'entries',
                                            'shipping_cost_entries',
                                        ).filter(

                                    status__in = ['received-partially', 'draft', 'order']
                                )

        return queryset




class FullyReceivedAndTotalPaidForOrderViewSet(viewsets.ModelViewSet):
    
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]

    def get_serializer_class(self):
        if self.action == 'list':
            return OrderListSerializer
        elif self.action == 'retrieve':
            return OrderDetailSerializer
        return OrderCreateSerializer

    def perform_create(self, serializer):

        return serializer.save(
                        validated_by=self.request.user,
                        issuing_inventory_controller=self.request.user
                    )



    def get_queryset(self, *args, **kwargs):

        unfiltered_queryset = Order.objects.prefetch_related(
                                            'validated_by',
                                            'supplier',
                                            'ship_to',
                                            'tax',
                                            'issuing_inventory_controller',
                                            'entry',
                                            'entries',
                                            'shipping_cost_entries',
                                        ).order_by('-id')

        queryset = []

        for query in unfiltered_queryset:
            if query.total_due == 0 and query.fully_received:
                queryset.append(query)

        return queryset


    @action(detail=True, methods=['post'])
    def verify_order(self, request, pk=None):
        order = self.get_object()
        if order.status == 'received':
            return Response({'message': 'Order has already been verified !!!!!(:'})
        order.status = 'received'
        order.save()
        order.create_entry()
        return Response({"message": "Order has been Succesfully Verified"})



class FullyReceivedTotalPaidForAndVerifiedOrderViewSet(viewsets.ModelViewSet):
    
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]

    def get_serializer_class(self):
        if self.action == 'list':
            return OrderListSerializer
        elif self.action == 'retrieve':
            return OrderDetailSerializer
        return OrderCreateSerializer

    def perform_create(self, serializer):

        return serializer.save(
                        validated_by=self.request.user,
                        issuing_inventory_controller=self.request.user
                    )



    def get_queryset(self, *args, **kwargs):

        unfiltered_queryset = Order.objects.prefetch_related(
                                            'validated_by',
                                            'supplier',
                                            'ship_to',
                                            'tax',
                                            'issuing_inventory_controller',
                                            'entry',
                                            'entries',
                                            'shipping_cost_entries',
                                        ).filter(
                                            status = 'received'
                                    )

        queryset = []

        for query in unfiltered_queryset:
            if query.total_due == 0 and query.fully_received:
                queryset.append(query)

        return queryset



class OrderItemViewSet(viewsets.ModelViewSet):

    serializer_class = OrderItemListSerializer


    def get_queryset(self, *args, **kwargs):

        queryset = OrderItem.objects.prefetch_related(
                                            'order',
                                            'item',
                                        )

        return queryset



class OrderPaymentViewSet(viewsets.ModelViewSet):
    
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]


    def get_serializer_class(self):
        if self.action in ['create', 'put', 'patch']:
            return OrderPaymentCreateSerializer
        return OrderPaymentSerializer


    def perform_create(self, serializer):

        return serializer.save(paid_by=self.request.user)


    def get_queryset(self, *args, **kwargs):

        queryset = OrderPayment.objects.prefetch_related(
                                            'order',
                                            'entry',
                                            'paid_by',
                                            'cash'
                                        )

        return queryset



















    