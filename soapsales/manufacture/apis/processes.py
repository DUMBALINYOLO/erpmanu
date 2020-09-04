from rest_framework.viewsets import ModelViewSet
from django.db.models import Q
from rest_framework  import permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from manufacture.models import ProductionProcess, ProcessRate
from manufacture.serializers import (
                        ProductionProcessCreateUpdateSerializer,
                        ProductionProcessListSerializer,
                        ProductionProcessDetailSerializer,
                        ProcessRateSerializer,
                        ProcessRateCreateUpdateSerializer,
                       
                    )

class ProductionProcessViewSet(ModelViewSet):
    serializer_class = ProductionProcessListSerializer

    def get_queryset(self, *args, **kwargs):

        queryset = ProductionProcess.objects.prefetch_related(
                                                        'rate'
                                                )
        return queryset

    
        

class UnverifiedProductionProcessViewSet(ModelViewSet):
    
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]

    def get_serializer_class(self):
        if self.action in ['create', 'put']:
            return ProductionProcessCreateUpdateSerializer
        elif self.action == 'retrieve':
            return ProductionProcessDetailSerializer
        return ProductionProcessListSerializer

    def get_queryset(self, *args, **kwargs):

        queryset = ProductionProcess.objects.prefetch_related(
                                                        'rate'
                                                ).filter(
                                                Q(verified=False)
                                            )
        return queryset


    @action(methods=['POST',], detail=False)
    def verify_process(self, *args, **kwargs):
        process = self.get_object()
        process.verified = True
        process.update_inventory()
        process.save()

        return Response({'message': 'Production Process has been Verified Sucessfully'})



class VerifiedProductionProcessViewSet(ModelViewSet):
    
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]

    def get_serializer_class(self):
        if self.action in ['create', 'put']:
            return ProductionProcessCreateUpdateSerializer
        elif self.action == 'retrieve':
            return ProductionProcessDetailSerializer
        return ProductionProcessListSerializer

    def get_queryset(self, *args, **kwargs):

        queryset = ProductionProcess.objects.prefetch_related(
                                                        'rate'
                                                ).filter(
                                                Q(verified=True)
                                            )
        return queryset









class ProcessRateViewSet(ModelViewSet):
    queryset = ProcessRate.objects.all()
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]

    def get_serializer_class(self):
        if self.action in ['create', 'put']:
            return ProcessRateCreateUpdateSerializer
        return ProcessRateSerializer






