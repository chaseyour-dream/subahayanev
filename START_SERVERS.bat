@echo off
echo Starting Shubhayaan EV Website...
echo.

echo Starting Backend Server...
start cmd /k "cd backend && venv\Scripts\activate && python manage.py runserver"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3001
echo Admin Panel: http://localhost:8000/admin
echo.
echo Login credentials:
echo Username: admin
echo Password: admin123
echo.
pause
