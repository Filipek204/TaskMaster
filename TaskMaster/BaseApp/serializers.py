from rest_framework import serializers
from .models import List, ListItems
from django.contrib.auth.models import User

class ListSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=50)
    description = serializers.CharField()

    class Meta:
        model = List
        fields = "__all__"


class ListItemsSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=50)
    description = serializers.CharField()
    done = serializers.BooleanField(default=False)
    due_date = serializers.DateTimeField()

    class Meta:
        model = ListItems
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']