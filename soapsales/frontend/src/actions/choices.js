import axios from 'axios';
import {
    GET_ACCOUNT_TYPES_CATEGORY_CHOICES,
    GET_ACCOUNT_TYPES_CLASSIFICATION_CHOICES,
    GET_ASSETS_DEPRECIATION_METHOD_CHOICES,
    GET_ASSET_TYPES_CHOICES,
    GET_ACCOUNT_TYPE_CHOICES,
    GET_BILL_FREQUENCY_CHOICES,
    GET_ACCOUNT_BALANCE_SHEET_CATEGORIES_CHOICES,
    GET_INTEREST_INTERVAL_ACCOUNT_CHOICES,
    GET_ACCOUNT_INTEREST_METHOD_CHOICES,
    GET_INVENTORY_VALUATION_PERIOD_CHOICES,
    GET_INVENTORY_VALUATION_METHODS_CHOICES,
    GET_INVENTORY_CHECK_FREQUENCY_CHOICES,
    GET_INVENTORY_CHECK_DATE_CHOICES,
    GET_UNIT_OF_MEASURE_CHOICES,
    GET_CUSTOMER_ADDRESS_TYPE_CHOICES,
    GET_EMPLOYEES_ATTENDANCE_STATUS_CHOICES,
    GET_EMPLOYEES_TYPE_CHOICES,
    GET_BILL_PAYMENT_STATUS_CHOICES,
    GET_SUPPLIER_ADDRESS_TYPE_CHOICES,
    GET_SUPPLIER_STATUS_CHOICES,
    GET_CUSTOMER_STATUS_CHOICES,
    GET_BILLING_CHOICES,
    GET_BILL_PAYMENT_METHODS_CHOICES,
    GET_INVOICE_SALES_TYPES_CHOICES,
    GET_INVENTORY_ORDER_PAYMENT_METHODS_CHOICES,
    GET_MANUFACTURING_SHIFT_TIME_CHOICES,
    GET_EVENT_PRIORITY_CHOICES,
    GET_EVENT_PARTICIPANT_TYPES_CHOICES,
    GET_EVENT_REMINDER_CHOICES,
    GET_EVENT_TIME_CHOICES,
    GET_EVENT_ICON_CHOICES,
    GET_EVENT_REPEAT_CHOICES,
    GET_EMPLOYEE_PAYROLL_TAX_CHOICES,
    GET_NATURE_OF_EMPLOYMENT_CHOICES,
    GET_EMPLOYEE_YEAR_CHOICES,
    GET_EMPLOYEE_TIMESHEET_MONTH_CHOICES,
    GET_EMPLOYEE_PAYSLIP_STATUS_CHOICES,
    GET_EMPLOYEE_PAYROLL_DATE_CHOICES,
    GET_EMPLOYEE_DEDUCTION_METHODS,
    GET_EMPLOYEE_PAY_FREQUENCIES,
    GET_EMPLOYEE_LUNCH_CHOICES,
    GET_EMPLOYEE_LEAVE_STATUS_CHOICES,
    GET_EMPLOYEE_LEAVE_CATEGORY_CHOICES,
    GET_EMPLOYEE_CATEGORY_CHOICES,
    GET_EMPLOYMENT_CONTRACT_TERMINATION_REASONS,
    GET_ACCOUNTING_PERIODS_CHOICES,
    GET_JOURNAL_ENTRY_TYPES_CHOICES,
    GET_EMPLOYEES_GENDER_CHOICES,
    GET_INVENTORY_TYPES_CHOICES,
    GET_PRODUCT_COMPONENT_PRICING_CHOICES,
    GET_EQUIPMENT_COMPONENT_CONDITION_CHOICES,
    GET_INVENTORY_ORDER_STATUS_CHOICES,
    GET_INVOICE_SALES_CHOICES,
    GET_INVOICE_LINE_CHOICES,
    GET_MANUFACTURING_PROCESS_CHOICES,
    GET_CUSTOMER_PAYMENT_METHODS_CHOICES,
    GET_PROCESS_RATE_UNIT_TIME_CHOICES,
    GET_MANUFACTURING_PRODUCT_TYPES_CHOICES,
    GET_BILL_OF_MATERIALS_LINE_CHOICES,
    GET_PROCESSED_PRODUCTS_STOCK_STATUS_CHOICES,

} from './types';

export const getProcessedProductsStockStatusChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/processed-products-stock-status-choices/')
        .then(res => {
            dispatch({
                type: GET_PROCESSED_PRODUCTS_STOCK_STATUS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getBillOfMaterialsLineChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/bill-of-materials-line-choices/')
        .then(res => {
            dispatch({
                type: GET_BILL_OF_MATERIALS_LINE_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getManufacturingProductTypesChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/manufacturing-product-types-choices/')
        .then(res => {
            dispatch({
                type: GET_MANUFACTURING_PRODUCT_TYPES_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getProcessRateUnitTimeChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/process-rate-unit-time-choices/')
        .then(res => {
            dispatch({
                type: GET_PROCESS_RATE_UNIT_TIME_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getCustomerPaymentMethodsChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/customer-payment-methods-choices/')
        .then(res => {
            dispatch({
                type: GET_CUSTOMER_PAYMENT_METHODS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getManufacturingProcessChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/manufacturing-process-choices/')
        .then(res => {
            dispatch({
                type: GET_MANUFACTURING_PROCESS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getInvoiceLineChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/invoice-line-choices/')
        .then(res => {
            dispatch({
                type: GET_INVOICE_LINE_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getInvoiceSalesChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/invoice-sales-choices/')
        .then(res => {
            dispatch({
                type: GET_INVOICE_SALES_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getInventoryOrderStatusChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/inventory-order-status-choices/')
        .then(res => {
            dispatch({
                type: GET_INVENTORY_ORDER_STATUS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEquipmentComponentConditionChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/equipment-component-condition-choices/')
        .then(res => {
            dispatch({
                type: GET_EQUIPMENT_COMPONENT_CONDITION_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getProductComponentPricingChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/product-component-pricing-choices/')
        .then(res => {
            dispatch({
                type: GET_PRODUCT_COMPONENT_PRICING_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getInventoryTypesChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/inventory-types-choices/')
        .then(res => {
            dispatch({
                type: GET_INVENTORY_TYPES_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeesGenderChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employees-gender-choices/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEES_GENDER_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getJournalEntryTypesChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/journal-entry-types-choices/')
        .then(res => {
            dispatch({
                type: GET_JOURNAL_ENTRY_TYPES_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getAccountingPeriodsChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/accounting-periods-choices/')
        .then(res => {
            dispatch({
                type: GET_ACCOUNTING_PERIODS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmploymentContractTerminationReasons = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employment-contract-termination-reasons/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYMENT_CONTRACT_TERMINATION_REASONS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeeCategoryChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employee-category-choices/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_CATEGORY_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeeLeaveCategoryChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employee-leave-category-choices/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_LEAVE_CATEGORY_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeeLeaveStatusChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employee-leave-status-choices/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_LEAVE_STATUS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeeLunchChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employee-lunch-choices/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_LUNCH_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeePayFrequencies = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employee-pay-frequencies/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_PAY_FREQUENCIES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeeDeductionMethods = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employee-deduction-methods/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_DEDUCTION_METHODS,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeePayrollDateChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employee-payroll-date-choices/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_PAYROLL_DATE_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeePayslipStatusChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employee-payslip-status-choices/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_PAYSLIP_STATUS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeeTimesheetMonthChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employee-timesheet-month-choices/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_TIMESHEET_MONTH_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeeYearChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employee-year-choices/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_YEAR_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getNatureOfEmploymentChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/nature-of-employment-choices/')
        .then(res => {
            dispatch({
                type: GET_NATURE_OF_EMPLOYMENT_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeePayrollTaxChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employee-payroll-tax-choices/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEE_PAYROLL_TAX_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}


export const getEventRepeatChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/event-repeat-choices/')
        .then(res => {
            dispatch({
                type: GET_EVENT_REPEAT_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEventIconChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/event-icon-choices/')
        .then(res => {
            dispatch({
                type: GET_EVENT_ICON_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEventTimeChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/event-time-choices/')
        .then(res => {
            dispatch({
                type: GET_EVENT_TIME_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEventReminderChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/event-reminder-choices/')
        .then(res => {
            dispatch({
                type: GET_EVENT_REMINDER_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEventParticipantTypesChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/event-participant-types-choices/')
        .then(res => {
            dispatch({
                type: GET_EVENT_PARTICIPANT_TYPES_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEventPriorityChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/event-priority-choices/')
        .then(res => {
            dispatch({
                type: GET_EVENT_PRIORITY_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getManufacturingShiftTimeChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/manufactring-shift-time-choices/')
        .then(res => {
            dispatch({
                type: GET_MANUFACTURING_SHIFT_TIME_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getInventoryOrderPaymentMethodsChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/inventory-order-payment-methods-choices/')
        .then(res => {
            dispatch({
                type: GET_INVENTORY_ORDER_PAYMENT_METHODS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getInvoiceSalesTypesChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/invoice-sales-types-choices/')
        .then(res => {
            dispatch({
                type: GET_INVOICE_SALES_TYPES_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getBillPaymentMethodsChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/bill-payment-methods-choices/')
        .then(res => {
            dispatch({
                type: GET_BILL_PAYMENT_METHODS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getBillingChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/billing-choices/')
        .then(res => {
            dispatch({
                type: GET_BILLING_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getCustomerStatusChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/customer-status-choices/')
        .then(res => {
            dispatch({
                type: GET_CUSTOMER_STATUS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getSupplierStatusChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/supplier-status-choices/')
        .then(res => {
            dispatch({
                type: GET_SUPPLIER_STATUS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getSupplierAddressTypeChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/supplier-address-type-choices/')
        .then(res => {
            dispatch({
                type: GET_SUPPLIER_ADDRESS_TYPE_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getBillPaymentStatusChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/bill-payment-status-choices/')
        .then(res => {
            dispatch({
                type: GET_BILL_PAYMENT_STATUS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeesTypeChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employees-type-choices/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEES_TYPE_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getEmployeesAttendanceStatusChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/employees-attendance-status-choices/')
        .then(res => {
            dispatch({
                type: GET_EMPLOYEES_ATTENDANCE_STATUS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getCustomerAddressTypeChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/customer-address-type-choices/')
        .then(res => {
            dispatch({
                type: GET_CUSTOMER_ADDRESS_TYPE_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getUnitOfMeasureChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/unit-of-measure-choices/')
        .then(res => {
            dispatch({
                type: GET_UNIT_OF_MEASURE_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getInventoryCheckDateChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/inventory-check-date-choices/')
        .then(res => {
            dispatch({
                type: GET_INVENTORY_CHECK_DATE_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getInventoryCheckFrequencyChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/inventory-check-frequency-choices/')
        .then(res => {
            dispatch({
                type: GET_INVENTORY_CHECK_FREQUENCY_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getInventoryValuationMethodsChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/inventory-valuation-methods-choices/')
        .then(res => {
            dispatch({
                type: GET_INVENTORY_VALUATION_METHODS_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getInventoryValuationPeriodChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/inventory-valuation-period-choices/')
        .then(res => {
            dispatch({
                type: GET_INVENTORY_VALUATION_PERIOD_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getAccountInterestMethodChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/account-interest-method-choices/')
        .then(res => {
            dispatch({
                type: GET_ACCOUNT_INTEREST_METHOD_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getInterestIntervalAccountChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/interest-interval-account-choices/')
        .then(res => {
            dispatch({
                type: GET_INTEREST_INTERVAL_ACCOUNT_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getAccountBalanceSheetCategoriesChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/account-balance-sheet-categories-choices/')
        .then(res => {
            dispatch({
                type: GET_ACCOUNT_BALANCE_SHEET_CATEGORIES_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getBillFrequencyChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/bill-frequency-choices/')
        .then(res => {
            dispatch({
                type: GET_BILL_FREQUENCY_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getAccountTypeChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/account-type-choices/')
        .then(res => {
            dispatch({
                type: GET_ACCOUNT_TYPE_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getAssetTypesChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/asset-types-choices/')
        .then(res => {
            dispatch({
                type: GET_ASSET_TYPES_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getAssetsDepriciationMethodChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/assets-depriciation-method-choices/')
        .then(res => {
            dispatch({
                type: GET_ASSETS_DEPRECIATION_METHOD_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getAccountTypesCategoryChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/account-types-category-choices/')
        .then(res => {
            dispatch({
                type: GET_ACCOUNT_TYPES_CATEGORY_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}

export const getAccountTypesClassificationChoices = () => dispatch => {
    axios.get('http://127.0.0.1:8000/api/config/account-types-classification-choices/')
        .then(res => {
            dispatch({
                type: GET_ACCOUNT_TYPES_CLASSIFICATION_CHOICES,
                payload: res.data
            });
        }).catch(err => console.log(err))
}
