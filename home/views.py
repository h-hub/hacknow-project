from django.shortcuts import render

from django.http import HttpResponse


def index(request):
    return render(request, 'home_templates/home.html')

def about(request):
    return render(request, 'home_templates/about.html')
