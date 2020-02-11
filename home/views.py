from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from home.models import Author
from home.models import Link

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


def bookmark_links(request):
    link = request.GET.get('link', None)

    

    # data = {
    #     'is_taken': User.objects.filter(username__iexact=username).exists()
    # }
    if data['is_taken']:
        data['error_message'] = 'A user with this username already exists.'
    return JsonResponse(data)
