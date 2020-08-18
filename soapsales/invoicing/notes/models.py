

class SalesConfig(SingletonModel):
    #motherboard

    # has
        @classmethod
        def get_config_dict(cls):


class CreditNote(models.Model):
    # """A document sent by a seller to a customer notifying them
    # that a credit has been made to their account against goods returned
    # by the buyer. Linked to invoices. Stores a list of products returned.
    #
    # properties
    # -----------
    # returned_products - returns a queryset of all returned products for an invoice
    # returned_total - returns the numerical value of the products returned.
    #
    # methods
    # -----------
    # create_entry - creates a journal entry in the accounting system where
    #     the customer account is credited and sales returns is debitted. NB
    #     futher transactions will have to be made if the returned goods
    #     are to be written off."""

    def create_entry(self):
        # we have this guy again
        # we are cooking a storm for him


#TODO test
class CreditNoteLine(models.Model):
    # reverse accessed by a creditnote


# I am yet to deprecate this dude
class Customer(SoftDeletionModel):
    # '''The customer model represents business clients to whom products are
    # sold. Customers are typically businesses and the fields reflect that
    # likelihood. Individuals however can also be represented.
    # Customers can have accounts if store credit is extended to them.'''
    #make sure it can only be one or the other not both

    def create_customer_account(self):
        # somehow this method finds itself tied to the save method
        # wanna test if it does override the default save method



class Invoice(SoftDeletionModel):
    # '''An invoice is a document that represents a sale.
    #  Because of the complexity of the object,
    #  both a quotation and an invoice are represented by the same model.
    #  The document starts as a quotation and then can move to a proforma invoice
    #   culminating in the creation of an invoice.
    # In each stage the document can be considered a draft in which case no journal
    # entries are made and no fiscalization takes place. Only non draft invoices can be sent
    #
    #
    # methods
    # -------
    # add_line
    # set_quote_invoice_number
    # _line_total -
    # _line_getter - gets all the invoice lines of a certain type
    #
    #
    #
    #
    # properties
    # --------
    # overdue - bool
    # overdue_days - int
    # total - decimal
    # is_quotation - bool
    # is_credit -bool
    # total_paid - decimal
    # total_due - the remainder fo payments
    # tax_amount - decimal
    # subtotal -decimal
    # sales_lines
    # sales_total
    # service_lines
    # service_total
    # expense_lines
    # expense_total
    # total_shipping_costs
    # percentage_shipping_cost
    # returned_total
    # sales_only
    # service_only
    # expense_only
    #
    #
    #
    # '''
    DEFAULT_WAREHOUSE = 1 #use  fixture
    DEFAULT_SALES_REP = 1
    DEFAULT_CUSTOMER = 1
    SALE_STATUS = [
        ('quotation', 'Quotation'),
        ('proforma', 'Proforma Invoice'),
        ('invoice', 'Invoice'),
        ('paid', 'Paid In Full'),
        ('paid-partially', 'Paid Partially'),
    ]
    # reversal is handled in credit notes

        def add_line(self, data):
            # '''Takes a dictionary that represents the invoice line and create
            # the appropriate objects to match the provided data'''
            # sounds too convoluted
            # concerned about where its called

            def update_inventory(self):
                # '''Removes inventory from the warehouse'''
                # another clown

            def verify_inventory(self):
                # '''Iterates over all the invoice lines and appends checks that indicate
                #     shortages. returns a list of these checks'''
                # how do you get called ?



            def set_quote_invoice_number(self):
                    # '''This method is called when the invoice is created to follow the
                    # numbering sequence stored in the sales config '''
                    # somethings needs doing here


            def create_entry(self):
                # '''Makes the necessary inputs into the accounting system after a
                #     transaction. It debits the customer account and credits the sales
                #     account as well as crediting the tax account''
                # we meet again dude


class InvoiceLine(models.Model):
    LINE_CHOICES = [
        (1, 'product'),
        (2, 'service'),
        (3, 'expense'),
    ]

    def __getattribute__(self, name):
        try:
    # what are you motherfucker


class ProductLineComponent(models.Model):
        # value is calculated once when the invoice is generated to prevent
        # distortions as prices change
        #what it is worth to the business

        def _return(self, quantity):
            self.returned = True
            #Must increment inventory here !! Important
            # increment inventory here. Can be scrapped later or just kept in
            # inventory if ok
            self.invoiceline.invoice.ship_from.add_item(self.product, quantity)
            self.save()
            # has to be called

        def set_value(self):
            self.value = self.product.unit_value * D(self.quantity)
            self.save()
        # lets call you


        def check_inventory(self):
            # '''Checks the shipping warehouse for the required quantity of inventory
            # if a shortage is present return a dict with the product name and the
            # shortage.
            # checks also if pending orders will meet demand in time for the invoices
            # '''
            # whence are you called

class ServiceLineComponent(models.Model):


class ExpenseLineComponent(models.Model):


class SalesRepresentative(SoftDeletionModel):
    # '''Really just a dummy class that points to an employee.
    # allows sales and commission to be tracked.
    #
    # methods
    # ---------
    # sales - takes two dates as arguments and returns the
    # amount sold exclusive of tax. Used in commission calculation
    # yet to deprecate this model with fixing of Employee Module

        def sales(self, start, end):
            '''
            Sales only count for paid invoices
            '''
            # seems a serializer methondfield can call this motherfucker

            
