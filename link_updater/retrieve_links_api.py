from home.models import Author

def scheduled_job():
    authors = Author.objects.all()
    print('This job is run every day at 5pm.')