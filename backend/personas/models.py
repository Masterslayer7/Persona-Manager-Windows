from django.db import models

# Create your models here.

class persona(models.Model):
    
    name = models.CharField(max_length=50)
    level = models.IntegerField()
    arcana = models.CharField(max_length=50)
    skills  = models.JSONField()
    resists = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name
    
class abilities(models.Model):
    
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    range = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name
    
