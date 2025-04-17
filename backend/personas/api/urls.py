from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PersonaViewSet

persona_router = DefaultRouter()
persona_router.register(r'personas', PersonaViewSet, basename='persona')