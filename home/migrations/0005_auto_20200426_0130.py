# Generated by Django 3.0.2 on 2020-04-25 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_location'),
    ]

    operations = [
        migrations.RenameField(
            model_name='location',
            old_name='city',
            new_name='name',
        ),
        migrations.RemoveField(
            model_name='location',
            name='district',
        ),
        migrations.AddField(
            model_name='location',
            name='cases',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='location',
            name='info',
            field=models.CharField(default=1, max_length=455),
            preserve_default=False,
        ),
    ]
