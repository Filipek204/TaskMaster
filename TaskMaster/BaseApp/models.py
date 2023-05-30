from django.db import models


class List(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title


class ListItems(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    done = models.BooleanField(default=False)
    due_date = models.DateTimeField(null=True, blank=True)
    list = models.ForeignKey(List, on_delete=models.CASCADE, )

    def __str__(self):
        return self.title
