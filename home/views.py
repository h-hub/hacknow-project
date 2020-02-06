from django.shortcuts import render
from home.models import Author
from home.models import Link
from django.http import HttpResponse
import feedparser


def index(request):

    authors = Author.objects.all()

    link = Link.objects.filter(author__pk=1)[0].link

    feeds = feedparser.parse(link)

    context = {
        'feeds': feeds,
        'author_name': authors[0].first_name+" "+authors[0].last_name
    }
    return render(request, 'home_templates/home.html', context)


def about(request):
    return render(request, 'home_templates/about.html')
