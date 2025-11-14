from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import models
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Clear existing data
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Teams
        marvel_team = {'_id': 'marvel', 'name': 'Team Marvel'}
        dc_team = {'_id': 'dc', 'name': 'Team DC'}
        db.teams.insert_many([marvel_team, dc_team])

        # Users (super heroes)
        users = [
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team': 'marvel'},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': 'marvel'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': 'dc'},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': 'dc'},
        ]
        db.users.insert_many(users)

        # Activities
        activities = [
            {'user_email': 'spiderman@marvel.com', 'activity': 'Running', 'duration': 30},
            {'user_email': 'ironman@marvel.com', 'activity': 'Cycling', 'duration': 45},
            {'user_email': 'wonderwoman@dc.com', 'activity': 'Swimming', 'duration': 60},
            {'user_email': 'batman@dc.com', 'activity': 'Yoga', 'duration': 40},
        ]
        db.activities.insert_many(activities)

        # Workouts
        workouts = [
            {'name': 'Cardio Blast', 'suggested_for': 'marvel'},
            {'name': 'Strength Builder', 'suggested_for': 'dc'},
        ]
        db.workouts.insert_many(workouts)

        # Leaderboard
        leaderboard = [
            {'user_email': 'spiderman@marvel.com', 'points': 100},
            {'user_email': 'ironman@marvel.com', 'points': 90},
            {'user_email': 'wonderwoman@dc.com', 'points': 110},
            {'user_email': 'batman@dc.com', 'points': 95},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Ensure unique index on email for users
        db.users.create_index('email', unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
