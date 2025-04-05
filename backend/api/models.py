from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model): #link data with a user
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes") #ForeignKey is a reference in the DB
    
    def __str__(self):
        return self.title
