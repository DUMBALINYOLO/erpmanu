from rest_framework import viewsets
from accounts.models import (
					Journal,
					Ledger,
					Post,
					WorkBook,
					Adjustment,
				)
from accounts.serializers import (
							JournalSerializer,
							LedgerSerializer,
							PostCreateUpdateSerializer,
							PostListSerializer,
							PostDetailSerializer,
							WorkBookCreateUpdateSerializer,
							WorkBookSerializer,
							AdjustmentCreateUpdateSerializer,
							AdjustmentListSerializer,
							AdjustmentDetailSerializer,

						)


class JournalViewSet(viewsets.ModelViewSet):
	queryset = Journal.objects.all()
	serializer_class = JournalSerializer



class LedgerViewSet(viewsets.ModelViewSet):
	queryset = Ledger.objects.all()
	serializer_class = LedgerSerializer


class PostViewSet(viewsets.ModelViewSet):
	


	def get_serializer_class(self, *args, **kwargs):
		if self.action in ['create', 'put']:
			return PostCreateUpdateSerializer
		elif self.action == 'retrieve':
			return PostDetailSerializer
		return PostListSerializer


	def get_queryset(self, *args, **kwargs):

		queryset = Post.objects.prefetch_related(
										'entry', 
										'debit', 
										'credit', 
										'ledger'
									)

		return queryset




class WorkBookViewSet(viewsets.ModelViewSet):
	queryset= WorkBook.objects.all()


	def get_serializer_class(self, *args, **kwargs):
		if self.action in ['create', 'put']:
			return WorkBookCreateUpdateSerializer
		return WorkBookSerializer


class AdjustmentViewSet(viewsets.ModelViewSet):
	


	def get_serializer_class(self, *args, **kwargs):
		if self.action in ['create', 'put']:
			return AdjustmentCreateUpdateSerializer
		elif self.action == 'retrieve':
			return AdjustmentDetailSerializer
		return AdjustmentListSerializer

	def get_queryset(self, *args, **kwargs):
		queryset = Adjustment.objects.prefetch_related(
												'entry',
												'adjusting_entry',
												'workbook',
												'created_by'
											)
		return queryset


	def perform_create(self, serializer):
		serializer.save(created_by=self.request.user)






















