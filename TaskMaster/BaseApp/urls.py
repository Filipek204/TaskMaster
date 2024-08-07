from django.urls import path, include
from .views import addList, addItem, home, updateList, updateItem, deleteList, deleteItem, ListView, list_create_view, items_create_view, list_retrieve_view, items_retrieve_view, list_update_view, list_delete_view, items_update_view, CustomTokenObtainPairView,  items_delete_view, RegisterView, loginView, UserProfileView
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('home/', home, name="home"),
    path('login/', loginView, name="login"),
    path('api/profile/', UserProfileView.as_view(), name="get-profile"),
    path('register/', RegisterView.as_view(), name="register"),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

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
