@echo off
setlocal
cd /d "%~dp0"
chcp 65001 >nul

echo [1/3] npm install
call npm install
if errorlevel 1 goto :error

echo [2/3] npm run build
call npm run build
if errorlevel 1 goto :error

echo [3/3] npm run preview
start "SHADI SHAHEEN Portfolio Server" cmd /c "npm run preview"
timeout /t 3 /nobreak >nul
start "" "http://localhost:4173/"
exit /b 0

:error
echo.
echo Something went wrong. Please check the error above.
pause
exit /b 1
