from django.conf.urls import url
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json
import random

from django.contrib.auth.models import User
from questions.models import Question
from questions.serializers import QuestionSerializer
from games.models import Game
from games.serializers import GameSerializer

class GameController(WebsocketConsumer):
    def connect(self):
        self.game_uuid = self.scope['url_route']['kwargs']['game_uuid']
        self.game_group = 'game_%s' % self.game_uuid
        self.user = self.get_user()
        self.game = Game.objects.get(channel=self.game_uuid)

        async_to_sync(self.channel_layer.group_add)(
            self.game_group,
            self.channel_name
        )

        self.accept()
        self.send(text_data=json.dumps({
            'type': 'notification',
            'data': 'Connected as %s' % self.user.username 
        }))
        self.send(text_data=json.dumps({
            'type': 'game_update',
            'data': GameSerializer().to_representation(self.game)
        }))

        self.load_question()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.game_group,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        data = text_data_json['data']
        type = text_data_json['type']

        async_to_sync(self.channel_layer.group_send)(
            self.game_group,
            {
                'type': type,
                'data': data
            }
        )
    
    def get_user(self):
        token = self.scope['url_route']['kwargs']['user_token']
        return User.objects.get(auth_token=token)
    
    def load_question(self):
        q = self.game.current_question
        if not q:
            count = Question.objects.all().count()
            slice = random.random() * (count - 1)
            q = Question.objects.all()[slice: slice+1][0]
            self.game.current_question = q
            self.game.save()
        q = self.game.current_question
        data = json.dumps({
            'type': 'question_update',
            'data': QuestionSerializer().to_representation(q)
        })
        self.send(text_data=data)


    def game_message(self, event):
        data = event['data']

        self.send(text_data=json.dumps({
            'data': data
        }))
    
    def question_answer(self, event):
        data = event['data']
        if data is self.game.current_question.correct_answer():
            print("CORRECT!")
        else:
            print("LOSER!")
        
        data = json.dumps({
            'type': 'notification',
            'data': 'ok'
        })
        self.send(text_data=data)




websocket_urlpatterns = [
    # url(r'^ws/$', SocketConsumer)
    url(r'^ws/game/(?P<user_token>[^/]+)/(?P<game_uuid>[^/]+)/$', GameController),
]