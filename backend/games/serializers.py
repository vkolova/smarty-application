from rest_framework import serializers

from players.serializers import UserSerializer, SimplePlayerSerializer
from questions.serializers import QuestionSerializer
from .models import Game


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id', 'channel', 'players', 'state', 'created', 'finished', 'winner', 'questions', 'current_question')
        read_only_fields = ('id', 'channel', 'created')
        write_once_fields = ('channel')

    channel = serializers.UUIDField(format='hex_verbose', required=False)
    players = SimplePlayerSerializer(many=True, required=False)

    state = serializers.CharField(max_length=15, allow_blank=False, required=False)
    created = serializers.DateTimeField(required=False)
    finished = serializers.DateTimeField(required=False)
    winner = UserSerializer(required=False)

    questions = QuestionSerializer(many=True, required=False)
    current_question = QuestionSerializer(required=False)
        
