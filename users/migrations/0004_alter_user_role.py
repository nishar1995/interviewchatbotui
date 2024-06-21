# Generated by Django 5.0.6 on 2024-05-22 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_remove_user_name_alter_user_email_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('1', 'Admin'), ('4', 'User'), ('3', 'HR'), ('2', 'HRManager')], max_length=10),
        ),
    ]