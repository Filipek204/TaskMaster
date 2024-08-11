from django.shortcuts import render, redirect
from rest_framework.generics import GenericAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, CreateAPIView, ListAPIView
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from .models import List, ListItems
from .forms import ListForm, ListItemsForm
from .serializers import ListSerializer, ListItemsSerializer, UserSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.authtoken.models import Token
import random
from rest_framework import status, permissions
from django.contrib import auth
# import jwt
#################### login Authentication API ######################


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

###################### Home page ##########################


def home(request):
    list = List.objects.all()
    random_list = random.choice(list)
    random_list_items = ListItems.objects.filter(list=random_list)[:5]
    items = ListItems.objects.order_by("due_date")[:5]
    context = {
        'lists': list,
        'items': items,
        'random': random_list_items,
        'random_list': random_list,
    }
    return render(request, "BaseApp/home.html", context)


def loginView(request):
    return render(request, "BaseApp/login.html", {})


def registerView(request):
    return render(request, "BaseApp/register.html", {})

####################################################### List CRUD ###############################################################


def ListView(request, pk):
    return render(request, "BaseApp/lists.html",{})


def addList(request):
    form = ListForm()
    list = List()
    lists = List.objects.all()
    if request.method == "POST":
        form = ListForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    context = {
        "forms": form,
        "lists": lists,
        "list": list
    }
    return render(request, "BaseApp/list-form.html", context)


def updateList(request, pk):
    list = List.objects.get(id=pk)
    form = ListForm(instance=list)

    if request.method == "POST":
        form = ListForm(request.POST, instance=list)
        if form.is_valid():
            form.save()
            return redirect('home')
    context = {
        "form": form,
        "lists": list
    }
    return render(request, "BaseApp/list-form.html", context)


def deleteList(request, pk):
    list = List.objects.get(id=pk)
    items = ListItems.objects.filter(list=list)
    if request.method == "POST":
        list.delete()
        items.delete()
        return redirect('home')
    context = {
        "lists": list
    }
    return render(request, "BaseApp/delete-list.html", context)

####################################################### Item CRUD ###############################################################


def addItem(request, pk):
    form = ListItemsForm()
    list = List.objects.all()
    items = ListItems.objects.filter(list=List.objects.get(id=pk))
    if request.method == "POST":
        form = ListItemsForm(request.POST)
        if form.is_valid():
            form.instance.list = List.objects.get(id=pk)
            form.save()
    context = {
        "form": form,
        "items": items,
        "lists": list,
    }
    return render(request, "BaseApp/items.html", context)


def updateItem(request, pk):
    item = ListItems.objects.get(id=pk)
    form = ListItemsForm(instance=item)

    if request.method == "POST":
        form = ListItemsForm(request.POST, instance=item)
        if form.is_valid():
            form.save()
            return redirect('home')
    context = {
        "form": form,
        "items": item
    }
    return render(request, "BaseApp/items.html", context)


def deleteItem(request, pk):
    item = ListItems.objects.get(id=pk)
    if request.method == "POST":
        item.delete()
        return redirect('home')
    context = {
        "items": item
    }
    return render(request, "BaseApp/delete-item.html", context)
