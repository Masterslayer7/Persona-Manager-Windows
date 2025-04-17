from personas.models import persona
from personas.api.serializers import PersonaSerializer
import json

fixture_data = []
filepath_P3R_personas = '/home/yugp/projects/personaManager/Data/demon-data.json'

with open(filepath_P3R_personas, 'r') as file:
    data = json.load(file)
            
for index, (persona_name, p) in enumerate(data.items(), start=1):
    SetPersona = persona(
        name=persona_name,
        arcana=p['race'],
        level=p['lvl'],
        skills=p['skills'],
        resists=p['resists']
    )
    
    serializer = PersonaSerializer(SetPersona)

    fixture_data.append({
        "model": "personas.persona",  # Django model reference
        "pk": index,  # Auto-increment ID
        "fields": serializer.data
    })

with open("personas.json", "w") as output_file:
    json.dump(fixture_data, output_file, indent=4)