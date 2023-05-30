from django.shortcuts import render, redirect
from .models import List, ListItems
from .forms import ListForm, ListItemsForm
# # dodac wypisywanie list i update ich,
# # pokazywanie kazdej listy z osobna

def home(request):
    lists=List.objects.all()
    context={
        'lists':lists,
    }
    return render(request,"BaseApp/home.html", context)

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
    return render(request, "BaseApp/add-list.html", context)


def addItem(request, pk):
    form = ListItemsForm()
    items = ListItems.objects.filter(list=List.objects.get(id=pk))
    if request.method == "POST":
        form = ListItemsForm(request.POST)
        if form.is_valid():
            form.instance.list=List.objects.get(id=pk)
            form.save()
    context = {
        "form": form,
        "items": items
    }
    return render(request, "BaseApp/add-item.html", context)


# def listView(request):
#     # items = ToDoItems.objects.get(id=id)
#     # context = {
#     #     "items": items
#     # }
#     return render(request, "list.html")
