from rest_framework.serializers import ModelSerializer
from ..models import PersonaTeam, TeamMember
from personas.api.serializers import PersonaSerializer


class TeamMemeberSerializer(ModelSerializer):
    persona = PersonaSerializer()
    
    class Meta:
        model = TeamMember
        fields = ['id', 'persona']

class PersonaTeamSerializer(ModelSerializer):
    
    members = TeamMemeberSerializer(many=True)
    class Meta:
        model = PersonaTeam
        fields = ('name')
        
        