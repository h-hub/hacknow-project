from django.contrib import admin
from users.models import Profile
from home.models import Location

from django_google_maps import widgets as map_widgets
from django_google_maps import fields as map_fields

# class RentalAdmin(admin.ModelAdmin):
#     formfield_overrides = {
#         map_fields.AddressField: {'widget': map_widgets.GoogleMapsAddressWidget},
#     }

admin.site.register(Profile)
admin.site.register(Location)

