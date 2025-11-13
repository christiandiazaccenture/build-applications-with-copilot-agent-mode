from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(username='testuser', email='test@example.com')
        self.assertEqual(user.username, 'testuser')

class TeamModelTest(TestCase):
    def test_create_team(self):
        user = User.objects.create(username='member1')
        team = Team.objects.create(name='Team A')
        team.members.add(user)
        self.assertEqual(team.name, 'Team A')

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        user = User.objects.create(username='activityuser')
        activity = Activity.objects.create(user=user, activity_type='run', duration=30, calories_burned=200, date='2025-01-01')
        self.assertEqual(activity.activity_type, 'run')

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        user = User.objects.create(username='workoutuser')
        workout = Workout.objects.create(name='Cardio', description='Cardio workout', suggested_for='weight loss', created_by=user)
        self.assertEqual(workout.name, 'Cardio')

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        user = User.objects.create(username='leaderuser')
        leaderboard = Leaderboard.objects.create(user=user, score=100, rank=1)
        self.assertEqual(leaderboard.rank, 1)
