# Generated by Django 2.2.3 on 2019-08-24 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0005_auto_20190823_1023'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notes',
            name='label',
            field=models.ManyToManyField(blank=True, null=True, to='labels.Label'),
        ),
    ]