import os
import sys
import time
import traceback
from django.core.management import call_command
import django

# Determine base directory (whether running frozen or not)
if getattr(sys, 'frozen', False):
    BASE_DIR = os.path.dirname(sys.executable)  # Running as .exe
else:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Make sure Python can import 'PersonaManager' as a module
sys.path.append(BASE_DIR)
sys.path.append(os.path.join(BASE_DIR, 'PersonaManager'))


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'PersonaManager.settings')  # your Django project
django.setup()

with open(os.path.join(BASE_DIR, "log.txt"), "w") as f:
    f.write("[DEBUG] Running backend_launcher from:\n")
    f.write(f"BASE_DIR: {BASE_DIR}\n\n")
    f.write("sys.path:\n" + "\n".join(sys.path) + "\n\n")

    # Log contents of the BASE_DIR and PersonaManager/api folders
    try:
        f.write("\nContents of BASE_DIR:\n")
        f.write("\n".join(os.listdir(BASE_DIR)))
        f.write("\n\nContents of PersonaManager:\n")
        f.write("\n".join(os.listdir(os.path.join(BASE_DIR, "PersonaManager"))))
        f.write("\n\nContents of PersonaManager/api:\n")
        f.write("\n".join(os.listdir(os.path.join(BASE_DIR, "PersonaManager", "api"))))
    except Exception as e:
        f.write(f"\n[ERROR] Could not list folders: {e}\n")

if __name__ == '__main__':
    try:
        print("[DEBUG] Starting Django backend with call_command...")
        
        call_command('runserver', '127.0.0.1:8000', use_reloader=False)

    except Exception as e:
        print("[ERROR] Backend failed to start:")
        traceback.print_exc()
        input("Press Enter to exit...")