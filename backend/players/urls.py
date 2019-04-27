# from django.conf.urls import url
# from .views import PlayerView

# urlpatterns = [
#     url(r'^players',
#         PlayerView,
#         name='player')
# ]


from rest_framework import routers
from .views import PlayerView

router = routers.SimpleRouter()
router.register(r'player', PlayerView)

urlpatterns = router.urls