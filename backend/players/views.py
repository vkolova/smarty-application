# from django.shortcuts import render
from rest_framework import serializers, mixins, permissions, viewsets, status, generics
from rest_framework.response import Response

from .models import Player
from .serializers import PlayerSerializer

# Create your views here.
class PlayerView(mixins.RetrieveModelMixin,
                mixins.UpdateModelMixin,
                viewsets.GenericViewSet):
    
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    # def list(self, request):
    #     queryset = Player.objects.all().order_by('-published_date')
    #     serializer = Player(queryset, many=True)
    #     return Response(serializer.data)


class PlayersList(viewsets.ViewSet):
    queryset = Player.objects.all()
    serializer_class = Player

    def list(self, request):
        queryset = Player.objects.all().order_by('-score')
        serializer = PlayerSerializer(queryset, many=True)
        return Response(serializer.data)

# class PlayersList(generics.ListCreateAPIView):
#     queryset = Player.objects.all()
#     serializer_class = Player

#     def list(self, request):
#         queryset = self.get_queryset().order_by('-score')
#         serializer = PlayerSerializer(queryset, many=True)
#         return Response(serializer.data)