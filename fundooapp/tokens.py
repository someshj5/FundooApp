"""
It is a token generator for django fundooproject project
returns a digital record of the time of occurrence of a particular event.

"""
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils import six


class AccountActivationTokenGenerator(PasswordResetTokenGenerator):
    """
    This is a class for generating tokens using PasswordResetTokenGenerator

    :param Password Reset Token Generator : Strategy object used to generate and
    check tokens for the password reset mechanism.
    Strategy object used to generate and check tokens for the password reset mechanism.

    """
    def _make_hash_value(self, user, timestamp):
        """
        :param user: the user arg for generating token
        :param timestamp: a digital record of the time of occurrence of a particular event.
        :return: the function returns the hash vale using the above args
        """
        return(
            six.text_type(user.pk) +
            six.text_type(timestamp) +
            six.text_type(user.email)
        )


account_activation_token = AccountActivationTokenGenerator()
