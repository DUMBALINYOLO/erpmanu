from django.apps import AppConfig


class ManufactureConfig(AppConfig):
    name = 'manufacture'


    def ready(self):
    	import manufacture.signals
