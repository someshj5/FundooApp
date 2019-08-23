from locust import HttpLocust, TaskSet
# from fundooapp.urls import urlpatterns


def login(l):
    l.client.post("user_login/", {"username":"someshj5","password":"my123456"})


def logout(l):
    l.client.post("logoutuser/", {"username":"someshj5", "password":"my123456"})


def index(l):
    l.client.get("/fundooapp")


def profile(l):
    l.client.get("/user_login")


class UserBehaviour(TaskSet):
    tasks = {index: 1,  profile: 2}

    def onstart(self):
        login(self)

    def onstop(self):
        logout(self)

class WebsiteUser(HttpLocust):
    task_set = UserBehaviour
    min_wait = 5000
    max_wait = 9000
