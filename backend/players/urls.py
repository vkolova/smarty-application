# from django.conf.urls import url
# from .views import PlayerView

# urlpatterns = [
#     url(r'^players',
#         PlayerView,
#         name='player')
# ]


from django.urls import path, include
from rest_framework import routers
from .views import PlayerView, PlayersList
# from .notifications import SavePushNotificationTokenView
# from .notifications import NotificationTokenAPIView

router = routers.SimpleRouter()
router.register(r'player', PlayerView)
router.register(r'players', PlayersList)
# router.register(r'^notifications/$', NotificationTokenAPIView)


def hello_world(request):
    return Response({"message": "Hello, world!"})

# urlpatterns = router.urls
urlpatterns = [
    path('', include(router.urls))
]