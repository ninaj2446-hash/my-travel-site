@echo off
cd /d "%~dp0"
set "NODE_DIR=C:\Program Files\nodejs"
set "PATH=%NODE_DIR%;%PATH%"

echo.
echo Voyante dev server
echo ------------------
echo If port 3000 is busy, Next.js will use 3001, 3002, etc.
echo Always check the "Local:" line below for the real URL.
echo To free port 3000 first, run stop-dev.bat
echo If you see _document.js error, run: clean-cache.bat
echo.

call "%NODE_DIR%\npm.cmd" run dev
pause
