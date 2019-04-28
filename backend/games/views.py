from django.shortcuts import render
from rest_framework import serializers, mixins, permissions, viewsets, status, generics
from rest_framework.response import Response
from exponent_server_sdk import PushMessage
import random

from players.models import Player
from players.notifications import send_push_message
from questions.models import Question

from .models import Game
from .serializers import GameSerializer


class GameView(mixins.CreateModelMixin,
            mixins.RetrieveModelMixin,
            mixins.UpdateModelMixin,
            mixins.DestroyModelMixin,
            mixins.ListModelMixin,
            viewsets.GenericViewSet):
    
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def perform_create(self, serializer):
        opponent = self.request.data.get('opponent', None)
        if opponent:
            ids = (self.request.user.id, opponent)
        else:
            ids = (self.request.user.id,)
        
        opponent = Player.objects.get(pk=opponent)
        send_push_message(PushMessage(
            to=opponent.push_notification_token,
            title='Покана за игра',
            body='Поканиха Ви за игра',
            data={'a': 'bb'}
        ))

        players = Player.objects.filter(pk__in=ids)
        serializer.save(players=players)
    