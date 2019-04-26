from django.conf.urls import url
from channels.generic.websocket import WebsocketConsumer
import json

class SocketConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

websocket_urlpatterns = [
    url(r'^users/$', SocketConsumer),
]