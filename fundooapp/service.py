import redis

r = redis.StrictRedis(host='localhost', port='6379', db=0)

# r.set('key','jwt_token')
# print(r.get("key"))


class Redis:

    def set(self, key, value):
        r.set(key, value)

    def get(self, key):
        r.get(key)

    def flushall(self):
        r.flushall()

