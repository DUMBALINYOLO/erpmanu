from rest_framework import viewsets
from django.db.models import Q as ComplexQuery
from employees.models import Employee
from employees.serializers import (
		EmployeeCreateUpdateSerializer,
		EmployeeListSerializer,
		EmployeeDetailSerializer,
		DepartmentCreateUpdateSerializer,
		DepartmentListSerializer,
		DepartmentDetailSerializer,
		TerminationCreateUpdateSerializer,
		TerminationSerializer,
		ContractCreateUpdateSerializer,
		ContractListSerializer,
		ContractDetailSerializer
	)

from employees.models import Employee, Department, Termination, Contract

		

class EmployeeViewSet(viewsets.ModelViewSet):
	queryset = Employee.objects.all()
	
	def get_serializer_class(self):
		if self.action in ['create', 'update', 'patch']:
			return EmployeeCreateUpdateSerializer
		elif self.action == 'retrieve':
			return EmployeeDetailSerializer
		return EmployeeListSerializer


	def get_queryset(self, *args, **kwargs):

		queryset = Employee.objects.prefetch_related(
											'pay_grade'
										).exclude(category='Owner')




class CompanyShareHolderViewSet(viewsets.ModelViewSet):
	
	
	def get_serializer_class(self):
		if self.action in ['create', 'update', 'patch']:
			return EmployeeCreateUpdateSerializer
		elif self.action == 'retrieve':
			return EmployeeDetailSerializer
		return EmployeeListSerializer

	def get_queryset(self, *args, **kwargs):

		queryset = Employee.objects.prefetch_related(
											'pay_grade'
										).filter(
											~ComplexQuery(
												category__in =[
													'Manager',
													'BookKeeper',
													'PayrollOfficer',
													'Driver',
													'Manufacturing',
													'InventoryController',
													'SalesRep'
												]

											)

									)

		return queryset



class CompanyManagerViewSet(viewsets.ModelViewSet):
	
	
	def get_serializer_class(self):
		if self.action in ['create', 'update', 'patch']:
			return EmployeeCreateUpdateSerializer
		elif self.action == 'retrieve':
			return EmployeeDetailSerializer
		return EmployeeListSerializer

	def get_queryset(self, *args, **kwargs):

		queryset = Employee.objects.prefetch_related(
											'pay_grade'
										).filter(
											~ComplexQuery(
												category__in =[
													'Owner',
													'BookKeeper',
													'PayrollOfficer',
													'Driver',
													'Manufacturing',
													'InventoryController',
													'SalesRep'
												]

											)

									)

		return queryset



class CompanyBookKeeperViewSet(viewsets.ModelViewSet):
	
	
	def get_serializer_class(self):
		if self.action in ['create', 'update', 'patch']:
			return EmployeeCreateUpdateSerializer
		elif self.action == 'retrieve':
			return EmployeeDetailSerializer
		return EmployeeListSerializer

	def get_queryset(self, *args, **kwargs):

		queryset = Employee.objects.prefetch_related(
											'pay_grade'
										).filter(
											~ComplexQuery(
												category__in =[
													'Owner',
													'Manager',
													'PayrollOfficer',
													'Driver',
													'Manufacturing',
													'InventoryController',
													'SalesRep'
												]

											)

									)

		return queryset



class CompanyPayRollOfficerViewSet(viewsets.ModelViewSet):
	
	
	def get_serializer_class(self):
		if self.action in ['create', 'update', 'patch']:
			return EmployeeCreateUpdateSerializer
		elif self.action == 'retrieve':
			return EmployeeDetailSerializer
		return EmployeeListSerializer

	def get_queryset(self, *args, **kwargs):

		queryset = Employee.objects.prefetch_related(
											'pay_grade'
										).filter(
											~ComplexQuery(
												category__in =[
													'Owner',
													'Manager',
													'BookKeeper',
													'Driver',
													'Manufacturing',
													'InventoryController',
													'SalesRep'
												]

											)

									)

		return queryset




