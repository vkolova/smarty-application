from rest_framework import serializers, mixins, permissions, viewsets, status, generics
from rest_framework.response import Response

from .models import Player
from .serializers import PlayerSerializer


class PlayerView(mixins.RetrieveModelMixin,
                mixins.UpdateModelMixin,
                viewsets.GenericViewSet):
    
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class PlayersList(viewsets.ViewSet):
    queryset = Player.objects.all()
    serializer_class = Player

    def list(self, request):
        queryset = Player.objects.all().order_by('-score')
        serializer = PlayerSerializer(queryset, many=True)
        return Response(serializer.data)