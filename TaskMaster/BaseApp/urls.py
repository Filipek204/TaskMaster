from django.urls import path
from .views import addList, addItem, home
urlpatterns = [
    path('home/', home, name="home"),
    path('add-list/', addList, name="add-list"),
    path('add-item/<str:pk>', addItem, name="add-item"),
]
