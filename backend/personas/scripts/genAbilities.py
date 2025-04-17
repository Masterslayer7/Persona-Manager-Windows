from personas.models import abilities
from personas.api.serializers import AbilitiesSerializer
import json

fixture_data = []
filepath_abilities = '/home/yugpatel/personaManager/Data/skill-data.json'
element_map = {
    "sla": "slash",
    "str": "strike",
    "pie": "pierce",
    "fir": "fire",
    "ice": "ice",
    "ele": "electric",
    "win": "wind",
    "lig": "light",
    "dar": "dark",
    "alm": "almighty",
    "sup": "support",
    "spe": "special",
    "rec": "recovery",
    "pas": "passive",
    "ail": "ailment"
}

with open(filepath_abilities, 'r') as file:
    data = json.load(file)

for index, (_, ability_data) in enumerate(data.items(), start=1):
    name, type_, range_ = ability_data["a"]
    
    type_ = element_map[type_]
    
    ability_instance = abilities(
        name=name,
        type=type_,
        range=range_,
    )

    serializer = AbilitiesSerializer(ability_instance)

    fixture_data.append({
        "model": "personas.abilities",
        "pk": index,
        "fields": serializer.data
    })

with open("abilities_fixture.json", "w") as output_file:
    json.dump(fixture_data, output_file, indent=4)
