# Generated by Django 4.2.1 on 2023-12-30 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('BaseApp', '0002_alter_listitems_due_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='list',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='listitems',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='listitems',
            name='due_date',
            field=models.DateTimeField(),
        ),
    ]
