from home.models import Author, FeedLink
from bs4 import BeautifulSoup
from datetime import datetime
import mimetypes
import urllib
import feedparser
import re


def scheduled_job():

    print("scheduled_job")

    authors = Author.objects.all()

    for author in authors:
        blog_feed_link = author.link_set.filter(name='blog')

        feed = feedparser.parse(blog_feed_link[0].link)

        for entry in feed.entries:

            urls = re.findall(
                "(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-?=%.]+", entry.description)

            image_url = "/static/newfeed.jpg"

            for url in urls:
                if is_image_and_ready(url):
                    image_url = url
                    break

            try:
                obj = FeedLink.objects.get(feed_link_url=entry.link)
            except FeedLink.DoesNotExist:
                obj = FeedLink(link=blog_feed_link.first(),
                                feed_link_url=entry.link,
                                title=entry.title,
                                intro=get_intro(entry.description),
                                img_url=image_url,
                                published=datetime.now())
                obj.save()



def is_url_image(url):
    mimetype, encoding = mimetypes.guess_type(url)
    return (mimetype and mimetype.startswith('image'))


def check_url(url):
    """Returns True if the url returns a response code between 200-300,
       otherwise return False.
    """
    try:
        headers = {
            "Range": "bytes=0-10",
            "User-Agent": "MyTestAgent",
            "Accept": "*/*"
        }

        req = urllib.request.Request(url, headers=headers)
        response = urllib.request.urlopen(req)
        return response.code in range(200, 304)
    except Exception:
        return False


def is_image_and_ready(url):
    return is_url_image(url) and check_url(url)


def get_intro(description):

    soup = BeautifulSoup(description)

    for script in soup(["script", "style"]):
        script.extract()

    text = soup.get_text()

    lines = (line.strip() for line in text.splitlines())
    # break multi-headlines into a line each
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    # drop blank lines
    text = '\n'.join(chunk for chunk in chunks if chunk)

    edited_text = (text[:75] + '..') if len(text) > 75 else text

    return edited_text
