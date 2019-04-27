# from django.shortcuts import render
from rest_framework import serializers, mixins, permissions, viewsets, status
from rest_framework.response import Response

from .models import Player
from .serializers import PlayerSerializer

# Create your views here.
class PlayerView(mixins.RetrieveModelMixin,
                mixins.UpdateModelMixin,
                viewsets.GenericViewSet):
    
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
