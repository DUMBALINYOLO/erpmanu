from django.db import models
from decimal import Decimal as D
from django.db.models import Q
from .warehouse import InventoryStockItem, WareHouse
from .order import Order, OrderItem
from basedata.const import (
            INVENTORY_TYPES_CHOICES,
            PRODUCT_COMPONENT_PRICING_CHOICES,
            EQUIPMENT_COMPONENT_CONDITION_CHOICES,
            UNIT_OF_MEASURE_CHOICES
    )
from basedata.models import SoftDeletionModel
from manufacture.models import ProductionProcessIngridient




class InventoryItem(SoftDeletionModel):
    '''
        For this project products are consumed by the Manuacturing process as raw materials and then\
        converted into by_products and thats how value is calculated for profit and loss
        As for the Inventory Stock Value its calculated on the items quantity * unit_purchase price
        We need to update the Accounting Loss and Profit statement to calculate stock value through adding
        manufactured products value to inventory stock_value, which includes consumable value

    '''


    name = models.CharField(max_length = 64)
    type = models.CharField(choices=INVENTORY_TYPES_CHOICES, max_length=345)
    category = models.ForeignKey('inventory.Category',
        on_delete=models.SET_NULL, null=True,default=1)
    length = models.FloatField(default=0.0)
    width = models.FloatField(default=0.0)
    height = models.FloatField(default=0.0)
    image = models.FileField(blank=True, null=True)
    description = models.TextField(blank=True, default="")
    unit = models.ForeignKey('basedata.UnitOfMeasure', null=True, on_delete=models.SET_NULL)
    unit_purchase_price = models.DecimalField(max_digits=16,decimal_places=2, default=0.0)
    supplier = models.ForeignKey(
                        "inventory.Supplier",
                        on_delete=models.SET_NULL,
                        blank=True,
                        null=True
                    )
    minimum_order_level = models.IntegerField( default=0)
    maximum_stock_level = models.IntegerField(default=0)
    #components


    def __str__(self):
        return str(self.id) + " - " + self.name


    @staticmethod
    def total_inventory_value():
        return sum(
            [p.stock_value for p in InventoryItem.objects.filter(
                                type__in = ['Equipment', 'RawMaterial']
                            )])



    @property
    def stock_value(self):
        '''.
        averaging- calculating the overall stock value on the average of all
        the values for the quantity in stock.
        '''
        if self.type not in ['Equipment', 'RawMaterial']:
            return D(0)

        current_quantity = self.quantity
        cummulative_quantity = 0
        orders_with_items_in_stock = []
        partial_orders = False

        if current_quantity == 0:
            return 0

        #getting the latest orderitems in order of date ordered
        order_items = OrderItem.objects.filter(
            Q(item=self) &
            Q(
                Q(order__status="order") |
                Q(order__status="received-partially") |
                Q(order__status="received")
            )).order_by("order__date").reverse()

        #iterate over items
        for item in order_items:
            # orders for which cumulative ordered quantities are less than
            # inventory in hand are considered
            if (item.quantity + cummulative_quantity) < current_quantity:
                orders_with_items_in_stock.append(item)
                cummulative_quantity += item.quantity


            else:
                if cummulative_quantity < current_quantity:
                    partial_orders = True
                    orders_with_items_in_stock.append(item)

                else:
                    break


        cumulative_value = D(0)
        if not partial_orders:
            for item in orders_with_items_in_stock:
                cumulative_value += D(item.quantity) * item.order_price

        else:
            for item in orders_with_items_in_stock[:-1]:
                cumulative_value += D(item.quantity) * item.order_price

            remainder = current_quantity - cummulative_quantity
            cumulative_value += D(remainder) * orders_with_items_in_stock[-1].order_price

        return cumulative_value


    def set_purchase_price(self, price):
        self.unit_purchase_price = price
        self.save()


    @property
    def quantity(self):

        #returns quantity from all warehouses
        items = InventoryStockItem.objects.filter(item=self)
        return sum([i.quantity for i in items])

    @property
    def locations(self):
        return InventoryStockItem.objects.filter(
            Q(item=self),
            Q(quantity__gt=0)
        )


    def quantity_on_date(self, date):
        # '''
        # Starts with current quantity
        # going back subtract the received invetory
        # add the sold inventory
        # return the result
        # i.e.
        #     on_date = current - orders( + debit notes ) + sold(- credit notes) + scrapped inventory
        # '''
        current_quantity = self.quantity
        print('Current: ', current_quantity)
        total_orders = OrderItem.objects.filter(
            Q(order__date__gte=date) &
            Q(order__date__lte=datetime.date.today()) &
            Q(item=self)
        ).exclude(order__status="draft")

        ordered_quantity = sum([i.received - i.returned_quantity for i in total_orders])

        # will eventually replace with dispatch data
        total_used_as_ingridients = ProductionProcessIngridients.objects.filter(
                                                                Q(process__date__gte=date) &
                                                                Q(process__date__lte=datetime.date.today()) &
                                                                Q(raw_material=self) &
                                                                Q(invoice__draft=False),
                                                            )

        used_quantity = sum([i.quantity for i in total_used_as_ingridients])


        return D(current_quantity) + used_quantity - D(ordered_quantity)


    @property
    def unit_value(self):
        '''the value of inventory on a per item basis'''
        if self.quantity  == 0 or self.stock_value == 0:
            return self.unit_purchase_price
        return self.stock_value / D(self.quantity)


    # @property
    # def sales_to_date(self):
    #     items = invoicing.models.ProductLineComponent.objects.filter(
    #         product=self.inventoryitem)
    #     total_sales = sum(
    #         [(item.invoiceline.subtotal - item.invoiceline.tax_) for item in items])
    #     return total_sales



