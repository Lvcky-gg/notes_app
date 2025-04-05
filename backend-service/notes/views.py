from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Note
import datetime
import json
from django.middleware.csrf import get_token

#TODO: fix csrf issue and add error handling
def get_csrf_token(request):
    csrf_token = get_token(request)  
    return JsonResponse({'csrfToken': csrf_token})

@method_decorator(csrf_exempt, name='dispatch')
class NoteListView(View):
    def get(self, request):
        notes = Note.objects.all().values()
        return JsonResponse(list(notes), safe=False)

    def post(self, request):
        try:
            data = json.loads(request.body) 
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        user_id = data.get('user_id', 1) 
        title = data.get('title')
        content = data.get('content')

        if not all([user_id, title, content]):
            return JsonResponse({'error': 'Missing required parameters'}, status=400)

        note = Note.objects.create(user_id=user_id, title=title, content=content)
        return JsonResponse({'message': 'Note created', 'note': {'id': note.id, 'title': note.title, 'content': note.content}}, status=201)

@method_decorator(csrf_exempt, name='dispatch')
class NoteDetailView(View):
    def get(self, request, note_id):
        note = get_object_or_404(Note, id=note_id)
        return JsonResponse({'id': note.id, 'title': note.title, 'content': note.content})

    def put(self, request, note_id):
        try:
            data = json.loads(request.body) 
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        note = get_object_or_404(Note, id=note_id)
        note.title = data.get('title', note.title)
        note.content = data.get('content', note.content)
        note.updated_at = datetime.datetime.now()
        note.save()
        return JsonResponse({'message': 'Note updated', 'note': {'id': note.id, 'title': note.title, 'content': note.content}})

    def delete(self, request, note_id): 
        note = get_object_or_404(Note, id=note_id)
        note.delete()
        return JsonResponse({'message': 'Note deleted'}, status=200)

