from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from django.db.models import Q
from .inventory import InventoryItem
from accounts.models import Account, JournalEntry
from simple_history.models import HistoricalRecords
from basedata.const import INVENTORY_ORDER_PAYMENT_METHODS_CHOICES
from basedata.models import SoftDeletionModel




class Category(SoftDeletionModel):
    # '''Used to organize inventory'''
    name = models.CharField(max_length=64)
    parent = models.ForeignKey('inventory.Category', on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField(default="")

    # def get_absolute_url(self):
    #     return reverse("inventory:category-detail", kwargs={"pk": self.pk})




    def __str__(self):
        return self.name

    @property
    def items(self):
        #deprecating
        return InventoryItem.objects.filter(category=self)

    @property
    def children(self):
        return Category.objects.filter(parent=self)

    @property
    def siblings(self):
        if not self.parent:
            return Category.objects.filter(parent__isnull=True).exclude(
                pk=self.pk)
        else:
            return Category.objects.filter(parent=self.parent).exclude(
                pk=self.pk)



class OrderPayment(SoftDeletionModel):
    date = models.DateField()
    method = models.CharField(
            max_length=32,
            choices=INVENTORY_ORDER_PAYMENT_METHODS_CHOICES,
            default='transfer')
    amount = models.DecimalField(max_digits=16,decimal_places=2)
    order = models.ForeignKey('inventory.Order', on_delete=models.SET_NULL,
        null=True)
    comments = models.TextField()
     # History of this item
    history = HistoricalRecords()

    entry = models.ForeignKey('accounts.JournalEntry',
        on_delete=models.SET_NULL,
        blank=True, null=True)
    cash = models.ForeignKey(
                'daily_cash_register.CashRegister', 
                on_delete=models.SET_NULL, 
                null=True,
                blank=True,
                related_name='orderpayments'
            )
    paid_by = models.ForeignKey(
                        'employees.Employee',
                        on_delete = models.SET_NULL,
                        null = True,
                        related_name = 'orderpayments',
                    )


    def save(self, *args, **kwargs):
        if not self.entry:
            self.create_entry()
        super(OrderPayment, self).save(*args, **kwargs)


    def create_entry(self, comments=""):
        if self.entry:
            return
        j = JournalEntry.objects.create(
                memo= 'Auto generated journal entry from order payment.' \
                    if self.comments == "" else self.comments,
                date=self.date,
                journal =Journal.objects.get(pk=44444),
                creator = self.order.issuing_inventory_controller,
                draft = True,
            )

        j.simple_entry(
            self.amount,
            Account.objects.get(pk=1000),#cash in checking account
            self.order.supplier.account,
        )

        if not self.entry:
            self.entry = j



class StockReceipt(SoftDeletionModel):
    '''
    Part of the inventory ordering workflow.
    When an order is generated this object is created to verify
    the receipt of items and comment on the condition of the
    products.

    methods
    ---------

    '''
    order = models.ForeignKey('inventory.Order', on_delete=models.SET_NULL,
        null=True)
    received_by = models.ForeignKey('employees.Employee',
        on_delete=models.SET_NULL,
        null=True,
        default=1)
    receive_date = models.DateField()
    note =models.TextField(blank=True, default="")
    fully_received = models.BooleanField(default=False)
    history = HistoricalRecords()

    def __str__(self):
        return str(self.pk) + ' - ' + str(self.receive_date)

    def save(self, *args, **kwargs):
        super(StockReceipt, self).save(*args, **kwargs)
        self.order.received_to_date = self.order.received_total
        self.order.save()

    @property
    def lines(self):
        return self.lines.prefetch_related(
                                        'receipt',
                                        'line',
                                    )
    
        

class StockReceiptLine(SoftDeletionModel):
    receipt = models.ForeignKey(
                        'inventory.StockReceipt',
                        on_delete=models.SET_NULL,
                        null=True,
                        related_name='lines'
                    )  
    line = models.ForeignKey('inventory.OrderItem', on_delete=models.CASCADE)
    quantity = models.FloatField(default=0.0)
    history = HistoricalRecords()

    def __str__(self):
        return f'{self.id} | {self.quantity} '


    def save(self, *args, **kwargs):
        self.line.received = self.line.received + self.quantity
        self.line.save()
        self.receipt.order.ship_to.add_inventory_stock_item(self.line.item, self.quantity, location=medium)
        super(StockReceiptLine, self).save(*args, **kwargs)



#might need to rename
class InventoryCheck(SoftDeletionModel):
    date = models.DateField()
    adjusted_by = models.ForeignKey('employees.Employee',
        on_delete=models.SET_NULL,
        null=True )
    warehouse = models.ForeignKey('inventory.WareHouse',
        on_delete=models.SET_NULL,
        null=True )
    comments = models.TextField()
    history = HistoricalRecords()

    @property
    def adjustments(self):
        return self.adjustments.prefetch_related(
                                        'warehouse_item',
                                        'inventory_check'
                                    )

    @property
    def value_of_all_adjustments(self):
        return sum(
            [i.adjustment_value for i in self.adjustments])

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.warehouse.last_inventory_check_date = self.date


class StockAdjustment(SoftDeletionModel):
    warehouse_item = models.ForeignKey('inventory.InventoryStockItem',
        on_delete=models.SET_NULL, null=True)
    adjustment = models.FloatField()
    note = models.TextField()
    inventory_check = models.ForeignKey(
                            'inventory.InventoryCheck',
                            on_delete=models.SET_NULL, 
                            null=True,
                            related_name = 'adjustments',
                        )
    history = HistoricalRecords()

    @property
    def adjustment_value(self):
        return D(self.adjustment) * self.warehouse_item.item.unit_purchase_price

    @property
    def prev_quantity(self):
        return self.warehouse_item.quantity + self.adjustment

    def adjust_inventory(self):
        self.warehouse_item.decrement(self.adjustment)

    def save(self, *args, **kwargs):
        super(StockAdjustment, self).save(*args, **kwargs)
        self.adjust_inventory()



class TransferOrder(SoftDeletionModel):
    date = models.DateField()
    expected_completion_date = models.DateField()
    issuing_inventory_controller = models.ForeignKey('employees.Employee',
        related_name='issuing_inventory_controller',
        on_delete=models.SET_NULL, null=True)
    receiving_inventory_controller = models.ForeignKey('employees.Employee',
        on_delete=models.SET_NULL, null=True)
    actual_completion_date =models.DateField(null=True)#provided later
    source_warehouse = models.ForeignKey('inventory.WareHouse',
        related_name='source_warehouse', on_delete=models.SET_NULL, null=True,)
    receiving_warehouse = models.ForeignKey('inventory.WareHouse',
        on_delete=models.SET_NULL, null=True,)
    order_issuing_notes = models.TextField(blank=True)
    receive_notes = models.TextField(blank=True)
    completed = models.BooleanField(default=False)

    def complete(self):
        # '''move all the outstanding items at the same time.'''
        for line in self.transferorderline_set.filter(moved_quantity=0):
            line.move(line.quantity)
        self.completed = True
        self.save()

    def update_completed_status(self):
        # TODO inefficient
        completed = True
        for line in self.transferorderline_set.all():
            if line.quantity > line.moved_quantity:
                completed = False

        self.completed = completed
        self.save()

class TransferOrderLine(SoftDeletionModel):
    item = models.ForeignKey('inventory.InventoryItem',
        on_delete=models.SET_NULL,
        null=True)
    quantity = models.FloatField()
    transfer_order = models.ForeignKey(
                                    'inventory.TransferOrder',
                                    on_delete=models.SET_NULL, 
                                    null=True,
                                    related_name='lines'
                                )
    moved_quantity = models.FloatField(default=0.0)

    def move(self, quantity, location=None):
        # '''performs the actual transfer of the item between warehouses'''
        self.transfer_order.source_warehouse.decrement_inventory_stock_item(
            self.item, quantity)
        self.transfer_order.receiving_warehouse.add_inventory_stock_item(
            self.item, quantity, location=location)
        self.moved=quantity
        self.save()
        self.transfer_order.update_completed_status()

        

class InventoryScrappingRecord(SoftDeletionModel):
    date = models.DateField()
    controller = models.ForeignKey('employees.Employee',
        on_delete=models.SET_NULL, null=True)
    warehouse = models.ForeignKey('inventory.WareHouse', on_delete=models.SET_NULL, null=True)
    comments = models.TextField(blank=True)

    @property
    def scrapping_value(self):
        return sum(
            [i.scrapped_value \
                for i in self.inventoryscrappingrecordline_set.all()],
                0)

    @property
    def scrapped_items(self):
        return self.inventoryscrappingrecordline_set.all()

    def scrap(self):
        #must be called after all the lines are created
        for item in self.scrapped_items:
            self.warehouse.decrement_item(item.item, item.quantity)

class InventoryScrappingRecordLine(SoftDeletionModel):
    item = models.ForeignKey('inventory.InventoryItem',
        on_delete=models.SET_NULL,
        null=True)
    quantity = models.FloatField()
    note = models.TextField(blank=True)
    scrapping_record = models.ForeignKey('inventory.InventoryScrappingRecord', related_name='lines', on_delete=models.SET_NULL, null=True)

    @property
    def scrapped_value(self):
        #TODO fix
        if self.item.product_component:
            return self.item.product_component.unit_sales_price * \
                D(self.quantity)

        return 0
