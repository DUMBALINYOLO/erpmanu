from rest_framework import viewsets, generics, status, views
from rest_framework.response import Response
from invoicing.models import Customer, Invoice
import datetime
import itertools
from basedata.utilities import encode_period, extract_encoded_period, extract_periodimport 





class InvoiceAgingReportAPIView(views.APIView):

	def get(self, request, format=None):

		outstanding_invoices = Invoice.objects.filter(Q(status='invoice'))
		customers = Customer.objects.all()

		return Response({
				'outstanding_invoices': len([i for i in outstanding_invoices]),
				'customers': len([i for i in customers])
			})


class AccountsReceivableAPIView(views.APIView):

	def get(self, request, format=None):

		invs = Invoice.objects.filter(status__in=['invoice', 'paid-partially'], draft=False)
		current = list(filter(lambda x: x.overdue_days == 0, invs))
        week = list(filter(lambda x: x.overdue_days > 0 and x.overdue_days < 7, invs))
		week_two = list(filter(lambda x: x.overdue_days > 6 and x.overdue_days < 15, invs))
        month= list(filter( lambda x: x.overdue_days > 14 and x.overdue_days < 31, invs))
        two_months = list(filter(lambda x: x.overdue_days > 30 and x.overdue_days < 61, invs))
        more = list(filter(lambda x: x.overdue_days > 60, invs))
        date = datetime.date.today()

        return Response({
        		'current': current,
        		'week': week,
        		'week_two': week_two,
        		'month': month,
        		'two_months': two_months,
        		'more': more,
        		'date': date,
        	})

class SalesByCustomerAPIView(views.APIView):


    def get(self, request, format=None):
    	start, end = extract_period(self.request.GET)
        customers = [{
            'name': str(c),
            'sales': sum([i.subtotal for i in c.sales_over_period(start, end)])
            } for c in Customer.objects.all()]
        sales = Invoice.objects.filter(date__gte=start,
            date__lte=end)

        
        return Response({
        		'customers': customers,
        		'sales': sales,
        		'start': start.strftime("%d %B %Y"),
            	'end': end.strftime("%d %B %Y")

        	})


class CustomerPaymentsAPIView(views.APIView):
 

    def get(self, request, format=None):
        start, end = extract_period(self.request.GET)
        return models.Payment.objects.filter(date__gte=start, 
            date__lte=end)

class SaleInDay(views.APIView):
    # permission_classes = (IsAuthenticated,)
    
    def get(self,request):
        return Response({"details" :"Not ! Allowed"} , status=status.HTTP_404_NOT_FOUND)
    
    def post(self,request):
        info = request.data
        DT = datetime.now()
        date = str(DT.year)+"-"+str(DT.month)+"-"+str(DT.day)
        if info.keys() == {'hospital'}:
            sales = Item_sale.objects.filter(hospital=info['hospital'],date=date)
            # print(sales)
            total_sale = 0
            for sale in sales:
                total_sale += (sale.quantity_bought*sale.item_price)
            # print(total_sale)
            
            return Response({'total_sale' : total_sale} , status=status.HTTP_200_OK)

        else:
            return Response({"details" : "Hospital Name Only !"} , status=status.HTTP_400_BAD_REQUEST)



Daily
Weekly
Monthly
Yearly
By Customer
By Sales Rep
By Products
By Payments

Cash Sales
    Daily
    Weekly
    Monthly
    Yearly
    By Customer
    By Sales Rep
    By Products
    By Payments

Cash Sales Returns
    Daily
    Weekly
    Monthly
    Yearly
    By Customer
    By Sales Rep
    By Products
    By Payments
Credit Sales Returns
    Daily
    Weekly
    Monthly
    Yearly
    By Customer
    By Sales Rep
    By Products
    By Payments
Credit Sales
    Daily
    Weekly
    Monthly
    Yearly
    By Customer
    By Sales Rep
    By Products
    By Payments
Credit Purchase
Cash Purchase




def get_queryset(self):
    queryset = Event.objects.all()
    
    start_date = self.request.query_params.get('start_date', None)
    end_date = self.request.query_params.get('end_date', None)

    if start_date and end_date:
        queryset = queryset.filter(timstamp__range=[start_date, end_date])

import datetime
samples = Sample.objects.filter(sampledate__gte=datetime.date(2011, 1, 1),
                                sampledate__lte=datetime.date(2011, 1, 31))


Sample.objects.filter(date__year='2011', 
                      date__month='01')

Sample.objects.filter(date__range=["2011-01-01", "2011-01-31"])

startdate = date.today()
    enddate = startdate + timedelta(days=6)
    Sample.objects.filter(date__range=[startdate, enddate])

startdate = datetime.today()
    enddate = startdate + timedelta(days=6)
    Sample.objects.filter(date__range=[startdate, enddate])


class AnalyticsFilterBackend(generic_filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        predicate = request.query_params # or request.data for POST

        if predicate.get('from_date', None) is not None and predicate.get('to_date', None) is not None:
            queryset = queryset.filter(your_date__range=(predicate['from_date'], predicate['to_date']))

        if predicate.get('from_date', None) is not None and predicate.get('to_date', None) is None:
            queryset = queryset.filter(your_date__gte=predicate['from_date'])

        if predicate.get('to_date', None) is not None and predicate.get('from_date', None) is None:
            queryset = queryset.filter(your_date__lte=predicate['to_date'])
        return queryset





