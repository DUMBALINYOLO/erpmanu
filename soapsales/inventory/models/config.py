from __future__ import unicode_literals

import datetime
from decimal import Decimal as D

import rest_framework
from django.conf import settings
from django.db import models
from django.db.models import Q
from accounts.models import Account, Journal, JournalEntry
from basedata.models import SingletonModel, SoftDeletionModel
from basedata.const import (
                INVENTORY_VALUATION_PERIOD_CHOICES,
                INVENTORY_VALUATION_METHODS_CHOICES,
                INVENTORY_CHECK_FREQUENCY_CHOICES,
                INVENTORY_CHECK_DATE_CHOICES

            )


class InventorySettings(SingletonModel):
    inventory_valuation_method = models.PositiveSmallIntegerField(
        choices = INVENTORY_VALUATION_PERIOD_CHOICES, default=1
    )
    inventory_check_frequency = models.PositiveSmallIntegerField(
        choices=INVENTORY_CHECK_FREQUENCY_CHOICES, default=1
    )
    inventory_check_date = models.PositiveSmallIntegerField(
        choices=INVENTORY_CHECK_DATE_CHOICES, default=1
    )
    use_warehousing_model = models.BooleanField(default=True)
    use_storage_media_model = models.BooleanField(default=True)
    use_product_inventory = models.BooleanField(default=True)
    use_equipment_inventory = models.BooleanField(default=True)
    use_consumables_inventory = models.BooleanField(default=True)
    use_raw_materials_inventory = models.BooleanField(default=True)
    #TODO capitalization_limit = models.DecimalField(max_digits=16, decimal_places=2)
    is_configured = models.BooleanField(default=False)
    service_hash = models.CharField(max_length=255, default="", blank=True)

    