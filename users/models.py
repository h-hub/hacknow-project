from django.db import models
from django.contrib.auth.models import User


class PostLink(models.Model):
    link = models.CharField(max_length=400)
    author = models.ForeignKey(User,
                               on_delete=models.CASCADE)
