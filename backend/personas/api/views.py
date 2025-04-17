from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.status import HTTP_200_OK
from ..models import persona
from .serializers  import PersonaSerializer


class PersonaViewSet(ReadOnlyModelViewSet):
    queryset = persona.objects.all()
    serializer_class = PersonaSerializer
    
    @api_view(['GET'])
    def autocomplete_personas(self, request):
        personas_names = persona.objects.values_list('name',flat=True)
        return Response(personas_names)
    
    @action(detail=False, methods=['get'])
    def search_persona(self, request):
        #first get the search query from the request
        query = request.GET.get('name','')
        filtered_persona = persona.objects.filter(name__icontains=query)
        serializer = PersonaSerializer(filtered_persona, many=True)
        return Response(serializer.data, HTTP_200_OK)

