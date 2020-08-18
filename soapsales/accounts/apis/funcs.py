from functools import reduce
from decimal import Decimal as D
from accounts.models import Account
from inventory.models import InventoryItem
from django.db.models import Q

def net_profit_calculator(start, end):

    # sales
    sales_acc = Account.objects.get(name="SALES-ACCOUNT-NUMBER-ONE")
    sales_balance_carried_over = sales_acc.balance_on_date(start)
    sales = sales_acc.balance - sales_balance_carried_over
    
    #purchases
    # TODO verify if opening inventory is considered in profit and loss statement

    purchases_acc = Account.objects.get(name='PURCHASES-ACCOUNT-NUMBER-ONE')
    purchase_returns_acc = Account.objects.get(name='PURCHASES-RETURN-ACCOUNT-NUMBER-ONE')
    purchase_returns = purchase_returns_acc.balance_over_period(start, end)
    purchases = purchases_acc.balance_over_period(start, end) + purchase_returns
    
    opening_inventory = sum(
        [D(i.product_component.quantity_on_date(start)) * \
            i.product_component.unit_value \
                for i in InventoryItem.objects.filter(
                    product_component__isnull=False)])
    
    closing_inventory = InventoryItem.total_inventory_value()
    cogs = opening_inventory +  purchases - closing_inventory

    other_income = Account.objects.filter(type="income").exclude(
        Q(balance=0.0)).exclude(Q(name__in=['SALES-ACCOUNT-NUMBER-ONE', ]))

    other_income_total = sum([i.control_balance for i in other_income])

    total_gross_profit = sales - cogs + other_income_total


    expenses = Account.objects.filter(
        type="expense").exclude(
            Q(balance=0.0))

    total_expenses = sum([i.control_balance for i in expenses])
    
    return total_gross_profit - total_expenses


    