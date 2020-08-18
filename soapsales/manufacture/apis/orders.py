from rest_framework.viewsets import ModelViewSet
from rest_framework  import permissions
from manufacture.models import *
from manufacture.serializers import (
                        ProductionOrderListSerializer,
                        ProductionOrderCreateUpdateSerializer,
                        ProductionOrderDetailSerializer
                       
                    )


class ProductionOrderViewSet(ModelViewSet):
      
      # permission_classes = [
      #     permissions.IsAuthenticated,
      # ]

      def get_serializer_class(self):
            if self.action == 'retrieve':
                  return ProductionOrderDetailSerializer
            elif self.action in ['create', 'put']:
                  return ProductionOrderCreateUpdateSerializer
            return ProductionOrderListSerializer


      def get_queryset(self, *args, **kwargs):

            queryset = ProductionOrder.objects.prefetch_related(
                                                            'customer',
                                                            'process',
                                                            'products'
                                                      )

            return queryset



