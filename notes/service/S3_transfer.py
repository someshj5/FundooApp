"""
    File transfer using boto3 at S3 bucket
"""
import boto3
from rest_framework.response import Response


class S3Upload:
    """
    The Class for S3 file uploading at S3 bucket
    """
    def __init__(self):
        self.s3 = boto3.resource('s3')

    def transfer(self, image):
        """
        This method uploads the image file to the S3 bucket
        :param image: image file to be uploaded
        :return: returns True
        """
        try:
            imagename = image.name
            s3 = boto3.client('s3')
            print("inside transfer")
            s3.upload_fileobj(image, 'somesh-static', str(imagename))
            print("uploaded")

            url = f'http: // {"somesh-static"}.s3.{s3.meta.region_name}.amazonaws.com / {imagename}'

                 # https: // somesh - static.s3.ap - south - 1.amazonaws.com / nature2.jpeg

            # https:// somesh-static.s3.ap-south-1.amazonaws.com/nature.jpeg
            print(url)
            return url
        except ValueError:
            return Response({})
