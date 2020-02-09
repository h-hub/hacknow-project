from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('about', views.about, name='about'),
    # path('$/', views.authors, name='authors'),
    # path('$/', views.links, name='links'),
]