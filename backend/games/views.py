from django.shortcuts import render
from rest_framework import serializers, mixins, permissions, viewsets, status, generics
from rest_framework.response import Response
import random

from .models import Game
from .serializers import GameSerializer
from players.models import Player
from questions.models import Question

class GameView(mixins.CreateModelMixin,
            mixins.RetrieveModelMixin,
            mixins.UpdateModelMixin,
            mixins.DestroyModelMixin,
            mixins.ListModelMixin,
            viewsets.GenericViewSet):
    
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def perform_create(self, serializer):
        if self.request.data.get('opponent', None):
            ids = (self.request.user.id, self.request.data.get('opponent'))
        else:
            ids = (self.request.user.id,)

        players = Player.objects.filter(pk__in=ids)
        serializer.save(players=players)
    