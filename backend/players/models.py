from django.db import models
from django.contrib.auth.models import User

from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Player(User):
    user = models.OneToOneField(User, parent_link=True, on_delete=models.CASCADE)
    score = models.BigIntegerField(default=0, help_text='Player points')
    avatar = models.TextField(max_length=500, help_text='Avatar url')


@receiver(post_save, sender=User)
def create_player_profile(sender, instance, created, **kwargs):
    print("??", created, instance)
    if created:
        player_profile = Player.objects.create(user=instance)
        player_profile.save()
