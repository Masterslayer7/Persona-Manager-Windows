from rest_framework.viewsets import ViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from ..models import PersonaTeam, TeamMember
from .serializers  import PersonaTeamSerializer, TeamMemeberSerializer
from personas.models import persona, abilities
import pdb

class TeamMemberViewSet(ViewSet):
    # team id is 0 because we only have one team
    team_id = 0 
        
    def list(self, request):
        # gets the names of the personas that are in team_id = 0
        members = TeamMember.objects.filter(team_id=self.team_id).values_list('persona__name', flat=True)
        return Response(members)       

    @action(detail=False, methods=['post'])
    def add(self, request):
        
        # gets the name in the query 
        query = request.data.get('name','')
        
        print("Got Persona Name:", query)
        
        try: 
            #gets the persona object from persona model
            # You need to use .first because filter returns a queryset and not the persona object use .first to get the object
            persona_obj = persona.objects.filter(name__icontains=query).first()
            
            # the table has two foreign keys which are just integers but django allows you to give a object/model instance or a integer
            # as a parameter to the persona value 
            TeamMember.objects.create(team_id=self.team_id, persona=persona_obj)
            return Response(HTTP_200_OK)
        
        except persona.DoesNotExist:
            return Response({'error': 'Persona not found'}, status=HTTP_400_BAD_REQUEST)
        except PersonaTeam.DoesNotExist:
            return Response({'error': 'Team not found'}, status=HTTP_400_BAD_REQUEST)
        
        
    @action(detail=False, methods=['delete'])
    def delete(self, request):
        query = request.data.get('name', '')
        
        deleted_count, _ = TeamMember.objects.filter(team_id=self.team_id, persona__name=query).delete()
        
        if deleted_count == 0:
            return Response({'error': 'No matching team member found'}, status=404)
        
        return Response({'status':'Deleted'}, status=HTTP_200_OK)
    
    @action(detail=False, methods=['get'])   
    def getElementSpread(self, request):
        Elements = {
            "slash": 0,
            "strike": 0,
            "pierce": 0,
            "fire": 0,
            "ice": 0,
            "electric": 0,
            "wind": 0,
            "light": 0,
            "dark": 0,
            "almighty": 0,
            "support": 0,
            "special": 0,
            "recovery": 0,
            "passive": 0,
            "ailment": 0
        }
        for member in TeamMember.objects.filter(team_id=self.team_id).select_related('persona'):
            for ability_name in member.persona.skills:
                ability_obj = abilities.objects.filter(name__icontains=ability_name).first()
                if ability_obj:
                    Elements[ability_obj.type] += 1
                    
        total = sum(Elements.values())
        if total > 0:
            Elements_percent = {k: round((v / total) * 100, 2) for k, v in Elements.items()}
        else:
            Elements_percent = {k: 0 for k in Elements}
        
        
        result = [{"element": k, "value": v} for k, v in Elements_percent.items()]
        print(result)
        return Response(result, status=HTTP_200_OK)
            
        
        