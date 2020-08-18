from rest_framework import viewsets, permissions
from invoicing.models import CreditNote
from invoicing.serializers import(
							CreditNoteListSerializer,
							CreditNoteCreateSerializer,
							CreditNoteDetailSerializer
						)


class CreditNoteViewSet(viewsets.ModelViewSet):
	
	# permission_classes = [
 #        permissions.IsAuthenticated,
 #    ]


	def get_serializer_class(self):
		if self.action == 'retrive':
		    return CreditNoteDetailSerializer
		elif self.action in ['create', 'put', 'patch']:
			return CreditNoteCreateSerializer
		return CreditNoteListSerializer


	def get_queryset(self, *args, **kwargs):

		queryset = CreditNote.objects.prefetch_related(
												'invoice',
												'cash',
												'entry'
											).order_by('-id')

		return queryset
