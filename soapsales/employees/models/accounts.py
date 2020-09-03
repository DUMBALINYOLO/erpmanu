import uuid
from django.db import models
from datetime import date
from django.core.validators import RegexValidator

from django.contrib.auth.models import (
        BaseUserManager, 
        AbstractBaseUser
    )
from django.db.models.signals import post_save
from django.dispatch import receiver




class UserManager(BaseUserManager):
    def create_user(self, email, is_superuser=False, password=None, is_active=True, is_staff=False, is_admin=False):
        if not email:
            raise ValueError("Enter Valid Email")
        user_obj = self.model(
                email=self.normalize_email(email)
        )
        user_obj.set_password(password)
        user_obj.staff = is_staff
        user_obj.admin = is_admin
        user_obj.active = is_active
        user_obj.save(using=self._db)
        return user_obj

    def create_staffuser(self, email, password=None):
        user=self.create_user(
            email,
            password = password,
            is_staff = True
        )
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        user=self.create_user(
            email,
            password = password,
            is_staff = True,
            is_admin =True,
            is_superuser=True, 
            **extra_fields
        )
        return user
        
class User(AbstractBaseUser):
    email = models.EmailField(max_length=45, unique=True)
    username = models.CharField(max_length=40, null=True, blank=True)
    #full_name = models.CharField(max_length=45, blank=True, null=True)
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    admin = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =[]
    objects= UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True 

    @property
    def is_staff(self):
        return self.staff


    @property
    def is_admin(self):
        return self.admin


    @property
    def is_active(self):
        return self.active


