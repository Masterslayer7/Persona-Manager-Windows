from rest_framework.routers import DefaultRouter
from personas.api.urls import persona_router
from personaTeams.api.urls import persona_teams_router
from django.urls import path, include

router = DefaultRouter()

# the reason you have this folder here is because this takes the api urls of
# all apps and combines them into the path of api/

# personas
router.registry.extend(persona_router.registry)
router.registry.extend(persona_teams_router.registry)

urlpatterns = [
    path('', include(router.urls))
]


# etc app
