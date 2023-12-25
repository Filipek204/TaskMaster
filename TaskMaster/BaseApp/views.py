from django.shortcuts import render, redirect
from rest_framework import generics
from rest_framework.response import Response
from .models import List, ListItems
from .forms import ListForm, ListItemsForm
from .serializers import ListSerializer, ListItemsSerializer
import random

###################### List API ###########################

class ListCreateAPIView(generics.ListCreateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer

    def perform_create(self, serializer):
        serializer.save()


list_create_view = ListCreateAPIView.as_view()

# - - - - - - - - - - - - - - - - - - - - - - - - -


class ListRetrieveAPIView(generics.RetrieveAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    lookup_field = 'pk'


list_retrieve_view = ListRetrieveAPIView.as_view()

# - - - - - - - - - - - - - - - - - - - - - - - - -


class ListUpdateAPIView(generics.UpdateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        serializer.save()


list_update_view = ListUpdateAPIView.as_view()

# - - - - - - - - - - - - - - - - - - - - - - - - -


class ListDeleteAPIView(generics.DestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    lookup_field = 'pk'

    def perform_destroy(self, instance):
        super().perform_destroy(instance)


list_delete_view = ListDeleteAPIView.as_view()
######################## items API #############################


class ItemsCreateAPIView(generics.ListCreateAPIView):
    queryset = ListItems.objects.all()
    serializer_class = ListItemsSerializer

    def perform_create(self, serializer):
        serializer.save()


items_create_view = ItemsCreateAPIView.as_view()

# - - - - - - - - - - - - - - - - - - - - - - - - -


class ItemsRetrieveAPIView(generics.RetrieveAPIView):
    queryset = ListItems.objects.all()
    serializer_class = ListItemsSerializer
    lookup_field = 'pk'


items_retrieve_view = ItemsRetrieveAPIView.as_view()

# - - - - - - - - - - - - - - - - - - - - - - - - -


class ItemsUpdateAPIView(generics.UpdateAPIView):
    queryset = ListItems.objects.all()
    serializer_class = ListItemsSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        serializer.save()


items_update_view = ItemsUpdateAPIView.as_view()

# - - - - - - - - - - - - - - - - - - - - - - - - -


class ItemsDeleteAPIView(generics.DestroyAPIView):
    queryset = ListItems.objects.all()
    serializer_class = ListItemsSerializer
    lookup_field = 'pk'

    def perform_destroy(self, instance):
        super().perform_destroy(instance)


items_delete_view = ItemsDeleteAPIView.as_view()

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

####################################################### List CRUD ###############################################################


def ListView(request, pk):
    list = List.objects.get(id=pk)
    lists = List.objects.all()
    items = ListItems.objects.filter(list=List.objects.get(id=pk))
    context = {
        'list': list,
        'lists': lists,
        'items': items,
    }
    return render(request, "BaseApp/list-view.html", context)


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
