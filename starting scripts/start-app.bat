@echo off

:: Check for Node.js and npm
where node >nul 2>nul
if ERRORLEVEL 1 (
    echo Node.js not found. Please install Node.js and try again.
    pause
    exit /b 1
)

where npm >nul 2>nul
if ERRORLEVEL 1 (
    echo npm not found. Please install Node.js and try again.
    pause
    exit /b 1
)

:: Open the default browser
echo Opening the browser...
start http://localhost:3000

:: Start the server
echo Starting the server...
http-server -p 3000