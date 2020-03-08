from django.db import models
from datetime import date

class Author(models.Model):
    first_name = models.CharField(max_length=30, verbose_name='First Name')
    last_name = models.CharField(max_length=30)

    def __str__(self):
       return self.first_name + " " + self.last_name

class Link(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    link = models.CharField(max_length=100)

    def __str__(self):
           return self.author.first_name + " -> " + self.name + " : " + self.link

class FeedLink(models.Model):
    link = models.ForeignKey(Link, on_delete=models.CASCADE)
    feed_link_url = models.CharField(max_length=255, primary_key=True)
    title = models.CharField(max_length=255)
    intro = models.CharField(max_length=255)
    img_url = models.CharField(max_length=255)
    published = models.DateField(default=date.today)


    def __str__(self):
           return self.title


class Category(models.Model):
    links = models.ManyToManyField(FeedLink)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)

    def __str__(self):
           return self.name