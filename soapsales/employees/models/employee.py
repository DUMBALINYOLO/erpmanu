from django.db import models
import uuid
from django.db import models
from datetime import date
from django.utils import timezone
from django.core.validators import RegexValidator
from django.contrib.auth.models import (
        BaseUserManager, 
        AbstractBaseUser,
        PermissionsMixin
    )
from basedata.const import (
            EMPLOYEES_GENDER_CHOICES,
            EMPLOYEE_CONTRACT_TERMINATION_REASONS,
            NATURE_OF_EMPLOYMENT_CHOICES,
            EMPLOYEE_CATEGORY_CHOICES,
            EMPLOYEES_TYPE_CHOICES
        )

import accounts
from .timesheet import (
            EmployeeTimeSheet,
            AttendanceLine
        )

from invoicing.models import Invoice, Payment


class EmployeeManager(BaseUserManager):
    

    def create_user(self, email, is_superuser=False, password=None, is_active=True, is_staff=False, is_admin=False):
        if not email:
            raise ValueError("Enter Valid Email")
        user_obj = self.model(
                email=self.normalize_email(email)
        )
        user_obj.set_password(password)
        user_obj.staff = is_staff
        user_obj.admin = is_admin
        user_obj.active = is_active
        user_obj.save(using=self._db)
        return user_obj


    def create_superuser(self, email, password=None, **extra_fields):
        user=self.create_user(
            email,
            password = password,
            is_staff = True,
            is_admin =True,
            is_superuser=True, 
            **extra_fields
        )
        return user





class Employee(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, max_length=355)
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    category = models.CharField(max_length=341, choices=EMPLOYEES_TYPE_CHOICES)
    employee_number = models.CharField(max_length=255, null=True, unique=True, default=None)
    phone = models.CharField(max_length =16, unique=True, blank=True, default="")
    first_name = models.CharField(max_length =32, blank=True, null=True)
    middle_name = models.CharField(max_length =32, blank=True, null=True)
    last_name = models.CharField(max_length =32)
    is_superuser = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)

    address = models.TextField(max_length =128, blank=True, null=True, default="")
    date_of_birth = models.DateField(blank=True, null=True)
    id_number = models.CharField(max_length=64, blank=True, null=True)
    gender = models.CharField(max_length=500, choices=EMPLOYEES_GENDER_CHOICES, blank=True, null=True)
    pay_grade = models.ForeignKey(
                                'employees.PayGrade',
                                on_delete=models.CASCADE, 
                                blank=True, 
                                null=True
                            )
    leave_days = models.FloatField(default=0, blank=True, null=True)
    last_leave_day_increment = models.DateField(blank=True, null=True)
    uses_timesheet = models.BooleanField(default=False,blank=True, null=True)
    # account = models.ForeignKey('accounts.Account', on_delete=models.CASCADE,
    #     null=True)#created in save method

    objects = EmployeeManager()

    
    USERNAME_FIELD = 'email'
    REQUIRE_FIELDS = ['category', 'first_name', 'last_name']


    def save(self, *args, **kwargs):
        if not self.employee_number:
            self.employee_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        # if not self.account:
        #     self.create_employee_account()
        super(Employee, self).save(*args, **kwargs)



    # def create_employee_account(self):
    #     from accounts.models import Account
    #     n_employees = Employee.objects.all().count()
    #     acc_nos = Account.objects.all().count()
    #     new_num = (acc_nos + 1) + 8000 
    #     self.account = Account.objects.create(
    #             name= "Employee: %s" % self.email,
    #             id= (1100 + n_employees + 20) * 2,
    #             balance = 0,
    #             type = 'income',
    #             description = 'Account which represents credit extended to a customer',
    #         )



    def get_full_name(self):
        return f'{self.first_name} {self.first_name}'

    def get_short_name(self):
        return f'{self.first_name} {self.first_name}'


    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True


    @property
    def is_staff(self):
        return self.staff


    @property
    def is_admin(self):
        return self.admin



    @property
    def is_cashier(self):
        return self.category == 'BookKeeper'


    def sales(self, start, end):
        '''
        Sales only count for paid invoices
        '''
        if not self.is_cashier:
            return None
        invoices = Invoice.objects.filter(
                    Q(status="sale") &
                    Q(cashier=self) &
                    (Q(due__lte=end)
                    | Q(due__gte=start))
            )

        #exclude tax in the calculation
        return sum([i.subtotal for i in invoices])


    def invoices(self, start, end):
        '''
        Sales only count for paid invoices
        '''
        if not self.is_cashier:
            return None
        invoices = Invoice.objects.filter(
                    ~Q(status='sale')
                    &Q(cashier=self) 
                    &(Q(due__lte=end) |
                    Q(due__gte=start))
            )

        #exclude tax in the calculation
        return sum([i.subtotal for i in invoices])


    def incoming_payments(self, start, end):
        if not self.is_cashier:
            return None
        payments = self.incoming_payments.filter(
                    Q(cashier=self) &
                    (Q(due__lte=end) |
                    Q(due__gte=start))
            )
        return sum ([i.amount_to_pay for i in payments])



    @property
    def latest_timesheet(self):
        qs =EmployeeTimeSheet.objects.filter(employee=self)

        return EmployeeTimeSheet.objects.filter(employee=self).latest('pk').pk


    

    def get_earnings_for_month(self, start):
        earnings = 0
        last_day = calendar.monthrange(start.year, start.month)
        end = datetime.date(start.year, start.month, last_day[1])
        #using end period for payslips
        slips = Payslip.objects.filter(end_period__gte=start,
            end_period__lte=end,
            status__in=['verified', 'paid'])
        earnings += sum([i.paygrade_['salary'] for i in slips])

        return earnings

    @property
    def contracts(self):
        return self.contracts.all()
    


    def get_nps_earnings(self, start):
        #get total earnings in month
        earnings = self.get_earnings_for_month(start)

        if earnings < D(700.0):
            return earnings

        return D(700.0)


    def total_nps(self, start):
        insurable_earnings = self.get_nps_earnings(start)

        return D(insurable_earnings) * D(0.07)

    def increment_leave_days(self, days):
        self.leave_days += days
        self.last_leave_day_increment = datetime.date.today()
        if self.pay_grade and \
                self.leave_days > self.pay_grade.maximum_leave_days:
            self.leave_days = self.pay_grade.maximum_leave_days

        self.save()

    def deduct_leave_days(self, days):
        self.leave_days -= days
        self.save()

    def __str__(self):
        return self.email

    @property
    def _payslips_YTD(self):
        '''internal abstract method used in the following properties'''
        curr_year = datetime.date.today().year
        start = datetime.date(curr_year, 1, 1)
        end = datetime.date(curr_year,12,31)

        return Payslip.objects.filter(Q(employee=self) \
            & Q(start_period__gte=start) \
            & Q(end_period__lte=end)
            & Q(status="verified"))

    @property
    def payslips(self):
        return self.payslips.prefetch_related(
                                            'pay_grade',
                                            'entry'
                                        )
    

    @property
    def deductions_YTD(self):
        slips = self._payslips_YTD
        return sum([i.total_deductions for i in slips])

    @property
    def earnings_YTD(self):
        slips = self._payslips_YTD
        return sum([i.gross_pay for i in slips])

    

    @property
    def agenda_items(self):
        #check participants as well
        filter = None
        if self:
            filter = Q(Q(owner=self) | Q(eventparticipant__employee=self))
        else:
            filter = Q(eventparticipant__employee=self)
        return Event.objects.filter(
            Q(Q(completed=False) & Q(date__gte=datetime.date.today())) &
            filter).count()


    @property
    def missed_events(self):
        #check participants as well
        filter = None
        if self:
            filter = Q(Q(owner=self) | Q(eventparticipant__employee=self))
        else:
            filter = Q(eventparticipant__employee=self)
        return Event.objects.filter(
            Q(Q(completed=False) & Q(date__lt=datetime.date.today())) &
            filter).count()

    @property
    def attendance(self):
        TODAY = datetime.date.today()

        if EmployeeTimeSheet.objects.filter(
                employee=self,
                year=TODAY.year,
                month=TODAY.month).exists():
            sheet = EmployeeTimeSheet.objects.get(
                                    employee=self,
                                    year=TODAY.year,
                                    month=TODAY.month)

            attendance = []
            for i in range(1,32):
                try:
                    date = datetime.date(TODAY.year, TODAY.month, i)
                except:
                    attendance.append(2)
                    continue
                else:
                    if AttendanceLine.objects.filter(
                                date=date, timesheet=sheet).exists():
                        attendance.append(0)
                    else:
                        attendance.append(2)

            return attendance

        else:
            return list(range(1,32))


