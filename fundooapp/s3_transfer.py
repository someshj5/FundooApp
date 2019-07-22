"""
    File transfer using boto3 at S3 bucket
"""
import boto3


class S3Upload:
    """
    The Class for S3 file uploading at S3 bucket
    """
    def transfer(self, image):
        """
        This method uploads the image file to the S3 bucket
        :param image: image file to be uploaded
        :return: returns True
        """
        s3 = boto3.client('s3')
        imagename = 'some'
        # print('dasdsa2222222222', imagename)
        s3.upload_fileobj(image, 'somesh-static', imagename)
        return True























