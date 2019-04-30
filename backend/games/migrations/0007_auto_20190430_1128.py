# Generated by Django 2.1.7 on 2019-04-30 08:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0006_auto_20190430_1023'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='rounds',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='game', to='games.Round'),
        ),
        migrations.AlterField(
            model_name='game',
            name='state',
            field=models.CharField(choices=[('initial', 'initial'), ('preparing', 'preparing'), ('declined', 'declined'), ('in_progress', 'in_progress'), ('finished', 'finished')], default='initial', max_length=15),
        ),
    ]
