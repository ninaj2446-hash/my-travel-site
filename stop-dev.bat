@echo off
echo Stopping dev servers on ports 3000 and 3001...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
  taskkill /PID %%a /F >nul 2>&1
  echo Stopped process %%a on port 3000
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3001" ^| findstr "LISTENING"') do (
  taskkill /PID %%a /F >nul 2>&1
  echo Stopped process %%a on port 3001
)
echo Done. You can run start-dev.bat again.
pause
