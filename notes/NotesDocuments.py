
from django_elasticsearch_dsl.documents import DocType
from django_elasticsearch_dsl import Index

from notes.models import Notes


posts = Index('posts')


@posts.doc_type
class NotesDocument(DocType):

    class Django:
        model = Notes
        fields = [
            "id",
            "title",
            "text",
            "reminder"
        ]



