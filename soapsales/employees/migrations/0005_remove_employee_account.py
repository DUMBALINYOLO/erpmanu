# Generated by Django 3.0.7 on 2020-09-02 18:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0004_auto_20200902_1805'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='account',
        ),
    ]