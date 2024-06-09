from django.db import models
from django.contrib.auth.models import User


class List(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # def __str__(self):
    #     return self.title


class ListItems(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    done = models.BooleanField(default=False)
    due_date = models.DateTimeField(null=False, blank=False)
    list = models.ForeignKey(List, on_delete=models.CASCADE, )

    # def __str__(self):
    #     return self.title
