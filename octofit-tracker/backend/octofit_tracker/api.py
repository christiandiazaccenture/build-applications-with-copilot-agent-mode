from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from pymongo import MongoClient

class UsersAPI(APIView):
    def get(self, request):
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        users = list(db.users.find({}, {'_id': 0}))
        return Response(users)

class TeamsAPI(APIView):
    def get(self, request):
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        teams = list(db.teams.find({}, {'_id': 0}))
        return Response(teams)

class ActivitiesAPI(APIView):
    def get(self, request):
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        activities = list(db.activities.find({}, {'_id': 0}))
        return Response(activities)

class WorkoutsAPI(APIView):
    def get(self, request):
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        workouts = list(db.workouts.find({}, {'_id': 0}))
        return Response(workouts)

class LeaderboardAPI(APIView):
    def get(self, request):
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        leaderboard = list(db.leaderboard.find({}, {'_id': 0}))
        return Response(leaderboard)
