@echo off
REM ─────────────────────────────────────────────────────────────────────────────
REM  dev-start.bat  —  Start DB tunnel + local backend in one click
REM
REM  USAGE: Double-click or run from project root:  .\scripts\dev-start.bat
REM
REM  What it does:
REM    1. Opens ssh-tunnel-loop.bat in a new window (auto-reconnects on drop)
REM    2. Waits for tunnel to be ready
REM    3. Starts the worker backend (logs appear in this window)
REM
REM  The tunnel and backend are separate windows so you can restart the backend
REM  without losing the tunnel.
REM ─────────────────────────────────────────────────────────────────────────────

set ROOT_DIR=%~dp0..
set WORKER_DIR=%ROOT_DIR%\worker
set SCRIPTS_DIR=%ROOT_DIR%\scripts
set LOCAL_PORT=5433

echo.
echo ==========================================
echo  CtrlChecks Local Dev
echo ==========================================
echo.

REM ─── Verify .env DATABASE_URL points to tunnel (localhost:5433) ──────────────
for /f "delims=" %%L in ('powershell -NoProfile -Command ^
  "(Get-Content '%WORKER_DIR%\.env' | Select-String '^DATABASE_URL=').ToString().Substring(12).Trim()"') do set DB_URL=%%L

echo [INFO] DATABASE_URL = %DB_URL%
echo %DB_URL% | find "localhost" > nul
if errorlevel 1 (
  echo.
  echo [WARN] DATABASE_URL does not point to localhost. Tunnel may not be used.
  echo        Expected: postgresql://...@localhost:%LOCAL_PORT%/ctrlchecks
)
echo.

REM ─── Start tunnel in its own persistent window ───────────────────────────────
echo [1/2] Opening DB tunnel window...
start "DB Tunnel - keep open" cmd /c "%SCRIPTS_DIR%\ssh-tunnel-loop.bat"

echo [1/2] Waiting 8s for tunnel to connect...
timeout /t 8 /nobreak > nul

powershell -NoProfile -Command ^
  "$r=Test-NetConnection -ComputerName localhost -Port %LOCAL_PORT% -WarningAction SilentlyContinue; if($r.TcpTestSucceeded){Write-Host '[1/2] Tunnel OK  localhost:%LOCAL_PORT% is open'}else{Write-Host '[1/2] WARNING: tunnel not ready yet. Backend will retry via health probe.'}"

echo.

REM ─── Start backend ───────────────────────────────────────────────────────────
echo [2/2] Starting worker backend (Ctrl+C to stop)...
echo.
cd /d "%WORKER_DIR%"
npm run dev
