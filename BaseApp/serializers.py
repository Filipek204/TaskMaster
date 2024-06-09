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
    password = serializers.CharField(
        max_length=65, min_length=8, write_only=True)
    email = serializers.EmailField(max_length=65, min_length=4)
    first_name = serializers.CharField(
        max_length=255, min_length=2)
    first_name = serializers.CharField(
        max_length=255, min_length=2)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']

    def validate(self, attrs):
        email = attrs.get('email', '')
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({
                {'email', ('email is already in use!')}})
        return super().validate(attrs)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
