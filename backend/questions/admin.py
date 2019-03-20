from django.contrib import admin

from .models import Question


class QuestionAdmin(admin.ModelAdmin):
    model = Question
    fields = ('id', 'content',)
    list_display = ('id', 'content',)
    readonly_fields = ('id',)
    ordering = ('-id',)

admin.site.register(Question, QuestionAdmin)