import global_vars
import json

class persona:
    """Docstring for the class."""

    def __init__(self, p_name):
        """Constructor for the class."""
        with open(global_vars.filepath_P3R_personas, 'r') as file:
            data = json.load(file)
        
        p_json = data[p_name] #json data for specific persona
        self.p_name = p_name # sets name
        self.lvl = p_json['lvl'] # sets level
        self.arcana = p_json['race'] #sets arcana
        
        # Creating a Dictionary for resistance: {Attack_type: resistance_type}
        p_resistance = global_vars.RESISTANCE_DICT
        counter = 0
        for type in p_resistance:
            convert = {"d": "Drain", "n": "Nullify", "w": "weak", "s": "strong", "r": "repel", "-": None}
            p_resistance[type] = convert[p_json['resists'][counter:counter+1]] 
            counter += 1
        self.p_resistance = p_resistance
        self.p_resistance_string = p_json['resists']     
        
        
        self.p_skills = p_json['skills']
        self.p_stats = p_json['stats']
            

    def output(self):
        """Method of the class."""
        print(self.p_resistance)
        
    
    