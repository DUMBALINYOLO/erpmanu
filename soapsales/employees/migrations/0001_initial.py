# Generated by Django 3.0.7 on 2020-08-18 13:02

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=355, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('category', models.CharField(choices=[('Owner', 'OWNER'), ('Manager', 'MANAGER'), ('BookKeeper', 'BOOKKEEPER'), ('PayrollOfficer', 'PAYROLL OFFICER'), ('Driver', 'DRIVER'), ('Manufacturing', 'MANUFACTRING'), ('InventoryController', 'INVENTORYCONTROLLER'), ('SalesRep', 'SALES REPRESANTATIVES')], max_length=341)),
                ('employee_number', models.CharField(default=None, max_length=255, null=True)),
                ('phone', models.CharField(blank=True, default='', max_length=16, unique=True)),
                ('first_name', models.CharField(blank=True, max_length=32, null=True)),
                ('middle_name', models.CharField(blank=True, max_length=32, null=True)),
                ('last_name', models.CharField(max_length=32)),
                ('address', models.TextField(blank=True, default='', max_length=128, null=True)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('id_number', models.CharField(blank=True, max_length=64, null=True)),
                ('gender', models.CharField(blank=True, choices=[('male', 'Male'), ('female', 'Female')], max_length=500, null=True)),
                ('leave_days', models.FloatField(blank=True, default=0, null=True)),
                ('last_leave_day_increment', models.DateField(blank=True, null=True)),
                ('uses_timesheet', models.BooleanField(blank=True, default=False, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Allowance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('name', models.CharField(max_length=32)),
                ('amount', models.FloatField()),
                ('taxable', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CommissionRule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('name', models.CharField(max_length=32)),
                ('min_sales', models.FloatField()),
                ('rate', models.FloatField()),
                ('archived', models.BooleanField(default=False)),
                ('reference_number', models.CharField(default=None, max_length=255, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Contract',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('job_position', models.CharField(blank=True, max_length=255)),
                ('end_of_probation', models.DateField()),
                ('termination_date', models.DateField(blank=True, null=True)),
                ('employee_category', models.CharField(choices=[('Temporary', 'Temporary Employee'), ('Subcontractor', 'Subcontractor'), ('Permanent Employee', 'Permanent Employee')], max_length=64)),
                ('nature_of_employment', models.CharField(choices=[('A', 'Arduous'), ('N', 'Normal')], default='N', max_length=1)),
                ('reference_number', models.CharField(default=None, max_length=255, null=True)),
                ('employee', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='contracts', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Deduction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('deduction_method', models.PositiveSmallIntegerField(choices=[(0, 'Custom'), (1, 'Fixed')])),
                ('name', models.CharField(max_length=32)),
                ('tax_deductable', models.BooleanField(default=False)),
                ('basic_income', models.BooleanField(default=False)),
                ('hourly_income', models.BooleanField(default=False)),
                ('overtime_income', models.BooleanField(default=False)),
                ('rate', models.FloatField(default=0)),
                ('fixed_amount', models.FloatField(default=0)),
                ('employer_contribution', models.FloatField(default=0.0)),
                ('archived', models.BooleanField(default=False)),
                ('account_paid_into', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='expense_account', to='accounts.Account')),
                ('benefits', models.ManyToManyField(to='employees.Allowance')),
                ('commission', models.ManyToManyField(to='employees.CommissionRule')),
                ('liability_account', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='liability_account', to='accounts.Account')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True)),
                ('reference_number', models.CharField(default=None, max_length=255, null=True)),
                ('manager', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='manager', to=settings.AUTH_USER_MODEL)),
                ('parent_department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='employees.Department')),
            ],
        ),
        migrations.CreateModel(
            name='PayGrade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=16)),
                ('salary', models.FloatField(default=0)),
                ('pay_frequency', models.PositiveSmallIntegerField(choices=[(0, 'Weekly'), (1, 'Bi-Monthly'), (2, 'Monthly')], default=2)),
                ('monthly_leave_days', models.FloatField(default=0)),
                ('hourly_rate', models.FloatField(default=0)),
                ('overtime_rate', models.FloatField(default=0)),
                ('overtime_two_rate', models.FloatField(default=0)),
                ('subtract_lunch_time_from_working_hours', models.BooleanField(blank=True, default=False)),
                ('lunch_duration', models.DurationField(choices=[(datetime.timedelta(seconds=900), '15 min.'), (datetime.timedelta(seconds=1800), '30 min.'), (datetime.timedelta(seconds=2700), '45 min.'), (datetime.timedelta(seconds=3600), '1 hr.')], default=datetime.timedelta(seconds=3600))),
                ('maximum_leave_days', models.FloatField(default=60.0)),
                ('reference_number', models.CharField(default=None, max_length=255, null=True)),
                ('allowances', models.ManyToManyField(blank=True, to='employees.Allowance')),
                ('commission', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='employees.CommissionRule')),
                ('deductions', models.ManyToManyField(blank=True, to='employees.Deduction')),
            ],
        ),
        migrations.CreateModel(
            name='PayrollSchedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('reference_number', models.CharField(default=None, max_length=255, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PayrollTax',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('paid_by', models.IntegerField(choices=[(0, 'Employees'), (1, 'Employer'), (2, 'Both')])),
                ('reference_number', models.CharField(default=None, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=45, unique=True)),
                ('username', models.CharField(blank=True, max_length=40, null=True)),
                ('active', models.BooleanField(default=True)),
                ('staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('admin', models.BooleanField(default=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Termination',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('reason_for_termination', models.CharField(choices=[('R', 'Retirement'), ('C', 'Casual Employee'), ('D', 'Death'), ('O', 'Other')], default='R', max_length=80)),
                ('reference_number', models.CharField(default=None, max_length=255, null=True)),
                ('contract', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='employees.Contract')),
            ],
        ),
        migrations.CreateModel(
            name='TaxBracket',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lower_boundary', models.DecimalField(decimal_places=2, max_digits=16)),
                ('upper_boundary', models.DecimalField(decimal_places=2, max_digits=16)),
                ('rate', models.DecimalField(decimal_places=2, max_digits=16)),
                ('deduction', models.DecimalField(decimal_places=2, max_digits=16)),
                ('payroll_tax', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='brackets', to='employees.PayrollTax')),
            ],
        ),
        migrations.CreateModel(
            name='Payslip',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('start_period', models.DateField()),
                ('end_period', models.DateField()),
                ('normal_hours', models.FloatField()),
                ('overtime_one_hours', models.FloatField()),
                ('overtime_two_hours', models.FloatField()),
                ('pay_roll_id', models.IntegerField()),
                ('created', models.DateTimeField(auto_now=True)),
                ('pay_grade_version', models.PositiveSmallIntegerField(default=0)),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('verified', 'Verified'), ('paid', 'Paid')], default='draft', max_length=16)),
                ('payslip_number', models.CharField(default=None, max_length=255, null=True)),
                ('employee', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='payslips', to=settings.AUTH_USER_MODEL)),
                ('entry', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.JournalEntry')),
                ('pay_grade', models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.SET_NULL, to='employees.PayGrade')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='PayrollDate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.PositiveSmallIntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10), (11, 11), (12, 12), (13, 13), (14, 14), (15, 15), (16, 16), (17, 17), (18, 18), (19, 19), (20, 20), (21, 21), (22, 22), (23, 23), (24, 24), (25, 25), (26, 26), (27, 27), (28, 28)])),
                ('departments', models.ManyToManyField(to='employees.Department')),
                ('employees', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
                ('pay_grades', models.ManyToManyField(to='employees.PayGrade')),
                ('schedule', models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='employees.PayrollSchedule')),
            ],
        ),
        migrations.AddField(
            model_name='paygrade',
            name='payroll_taxes',
            field=models.ManyToManyField(blank=True, to='employees.PayrollTax'),
        ),
        migrations.CreateModel(
            name='Leave',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('category', models.CharField(choices=[(1, 'Annual Leave'), (2, 'Sick Leave'), (3, 'Study Leave'), (4, 'Maternity Leave'), (5, 'Parental Leave'), (6, 'Bereavement Leave')], max_length=50)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('authorized', 'Authorized'), ('declined', 'Declined')], max_length=50)),
                ('notes', models.TextField(blank=True)),
                ('recorded', models.BooleanField(default=False)),
                ('reference_number', models.CharField(default=None, max_length=255, null=True)),
                ('authorized_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='authority', to=settings.AUTH_USER_MODEL)),
                ('employee', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='leaves', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EmployeeTimeSheet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('month', models.PositiveSmallIntegerField(choices=[(1, 'January'), (2, 'February'), (3, 'March'), (4, 'April'), (5, 'May'), (6, 'June'), (7, 'July'), (8, 'August'), (9, 'September'), (10, 'October'), (11, 'November'), (12, 'December')])),
                ('year', models.PositiveSmallIntegerField(choices=[(2000, 2000), (2001, 2001), (2002, 2002), (2003, 2003), (2004, 2004), (2005, 2005), (2006, 2006), (2007, 2007), (2008, 2008), (2009, 2009), (2010, 2010), (2011, 2011), (2012, 2012), (2013, 2013), (2014, 2014), (2015, 2015), (2016, 2016), (2017, 2017), (2018, 2018), (2019, 2019), (2020, 2020), (2021, 2021), (2022, 2022), (2023, 2023), (2024, 2024), (2025, 2025), (2026, 2026), (2027, 2027), (2028, 2028), (2029, 2029), (2030, 2030), (2031, 2031), (2032, 2032), (2033, 2033), (2034, 2034), (2035, 2035), (2036, 2036), (2037, 2037), (2038, 2038), (2039, 2039), (2040, 2040), (2041, 2041), (2042, 2042), (2043, 2043), (2044, 2044), (2045, 2045), (2046, 2046), (2047, 2047), (2048, 2048), (2049, 2049), (2050, 2050)])),
                ('date', models.DateField()),
                ('complete', models.BooleanField(blank=True, default=False)),
                ('reference_number', models.CharField(default=None, max_length=255, null=True)),
                ('recorded_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='recorder', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EmployeesSettings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('last_payroll_date', models.DateField(blank=True, null=True)),
                ('require_verification_before_posting_payslips', models.BooleanField(default=True)),
                ('salary_follows_profits', models.BooleanField(default=True)),
                ('payroll_counter', models.IntegerField(default=0)),
                ('business_social_security_number', models.CharField(blank=True, default='', max_length=255)),
                ('is_configured', models.BooleanField(default=False)),
                ('service_hash', models.CharField(blank=True, default='', max_length=255)),
                ('payroll_account', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.Account')),
                ('payroll_officer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='payroll_officer', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='deduction',
            name='payroll_taxes',
            field=models.ManyToManyField(to='employees.PayrollTax'),
        ),
        migrations.CreateModel(
            name='AttendanceLine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attendance_status', models.CharField(choices=[('Present', 'PRESENT'), ('Mission', 'ON A MISSION'), ('Sick', 'SICK'), ('Absent', 'ABSENT')], max_length=50)),
                ('time_in', models.TimeField(blank=True, null=True)),
                ('time_out', models.TimeField(blank=True, null=True)),
                ('lunch_duration', models.DurationField(blank=True, null=True)),
                ('employee', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='target', to=settings.AUTH_USER_MODEL)),
                ('timesheet', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='lines', to='employees.EmployeeTimeSheet')),
            ],
        ),
        migrations.AddField(
            model_name='employee',
            name='pay_grade',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='employees.PayGrade'),
        ),
        migrations.AddField(
            model_name='employee',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
    ]
