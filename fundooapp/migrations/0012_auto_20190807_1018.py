# Generated by Django 2.2.3 on 2019-08-07 10:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('fundooapp', '0011_auto_20190807_0940'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='notes',
            name='collaborator',
        ),
        migrations.AddField(
            model_name='notes',
            name='collaborator',
            field=models.ManyToManyField(blank=True, related_name='user_collaborator', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='notes',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
    ]
