from rest_framework import routers
from django.urls import path

from .api import (
            NoteViewSet,
            OrganizationViewSet,
            UnitOfMeasureViewSet,
            AccountTypesCategoryChoicesAPIView,
            AccountTypesClassificationChoicesAPIView,
            AssetsDepreciationMethodChoicesAPIView,
            AssetTypesChoicesAPIView,
            AccountingPeriodsChoicesAPIView,
            JournalEntryTypesChoicesAPIView,
            EmployeesGenderChoicesAPIView,
            InventoryTypesChoicesAPIView,
            ProductComponentPricingChoicesAPIView,
            EquipmentComponentConditionChoicesAPIView,
            InventoryOrderStatusChoicesAPIView,
            InvoiceSaleStatusChoicesAPIView,
            InvoiceLineChoicesAPIView,
            CustomerPaymentMethodsChoicesAPIView,
            ProcessRateUnitTimeChoicesAPIView,
            ManufacturingProductTypesChoicesAPIView,
            BillOfMaterialsLineChoicesAPIView,
            ProcessedProductsStockStatusChoicesAPIView,
            ManufacturingProcessChoicesAPIView,
            NatureOfEmploymentChoicesAPIView,
            ##start
            EmployeeYearChoicesAPIView,
            EmployeeTimesheetMonthChoicesAPIView,
            EmployeePayslipStatusChoicesAPIView,
            EmployeePayrollDateChoicesAPIView,
            EmployeeDeductionMethodsAPIView,
            EmployeePayFrequenciesAPIView,
            EmployeeLunchChoicesAPIView,
            EmployeeLeaveStatusChoicesAPIView,
            EmployeeLeaveCategoryChoicesAPIView,
            EmployeeCategoryChoicesAPIView,
            EmploymentContractTerminationReasonsAPIView,
            EmployeePayrollTaxChoicesAPIView,
            EventPriorityChoicesAPIView,
            EventParticipantTypesChoicesAPIView,
            EventReminderChoicesAPIView,
            EventTimeChoicesAPIView,
            EventIconChoicesAPIView,
            EventRepeatChoicesAPIView,
            ManufacturingShiftTimeChoicesAPIView,
            InvoiceSalesTypesChoicesAPIView


        )

router = routers.DefaultRouter()


router.register(r'notes', NoteViewSet )
router.register(r'unit-of-measures', UnitOfMeasureViewSet )
router.register(r'organization-config', OrganizationViewSet)



