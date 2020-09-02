from decimal import Decimal as D
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
 

class CashRegister(models.Model):
    '''
        This is the Pioneer Model for Cash Up System whereby cash is incremented the moment a Client Makes Payment
        and Decremented the moment the Company makes Payments for Inventory, Bills and any Expenses
        We are looking towards making these to be a fully functioning Point Of Sales System with connection to the
        Accounting and Sales System
        This Module is linked to all payments
        There should be gettar methods which get the Products sold from the payment_set.all().invoice.lines.products
        I am looking forwad to have a System that closes the drawer by end of financial day, gives a turnover report
        offers a difference report and have the register closed on a daily basis to start a new one
    '''

    system = models.CharField(max_length=256,default="Physical Cash")
    currency = models.CharField(max_length=64,default="",blank=True)
    balance = models.DecimalField(max_digits=20,decimal_places=5,default=0,blank=True)
    comment = models.CharField(max_length=256, default="")
    is_open = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    cashed_amount = models.DecimalField(max_digits=20,decimal_places=5,default=0.0, null=True, blank=True)


    @property
    def customer_cash_payments_total(self):
        return sum([inpayment.amount_to_pay for inpayment in self.inpayments.filter(
            method='cash')], D(0.0))


    @property
    def customer_transfer_payments_total(self):
        return sum([inpayment.amount_to_pay for inpayment in self.inpayments.filter(
            method='transfer')], D(0.0))

    @property
    def customer_debit_card_payments_total(self):
        return sum([inpayment.amount_to_pay for inpayment in self.inpayments.filter(
            method='debit card')], D(0.0))


    @property
    def customer_mobile_payments_total(self):
        return sum([inpayment.amount_to_pay for inpayment in self.inpayments.filter(
            method='mobile')], D(0.0))

    @property
    def bill_cash_payments_total(self):
        return sum([billpayment.amount for billpayment in self.billpayments.filter(
            method='cash')], D(0.0))

    @property
    def bill_tranfer_payments_total(self):
        return sum([billpayment.amount for billpayment in self.billpayments.filter(
            method='transfer')], D(0.0))

    @property
    def bill_mobile_payments_total(self):
        return sum([billpayment.amount for billpayment in self.billpayments.filter(
            method='mobile')], D(0.0))
    @property
    def bill_debit_card_payments_total(self):
        return sum([billpayment.amount for billpayment in self.billpayments.filter(
            method='debit card')], D(0.0))

    @property
    def inventory_order_cash_payments_total(self):
        return sum([orderpayment.amount for orderpayment in self.orderpayments.filter(
            method='cash')], D(0.0))

    @property
    def inventory_order_transfer_payments_total(self):
        return sum([orderpayment.amount for orderpayment in self.orderpayments.filter(
            method='transfer')], D(0.0))

    @property
    def inventory_order_mobile_payments_total(self):
        return sum([orderpayment.amount for orderpayment in self.orderpayments.filter(
            method='mobile')], D(0.0))

    @property
    def inventory_order_debit_card_payments_total(self):
        return sum([orderpayment.amount for orderpayment in self.orderpayments.filter(
            method='debit_card')], D(0.0))

    
    @property
    def sales_income_subtotal(self):
        return D(
            self.customer_cash_payments_total + \
            self.customer_transfer_payments_total + \
            self.customer_debit_card_payments_total +\
            self.customer_mobile_payments_total
        )


    @property
    def bill_payments_subtotal(self):
        return D(
                self.bill_cash_payments_total + \
                self.bill_tranfer_payments_total + \
                self.bill_mobile_payments_total+ 
                self.bill_debit_card_payments_total
            )


    @property
    def inventory_order_payment_subtotal(self):
        return D(
                self.inventory_order_cash_payments_total +\
                self.inventory_order_transfer_payments_total +\
                self.inventory_order_mobile_payments_total +
                self.inventory_order_debit_card_payments_total
            )



    @property
    def outgoing_payments_total(self):
        return self.bill_payments_subtotal + self.inventory_order_payment_subtotal

    @property
    def must_cash_up(self):
        return D(self.sales_income_subtotal - self.outgoing_payments_total)
    
    

    @property
    def total_cash_up(self):
        if self.cashed_amount == 0.0:
            return D(0.0)
        return cashed_amount

    @property
    def cash_balance_report(self):
        if self.must_cash_up == self.total_cash_up:
            return f'(: Its all good and your Balance is: 0'
        elif self.must_cash_up > self.total_cash_up:
            return f'):Your shortage Balance:{self.must_cash_up - self.total_cash_up}'
        else:
            return f'):Your CASH UP IS OVER BY: {self.total_cash_up - self.must_cash_up }'

    
      

