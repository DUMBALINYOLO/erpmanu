from django.apps import AppConfig


class DailyCashRegisterConfig(AppConfig):
    name = 'daily_cash_register'

    def ready(self):
    	import daily_cash_register.signals
