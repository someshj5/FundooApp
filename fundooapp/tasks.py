import pika
import json
class RabbitService:
    def __init__(self):
        self.connection = pika.BlockingConnection( pika.ConnectionParameters(host='localhost') )
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue='email_queue', durable=True)

    def send_email(self, subject, message, to_email):
        email_data = {'subject': subject, 'message': message, 'email': to_email}
        message = json.dumps(email_data)
        self.channel.basic_publish(
                                    exchange='',
                                    routing_key='email_queue',
                                    body=message,
                                    properties=pika.BasicProperties(delivery_mode=2)
                                    )
        self.connection.close()
















    # email = EmailMessage(subject, message, to=[to_email])
    # email.send()
