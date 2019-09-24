import pytest
import requests

baseUrl = 'http://127.0.0.1:8000/notes/'


def test_LabelCreate():
    url = baseUrl+'label/'
    data = {
                "name": "some 123",
                "user": "2"
            }
    response = requests.post(url=url, data=data)

    assert response.status_code == 201, 'successfully note created'


def test_LabelDetail():
    url = baseUrl+'label/1/'

    response = requests.get(url=url)

    assert response.status_code == 200, 'success'
