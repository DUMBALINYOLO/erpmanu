# Generated by Django 3.0.7 on 2020-09-12 22:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoicing', '0007_auto_20200912_1554'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
    ]