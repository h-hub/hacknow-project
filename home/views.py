from django.core.paginator import Paginator
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from home.models import Author, Rental, Location
from home.models import Link, FeedLink
from users.models import Profile

from rest_framework import routers, viewsets, permissions, status, permissions
from rest_framework.views import APIView
from rest_framework_gis import serializers
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes


class LocationSerializer(serializers.GeoFeatureModelSerializer):
    """ A class to serialize locations as GeoJSON compatible data """

    class Meta:
        model = Location
        geo_field = "point"

        # you can also explicitly declare which fields you want to include
        # as with a ModelSerializer.
        fields = ('id', 'name', 'address', 'cases', 'info')
        

class LocationView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        search_results = Location.objects.all()
        serializer = LocationSerializer(search_results, many=True)
        return JsonResponse(serializer.data)

    def post(self, request, format=None):
        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((permissions.AllowAny,))
def location_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        location = Location.objects.get(pk=pk)
    except Location.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = LocationSerializer(location)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
            serializer = LocationSerializer(location, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
            location.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

def index(request):

    context = {}

    return render(request, 'home_templates/home.html', context)


def about(request):
    return render(request, 'home_templates/about.html')



