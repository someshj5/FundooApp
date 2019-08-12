from celery import shared_task
from django.core.mail import EmailMessage


@shared_task
def send_email(subject, message, to_email):
    email = EmailMessage(subject, message, to=[to_email])
    email.send()
    return True
