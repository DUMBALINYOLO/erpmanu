import uuid
import random
import datetime
from decimal import Decimal as D
from functools import reduce
from django.db import models
from django.db.models import Q
from django.utils import timezone
from basedata.models import SingletonModel, SoftDeletionModel
from basedata.const import (
                    EMPLOYEE_DEDUCTION_METHODS,
                    EMPLOYEE_PAYROLL_TAX_CHOICES,
                    EMPLOYEE_PAYROLL_DATE_CHOICES,
                )



class Allowance(SoftDeletionModel):
    '''simple object that tracks a fixed benefit or allowance granted as
    part of a pay grade'''
    name = models.CharField(max_length = 32)
    amount = models.FloatField()
    taxable = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    



class Deduction(SoftDeletionModel):
    '''
    Many deductions are complex and this model reflects those features.
    For simple deductions a fixed amount can be applied.
    For more complex deductions percentage rating and variable triggers are supported
    So far implemented are deductions based on
    1. All income
    2. Taxable income
    3. Tax

    methods
    -----------
    deduct - takes a payslip as a argument and returns the value of the deduction
    based on the rules defined in the model.

    '''
    deduction_method = models.PositiveSmallIntegerField(
        choices=EMPLOYEE_DEDUCTION_METHODS)
    name = models.CharField(max_length=32)
    tax_deductable = models.BooleanField(default=False)
    basic_income = models.BooleanField(default=False)
    hourly_income = models.BooleanField(default=False)
    overtime_income = models.BooleanField(default=False)
    benefits = models.ManyToManyField('employees.Allowance')
    commission = models.ManyToManyField('employees.Commissionrule')
    payroll_taxes = models.ManyToManyField('employees.Payrolltax')
    rate = models.FloatField(default=0)
    fixed_amount = models.FloatField(default=0)
    employer_contribution = models.FloatField(default=0.0)#percentage of deduction total
    liability_account = models.ForeignKey(
                                'accounts.Account',
                                on_delete=models.SET_NULL,
                                null = True,
                                related_name='liability_account'
                            )# salaries

    account_paid_into = models.ForeignKey(
                            'accounts.Account',
                            on_delete=models.SET_NULL,
                            related_name='expense_account',
                            null=True
                            )# salaries
    archived = models.BooleanField(default=False)

    def __str__(self):
        return self.name

        

    @property
    def method_string(self):
        return dict(self.DEDUCTION_METHODS)[self.deduction_method]

    def employer_deduction(self, payslip):
        employee_deduction = self.deduct(payslip)
        return employee_deduction * (self.employer_contribution / 100.0)


    # I have to call you somewhere with a post method 
    def deduct(self, payslip):
        if self.deduction_method == 0:
            tax_total = 0
            income = 0
            #to avoid infinite recursion add all income that is taxable
            taxable = 0
            taxable += payslip.paygrade_['salary'] + payslip.overtime_pay \
                + payslip.normal_pay


            if self.basic_income:
                income += payslip.paygrade_['salary']
            if self.overtime_income:
                income += payslip.overtime_pay
            if self.hourly_income:
                income += payslip.normal_pay
            for commission in self.commission.all():
                if commission.pk == payslip.paygrade_['commission_id']:
                    income += self.paygrade.commission_pay
                    taxable += self.paygrade.commission_pay

            #all the above are taxable

            for benefit in self.benefits.all():
                if benefit.pk in payslip.paygrade_['allowances']:
                    income += benefit.amount


            for pk in payslip.paygrade_['allowances']:
                benefit = Allowance.objects.get(pk=pk)
                if benefit.taxable:
                    taxable += benefit.amount

            if self.payroll_taxes.all().count() > 0:
                for pk in payslip.paygrade_['payroll_taxes']:
                    tax = PayrollTax.objects.get(pk=pk)

                    tax_total += tax.tax(taxable)



            deduction = (income + float(tax_total)) * (self.rate / 100.0)

        else:
            deduction = self.fixed_amount

        return deduction



class CommissionRule(SoftDeletionModel):
    '''simple model for giving sales representatives commission based on
    the product they sell. Given a sales target and a percentage, the commission can
    be calculated.'''
    name = models.CharField(max_length=32)
    min_sales = models.FloatField()
    rate = models.FloatField()
    archived = models.BooleanField(default=False)
    reference_number = models.CharField(max_length=255, null=True, default=None)

    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(CommissionRule, self).save(*args, **kwargs)


    def __str__(self):
        return f'{self.reference_number} {self.name}'

   


class PayrollTax(models.Model):
    name = models.CharField(max_length=64)
    paid_by = models.IntegerField(choices=EMPLOYEE_PAYROLL_TAX_CHOICES)
    reference_number = models.CharField(max_length=255, null=True, default=None)


    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(PayrollTax, self).save(*args, **kwargs)



    def __str__(self):
        return f'{self.reference_number} {self.name}'

    


    
    def tax(self, gross):
        bracket = self.get_bracket(gross)
        if bracket:
            return (D(gross) * (bracket.rate / D(100.0))) - bracket.deduction
        return 0

    def get_bracket(self, gross):
        for bracket in self.lines.all():
            if bracket.lower_boundary <= gross and \
                    bracket.upper_boundary >= gross:
                return bracket
        return None





    @property
    def list_brackets(self):
        return TaxBracket.objects.filter(payroll_tax =self).order_by('upper_boundary')

    #no detail view


class TaxBracket(models.Model):
    payroll_tax = models.ForeignKey(
                            'employees.PayrollTax',
                            on_delete=models.SET_NULL, 
                            null=True,
                            related_name='brackets'

                        )
    lower_boundary = models.DecimalField(max_digits=16, decimal_places=2)
    upper_boundary = models.DecimalField(max_digits=16, decimal_places=2)
    rate = models.DecimalField(max_digits=16, decimal_places=2)
    deduction = models.DecimalField(max_digits=16, decimal_places=2)


class PayrollSchedule(SingletonModel):
    '''A container for payroll dates'''
    name = models.CharField(max_length=255)
    reference_number = models.CharField(max_length=255, null=True, default=None)


    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(PayrollSchedule, self).save(*args, **kwargs)



    def __str__(self):
        return f'{self.reference_number} {self.name}'



class PayrollDate(models.Model):
    # '''Represents a date in the month when payroll is run. On each such date
    # all employees in the relevant
    # #grades, departments or employee list have paychecks created.'''

    date = models.PositiveSmallIntegerField(choices = EMPLOYEE_PAYROLL_DATE_CHOICES)
    employees = models.ManyToManyField('employees.Employee')
    departments = models.ManyToManyField('employees.Department')
    pay_grades = models.ManyToManyField('employees.PayGrade')
    schedule = models.ForeignKey('PayrollSchedule', default=1,
        on_delete=models.SET_DEFAULT)

    def __str__(self):
        return f"{self.schedule.name}: {self.date}"

    @property
    def number_of_employees(self):
        return len(self.all_employees)

    @property
    def all_employees(self):
        employees = list(self.employees.all())

        for department in self.departments.all():
            employees += [employee for employee in department.employees.all() \
                if employee not in employees]

        for grade in self.pay_grades.all():
            employees += [employee for employee in grade.employee_set.all() \
                if employee not in employees]

        return employees

    @property
    def date_suffix(self):
        suffices = ['st', 'nd', 'rd'] + ['th' for i in range(3, 29)]
        return suffices[self.date -1]


    
