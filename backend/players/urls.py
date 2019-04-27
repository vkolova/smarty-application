# from django.conf.urls import url
# from .views import PlayerView

# urlpatterns = [
#     url(r'^players',
#         PlayerView,
#         name='player')
# ]


from rest_framework import routers
from .views import PlayerView, PlayersList

router = routers.SimpleRouter()
router.register(r'player', PlayerView)
router.register(r'players', PlayersList)

urlpatterns = router.urls