"""
    :author: Somesh Jaiswal
    :since: May 2019
    :overview:
"""


import pytest
import requests

baseUrl = ' http://127.0.0.1:8000/notes/'
notedata = {
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


def test_NoteCreate():
    url = baseUrl+'notes/'
    data = notedata

    response = requests.post(url=url, data=data)

    assert response.status_code == 201, 'Note successfully created'


def test_NoteDetail():
    url = baseUrl+'notes/'

    response = requests.get(url=url)

    assert response.status_code == 200, 'success'


def test_NoteUpdate():
    url = baseUrl+'notes/2/'
    data = notedata

    response = requests.put(url=url, data=data)

    assert response.status_code == 200, 'successfully note updated'


def test_NoteDelete():
    url = baseUrl+'notes/3/'

    response = requests.delete(url=url)

    assert response.status_code == 200


def test_Collaborator():
    url = baseUrl+'collaborators/3/'

    response = requests.get(url=url)

    assert response.status_code == 200


def test_Collab_create():
    url = baseUrl+'collaborators/3/'
    data = {
        "email": "someshj5@gmail.com"
    }

    response = requests.post(url=url, data=data)

    assert response.status_code == 201, 'successfully collaborator added'
