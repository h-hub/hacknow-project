from django.db import models

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

