from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('about', views.about, name='about'),
    path('bookmark', views.bookmarks, name='bookmarks'),
    path('ajax/bookmark', views.bookmark_links, name='bookmark'),
    # path('$/', views.authors, name='authors'),
    # path('$/', views.links, name='links'),
]