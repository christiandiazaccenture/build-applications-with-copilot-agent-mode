import os
import django
from django.test import Client

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'octofit_tracker.settings')
django.setup()

client = Client()

codespace_name = os.environ.get('CODESPACE_NAME')
if codespace_name:
    base = f"http://{codespace_name}-8000.app.github.dev"
else:
    base = "http://localhost:8000"

endpoints = [
    '/api/',
    '/api/activities/',
    '/api/users/',
    '/api/teams/',
    '/api/workouts/',
    '/api/leaderboard/',
]

for ep in endpoints:
    resp = client.get(ep)
    print(f"GET {base}{ep} -> status {resp.status_code}")
    try:
        print(resp.json())
    except Exception:
        print(resp.content[:500])
