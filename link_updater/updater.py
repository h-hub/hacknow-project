from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from link_updater import retrieve_links_api

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(retrieve_links_api.scheduled_job, 'interval', seconds=5)
    scheduler.start()