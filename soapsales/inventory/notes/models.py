

class InventorySettings(SoftDeletionModel):
    # master module for this app

class InventoryController(models.Model):
    # '''Model that represents employees with the role of
    # inventory controller and have the ability to make purchase orders,
    # receive them, transfer inventory between warehouses and perform other
    # functions.'''
    # for bookkeepers and manager

class UnitOfMeasure(SoftDeletionModel):
    # '''Class for arepresenting units of inventory.
    # can be a base unit where no calculations are required.
    # can also be a derived unit where the quantity is calculated back into the base unit for each element.'''
    # need upgrading



class Category(models.Model):
    # '''Used to organize inventory'''

class DebitNote(models.Model):
    # """A document sent by a business to a supplier notifying them
    # that inventory has been returned for some reason. Linked to Orders. Stores a list of products returned.
    #
    # properties
    # -----------
    # returned_items - returns a queryset of all returned products for an invoice
    # returned_total - returns the numerical value of the products returned.
    #
    # methods
    # -----------
    # create_entry - creates a journal entry in the accounting system."""

    # we have a pending business buddie
    # def create_entry(self):
    # creates an Entry to Journal


class DebitNoteLine(models.Model):
    # reverse accessed by debit

class OrderPayment(SoftDeletionModel):
    #create_entry
    # takes in simple entry
    # cash account


#Note as currently designed it cannot be known when exactly an item entered inventory
class StockReceipt(SoftDeletionModel):
    # '''
    # Part of the inventory ordering workflow.
    # When an order is generated this object is created to verify
    # the receipt of items and comment on the condition of the
    # products.
    #
    # methods
    # ---------
    #
    # ''' has a save method


class StockReceiptLine(models.Model):


#might need to rename
class InventoryCheck(models.Model):
    # stock take
    # has a custom save method



class StockAdjustment(models.Model):
    # adjust inventory method need to see where this is called
    ### with warehouse item there seem to be a symbiosis
    # its called on the custom save method


class TransferOrder(models.Model):
    # def complete(self):
        # '''move all the outstanding items at the same time.'''
        # wanna call you
        # reverse accesses transferorderline_set.filter(moved_quantity=0)
        # it even call its move model method


    # def update_completed_status(self):
    #         # TODO inefficient



class TransferOrderLine(models.Model):
        # def move(self, quantity, location=None):
        #     # '''performs the actual transfer of the item between warehouses'''
        # its being accessed by complete method of transferorder
        # it a accesses tranferorder update_completed_status on transferorder


class InventoryScrappingRecord(models.Model):
        # def scrap(self):
        #     #must be called after all the lines are created
        # related to warehouse and seems to access its decrement method

class InventoryScrappingRecordLine(models.Model):
    # we cool for now ma nigga

class InventoryItem(SoftDeletionModel):
    # what the fuck is this __getatribute__ method
    #def set_purchase_price
    ## what are we doing here

    # we need to deal with this nigga
    # @staticmethod
    # def total_inventory_value():


class ProductComponent(models.Model):
    # quantity on date will try to handle it with a SerializerMethodField()



class EquipmentComponent(models.Model):
    CONDITION_CHOICES = [
        ('excellent', 'Excellent'),
        ('good', 'Good'),
        ('poor', 'Poor'),
        ('broken', 'Not Functioning')
    ]
    # we cool


# TODO i need to separate the order types into product, consumable and
# equipment orders. Each order has its own entries
class Order(SoftDeletionModel):
    # '''The record of all purchase orders for inventory of items that
    # will eventually be sold. Contains the necessary data to update
    # inventory and update the Purchases Journal.
    # An aggregate with the OrderItem class.
    # A cash order creates a transaction creation.
    # A deferred payment pays on the deferred date.(Not yet implemented)
    # A pay on receipt order creates the transaction when receiving a
    # goods received voucher.
    #
    # properties
    # ------------
    # total - returns the total value of the items ordered.
    # received_total - returns the numerical value of items received
    # fully_received - returns a boolean if all the ordered items have
    #     been received.
    # percent_received - is the percentage of the order that has been
    #     fulfilled by the supplier.
    #
    # methods
    # -------------
    # receive - quickly generates a stock receipt where all items are
    #     marked fully received
    # '''

    # def create_entry(self):
        #verified

    # def receive(self):
    ### where do I handle and call you


class OrderItem(models.Model):
    # '''A component of an order this tracks the order price
    # of an item its quantity and how much has been received.
    #
    # methods
    # -----------
    # receive - takes a number and adds its value to the item inventory
    #     and the orderitem's received quantity field.
    #
    # properties
    # -----------
    # received_total - returns the cash value of the items received
    # subtotal - returns the cash value of the items ordered
    # '''

    def receive
    ### invoke me

    def _return_to_vendor(self, n):
        # where are you called you cunt


class Supplier(SoftDeletionModel):
    # '''The businesses and individuals that provide the organization with
    # products it will sell. Basic features include contact details address and
    # contact people.
    # The account of the supplier is for instances when orders are made on credit.'''
    # # one or the other
    def create_account:
        # handle me please ---call me


class WareHouse(models.Model):
    def decrement_item(self, item, quantity):
        # '''Takes an item and decrements it from the appropriate warehouse item'''
        #safety checks handled elsewhere
        # whence shall you be called

    def get_item(self, item):
        # '''can accept product consumable or equipment as an arg'''
        # call me maybe

    def has_item(self, item):
        # calls get_item

    # well this motherfuqers a calling each other
    def get_item(self, item):
        # '''can accept product consumable or equipment as an arg'''
        if WareHouseItem.objects.filter(
            item=item, warehouse=self).exists():

            return WareHouseItem.objects.get(item=item, warehouse=self)

        return None # next code is dead for now

    def has_item(self, item):
        return self.get_item(item) is not None

    def has_quantity_greater_than_zero(self, item):
        queried_item = self.has_item(item)

        if not queried_item: return False

        return queried_item.quantity > 0

    def add_item(self, item, quantity, location=None):
        # reverse accesses warehouse item

    def transfer(self, other, item, quantity):
        #transfer stock from current warehouse to other warehouse


class WareHouseItem(models.Model):
    # NB for now the software will require all items of the same type to be
    # stored in the same location for the same warehouse.


class StorageMedia(models.Model):
    
