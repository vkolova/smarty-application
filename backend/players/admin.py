from django.contrib import admin

from .models import Player
# Register your models here.

class PlayerAdmin(admin.ModelAdmin):
    model = Player
    fields = ('id', 'user', 'score', 'avatar',)
    list_display = ('id', 'user', 'score', 'level')
    readonly_fields = ('id', 'user', 'level')
    ordering = ('-id',)

    def level(self, obj):
        return 1


admin.site.register(Player, PlayerAdmin)