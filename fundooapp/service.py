"""
    Redis is an open source in-memory data structure store,
    used as a database, cache and message broker. It supports data structures
    such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps,
    hyperloglogs, geospatial indexes with radius queries and streams.
"""
import redis
from django.core.cache.backends import db
from fundooproject.settings import host, port


class Redis:

    """
    Class Redis with set get and flush methods
    """
    def __init__(self):
        self.r = redis.StrictRedis(host=host, port=port, db=db)

    def set(self, key, value):
        """
        :param key:  Returns all keys matching pattern.
        :param value: value for a particular key
        :return: sets the key-value pair in cache
        """
        self.r.set(key, value)

    def get(self, key):
        """
        :param key: Returns all keys matching pattern
        :return: returns the value of the specific key
        """
        value = self.r.get(key)
        return value

    def flushall(self):
        """
        :return: removes the value of the specific key assigning it to nil
        """
        self.r.flushall()





