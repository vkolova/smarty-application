import random

from .models import Game as GameModel
from questions.models import Question

class Game:
    def __init__(self, uuid):
        self.game = GameModel.objects.get(uuid=uuid)
    
    def load_question(self):
        count = Question.objects.all().count()
        slice = random.random() * (count - 10)
        print(Question.objects.all()[slice: slice+10])