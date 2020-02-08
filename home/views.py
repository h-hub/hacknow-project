from django.shortcuts import render
from home.models import Author
from home.models import Link
from django.http import HttpResponse
import feedparser


def index(request):

    authors = Author.objects.all()

    authorlist = []

    for author in authors:
        link = author.link_set.filter(name='blog')
        fed = feedparser.parse(link[0].link)

        linkobjects = {
            'authername': author.first_name+ " "+ author.last_name,
            'autherblogfeed': fed
        }

        authorlist.append(linkobjects);


    context = {
        'authors': authorlist,
    }
    return render(request, 'home_templates/home.html', context)


def about(request):
    return render(request, 'home_templates/about.html')
