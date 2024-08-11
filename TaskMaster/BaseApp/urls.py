from django.urls import path, include
from .views import addList, addItem, home, updateList, updateItem, deleteList, deleteItem, ListView, loginView, CustomTokenObtainPairView, RegisterView,  UserProfileView, RetrieveListAPIView, CreateListAPIView, DeleteListAPIView, UpdateListAPIView, CreateItemAPIView, RetrieveUserItemAPIView, RetrieveListItemAPIView, UpdateItemAPIView, DeleteItemAPIView
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
    path('lists/<str:pk>/', ListView, name="lists"),
    path('delete-list/<str:pk>/', deleteList, name="delete-list"),
    path('add-item/<str:pk>/', addItem, name="add-item"),
    path('update-item/<str:pk>/', updateItem, name="update-item"),
    path('delete-item/<str:pk>/', deleteItem, name="delete-item"),

    ################### API CRUD ###########################
    path('api/list/create/', CreateListAPIView.as_view(), name="create-list-api"),
    path('api/list/', RetrieveListAPIView.as_view(), name="retrieve-list-api"),
    path('api/list/<str:pk>/update/', UpdateListAPIView.as_view(), name="update-list-api"),
    path('api/list/<str:pk>/delete/', DeleteListAPIView.as_view(), name="delete-list-api"),

    path('api/items/create/', CreateItemAPIView.as_view(), name="create-item-api"),
    path('api/items/<str:pk>/', RetrieveListItemAPIView.as_view(), name="retrieve-list-item-api"),
    path('api/items/', RetrieveUserItemAPIView.as_view(), name="retrieve-user-item-api"),
    path('api/items/<str:pk>/update/',UpdateItemAPIView.as_view(), name="update-item"),
    path('api/items/<str:pk>/delete/',DeleteItemAPIView.as_view(), name="delete-item"),
]
