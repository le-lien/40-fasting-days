@echo off
setlocal
cd /d "%~dp0"
echo Updating website content from day01.txt through day40.txt...
node update-content-data.js
if errorlevel 1 (
  echo.
  echo Update failed. Please make sure Node.js is installed.
) else (
  echo.
  echo Done. You can refresh index.html in your browser now.
)
echo.
pause
