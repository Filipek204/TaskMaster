from django.shortcuts import render, redirect
from .models import List, ListItems
from .forms import ListForm, ListItemsForm


def home(request):
    lists = List.objects.all()[:5]
    items = ListItems.objects.all()[:5]
    context = {
        'lists': lists,
        'items': items,
    }
    return render(request, "BaseApp/home.html", context)

####################################################### List CRUD ###############################################################


def addList(request):
    form = ListForm()
    if request.method == "POST":
        form = ListForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    context = {
        "form": form
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
        "list": list
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
        "list": list
    }
    return render(request, "BaseApp/delete-list.html", context)

####################################################### Item CRUD ###############################################################


def addItem(request, pk):
    form = ListItemsForm()
    items = ListItems.objects.filter(list=List.objects.get(id=pk))
    if request.method == "POST":
        form = ListItemsForm(request.POST)
        if form.is_valid():
            form.instance.list = List.objects.get(id=pk)
            form.save()
    context = {
        "form": form,
        "items": items
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
        "item": item
    }
    return render(request, "BaseApp/items.html", context)


def deleteItem(request, pk):
    item = ListItems.objects.get(id=pk)
    if request.method == "POST":
        item.delete()
        return redirect('home')
    context = {
        "item": item
    }
    return render(request, "BaseApp/delete-item.html", context)
