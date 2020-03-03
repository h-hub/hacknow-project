from apscheduler.schedulers.blocking import BlockingScheduler
from home.models import Author

sched = BlockingScheduler()

@sched.scheduled_job('interval', seconds=5)
def timed_job():
    print('This job is run every three minutes.')

@sched.scheduled_job('cron', hour=17)
def scheduled_job():
    authors = Author.objects.all()
    print('This job is run every day at 5pm.')

sched.start()