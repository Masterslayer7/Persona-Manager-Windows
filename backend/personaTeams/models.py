from django.db import models
from personas.models import persona
# Create your models here.

class PersonaTeam(models.Model):
    name = models.CharField(max_length=100)
    
class TeamMember(models.Model):
    team = models.ForeignKey(PersonaTeam, on_delete=models.CASCADE)
    persona = models.ForeignKey(persona, on_delete=models.CASCADE)