# Generated by Django 3.0.7 on 2020-09-12 11:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0003_auto_20200907_1721'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='entries',
        ),
        migrations.RemoveField(
            model_name='order',
            name='shipping_cost_entries',
        ),
    ]