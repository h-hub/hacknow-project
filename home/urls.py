from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('about', views.about, name='about'),
    path('location', views.LocationView.as_view()),
    path('location/<int:pk>', views.location_detail),
    # path('$/', views.authors, name='authors'),
    # path('$/', views.links, name='links'),
]

urlpatterns = format_suffix_patterns(urlpatterns)