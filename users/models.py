from django.db import models
from django.contrib.auth.models import AbstractUser

class PostLink(models.Model):
    link = models.CharField(max_length=400)

class User(AbstractUser):
    bookmarks = models.ManyToManyField(PostLink)


