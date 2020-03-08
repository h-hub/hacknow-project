from django.contrib import admin
from home.models import Author, Link, FeedLink

admin.site.register(Author)
admin.site.register(Link)
admin.site.register(FeedLink)