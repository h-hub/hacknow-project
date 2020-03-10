from django.core.paginator import Paginator
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from home.models import Author
from home.models import Link, FeedLink
from users.models import Profile

import feedparser


def index(request):

    authors = Author.objects.all()
    # paginator = Paginator(authors, 5) 

    # page_number = request.GET.get('page')
    # page_obj = paginator.get_page(page_number)

    authorlist = []

    for author in authors:

        web_link = None
        twitter_link = None
        github_link = None

        blog_feed_links = author.link_set.filter(name='blog')[0].feedlink_set.all()[:8]

        web = author.link_set.filter(name='web')
        if web:
            web_link = author.link_set.filter(name='web')[0].link

        twitter = author.link_set.filter(name='twitter')
        if twitter:
            twitter_link = author.link_set.filter(name='twitter')[0].link

        github = author.link_set.filter(name='github')
        if github:
            github_link = author.link_set.filter(name='github')[0].link
        
        linkobjects = {
            'authername': author.first_name + " " + author.last_name,
            'autherblogfeed': blog_feed_links,
            'webLink': web_link,
            'twitter': twitter_link,
            'github': github_link
        }

        authorlist.append(linkobjects)

    latestLinks = FeedLink.objects.all()[:6]

    context = {
        'authors': authorlist,
        'latestLinks': latestLinks,
    }

    return render(request, 'home_templates/home.html', context)


def about(request):
    return render(request, 'home_templates/about.html')


# def bookmarks(request):

#     bookmark_links = PostLink.objects.all()

#     if bookmark_links:
#         context = {
#             'links': bookmark_links,
#             'first_link': bookmark_links[0]
#         }
#     else:
#         context = {
#             'links': bookmark_links,
#             'first_link': None
#         }

#     return render(request, 'home_templates/bookmarks.html', context)


def add_bookmark(request):
    link = request.GET.get('link', None)

    feed_link = FeedLink.objects.get(feed_link_url=link)

    profile = Profile()
    profile.user = request.user
    profile.book_marks.add(feed_link)
    profile.save()

    data = {
            'is_saved': True
        }

    return JsonResponse(data)


def is_bookmark(request):

    link = request.GET.get('link', None)

    feed_link = FeedLink.objects.get(feed_link_url=link)

    exist = False
    # PostLink.objects.filter(link=link, author=request.user).exists()

    data = {
        'is_bookmark': exist
    }

    return JsonResponse(data)
