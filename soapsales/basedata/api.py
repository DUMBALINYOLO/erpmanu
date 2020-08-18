from .models import (
				Note,
				Organization,
				UnitOfMeasure
				)
from .serializers import (
				NoteSerializer,
				OrganizationSerializer,
				UnitOfMeasureSerializer,
				UnitOfMeasureListSerializer
			)
from rest_framework import viewsets, generics, status, views
from rest_framework.response import Response


from .const import (
				ACCOUNT_TYPES_CATEGORY_CHOICES,
				ACCOUNT_TYPES_CLASSIFICATION_CHOICES,
				ASSET_DEPRECIATION_METHOD_CHOICES, 
				ASSET_TYPE_CHOICES, 
				ACCOUNTING_PERIODS_CHOICES, 
				JOURNAL_ENTRY_TYPES_CHOICES,
				EMPLOYEES_GENDER_CHOICES, 
				INVENTORY_TYPES_CHOICES, 
				PRODUCT_COMPONENT_PRICING_CHOICES,
				EQUIPMENT_COMPONENT_CONDITION_CHOICES,
				INVENTORY_ORDER_STATUS_CHOICES,
				INVOICE_SALE_STATUS_CHOICES,
				INVOCE_LINE_CHOICES, 
				CUSTOMER_PAYMENT_METHODS_CHOICES,
				PROCCES_RATE_UNIT_TIME_CHOICES,
				MANUFACTURING_PRODUCT_TYPES,
				BILL_OF_MATERIALS_LINE_CHOICES,
				PROCESSED_PRODUCTS_STOCK_STATUS_CHOICES,
				MANUFACTURING_PROCESS_CHOICES,
				NATURE_OF_EMPLOYMENT_CHOICES,
				EMPLOYEE_CONTRACT_TERMINATION_REASONS,
				EMPLOYEE_CATEGORY_CHOICES,
				EMPLOYEE_LEAVE_CATEGORIES,
				EMPLOYEE_LEAVE_STATUS_CHOICES,
				EMPLOYEE_LUNCH_CHOICES,
				EMPLOYEE_PAY_FREQUENCIES,
				EMPLOYEE_DEDUCTION_METHODS,
				EMPLOYEE_PAYROLL_DATE_CHOICES,
				EMPLOYEE_PAYSLIP_STATUS_CHOICES,
				EMPLOYEE_TIMESHEET_MONTH_CHOICES,
				EMPLOYEE_YEAR_CHOICES, 
				EMPLOYEE_PAYROLL_TAX_CHOICES,
				EVENT_REMINDER_CHOICES,
				EVENT_TIME_CHOICES,
				EVENT_ICON_CHOICES,
				EVENT_REPEAT_CHOICES,
				EVENT_PARTICIPANT_TYPES_CHOICES,
				EVENT_PRIORITY_CHOICES,
				MANUFACTURING_SHIFT_TIME_CHOICES,
				INVOICE_SALES_TYPES_CHOICES,
				# not yet handled
				BILLING_CHOICES,
				BILL_PAYMENT_METHODS_CHOICES,
				INVENTORY_ORDER_PAYMENT_METHODS_CHOICES,
				BILL_FREQUENCY_CHOICES,
				ACCOUNTS_BALANCE_SHEET_CATEGORIES,
				ACCOUNT_TYPE_CHOICES,
				INTEREST_INTERVAL_ACCOUNT_CHOICES,
				ACCOUNT_INTEREST_METHOD_CHOICES,
				INVENTORY_VALUATION_PERIOD_CHOICES,
				INVENTORY_VALUATION_METHODS_CHOICES,
				INVENTORY_CHECK_FREQUENCY_CHOICES,
				INVENTORY_CHECK_DATE_CHOICES,
				UNIT_OF_MEASURE_CHOICES,
				CUSTOMER_ADDRESSES_TYPE_CHOICES,
				EMPLOYEE_ATTENDANCE_STATUS_CHOICES,
				EMPLOYEES_TYPE_CHOICES,
				BILL_PAYMENT_STATUS_CHOICES,
				SUPPLIER_ADDRESSES_TYPE_CHOICES,
				SUPPLIER_STATUS_CHOICES,
				CUSTOMER_STATUS_CHOICES,
				
			)


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class UnitOfMeasureViewSet(viewsets.ModelViewSet):
	queryset = UnitOfMeasure.objects.all()
    

	def get_serializer_class(self, *args, **kwargs):

		if self.action in ['create', 'put', 'patch']:
			return UnitOfMeasureSerializer
		return UnitOfMeasureListSerializer



class InvoiceSalesTypesChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(INVOICE_SALES_TYPES_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class ManufacturingShiftTimeChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(MANUFACTURING_SHIFT_TIME_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class EventPriorityChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EVENT_PRIORITY_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class EventParticipantTypesChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EVENT_PARTICIPANT_TYPES_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class EventReminderChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EVENT_REMINDER_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class EventTimeChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EVENT_TIME_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class EventIconChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EVENT_ICON_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class EventRepeatChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EVENT_REPEAT_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)




class EmployeePayrollTaxChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EMPLOYEE_PAYROLL_TAX_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class NatureOfEmploymentChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(NATURE_OF_EMPLOYMENT_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class EmploymentContractTerminationReasonsAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EMPLOYEE_CONTRACT_TERMINATION_REASONS)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class EmployeeCategoryChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EMPLOYEE_CATEGORY_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class EmployeeLeaveCategoryChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EMPLOYEE_LEAVE_CATEGORIES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class EmployeeLeaveStatusChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EMPLOYEE_LEAVE_STATUS_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class EmployeeLunchChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EMPLOYEE_LUNCH_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class EmployeePayFrequenciesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EMPLOYEE_PAY_FREQUENCIES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class EmployeeDeductionMethodsAPIView(views.APIView):
	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EMPLOYEE_DEDUCTION_METHODS)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)




class EmployeePayrollDateChoicesAPIView(views.APIView):
	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EMPLOYEE_PAYROLL_DATE_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class EmployeePayslipStatusChoicesAPIView(views.APIView):
	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EMPLOYEE_PAYSLIP_STATUS_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class EmployeeTimesheetMonthChoicesAPIView(views.APIView):
	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EMPLOYEE_TIMESHEET_MONTH_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class EmployeeYearChoicesAPIView(views.APIView):
	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EMPLOYEE_YEAR_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class AccountTypesCategoryChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(ACCOUNT_TYPES_CATEGORY_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)






class AccountTypesClassificationChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(ACCOUNT_TYPES_CLASSIFICATION_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class AssetsDepreciationMethodChoicesAPIView(generics.GenericAPIView):

	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(ASSET_DEPRECIATION_METHOD_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)






class AssetTypesChoicesAPIView(views.APIView):

	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(ASSET_TYPE_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)





class AccountingPeriodsChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(ACCOUNTING_PERIODS_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class JournalEntryTypesChoicesAPIView(views.APIView):

	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(JOURNAL_ENTRY_TYPES_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)




class EmployeesGenderChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EMPLOYEES_GENDER_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class InventoryTypesChoicesAPIView(views.APIView):

	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(INVENTORY_TYPES_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class ProductComponentPricingChoicesAPIView(views.APIView):

	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(PRODUCT_COMPONENT_PRICING_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class EquipmentComponentConditionChoicesAPIView(views.APIView):

	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(EQUIPMENT_COMPONENT_CONDITION_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class InventoryOrderStatusChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(INVENTORY_ORDER_STATUS_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class InvoiceSaleStatusChoicesAPIView(views.APIView):

	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(INVOICE_SALE_STATUS_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class InvoiceLineChoicesAPIView(views.APIView):

	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(INVOCE_LINE_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)




class CustomerPaymentMethodsChoicesAPIView(views.APIView):

	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(CUSTOMER_PAYMENT_METHODS_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)




class ProcessRateUnitTimeChoicesAPIView(views.APIView):

	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(PROCCES_RATE_UNIT_TIME_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)




class ManufacturingProductTypesChoicesAPIView(views.APIView):

	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(MANUFACTURING_PRODUCT_TYPES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class BillOfMaterialsLineChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(BILL_OF_MATERIALS_LINE_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)


class ProcessedProductsStockStatusChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(PROCESSED_PRODUCTS_STOCK_STATUS_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)



class ManufacturingProcessChoicesAPIView(views.APIView):


	def get(self, request, format=None):

		my_choices = []
		choice_dict = dict(MANUFACTURING_PROCESS_CHOICES)
		for key, value in choice_dict.items():

			itered_dict = {"key": key, "value": value}
			my_choices.append(itered_dict)
		return Response(my_choices, status=status.HTTP_200_OK)

		