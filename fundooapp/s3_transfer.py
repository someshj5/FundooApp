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
        imagename = image.name
        print(imagename)
        # print('dasdsa2222222222', imagename)
        s3.upload_fileobj(image, 'somesh-static', str(imagename))

        url = '{}/{}/{}'.format(s3.meta.endpoint_url, 'somesh-static', imagename)

        print(url)
        return url
        # return True























