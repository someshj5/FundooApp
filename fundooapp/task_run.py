import pika
import json
import time
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


email_obj = smtplib.SMTP(host='smtp.gmail.com', port=587)
email_obj.starttls()
email_obj.login('fundooj5@gmail.com', 'fundoo123456')

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='email_queue', durable=True)
print(' [*] Waiting for messages. To exit press CTRL+C')


def callback(ch, method, properties, body):
    print("Body=====>", body)
    x = f" [x] Received {body}"
    body1 = json.loads(body)
    msg = MIMEMultipart()  # create a message

    print("Json Body======>", body1)
    time.sleep(body.count(b'.'))

    email = body1.get('email')
    message = body1.get('message')
    subject = body1.get('subject')
    print(email, message, subject)

    msg['From'] = 'fundooj5@gmail.com'
    msg['To'] = email
    msg['Subject'] = subject

    # add in the message body
    msg.attach(MIMEText(message, 'plain'))

    # send the message via the server set up earlier.
    email_obj.send_message(msg)

    print(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='email_queue', on_message_callback=callback)
channel.start_consuming()