class Department(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    manager = models.ForeignKey('Employee', on_delete=models.SET_NULL, related_name="manager", null=True)
    employees = models.ManyToManyField(
                            'Employee',
                            related_name="employees"
                        )
    parent_department = models.ForeignKey(
                                    'self', 
                                    on_delete=models.SET_NULL, 
                                    null=True, 
                                    blank=True
                                )
    reference_number = models.CharField(max_length=255, null=True, unique=True, default=None)



    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(Department, self).save(*args, **kwargs)


    def __str__(self):
        return f'{self.name} {self.reference_number}'



    @property
    def children(self):
        return Department.objects.filter(parent_department=self)

    @property
    def employees(self):
        return self.employees.all()

    


class Termination(models.Model):
    date = models.DateField()
    reason_for_termination = models.CharField(max_length=80, default='R',
        choices=EMPLOYEE_CONTRACT_TERMINATION_REASONS)
    contract = models.OneToOneField('Contract', null=True,
        blank=True,on_delete=models.SET_NULL)
    reference_number = models.CharField(max_length=255, null=True, unique=True, default=None)


    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(Termination, self).save(*args, **kwargs)


    def __str__(self):
        return self.reference_number




class Contract(models.Model):

    start_date = models.DateField()
    employee = models.ForeignKey(
                            'Employee', 
                            null=True,
                            blank=True,
                            on_delete=models.SET_NULL,
                            related_name = 'contracts'
                        )
    job_position = models.CharField(max_length=255, blank=True)
    end_of_probation = models.DateField()
    termination_date = models.DateField(blank=True, null=True)
    employee_category = models.CharField(max_length=64,
        choices=EMPLOYEE_CATEGORY_CHOICES)
    nature_of_employment = models.CharField(max_length=1, default='N',
        choices=NATURE_OF_EMPLOYMENT_CHOICES)

    reference_number = models.CharField(max_length=255, null=True, default=None, unique=True)


    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = str(uuid.uuid4()).replace("-", '').upper()[:20]
        super(Contract, self).save(*args, **kwargs)


    def __str__(self):
        return self.reference_number



        





    