#!/bin/bash
pipenv install -r requirements.txt
python manage.py makemigrations
python manage.py migrate