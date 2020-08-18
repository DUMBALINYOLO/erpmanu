from rest_framework.viewsets import ModelViewSet
from rest_framework  import permissions
from manufacture.models import *
from manufacture.serializers import (
                        WasteGenerationReportSerializer,
                        WasteGenerationReportCreateUpdateSerializer
                       
                    )


class WasteGenerationReportViewSet(ModelViewSet):
    queryset = WasteGenerationReport.objects.all()
    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]
    def get_serializer_class(self):
        if self.action in ['create', 'put']:
            return WasteGenerationReportCreateUpdateSerializer
        return WasteGenerationReportSerializer

