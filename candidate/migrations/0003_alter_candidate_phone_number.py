# Generated by Django 5.0.4 on 2024-07-17 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('candidate', '0002_rename_name_candidate_first_name_candidate_last_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='phone_number',
            field=models.BigIntegerField(default=0),
        ),
    ]
