const localhost = "http://127.0.0.1:8000"

const apiURL = "/api"

const endpoint = `${localhost}${apiURL}`

//accounting
export const accountsURL = `${endpoint}/accounting/accounts/`
export const interestbearingaccountsURL = `${endpoint}/accounting/interest-bearing-accounts/`
export const journalsURL = `${endpoint}/accounting/journals/`
export const ledgersURL = `${endpoint}/accounting/ledgers/`
export const accountingpostsURL = `${endpoint}/accounting/accounting-posts/`
export const workbooksURL = `${endpoint}/accounting/workbooks/`
export const accountingadjustmentsURL = `${endpoint}/accounting/accounting-adjustments/`
export const debitsURL = `${endpoint}/accounting/debits/`
export const creditsURL = `${endpoint}/accounting/credits/`
export const fullypaidnotverifiedbillsURL = `${endpoint}/accounting/fully-paid-not-verified-bills/`
export const fullypaidbillsURL = `${endpoint}/accounting/fully-paid-bills/`
export const unpostedandunadjustedjournalentriesURL = `${endpoint}/accounting/unposted-and-unadjusted-journal-entries/`
export const unadjustedjournalentriesURL = `${endpoint}/accounting/unadjusted-journal-entries/`
export const unpostedjournalentriesURL = `${endpoint}/accounting/unposted-journal-entries/`
export const postedjournalentriesURL = `${endpoint}/accounting/posted-journal-entries/`
export const inactiveaccountsURL = `${endpoint}/accounting/in-active-accounts/`
export const assetsURL = `${endpoint}/accounting/assets/`
export const taxesURL = `${endpoint}/accounting/taxes/`
export const currenciesURL = `${endpoint}/accounting/currencies/`
export const billsURL = `${endpoint}/accounting/bills/`
export const billpaymentsURL = `${endpoint}/accounting/bill-payments/`

//manufacture
export const unverifiedproductionprocessesURL = `${endpoint}/manufacture/unverified-production-processes/`
export const verifiedproductionprocessesURL = `${endpoint}/manufacture/verified-production-processes/`
export const processmachinesURL = `${endpoint}/manufacture/process-machines/`
export const processmachinegroupsURL = `${endpoint}/manufacture/process-machine-groups/`
export const shiftsURL = `${endpoint}/manufacture/shifts/`
export const shiftschedulesURL = `${endpoint}/manufacture/shift-schedules/`
export const processratesURL = `${endpoint}/manufacture/process-rates/`
export const productionordersURL = `${endpoint}/manufacture/production-orders/`
export const manufacturingteamsURL = `${endpoint}/manufacture/manufacturing-teams/`
export const manufacturingpersonelsURL = `${endpoint}/manufacture/manufacturing-personels/`
export const processproductsURL = `${endpoint}/manufacture/process-products/`
export const wastegenerationreportsURL = `${endpoint}/manufacture/waste-generation-reports/`
export const processedproductstockreceiptsURL = `${endpoint}/manufacture/processed-product-stock-receipts/`
export const processedproductstockadjustmentsURL = `${endpoint}/manufacture/processed-product-stock-adjustments/`
export const processedproductstocktakesURL = `${endpoint}/manufacture/processed-product-stock-takes/`

//inventory
export const inventorycategoriesURL = `${endpoint}/inventory/inventory-categories/`
export const debitnotesURL = `${endpoint}/inventory/debit-notes/`
export const inventoryordersURL = `${endpoint}/inventory/inventory-orders/`
export const inventoryorderpaymentsURL = `${endpoint}/inventory/inventory-orderpayments/`
export const warehousesURL = `${endpoint}/inventory/warehouses/`
export const inventorystockitemsURL = `${endpoint}/inventory/inventorystockitems/`
export const storagemediasURL = `${endpoint}/inventory/storagemedias/`
export const orderitemsURL = `${endpoint}/inventory/orderitems/`
export const inventoryreceiptsURL = `${endpoint}/inventory/inventoryreceipts/`
export const stockadjustmentsURL = `${endpoint}/inventory/stockadjustments/`
export const inventorystocktakesURL = `${endpoint}/inventory/inventorystocktakes/`
export const activesuppliersURL = `${endpoint}/inventory/active-suppliers/`
export const deactivedsuppliersURL = `${endpoint}/inventory/de-actived-suppliers/`
export const supplieraddressesURL = `${endpoint}/inventory/supplier-addresses/`
export const rawmaterialsURL = `${endpoint}/inventory/raw-materials/`
export const equipmentsURL = `${endpoint}/inventory/equipments/`
export const consumablesURL = `${endpoint}/inventory/consumables/`
export const fullyreceivedandtotalpaidforordersURL = `${endpoint}/inventory/fully-received-and-total-paid-for-orders/`
export const fullyreceivedtotalpaidforandverifiedordersURL = `${endpoint}/inventory/fully-received-total-paid-for-and-verified-orders/`

