# Generated by Django 4.2.1 on 2023-10-07 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_age_diagnosis_firstname_lastname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='age',
            name='age',
            field=models.IntegerField(),
        ),
    ]
