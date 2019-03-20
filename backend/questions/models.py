from django.db import models

class Question(models.Model):
    content = models.TextField(max_length=5000, help_text='Question text')
