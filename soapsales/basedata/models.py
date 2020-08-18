from django.db import models
from django.db import connection
from django.utils.translation import ugettext_lazy as _
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from  .const import *
from django.contrib.auth.models import Group



class TimeStampedModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SoftDeletionModel(models.Model):
    class Meta:
        abstract = True

    active = models.BooleanField(default=True)


    def delete(self):
        self.active = False
        self.save()

    def hard_delete(self):
        super().delete()



class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletonModel, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj






class Note(models.Model):
    timestamp = models.DateTimeField(auto_now=True)
    author = models.CharField(max_length=120)
    note = models.TextField()

    def __str__(self):
        return "{}({}): {}".format(self.timestamp.strftime("%d %b %y, %H:%M "), self.author, self.note)


class Organization(SoftDeletionModel, SingletonModel):
    index_weight = 1
    code = models.CharField(_("organ code"),max_length=120,blank=True,null=True)
    name = models.CharField(_("organ name"),max_length=120)
    short = models.CharField(_("short name"),max_length=120,blank=True,null=True)
    status = models.BooleanField(_("in use"),default=True)
    tax_num = models.CharField(_("tax num"),max_length=120,blank=True,null=True)
    tax_address = models.CharField(_("tax address"),max_length=120,blank=True,null=True)
    tax_account = models.CharField(_("tax account"),max_length=120,blank=True,null=True)
    represent = models.CharField(_("representative "),max_length=120,blank=True,null=True)
    address = models.CharField(_("address"),max_length=120,blank=True,null=True)
    zipcode = models.CharField(_("zipcode"),max_length=120,blank=True,null=True)
    fax = models.CharField(_("fax"),max_length=120,blank=True,null=True)
    contacts = models.CharField(_("contacts"),max_length=120,blank=True,null=True)
    phone = models.CharField(_("phone"),max_length=120,blank=True,null=True)
    website = models.CharField(_("website"),max_length=120,blank=True,null=True)
    email = models.CharField(_("email"),max_length=120,blank=True,null=True)
    lic_code = models.CharField(_("license code"),max_length=120,blank=True,null=True)
    cer_code = models.CharField(_("certificate code"),max_length=120,blank=True,null=True)
    license = models.FileField(_("business license"),blank=True,null=True,upload_to='organ')
    logo = models.FileField(_("business license"),blank=True,null=True,upload_to='organ')
    certificate = models.FileField(_("organization code certificate"),blank=True,null=True,upload_to='organ')
    weight = models.IntegerField(_("weight"),default=9)

   
    def __str__(self):
        return self.name




class UnitOfMeasure(models.Model):

    symbol = models.CharField(max_length=10, blank=False)
    # A human-readable name for the unit, e.g., metric ton
    verbose_name = models.CharField(max_length=20, blank=True)
    # A scale factor w.r.t. the base unit for this class. I.e., this unit multiplied by
    # the scale factor should equal to the base unit
    scale_factor = models.DecimalField(
        max_digits=20,
        decimal_places=6,
        validators=[
            MinValueValidator(
                limit_value=0.000_001, message="Unit scale factor must be positive."
            )
        ],
    )
    # Whether this is the base unit. This implies a scale factor of 1.0.
    is_base = models.BooleanField(default=False)
    unit_type = models.CharField(
        max_length=10, choices=UNIT_OF_MEASURE_CHOICES, default="count", blank=False
    )

    def __str__(self):
        return f'{self.verbose_name}'



    # @classmethod
    # def from_exp(cls, exp):
    #     """
        
    #     Parses a mixed-unit expression and return the unit, as a Unit instance. If the
    #     user cannot be found, a RuntimeError is raised.
    #     :param exp: a mixed-unit expression
    #     :return: a pair of (number, unit) where number is the number part, converted to
    #         a Python float, and unit is an instance of this class corresponding to the
    #         unit part.
    #     """
    #     match = MIX_UNIT_EXP_REGEX.fullmatch(exp)
    #     if not match:
    #         raise RuntimeError(f"Invalid mixed-unit expression: '{exp}'")
    #     if not match.group(1):
    #         raise RuntimeError(
    #             f"Invalid mixed-unit expression '{exp}': missing number part"
    #         )
    #     if not match.group(2):
    #         raise RuntimeError(
    #             f"Invalid mixed-unit expression '{exp}': missing units part"
    #         )
    #     number_part = float(match.group(1))
    #     unit_part = (
    #         match.group(2)
    #         .strip()
    #         .replace(".", "")
    #         .replace(" ", "")
    #         .casefold()
    #         .rstrip("s")
    #     )
    #     for symbol, accepted_forms in UNIT_ACCEPTED_FORMS.items():
    #         if unit_part in accepted_forms:
    #             return number_part, cls.objects.get(symbol=symbol)

    #     accepted_units = cls.objects.values_list("symbol", flat=True)
    #     raise RuntimeError(
    #         f"Unrecognized unit '{unit_part}'. "
    #         f"Accepted units are {', '.join(accepted_units)}."
    #     )














