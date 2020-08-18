from __future__ import unicode_literals
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, permissions, generics
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.decorators import action

from accounts.models import (
                        JournalEntry,
                        Credit,
                        Debit
                    )

from accounts.serializers import (
                    CreditSerializer,
                    DebitSerializer,
                    JournalEntryCreateUpdateSerializer,
                    JournalEntryDetailSerializer,
                    JournalEntryListSerializer
                )


class UnPostedandUnAdjustedJournalEntryViewSet(viewsets.ModelViewSet):
    

    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]


    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_serializer_class(self):
        if self.action in ['put', 'patch', 'create']:
            return JournalEntryCreateUpdateSerializer
        elif self.action == "retrieve":
            return JournalEntryDetailSerializer
        return JournalEntryListSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = JournalEntry.objects.prefetch_related(
                                        'journal',
                                        'creator',
                                    ).filter(
                                        posted_to_ledger=False,
                                        adjusted = False,
                                )

        return queryset


class UnAdjustedJournalEntryViewSet(viewsets.ModelViewSet):
    

    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]


    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_serializer_class(self):
        if self.action in ['put', 'patch', 'create']:
            return JournalEntryCreateUpdateSerializer
        elif self.action == "retrieve":
            return JournalEntryDetailSerializer
        return JournalEntryListSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = JournalEntry.objects.prefetch_related(
                                        'journal',
                                        'creator',
                                    ).filter(
                                        posted_to_ledger= True,
                                        adjusted= False
                                )
        return queryset

    @action(methods=['POST',], detail=False)
    def adjust_entry(self, *args, **kwargs):
        entry = self.get_object()
        if entry.adjusted:
            return Response({'message': 'Journal Entry has already been adjusted'})
        adjusted = True
        entry.save()
        return Respose({'message': 'JournalEntry Was Adjusted Successfully ): !!!!!!'})



class UnPostedJournalEntryViewSet(viewsets.ModelViewSet):
    

    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]


    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_serializer_class(self):
        if self.action in ['put', 'patch', 'create']:
            return JournalEntryCreateUpdateSerializer
        elif self.action == "retrieve":
            return JournalEntryDetailSerializer
        return JournalEntryListSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = JournalEntry.objects.prefetch_related(
                                        'journal',
                                        'creator',
                                    ).filter(
                                        posted_to_ledger= False,
                                )
        return queryset


    @action(methods=['POST',], detail=False)
    def post_entry(self, *args, **kwargs):
        entry = self.get_object()
        if entry.posted_to_ledger:
            return Response({'message': 'Journal Entry has already been posted'})
        entry.posted_to_ledger = True
        entry.save()
        return Respose({'message': 'JournalEntry Was Posted Successfully ): !!!!!!'})


class PostedJournalEntryViewSet(viewsets.ModelViewSet):
    

    # permission_classes = [
    #     permissions.IsAuthenticated,
    # ]


    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_serializer_class(self):
        if self.action in ['put', 'patch', 'create']:
            return JournalEntryCreateUpdateSerializer
        elif self.action == "retrieve":
            return JournalEntryDetailSerializer
        return JournalEntryListSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = JournalEntry.objects.prefetch_related(
                                        'journal',
                                        'creator',
                                    ).filter(
                                        posted_to_ledger= True,
                                )
        return queryset



class DebitViewSet(viewsets.ModelViewSet):
    
    serializer_class = DebitSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = Debit.objects.prefetch_related(
                                            'account',
                                            'entry'
                                        )
        return queryset


class CreditViewSet(viewsets.ModelViewSet):
    
    serializer_class = CreditSerializer


    def get_queryset(self, *args, **kwargs):
        queryset = Credit.objects.prefetch_related(
                                            'account',
                                            'entry'
                                        )
        return queryset




