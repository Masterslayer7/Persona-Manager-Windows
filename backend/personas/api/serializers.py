from rest_framework.serializers import ModelSerializer
from ..models import persona, abilities

class PersonaSerializer(ModelSerializer):
    class Meta:
        model = persona
        fields = ('id', 'name', 'arcana', 'level', 'skills', 'resists')
        

class AbilitiesSerializer(ModelSerializer):
    class Meta:
        model = abilities
        fields = ['name', 'type', 'range']
        
        