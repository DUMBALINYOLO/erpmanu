from rest_framework.viewsets import ModelViewSet
from rest_framework  import permissions
from manufacture.models import ProcessProduct
from manufacture.serializers import (
                        ProcessProductListSerializer,
                        ProcessProductDetailSerializer,
                        ProcessProductCreateUpdateSerializer,
 
                    )



class ProcessProductViewSet(ModelViewSet):
    
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]

    def get_serializer_class(self):
        if self.action == 'list':
            return ProcessProductListSerializer 
        if self.action == 'retrieve':
        	return ProcessProductDetailSerializer
        return ProcessProductCreateUpdateSerializer


    def get_queryset(self, *args, **kwargs):
        queryset = ProcessProduct.objects.prefetch_related(
                                                    'unit',
                                                )
        return queryset


