from django.contrib import admin
from .models import TeamMember, PersonaTeam
# Register your models here.


admin.site.register(PersonaTeam)
admin.site.register(TeamMember)