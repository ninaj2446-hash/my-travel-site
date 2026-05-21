@echo off
cd /d "%~dp0"
echo Removing .next and cache...
if exist .next rmdir /s /q .next
if exist node_modules\.cache rmdir /s /q node_modules\.cache
echo Done. Run start-dev.bat again.
pause
