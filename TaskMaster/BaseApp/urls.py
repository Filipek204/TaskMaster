from django.urls import path
from .views import addList, addItem, home, updateList, updateItem, deleteList, deleteItem,ListView
urlpatterns = [
    path('home/', home, name="home"),
    path('add-list/', addList, name="add-list"),
    path('update-list/<str:pk>/', updateList, name="update-list"),
    path('list/<str:pk>/', ListView, name="list"),
    path('delete-list/<str:pk>/', deleteList, name="delete-list"),
    path('add-item/<str:pk>/', addItem, name="add-item"),
    path('update-item/<str:pk>/', updateItem, name="update-item"),
    path('delete-item/<str:pk>/', deleteItem, name="delete-item"),

]