####################################CONSUMABLE THINGING##############################################################


    @property
    def consumable_value(self):
        if self.type != 'Consumables':
            return D(0)

        current_quantity = self.quantity
        if current_quantity == 0:
            return D(0)

        cummulative_quantity = 0
        orders_with_items_in_stock = []
        partial_orders = False

        #getting the latest orderitems in order of date ordered
        order_items = OrderItem.objects.filter(
            Q(item=self) &
            Q(
                Q(order__status="order") |
                Q(order__status="received-partially") |
                Q(order__status="received")
            )).order_by("order__date").reverse()

        #iterate over items
        for item in order_items:
            # orders for which cumulative ordered quantities are less than
            # inventory in hand are considered
            if (item.quantity + cummulative_quantity) < current_quantity:
                orders_with_items_in_stock.append(item)
                cummulative_quantity += item.quantity

            else:
                if cummulative_quantity < current_quantity:
                    partial_orders = True
                    orders_with_items_in_stock.append(item)

                else:
                    break


        cumulative_value = D(0)
        if not partial_orders:
            for item in orders_with_items_in_stock:
                cumulative_value += D(item.quantity) * item.order_price

        else:
            for item in orders_with_items_in_stock[:-
            1]:#remove last elemnt
                cumulative_value += D(item.quantity) * item.order_price

            remainder = current_quantity - cummulative_quantity
            cumulative_value += D(remainder) * \
                orders_with_items_in_stock[-1].order_price

        return cumulative_value

    @property
    def consumable_unit_value(self):
        if self.consumable_value > 0:
            return self.consumable_value / D(self.quantity)
        return D(0)



    @property
    def consumable_stock_value(self):
        '''.
        averaging- calculating the overall stock value on the average of all
        the values for the quantity in stock.
        '''
        if self.type in ['Equipment', 'RawMaterial']:
            return D(0)

        current_quantity = self.quantity
        cummulative_quantity = 0
        orders_with_items_in_stock = []
        partial_orders = False

        if current_quantity == 0:
            return 0

        #getting the latest orderitems in order of date ordered
        order_items = OrderItem.objects.filter(
            Q(item=self) &
            Q(
                Q(order__status="order") |
                Q(order__status="received-partially") |
                Q(order__status="received")
            )).order_by("order__date").reverse()

        #iterate over items
        for item in order_items:
            # orders for which cumulative ordered quantities are less than
            # inventory in hand are considered
            if (item.quantity + cummulative_quantity) < current_quantity:
                orders_with_items_in_stock.append(item)
                cummulative_quantity += item.quantity


            else:
                if cummulative_quantity < current_quantity:
                    partial_orders = True
                    orders_with_items_in_stock.append(item)

                else:
                    break


        cumulative_value = D(0)
        if not partial_orders:
            for item in orders_with_items_in_stock:
                cumulative_value += D(item.quantity) * item.order_price

        else:
            for item in orders_with_items_in_stock[:-1]:
                cumulative_value += D(item.quantity) * item.order_price

            remainder = current_quantity - cummulative_quantity
            cumulative_value += D(remainder) * orders_with_items_in_stock[-1].order_price

        return cumulative_value


    @staticmethod
    def total_consumable_value():
        return sum(
            [p.stock_consumable_stock_value for p in InventoryItem.objects.filter(
                                type = 'Consumables'
                            )])




    

    


    


