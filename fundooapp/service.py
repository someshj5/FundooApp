"""
    Redis is an open source in-memory data structure store,
    used as a database, cache and message broker. It supports data structures
    such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps,
    hyperloglogs, geospatial indexes with radius queries and streams.
"""
import redis
from django.core.cache.backends import db
from fundooproject.settings import redis_host, redis_port
# try:
#     r = redis.StrictRedis(host='localhost', port=6379, db=0)
# except Exception as e:
#     print(e)
class Redis:

    """
    Class Redis with set get and flush methods
    """
    def __init__(self):
        self.r = redis.StrictRedis(host=redis_host, port=redis_port, db=0)

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
        print("Auth redis service.py")
        value = self.r.get(key)

        return value

    def flushall(self):
        """
        :return: removes the value of the specific key assigning it to nil
        """
        self.r.flushall()

    # def set_many(self,key,value):
    #
    #     self.r.set_many(value)





