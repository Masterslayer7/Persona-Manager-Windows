from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TeamMemberViewSet

persona_teams_router = DefaultRouter()
persona_teams_router.register(r'team-members', TeamMemberViewSet, basename='team-member')