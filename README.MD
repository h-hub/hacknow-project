# Hacknow: Python Django

## Deployed to Heorku
Install Dependencies: pip3 install -r requirements.txt
Development server: python manage.py runserver

## Migrations:
python manage.py makemigrations
python manage.py migrate

## Generate requirments:

pip3 freeze > requirements.txt


python manage.py diffsettings --all
python manage.py collectstatic --noinput

Logs: heroku logs -t  --app devrssfeed


https://github.com/jessamynsmith/django-google-maps