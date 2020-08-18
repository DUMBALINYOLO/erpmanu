import os
import urllib
import json
from django.shortcuts import get_object_or_404


from manufacture.serializers import (
            ProcessMachineGroupListSerializer,
            ProcessMachineGroupCreateUpdateSerializer,
            ProcessMachineGroupDetailSerializer,
            ProcessMachineListSerializer,
        )
from manufacture.serializers import (
            ProcessMachineGroup,
            ProcessMachine

        )

from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response



class ProcessMachineViewset(ModelViewSet):
    
    serializer_class = ProcessMachineListSerializer
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]

    def get_queryset(self, *args, **kwargs):
        queryset = ProcessMachine.objects.prefetch_related(
                                                        'equipment',
                                                        'machine_group'
                                                    )

        return queryset




class ProcessMachineGroupViewset(ModelViewSet):
    queryset = ProcessMachineGroup.objects.all() # call prefetch related in the Model Manager
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]

    def get_serializer_class(self):
        if self.action in ['create', 'put', 'patch']:
            return ProcessMachineGroupCreateUpdateSerializer
        elif self.action == 'retrieve':
            return ProcessMachineGroupDetailSerializer
        return ProcessMachineGroupListSerializer

        
