from django.db import models
from basedata.models import SoftDeletionModel
# from employees.schedules import run_payroll_service
# from background_task.models import Task





        

class EmployeesSettings(SoftDeletionModel):
    last_payroll_date = models.DateField(blank=True, null=True)
    require_verification_before_posting_payslips = models.BooleanField(
        default=True
        )
    salary_follows_profits = models.BooleanField(default=True)
    payroll_officer = models.ForeignKey("employees.Employee",
                                on_delete=models.SET_NULL, 
                                null=True,
                                related_name="payroll_officer",
                                blank=True
                            )
    payroll_account = models.ForeignKey(
                            'accounts.Account',
                            on_delete=models.SET_NULL,
                            null=True
                            )
    payroll_counter = models.IntegerField(default=0)
    business_social_security_number = models.CharField(max_length=255,
        blank=True, default="")
    is_configured = models.BooleanField(default=False)
    service_hash = models.CharField(max_length=255, default="", blank=True)


    def __str__(self): 
        return self.id








