from django.urls import path, include
from .views import addList, addItem, home, updateList, updateItem, deleteList, deleteItem, ListView, list_create_view, items_create_view, list_retrieve_view, items_retrieve_view, list_update_view, list_delete_view, items_update_view, items_delete_view, LoginView, RegisterView, loginView

urlpatterns = [
    path('home/', home, name="home"),
    path('login/', loginView, name="login"),
    path('api/login/', LoginView.as_view(), name="api-login"),
    path('register/', RegisterView.as_view(), name="register"),

    path('add-list/', addList, name="add-list"),
    path('update-list/<str:pk>/', updateList, name="update-list"),
    path('list/<str:pk>/', ListView, name="list"),
    path('delete-list/<str:pk>/', deleteList, name="delete-list"),
    path('add-item/<str:pk>/', addItem, name="add-item"),
    path('update-item/<str:pk>/', updateItem, name="update-item"),
    path('delete-item/<str:pk>/', deleteItem, name="delete-item"),

    ################### API ###########################
    
    path('api/list/', list_create_view, name="api-list"),
    path('api/list/<str:pk>/', list_retrieve_view, name="api-list"),
    path('api/list/<str:pk>/update/', list_update_view, name="api-list"),
    path('api/list/<str:pk>/delete/', list_delete_view, name="api-list"),

    path('api/items/', items_create_view, name="api-list"),
    path('api/items/<str:pk>/', items_retrieve_view, name="api-list"),
    path('api/items/<str:pk>/update/', items_update_view, name="api-list"),
    path('api/items/<str:pk>/delete/', items_delete_view, name="api-list"),
]