//events
export const upcomingeventsURL = `${endpoint}/events/upcoming-events/`
export const completedeventsURL = `${endpoint}/events/completed-events/`
export const eventconfigURL = `${endpoint}/events/event-config/`

//customers
export const deactivatedcustomersURL = `${endpoint}/customers/deactivated-customers/`
export const customeraddressesURL = `${endpoint}/customers/customer-addresses/`
export const activecustomersURL = `${endpoint}/customers/active-customers/`

//employees
export const employeesURL= `${endpoint}/employees/employees/`
export const employeeconfigURL= `${endpoint}/employees/employee-config/`
export const employeecontractsURL= `${endpoint}/employees/employee-contracts/`
export const employeecontractsterminationsURL= `${endpoint}/employees/employee-contracts-terminations/`
export const employeedepartmentsURL= `${endpoint}/employees/employee-departments/`
export const employeeleavesURL= `${endpoint}/employees/employee-leaves/`
export const employeepaygradesURL= `${endpoint}/employees/employee-paygrades/`
export const employeeallowancesURL= `${endpoint}/employees/employee-allowances/`
export const employeepaydeductionsURL= `${endpoint}/employees/employee-pay-deductions/`
export const employeepaycommissionrulesURL= `${endpoint}/employees/employee-pay-commission-rules/`
export const employeepayrolltaxesURL= `${endpoint}/employees/employee-payroll-taxes/`
export const employeepayrollschedulesURL= `${endpoint}/employees/employee-payroll-schedules/`
export const employeepayrolldatesURL= `${endpoint}/employees/employee-payroll-dates/`
export const employeepayslipsURL= `${endpoint}/employees/employee-payslips/`
export const employeeattendancetimesheetsURL= `${endpoint}/employees/employee-attendance-timesheets/`
export const companyshareholdersURL= `${endpoint}/employees/company-shareholders/`
export const companymanagersURL= `${endpoint}/employees/company-managers/`
export const companybookkeepersURL= `${endpoint}/employees/company-bookkeepers/`
export const companypayrollofficersURL= `${endpoint}/employees/company-payroll-officers/`
export const companydriversURL= `${endpoint}/employees/company-drivers/`
export const companymanufacturingpersonellsURL= `${endpoint}/employees/company-manufacturing-personells/`
export const companyinventorycontrollersURL= `${endpoint}/employees/company-inventory-controllers/`
export const companysalesrepsURL= `${endpoint}/employees/company-salesreps/`
export const pendingemployeeleavesURL= `${endpoint}/employees/pending-employee-leaves/`
export const authorisedemployeeleavesURL= `${endpoint}/employees/authorised-employee-leaves/`
export const declinedemployeeleavesURL= `${endpoint}/employees/declined-employee-leaves/`

//invoicing
export const creditnotesURL= `${endpoint}/sales/creditnotes/`
export const paymentsURL= `${endpoint}/sales/payments/`
export const receiptsURL= `${endpoint}/sales/receipts/`
export const invoicelinesURL= `${endpoint}/sales/invoicelines/`
export const salesgroupspricingdiscountsURL= `${endpoint}/sales/sales-groups-pricing-discounts/`
export const quotationsURL= `${endpoint}/sales/quotations/`
export const unverifiedinvoicesURL= `${endpoint}/sales/unverified-invoices/`
export const overdueinvoicesURL= `${endpoint}/sales/overdue-invoices/`
export const voidedinvoicesURL= `${endpoint}/sales/voided-invoices/`
export const refundedinvoicesURL= `${endpoint}/sales/refunded-invoices/`
export const fullypaidnotyetsalesinvoicesURL= `${endpoint}/sales/fullypaid-not-yet-sales-invoices/`
export const salesURL= `${endpoint}/sales/sales/`
