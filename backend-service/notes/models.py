from django.db import models
from django.utils.timezone import now

class Note(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(default=now, editable=False)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    user_id = models.IntegerField()

    def __str__(self):
        return self.title

    def to_dict(self):
        return {
            'id': self.id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'title': self.title,
            'content': self.content,
            'user_id': self.user_id,
        }
