from django.core.paginator import Paginator
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from home.models import Author
from home.models import Link
from users.models import PostLink

import feedparser


def index(request):

    authors = Author.objects.all()
    paginator = Paginator(authors, 5) 

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    authorlist = []

    for author in page_obj:
        link = author.link_set.filter(name='blog')
        fed = feedparser.parse(link[0].link)

        linkobjects = {
            'authername': author.first_name + " " + author.last_name,
            'autherblogfeed': fed
        }

        authorlist.append(linkobjects)

    context = {
        'authors': authorlist,
        'page_obj': page_obj,
    }
    return render(request, 'home_templates/home.html', context)


def about(request):
    return render(request, 'home_templates/about.html')


def bookmarks(request):

    bookmark_links = PostLink.objects.all()

    if bookmark_links:
        context = {
            'links': bookmark_links,
            'first_link': bookmark_links[0]
        }
    else:
        context = {
            'links': bookmark_links,
            'first_link': None
        }

    return render(request, 'home_templates/bookmarks.html', context)


def bookmark_links(request):
    link = request.GET.get('link', None)

    exist = PostLink.objects.filter(link=link, author=request.user).exists()

    if exist:
        PostLink.objects.filter(link=link, author=request.user).delete()
        data = {
            'is_saved': False
        }
    else:
        post_link = PostLink()
        post_link.link = link
        post_link.author = request.user
        post_link.save()

        data = {
            'is_saved': True
        }

    return JsonResponse(data)


def is_bookmark(request):

    link = request.GET.get('link', None)

    exist = PostLink.objects.filter(link=link, author=request.user).exists()

    data = {
        'is_bookmark': exist
    }

    return JsonResponse(data)
