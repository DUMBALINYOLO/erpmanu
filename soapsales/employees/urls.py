from django.urls import path, include
from rest_framework.routers import DefaultRouter
from employees.apis import (

	EmployeeViewSet,
	EmployeesConfigViewSet,
	DepartmentViewSet,
	TerminationViewSet,
	ContractViewSet,

	LeaveViewSet,
	PendingLeaveViewSet,
	AuthorizedLeaveViewSet,
	DeclinedLeaveViewSet,



	PayGradeViewSet,
	AllowanceViewSet,
	DeductionViewSet,
	CommissionRuleViewSet,
	PayrollTaxViewSet,
	PayrollScheduleViewSet,
	PayrollDateViewSet,
	PayslipViewSet,
	EmployeeTimeSheetViewSet,

	CompanyShareHolderViewSet,
	CompanyManagerViewSet,
	CompanyBookKeeperViewSet,
	CompanyPayRollOfficerViewSet,
	CompanyDriverViewSet,
	CompanyManufacturingPersonelViewSet,
	CompanyInventoryControllerViewSet,
	CompanySalesRepresentativeViewSet


)


router = DefaultRouter()

router.register(r'employees', EmployeeViewSet)
###take from here
router.register(r'company-shareholders', CompanyShareHolderViewSet, basename='company-shareholders')
router.register(r'company-managers', CompanyManagerViewSet, basename='company-managers')
router.register(r'company-bookkeepers', CompanyBookKeeperViewSet, basename='company-bookkeepers')
router.register(r'company-payroll-officers', CompanyPayRollOfficerViewSet, basename='company-payroll-officers')
router.register(r'company-drivers', CompanyDriverViewSet, basename='company-drivers')
router.register(r'company-manufacturing-personells', CompanyManufacturingPersonelViewSet, basename='company-manufacturing-personells')
router.register(r'company-inventory-controllers', CompanyInventoryControllerViewSet, basename='company-inventory-controllers')
router.register(r'company-salesreps', CompanySalesRepresentativeViewSet, basename='company-salesreps')
router.register(r'pending-employee-leaves', PendingLeaveViewSet, basename='pending-employee-leaves')
router.register(r'authorised-employee-leaves', AuthorizedLeaveViewSet, basename='authorised-employee-leaves')
router.register(r'declined-employee-leaves', DeclinedLeaveViewSet, basename='declined-employee-leaves')

#the end

router.register(r'employee-config', EmployeesConfigViewSet, basename='config')
router.register(r'employee-contracts', ContractViewSet, basename='employee-contracts')
router.register(r'employee-contracts-terminations', TerminationViewSet, basename='employee-contracts-terminations')
router.register(r'employee-departments', DepartmentViewSet, basename='employee-departments')
router.register(r'employee-leaves', LeaveViewSet, basename='employee-leaves')
router.register(r'employee-paygrades', PayGradeViewSet, basename='employee-paygrades')
router.register(r'employee-allowances', AllowanceViewSet, basename='employee-allowances')
router.register(r'employee-pay-deductions', DeductionViewSet, basename='employee-pay-deductions')
router.register(r'employee-pay-commission-rules', CommissionRuleViewSet, basename='employee-pay-commission-rules')
router.register(r'employee-payroll-taxes', PayrollTaxViewSet, basename='employee-payroll-taxes')
router.register(r'employee-payroll-schedules', PayrollScheduleViewSet, basename='employee-payroll-schedules')
router.register(r'employee-payroll-dates', PayrollDateViewSet, basename='employee-payroll-dates')
router.register(r'employee-payslips', PayslipViewSet, basename='employee-payslips')
router.register(r'employee-attendance-timesheets', EmployeeTimeSheetViewSet,  basename='employee-attendance-timesheets')



urlpatterns = [
	# path('auth/register/', RegisterAPI.as_view()),
	# path('auth/login', LoginAPI.as_view()),
	# path('auth/user/', UserAPI.as_view()),
	path('auth/', include('djoser.urls')),
	path('auth/', include('djoser.urls.jwt')),

] + router.urls
