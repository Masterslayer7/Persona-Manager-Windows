import json
import global_vars


# with open(global_vars.filepath_P3R_personas, 'r') as file:
#     data = json.load(file)
    
# print(data['Abaddon'])

p_resistance = {
        "slash": None,
        "strike": None,
        "pierce": None,
        "fire": None,
        "ice": None,
        "electric": None,
        "wind": None,
        "light": None,
        "dark": None,
        "almighty": None
    }
counter = 0
for type in p_resistance:
    convert = {"d": "Drain", "n": "Nullify", "w": "weak", "r": "resistant", "-": None}
    p_resistance[type] = convert[res[counter:counter+1]]
    counter += 1
    print(p_resistance[type])