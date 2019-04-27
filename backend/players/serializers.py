from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Player

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'id')


class PlayerSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Player
        fields = ('id', 'user', 'score', 'avatar', 'level')
        read_only_fields = ('user', 'level')
        write_once_fields = ('user',)
    
    user = UserSerializer()
    score = serializers.IntegerField()
    avatar = serializers.URLField(max_length=5000, min_length=None, allow_blank=True)
    level = serializers.SerializerMethodField()

    def get_level(self, obj):
        return 1