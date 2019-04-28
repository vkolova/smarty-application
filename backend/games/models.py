from django.db import models
from enum import Enum
import uuid
from datetime import datetime

from players.models import Player
from questions.models import Question


class GameState(Enum):
    INITIAL = 'initial'
    PREPARING = 'preparing'
    IN_PROGRESS = 'in_progress'
    FINISHED = 'finished'

    @classmethod
    def choices(cls):
        return [
            (cls.INITIAL, 'initial'),
            (cls.PREPARING, 'preparing'),
            (cls.IN_PROGRESS, 'in_progress'),
            (cls.FINISHED, 'finished')
        ]

    def __str__(self):
        return self.value

    def __unicode__(self):
        return self.value


INITIAL = 'initial'
PREPARING = 'preparing'
IN_PROGRESS = 'in_progress'
FINISHED = 'finished'

GAME_STATES = (
    (INITIAL, 'initial'),
    (PREPARING, 'preparing'),
    (IN_PROGRESS, 'in_progress'),
    (FINISHED, 'finished')
)


class Game(models.Model):
    channel = models.UUIDField(primary_key=False, default=uuid.uuid4, editable=False)
    players = models.ManyToManyField(Player, related_name='games')

    state = models.CharField(max_length=15, default=INITIAL, choices=GAME_STATES)
    created = models.DateTimeField(default=datetime.now, blank=False)
    finished = models.DateTimeField(default=None, blank=True, null=True)
    winner = models.ForeignKey(Player, on_delete=models.CASCADE, default=None, null=True, blank=True)

    questions = models.ManyToManyField(Question, default=None, related_name='game_questions')
    current_question = models.ForeignKey(Question, default=None, on_delete=models.DO_NOTHING, blank=True, null=True)

