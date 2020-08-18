import datetime
import os
from rest_framework import views, status
from rest_framework.response import Respose
from inventory.models import (
                            InventoryItem,
                            Supplier,
                            Order
                        )
from basedata.utilities import (
                                   encode_period,
                                   extract_encoded_period,
                                   extract_period
                                )
                               
from accounts.models import JournalEntry, Credit, Debit
from django.db.models import Q





class VendorBalanceReportAPIView(views.APIView):

    def get(self, request, *args, **kwargs):

    data = {
        'date': datetime.date.today(),
        'total': lambda: sum([i.account.balance for i in models.Supplier.objects.all()])
        }

    return Response(data, status=status.HTTP_200_OK)



class TransactionByVendorReportAPIView(views.APIView):

     def get(self, request, *args, **kwargs):
        vendors = models.Supplier.objects.all()
        start, end = extract_period(self.request.query_params)
        
        suppliers = [{
            'name': v.name,
            'transactions': sorted(list(Credit.objects.filter(
                account=v.account, 
                entry__date__gte=start,
                entry__date__lte=end
                )
            ) + list(Debit.objects.filter(account=v.account, 
                entry__date__gte=start,
                entry__date__lte=end
                    )
                ),
            key=lambda x: x.entry.date),
            'total': v.account.balance_over_period(start, end)
        } for v in vendors]
        start, end = encode_period(start, end)

        data = {
            'suppliers': suppliers,
            'start': start,
            'end': end,
        }

        return Response(data, status=status.HTTP_200_OK)

        