urlpatterns = [
    path('account-types-category-choices/', AccountTypesCategoryChoicesAPIView.as_view(), name='account-types-category-choices'),
    path('account-types-classification-choices/', AccountTypesClassificationChoicesAPIView.as_view(), name='account-types-classification-choices'),
    path('assets-depriciation-method-choices/', AssetsDepreciationMethodChoicesAPIView.as_view(), name='assets-depriciation-method-choices'),
    path('asset-types-choices/', AssetTypesChoicesAPIView.as_view(), name='asset-types-choices'),
    #make redux state from here
    path('invoice-sales-types-choices/', InvoiceSalesTypesChoicesAPIView.as_view(), name='invoice-sales-types-choices'),
    #
    path('manufactring-shift-time-choices/', ManufacturingShiftTimeChoicesAPIView.as_view(), name='manufactring-shift-time-choices'),
    path('event-priority-choices/', EventPriorityChoicesAPIView.as_view(), name='event-priority-choices'),
    path('event-participant-types-choices/', EventParticipantTypesChoicesAPIView.as_view(), name='event-participant-types-choices'),
    path('event-reminder-choices/', EventReminderChoicesAPIView.as_view(), name='event-reminder-choices'),
    path('event-time-choices/', EventTimeChoicesAPIView.as_view(), name='event-time-choices'),
    path('event-icon-choices/', EventIconChoicesAPIView.as_view(), name='event-icon-choices'),
    path('event-repeat-choices/', EventRepeatChoicesAPIView.as_view(), name='event-repeat-choices'),
    path('employee-payroll-tax-choices/', EmployeePayrollTaxChoicesAPIView.as_view(), name='employee-payroll-tax-choices'),
    path('nature-of-employment-choices/', NatureOfEmploymentChoicesAPIView.as_view(), name='asset-types-choices'),
    path('employee-year-choices/', EmployeeYearChoicesAPIView.as_view(), name='employee-year-choices'),
    path('employee-timesheet-month-choices/', EmployeeTimesheetMonthChoicesAPIView.as_view(), name='employee-timesheet-month-choices'),
    path('employee-payslip-status-choices/', EmployeePayslipStatusChoicesAPIView.as_view(), name='employee-payslip-status-choices'),
    path('employee-payroll-date-choices/', EmployeePayrollDateChoicesAPIView.as_view(), name='employee-year-choices'),
    path('employee-deduction-methods/', EmployeeDeductionMethodsAPIView.as_view(), name='employee-deduction-methods'),
    path('employee-pay-frequencies/', EmployeePayFrequenciesAPIView.as_view(), name='employee-pay-frequencies'),
    path('employee-lunch-choices/', EmployeeLunchChoicesAPIView.as_view(), name='employee-lunch-choices'),
    path('employee-leave-status-choices/', EmployeeLeaveStatusChoicesAPIView.as_view(), name='employee-leave-status-choices'),
    path('employee-leave-category-choices/', EmployeeLeaveCategoryChoicesAPIView.as_view(), name='employee-leave-category-choices'),
    path('employee-category-choices/', EmployeeCategoryChoicesAPIView.as_view(), name='employee-category-choices'),
    path('employment-contract-termination-reasons/', EmploymentContractTerminationReasonsAPIView.as_view(), name='employment-contract-termination-reasons'),

    # it ends here
    path('accounting-periods-choices/', AccountingPeriodsChoicesAPIView.as_view(), name='accounting-periods-choices'),
    path('journal-entry-types-choices/', JournalEntryTypesChoicesAPIView.as_view(), name='journal-entry-types-choices'),
    path('employees-gender-choices/', EmployeesGenderChoicesAPIView.as_view(), name='employees-gender-choices'),
    path('inventory-types-choices/', InventoryTypesChoicesAPIView.as_view(), name='inventory-types-choices'),
    path('product-component-pricing-choices/', ProductComponentPricingChoicesAPIView.as_view(), name='product-component-pricing-choices'),
    path('equipment-component-condition-choices/', EquipmentComponentConditionChoicesAPIView.as_view(), name='equipment-component-condition-choices'),
    path('inventory-order-status-choices/', InventoryOrderStatusChoicesAPIView.as_view(), name='inventory-order-status-choices'),
    path('invoice-sales-choices/', InvoiceSaleStatusChoicesAPIView.as_view(), name='invoice-sales-choices'),
    path('invoice-line-choices/', InvoiceLineChoicesAPIView.as_view(), name='invoice-line-choices'),
    path('manufacturing-process-choices/', ManufacturingProcessChoicesAPIView.as_view(), name='manufacturing-process-choices'),
    path('customer-payment-methods-choices/', CustomerPaymentMethodsChoicesAPIView.as_view(), name='customer-payment-methods-choices'),
    path('process-rate-unit-time-choices/', ProcessRateUnitTimeChoicesAPIView.as_view(), name='process-rate-unit-time-choices'),
    path('manufacturing-product-types-choices/', ManufacturingProductTypesChoicesAPIView.as_view(), name='manufacturing-product-types-choices'),
    path('bill-of-materials-line-choices/', BillOfMaterialsLineChoicesAPIView.as_view(), name='bill-of-materials-line-choices'),
    path('processed-products-stock-status-choices/', ProcessedProductsStockStatusChoicesAPIView.as_view(), name='processed-products-stock-status-choices'),



] + router.urls 
