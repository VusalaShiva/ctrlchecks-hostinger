@echo off
REM ─────────────────────────────────────────────────────────────────────────────
REM  install-tunnel-autostart.bat
REM  Adds the DB tunnel to Windows startup so it launches automatically on login.
REM  Run this once. After that, just use "npm run dev" directly.
REM ─────────────────────────────────────────────────────────────────────────────

set STARTUP_DIR=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup
set TUNNEL_SCRIPT=%~dp0ssh-tunnel-loop.bat
set SHORTCUT=%STARTUP_DIR%\CtrlChecks-DB-Tunnel.bat

echo Copying tunnel script to Windows Startup folder...
copy /Y "%TUNNEL_SCRIPT%" "%SHORTCUT%"

if errorlevel 1 (
  echo ERROR: Could not install. Try running as Administrator.
  pause
  exit /b 1
)

echo.
echo  Done! The DB tunnel will now start automatically on Windows login.
echo  Location: %SHORTCUT%
echo.
echo  To uninstall: delete %SHORTCUT%
echo.
pause
