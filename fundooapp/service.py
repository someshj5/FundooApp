import redis

r= redis.StrictRedis(host='localhost', port='6379', db=0)

r.set('key','jwt_token')
print(r.get("key"))


class Redis:

    def set(self,key,value):
        print('token set')

    def get(self,key):
        print(key)
