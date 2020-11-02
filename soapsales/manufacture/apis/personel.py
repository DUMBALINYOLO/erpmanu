from rest_framework import viewsets
from rest_framework  import permissions
from manufacture.models import ManufucturingPersonel, ManufacturingTeam
from manufacture.serializers import (
                        ManufacturingTeamCreateUpdateSerializer,
                        ManufacturingTeamListSerializer,
                        ManufacturingTeamDetailSerializer,
                        ManfacturingPersonelCreateUpdateSerializer,
                        ManfacturingPersonelListSerializer,
                        ManfacturingPersonelDetailSerializer
                       
                    )

class ManufucturingPersonelViewSet(viewsets.ModelViewSet):
      

      def get_serializer_class(self):
            if self.action in ['create', 'put']:
                  return ManfacturingPersonelCreateUpdateSerializer
            elif self.action == 'retrieve':
                  return ManfacturingPersonelDetailSerializer
            return ManfacturingPersonelListSerializer


      def get_queryset(self, *args, **kwargs):
           queryset = ManufucturingPersonel.objects.prefetch_related(
                                                                  'employee'
                                                            )

           return queryset




class ManufucturingTeamViewSet(viewsets.ModelViewSet):

      queryset = ManufacturingTeam.objects.all()

      def get_serializer_class(self):
            if self.action in ['create', 'put', 'patch']:
                  return ManufacturingTeamCreateUpdateSerializer
            elif self.action == 'retrieve':
                  return ManufacturingTeamDetailSerializer
            return ManufacturingTeamListSerializer


      def get_queryset(self, *args, **kwargs):
           queryset = ManufacturingTeam.objects.prefetch_related(
                                                                  'manager',
                                                                  'members'
                                                            )

           return queryset

           









