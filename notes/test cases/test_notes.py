import pytest
import requests


def test_NoteCreate():
    url = ' http://127.0.0.1:8000/notes/notes/'
    data = {
            "title": "somesh12233",
            "text": "someshdata223",
            "label": "[]",
            "picture": "null",
            "collaborator": "[]",
            "is_archive": "false",
            "is_Trash": "false",
            "is_pinned": "false",
            "reminder": "null",
            "url": "null",
            "color": "null",
            "user": "7"
            }

    response = requests.post(url=url, data=data)

    assert response.status_code == 201, 'Note successfully created'


def test_NoteDetail():
    url = 'http://127.0.0.1:8000/notes/notes/'

    response = requests.get(url=url)

    assert response.status_code == 200, 'success'


def test_NoteUpdate():
    url = 'http://127.0.0.1:8000/notes/notes/2/'
    data = {
        "title": "null",
        "text": "this is my note",
        "label": "[]",
        "picture": "null",
        "collaborator": "[]",
        "is_archive": "false",
        "is_Trash": "false",
        "is_pinned": "false",
        "reminder": "null",
        "url": "null",
        "color": "null",
        "user": "2"
    }

    response = requests.put(url=url, data=data)

    assert response.status_code == 200, 'successfully note updated'


def test_NoteDelete():
    url = 'http://127.0.0.1:8000/notes/notes/3/'

    response = requests.delete(url=url)

    assert response.status_code == 200


def test_Collaborator():
    url = 'http://127.0.0.1:8000/notes/collaborators/3/'

    response = requests.get(url=url)

    assert response.status_code == 200


def test_Collab_create():
    url = 'http://127.0.0.1:8000/notes/collaborators/3/'
    data = {
        "email": "someshj5@gmail.com"
    }

    response = requests.post(url=url, data=data)

    assert response.status_code == 201, 'successfully collaborator added'
