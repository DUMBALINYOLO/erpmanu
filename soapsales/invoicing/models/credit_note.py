from functools import reduce
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models
from decimal import Decimal as D

# from accounts.models import Account, JournalEntry



class CreditNote(models.Model):
    """
        A document sent by a seller to a customer notifying them
        that a credit has been made to their account against goods returned
        by the buyer. Linked to invoices. Stores a list of products returned.

        properties
        -----------
        returned_products - returns a queryset of all returned products for an invoice
        returned_total - returns the numerical value of the products returned.

        methods
        -----------
        create_entry - creates a journal entry in the accounting system where
            the customer account is credited and sales returns is debited. NB
            futher transactions will have to be made if the returned goods
            are to be written off.
    """

    date = models.DateField()
    invoice = models.ForeignKey('invoicing.Invoice',
            on_delete=models.SET_NULL, null=True)
    comments = models.TextField()#never allow blank comments
    entry = models.ForeignKey("accounts.JournalEntry", null=True,
        on_delete=models.SET_NULL)
    reference_number = models.CharField(max_length=255, null=True, default=None)


    #

    # def save(self, *args, **kwargs):
    #     if not self.reference_number:
    #        prefix = 'CNOTE-{}'.format(timezone.now().strftime('%y%m%d'))
    #        prev_instances = self.__class__.objects.filter(reference_number__contains=prefix)
    #        if prev_instances.exists():
    #           last_instance_id = prev_instances.last().reference_number[-4:]
    #           self.reference_number = prefix+'{0:04d}'.format(int(last_instance_id)+1)
    #        else:
    #            self.reference_number = prefix+'{0:04d}'.format(1)
    #     if self.entry is None:
    #         self.create_entry()
    #     super(CreditNote, self).save(*args, **kwargs)


    @property
    def returned_products(self):
        return self.lines.prefetch_related(
                                    'line'
                                ).order_by('-id')

    @property
    def returned_total(self):
        return sum([i.returned_value for i in self.returned_products])

    @property
    def tax_credit(self):
        return sum([(i.line.tax_) \
            for i in self.lines.all() if i.line and i.line.tax] ,0)

    @property
    def returned_total_with_tax(self):
        return D(self.returned_total) + D(self.tax_credit)

    @property
    def total(self):
        return self.returned_total_with_tax

    @property
    def subtotal(self):
        return self.returned_total

    @property
    def tax_amount(self):
        return self.tax_credit

    def create_entry(self):
        from accounts.models import Account, JournalEntry
        j = JournalEntry.objects.create(
            memo=f"Journal entry for credit note #{self.pk}. From Invoice #{self.invoice.invoice_number}",
            date=self.date,
            is_approved = True,
            creator = self.invoice.salesperson.employee
        )


        j.credit(self.returned_total_with_tax, self.invoice.customer.account)
        # sales returns
        j.debit(self.returned_total, Account.objects.get(name='SALES-RETURN-ACCOUNT-NUMBER-ONE'))
        # tax account
        j.debit(self.tax_credit, Account.objects.get(name='TAX-ACCOUNT-NUMBER-TWO'))

        self.entry = j
        self.save()

#TODO test
class CreditNoteLine(models.Model):
    '''
        This model needs to decrement the cash register, and increment the stock
    '''
    note = models.ForeignKey(
                        'invoicing.CreditNote', 
                        null=True,
                        on_delete=models.SET_NULL,
                        related_name='lines'
                        )
    line = models.ForeignKey('invoicing.InvoiceLine', null=True,
            on_delete=models.SET_NULL)
    quantity = models.FloatField()

    def __str__(self):
        return "{}".format((str(self.line)))

    @property
    def returned_value(self):
        '''Factors for line by line discount'''
        # support other kinds of objects
        if self.line and self.line.product:
            discount =  self.line.product.nominal_price * \
                (self.line.discount / D(100))
            discounted_price = self.line.product.nominal_price - discount
            return D(self.quantity) * discounted_price

        return 0.0