class CompanyDriverViewSet(viewsets.ModelViewSet):
	
	
	def get_serializer_class(self):
		if self.action in ['create', 'update', 'patch']:
			return EmployeeCreateUpdateSerializer
		elif self.action == 'retrieve':
			return EmployeeDetailSerializer
		return EmployeeListSerializer

	def get_queryset(self, *args, **kwargs):

		queryset = Employee.objects.prefetch_related(
											'pay_grade'
										).filter(
											~ComplexQuery(
												category__in =[
													'Owner',
													'Manager',
													'BookKeeper',
													'PayrollOfficer',
													'Manufacturing',
													'InventoryController',
													'SalesRep'
												]

											)

									)

		return queryset



class CompanyManufacturingPersonelViewSet(viewsets.ModelViewSet):
	
	
	def get_serializer_class(self):
		if self.action in ['create', 'update', 'patch']:
			return EmployeeCreateUpdateSerializer
		elif self.action == 'retrieve':
			return EmployeeDetailSerializer
		return EmployeeListSerializer

	def get_queryset(self, *args, **kwargs):

		queryset = Employee.objects.prefetch_related(
											'pay_grade'
										).filter(
											~ComplexQuery(
												category__in =[
													'Owner',
													'Manager',
													'BookKeeper',
													'PayrollOfficer',
													'Driver',
													'InventoryController',
													'SalesRep'
												]

											)

									)

		return queryset


class CompanyInventoryControllerViewSet(viewsets.ModelViewSet):
	
	
	def get_serializer_class(self):
		if self.action in ['create', 'update', 'patch']:
			return EmployeeCreateUpdateSerializer
		elif self.action == 'retrieve':
			return EmployeeDetailSerializer
		return EmployeeListSerializer

	def get_queryset(self, *args, **kwargs):

		queryset = Employee.objects.prefetch_related(
											'pay_grade'
										).filter(
											~ComplexQuery(
												category__in =[
													'Owner',
													'Manager',
													'BookKeeper',
													'PayrollOfficer',
													'Driver',
													'Manufacturing',
													'SalesRep'
												]

											)

									)

		return queryset




class CompanySalesRepresentativeViewSet(viewsets.ModelViewSet):
	
	
	def get_serializer_class(self):
		if self.action in ['create', 'update', 'patch']:
			return EmployeeCreateUpdateSerializer
		elif self.action == 'retrieve':
			return EmployeeDetailSerializer
		return EmployeeListSerializer

	def get_queryset(self, *args, **kwargs):

		queryset = Employee.objects.prefetch_related(
											'pay_grade'
										).filter(
											~ComplexQuery(
												category__in =[
													'Owner',
													'Manager',
													'BookKeeper',
													'PayrollOfficer',
													'Driver',
													'Manufacturing',
													'InventoryController'
												]

											)

									)

		return queryset



class DepartmentViewSet(viewsets.ModelViewSet):
	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return DepartmentCreateUpdateSerializer
		elif self.action == 'retrieve':
			return DepartmentDetailSerializer
		return DepartmentListSerializer


	def get_queryset(self, *args, **kwargs):

		queryset = Department.objects.prefetch_related(
													'manager',
													'employees'
												)

		return queryset






class TerminationViewSet(viewsets.ModelViewSet):
	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return TerminationCreateUpdateSerializer
		return TerminationSerializer


	def get_queryset(self, *args, **kwargs):

		queryset = Termination.objects.prefetch_related(
													'contract'
												)

		return queryset


class ContractViewSet(viewsets.ModelViewSet):

	

	def get_serializer_class(self):
		if self.action in ['create', 'put']:
			return ContractCreateUpdateSerializer
		elif self.action == 'retrieve':
			return  ContractDetailSerializer
		return ContractListSerializer

	def get_queryset(self, *args, **kwargs):

		queryset = Contract.objects.prefetch_related(
													'employee'
												)

		return queryset











	