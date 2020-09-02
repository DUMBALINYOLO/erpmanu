import datetime
from decimal import Decimal as D
import os
from functools import reduce
import urllib
from itertools import chain
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from basedata.utilities import extract_period
from invoicing.models import Invoice, InvoiceLine, CreditNote
from inventory.models import InventoryItem
from accounts.serializers import (
        DebitSerializer,
        CreditSerializer,
        AccountListSerializer,
        JournalEntryListSerializer
    )
from accounts.models import (
                Account, 
                JournalEntry, 
                Credit, 
                Debit, 
                AccountingSettings, 
                Journal
            )
from .funcs import net_profit_calculator





class AccountReportAPIView(APIView):
 
    def get(self, request, *args, **kwargs):

        acc_no = self.request.query_params.get('account')
        account = Account.objects.get(pk=acc_no)
        start, end = extract_period(self.request.query_params)
        # bring in some serializations for these two
        debits = Debit.objects.filter(account=account, entry__date__gte=start, entry__date__lte=end)
        credits = Credit.objects.filter(account=account, entry__date__gte=start, entry__date__lte=end)
        debit_json = DebitSerializer(debits, many=True)
        credit_json = CreditSerializer(credits, many=True)
        transactions = chain(debit_json.data, credit_json.data)
        # transis = sorted(transactions, key=lambda transaction: transaction.entry.date)

        data = {
            'account': account,
            'start': start.strftime("%d %B %Y"),
            'end': end.strftime("%d %B %Y"),
            'remaining_balance': account.balance_on_date(end),
            'starting_balance': account.balance_on_date(start),
            'transactions': transactions,
            # 'sorted_transactions': transis
        }

        return Response(data, status=status.HTTP_200_OK)
    


class BalanceSheetAPIView(APIView):

    def get(self, request, *args, **kwargs):
        delta_mapping = {
            0: 365,
            1: 30,
            2: 7
        }

        end = datetime.date.today()
        start = end - datetime.timedelta(days=delta_mapping[
            AccountingSettings.objects.first().default_accounting_period
        ])

        #LONG TERM ASSETS
        long_term_assets = Account.objects.filter(
            Q(balance_sheet_category='non-current-assets')).exclude(
                Q(balance=0) & Q(control_account=False))

        long_term_assets_total = sum(
            [i.balance for i in long_term_assets]
        )

        #CURRENT ASSETS 
        current_assets = Account.objects.filter(
            Q(balance_sheet_category='current-assets') ).exclude(
                Q(
                    Q(balance=0)  & Q(control_account=False)
                    ) | 
                Q(parent_account=Account.objects.get(name='ASSETS-ACCOUNT-NUMBER-ONE')))


        inventory = InventoryItem.total_inventory_value()
        current_assets_total = sum(
            [i.control_balance for i in current_assets] 
        ) + inventory

        #CURRENT LIABILITIES
        current_liabilities = Account.objects.filter(
            Q(balance_sheet_category='current-liabilities')).exclude(
                Q(
                    Q(balance=0) & Q(control_account=False)
                    ) |
                Q(parent_account= Account.objects.get(name='LIABILITIES-ACCOUNT-NUMBER-ONE')))

        
        current_liabilities_total = sum(
            [i.control_balance for i in current_liabilities]
        )

        working_capital =  current_assets_total - current_liabilities_total
        
        #LONG TERM LIABILITIES
        long_term_liabilities = Account.objects.filter(
            Q(balance_sheet_category='non-current-liabilities')).exclude(
                Q(balance=0))

        long_term_liabilities_total = sum(
            [i.balance for i in long_term_liabilities]
        )

        net_assets = long_term_assets_total + working_capital - \
            long_term_liabilities_total

        #EQUITY
        equity = Account.objects.filter(type='equity').exclude(
                Q(balance=0) | Q(name='DRAWS-ACCOUNTS-NUMBER-ONE')
            )

        drawings = Account.objects.get(name='DRAWS-ACCOUNTS-NUMBER-ONE').control_balance

        net_profit = net_profit_calculator(start, end)

        equity_total = sum([i.balance for i in equity]) +  net_profit - drawings

        data = {
            'date': datetime.date.today(),
            'current_assets': current_assets,
            'inventory': inventory,
            'current_assets_total': current_assets_total,
            'long_term_assets': long_term_assets,
            'long_term_assets_total': long_term_assets_total,
            'working_capital': working_capital,
            'current_liabilities': current_liabilities,
            'net_profit': net_profit,
            'net_assets': net_assets,
            'current_liabilities_total': current_liabilities_total,
            'long_term_liabilities': long_term_liabilities,
            'long_term_liabilities_total': long_term_liabilities_total,
            'equity': equity,
            'equity_total': equity_total,
            'drawings': drawings,
            'total_assets': current_assets_total + long_term_assets_total,
            
        }

        return Response(data, status=status.HTTP_200_OK)




