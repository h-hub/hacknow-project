from django.db import models
from django.contrib.gis.db import models as gis_models
from datetime import date
from django_google_maps import fields as map_fields

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
    feed_link_url = models.CharField(max_length=255)
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

class Rental(models.Model):
    address = map_fields.AddressField(max_length=200)
    geolocation = map_fields.GeoLocationField(max_length=100)


class Location(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)    
    cases = models.IntegerField()
    info = models.CharField(max_length=455)    
    point = gis_models.PointField()

    def __str__(self):
       return self.address + ", " + self.name