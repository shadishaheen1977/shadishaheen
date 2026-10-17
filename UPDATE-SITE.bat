@echo off
setlocal
cd /d "%~dp0"
chcp 65001 >nul
echo Updating site...
call node update-site.mjs
if errorlevel 1 goto :error
echo Done.
pause
exit /b 0
:error
echo Update failed.
pause
exit /b 1