class JournalReportAPIView(APIView):

    def get(self, request, *args, **kwargs):
        j_no = self.request.query_params.get('journal')
        journal = Journal.objects.get(pk=j_no)
        kwargs =  self.request.query_params
        start, end = extract_period(kwargs)
        #bring in a journalentry serializer with many=True kwargs
        entry_list = JournalEntry.objects.filter(
                                journal=journal,
                                date__gte=start,
                                date__lte=end
                            )
        entries = JournalEntryListSerializer(many=True)
        entries_json = entries.data

        
        data = {
            'start': start.strftime("%d %B %Y"),
            'end': end.strftime("%d %B %Y"),
            'journal': journal,
            'entries': entries_json
        }

        return Response(data, status=status.HTTP_200_OK)




class ProfitAndLossReportAPIView(APIView):

    def get(self, request, *args, **kwargs):
        kwargs =  self.request.query_params
        start, end = extract_period(kwargs)
        sales_acc = Account.objects.get(name='SALES-ACCOUNTS-NUMBER-ONE')
        sales_balance_carried_over = sales_acc.balance_on_date(start)
        sales = sales_acc.balance - sales_balance_carried_over
        
        #purchases
        # TODO verify if opening inventory is considered in profit and loss statement

        purchases_acc = Account.objects.get(name='PURCHASES-ACCOUNTS-NUMBER-ONE')
        purchase_returns_acc = Account.objects.get(name='PURCHASES-RETURN-ACCOUNTS-NUMBER-ONE')
        purchase_returns = purchase_returns_acc.balance_over_period(start, end)
        purchases = purchases_acc.balance_over_period(start, end) + purchase_returns
        
        opening_inventory = sum(
            [D(i.quantity_on_date(start)) * i.unit_value for i in InventoryItem.objects.filter(product_component__isnull=False)])
        print(opening_inventory)
        
        closing_inventory = InventoryItem.total_inventory_value()
        cogs = opening_inventory +  purchases - closing_inventory
        #cost of revenue
        # calculate direct labour for services
        # include commissions in cost of goods sold

        other_income = Account.objects.filter(type="income").exclude(
            Q(balance=0.0)).exclude(Q(name__in=['SALES-ACCOUNTS-NUMBER-ONE', ]))

        other_income_total = sum([i.control_balance for i in other_income])

        total_gross_profit = sales - cogs + other_income_total


        expenses = models.Account.objects.filter(
            type="expense").exclude(
                Q(balance=0.0))

        total_expenses = sum([i.control_balance for i in expenses])

        data = {
            'start': start.strftime("%d %B %Y"),
            'end': end.strftime("%d %B %Y"),
            'sales': sales,
            'purchases': purchases,
            'closing_inventory': closing_inventory,
            'opening_inventory': opening_inventory,
            'cost_of_goods_sold': cogs,
            'gross_profit': sales - cogs,
            'other_income_accounts': other_income,
            'other_income_total': other_income_total,
            'total_revenue': total_gross_profit,
            'expenses': expenses,
            'total_expenses': total_expenses,
            'net_profit': total_gross_profit - total_expenses
        }

        return Response(data, status=status.HTTP_200_OK)





class TrialBalanceAPIView(APIView):

    def get(self, request, *args, **kwargs):

        # bring in a serializer with many=True

        accounts = Account.objects.all().exclude(
                                    Q(balance=0.0) & Q(control_account=False)).exclude(
                                        parent_account__isnull=False).order_by('pk')
        date  = datetime.date.today()
        total_debit = Account.total_debit()
        total_credit = Account.total_credit()
        inventory_value = InventoryItem.total_inventory_value()
        # manufactured_items stock value

        data = {
            'date': date,
            'total_debit': total_debit,
            'total_credit': total_credit,
            'inventory_value': inventory_value,
        }

        return Response(data, status=status.HTTP_200_OK)
        


        