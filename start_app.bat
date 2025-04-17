@echo off
echo Starting Persona Manager...

REM Activate virtual environment
call backend\venv\Scripts\activate.bat

REM Start Django backend in a new command window
start cmd /k python backend\manage.py runserver

REM Wait a few seconds for Django to start (optional)
timeout /t 3 > nul

REM Start Electron app
npm run electron

pause