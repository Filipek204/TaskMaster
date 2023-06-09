from django import forms
from .models import List, ListItems


class ListForm(forms.ModelForm):
    class Meta:
        model = List
        fields = ["title", "description"]


class ListItemsForm(forms.ModelForm):
    class Meta:
        model = ListItems
        fields = ["title", "description", "done", "due_date"]

        widgets = {
            'due_date': forms.TextInput(attrs={'type': 'datetime-local'}),
        }
