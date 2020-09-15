from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.decorators import action
from accounts.models import Bill, BillPayment
from accounts.serializers import (
                        BillSerializer,
                        BillPaymentSerializer,
                        BillCreateSerializer,
                        BillPaymentCreateSerializer
                    )




class BillViewset(ModelViewSet):
    
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]


    def get_serializer_class(self):
        if self.action in ['create', 'put', 'patch']:
            return BillCreateSerializer
        return BillSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Bill.objects.prefetch_related(
                                    'vendor',
                                    'entry'
                            )
        return queryset


class FullyPaidButNotVerifiedBillViewset(ModelViewSet):
    
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]


    def get_serializer_class(self):
        if self.action in ['create', 'put', 'patch']:
            return BillCreateSerializer
        return BillSerializer

    def get_queryset(self, *args, **kwargs):
        need_veriication = Bill.objects.prefetch_related(
                                    'vendor',
                                    'entry'
                            ).filter(
                                payment_status__in = ['pending', 'PartiallyPaid']
                            )

        queryset = []

        for unverified in need_veriication:
            if unverified.fully_paid:
                queryset.append(unverified)

        return queryset


    @action(methods=['POST',], detail=False)
    def make_fully_paid(self, *args, **kwargs):
        bill = self.get_object()
        if not bill.fully_paid:
            return Response({'message': 'Sorry but this Bill still needs to be fully paid !!!!!!'})
        else:
            bill.payment_status = 'Paid'
            bill.save()
            return Response({'message': 'Bill has been succesfully Converted to Fully Paid ): '})



class FullyPaidBillViewset(ModelViewSet):
    
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]


    def get_serializer_class(self):
        if self.action in ['create', 'put', 'patch']:
            return BillCreateSerializer
        return BillSerializer


    def get_queryset(self, *args, **kwargs):
        queryset = Bill.objects.prefetch_related(
                                    'vendor',
                                    'entry'
                            ).filter(
                                payment_status='Paid'
                            )

        return queryset
        



class BillPaymentViewset(ModelViewSet):
    
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]    

    def get_serializer_class(self):
        if self.action in ['create', 'put', 'patch']:
            return BillPaymentCreateSerializer
        return  BillPaymentSerializer

    def get_queryset(self, *args, **kwargs):

        queryset = BillPayment.objects.prefetch_related(
                                                    'account',
                                                    'bill',
                                                    'entry',
                                                    'paid_by',
                                                    'cash'
                                                )

        return queryset


    def perfom_create(self, serializer):

        return serializer.save(paid_by=self.request.user)








