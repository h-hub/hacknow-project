from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six

from django.contrib.auth.models import User
from home.models import FeedLink

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    book_marks = models.ManyToManyField(FeedLink)
    email_confirmed = models.BooleanField(default=False)

    def __str__(self):
           return self.user.email

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
                six.text_type(user.pk) + six.text_type(timestamp) +
                six.text_type(user.profile.email_confirmed)
        )


account_activation_token = AccountActivationTokenGenerator()