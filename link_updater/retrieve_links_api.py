from home.models import Author, FeedLink
import feedparser


def scheduled_job():

    authors = Author.objects.all()

    for author in authors:
        print('This job is run every day at 5pm.')
        # blog_feed_link = author.link_set.filter(name='blog')

        # feed = feedparser.parse(blog_feed_link[0].link)

        # for entry in feed.entries:
            # print(entry.title)
            # feed_link = FeedLink()
            # feed_link.link = blog_feed_link.first()
            # feed_link.feed_link_url = entry.link
            # feed_link.title = entry.title
            # feed_link.intro = "test"
            # feed_link.img_url = "test url"

            # obj, created = FeedLink.objects.get_or_create(
            #     link=blog_feed_link.first(),
            #     feed_link_url=entry.link,
            #     title=entry.title,
            #     intro="test",
            #     img_url="test url",
            # )

            
