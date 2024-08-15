from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView, ListAPIView
from rest_framework.response import Response
from .models import List, ListItems
from .serializers import ListSerializer, ListItemsSerializer, UserSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from django.contrib.auth.decorators import login_required
from rest_framework_simplejwt.tokens import RefreshToken
# import jwt
#################### login Authentication API ######################




class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            # Get the refresh token from the request body
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            # Blacklist the token
            token.blacklist()

            return Response(status=205)  
        except Exception as e:
            return Response(status=400)  

class RegisterView(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class UserProfileView(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


#################### List CRUD API ######################

class CreateListAPIView(CreateAPIView):
    serializer_class = ListSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class RetrieveListAPIView(ListAPIView):
    serializer_class = ListSerializer
    
    def get_queryset(self):
        return List.objects.filter(user=self.request.user)

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class UpdateListAPIView(UpdateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    lookup_field = 'pk'

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class DeleteListAPIView(DestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    lookup_field = 'pk'

######################## Item CRUD API #############################

class CreateItemAPIView(CreateAPIView):
    serializer_class = ListItemsSerializer
    def perform_create(self, serializer):
        serializer.save()

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class RetrieveUserItemAPIView(RetrieveAPIView):  
    serializer_class = ListItemsSerializer

    def get_queryset(self):
        return ListItems.objects.filter(list__user=self.request.user)

# - - - - - - - - - - - - - - - - - - - - - - - - -

class RetrieveListItemAPIView(ListAPIView):
    serializer_class = ListItemsSerializer
    def get_queryset(self):
        list_pk=self.kwargs["pk"]
        return ListItems.objects.filter(list_id=list_pk)

# - - - - - - - - - - - - - - - - - - - - - - - - -

class UpdateItemAPIView(UpdateAPIView):
    queryset = ListItems.objects.all()
    serializer_class = ListItemsSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        serializer.save()

# - - - - - - - - - - - - - - - - - - - - - - - - -

class DeleteItemAPIView(DestroyAPIView):
    queryset = ListItems.objects.all()
    serializer_class = ListItemsSerializer
    lookup_field = 'pk'

    def perform_destroy(self, instance):
        super().perform_destroy(instance)

###################### Page Views ##########################

def home(request):
    return render(request, "BaseApp/home.html", {})
# - - - - - - - - - - - - - - - - - - - - - - - - -

def loginView(request):
    return render(request, "BaseApp/login.html", {})

# - - - - - - - - - - - - - - - - - - - - - - - - -

def registerView(request):
    return render(request, "BaseApp/register.html", {})

# - - - - - - - - - - - - - - - - - - - - - - - - -

def addItemView(request, pk):
    return render(request, "BaseApp/add-item.html", {})

# - - - - - - - - - - - - - - - - - - - - - - - - -

def addListView(request):
    return render(request, "BaseApp/add-list.html", {})

# - - - - - - - - - - - - - - - - - - - - - - - - -

def ListView(request, pk):
    return render(request, "BaseApp/lists.html",{})

