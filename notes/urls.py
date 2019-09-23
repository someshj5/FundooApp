"""
urls for notes
"""
from django.urls import path
from django.conf.urls import url
from .service import Swagger_view
from notes import views as v1
from labels import views as v2


app_name = 'notes'

urlpatterns = [
    url(r'^swag/$', Swagger_view.schema_view),
    path('notes/', v1.NotesCreate.as_view(), name='notes'),
    path('notes/<int:pk>/', v1.NotesApi.as_view(), name='note_detail'),

    path('upload/', v1.upload, name='upload'),
    path('search/', v1.search, name='search'),
    path('collaborators/<int:pk>/', v1.collaborator_view, name='collaborators'),

    path('trash/', v1.Trash.as_view(), name='trash'),
    path('archive/', v1.Archived.as_view(), name='archive'),
    path('reminder/', v1.Reminder.as_view(), name='reminder'),
    path('note_reminder/<int:pk>/', v1.note_reminder, name='note_reminder'),

    path('label/<int:pk>/', v2.LabelApi.as_view(), name='label_detail'),
    path('labelnote/<int:pk>/', v2.labelNote, name='label_note'),

    path('label/', v2.LabelCreate.as_view(), name='label'),

]
