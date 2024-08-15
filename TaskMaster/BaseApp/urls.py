from django.urls import path, include
from .views import home, ListView, loginView, addItemView, addListView, CustomTokenObtainPairView, RegisterView, LogoutView,  UserProfileView, RetrieveListAPIView, CreateListAPIView, DeleteListAPIView, UpdateListAPIView, CreateItemAPIView, RetrieveUserItemAPIView, RetrieveListItemAPIView, UpdateItemAPIView, DeleteItemAPIView
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('home/', home, name="home"),
    path('login/', loginView, name="login"),
    path('api/profile/', UserProfileView.as_view(), name="get-profile"),
    path('register/', RegisterView.as_view(), name="register"),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('list/<str:pk>/', ListView, name="list"),
    path('add-item/<str:pk>/', addItemView, name="add-item"),
    path('add-list/', addListView, name="add-list"),

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
