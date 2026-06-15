@echo off
REM ─────────────────────────────────────────────────────────────────────────────
REM  ssh-tunnel-loop.bat  —  Auto-reconnecting SSH tunnel for local DB access
REM
REM  Routes: localhost:5433 → EC2:22 → RDS:5432
REM  Reconnects immediately after any disconnect (ISP drop, sleep, etc.)
REM
REM  Run this once (minimised), then npm run dev works from any terminal.
REM ─────────────────────────────────────────────────────────────────────────────

set PEM_KEY=%~dp0..\Guide\Worker\ctrlchecks-backend.pem
set EC2_HOST=ubuntu@3.7.115.58
set RDS_HOST=ctrlchecks-db.cxm8gymyysvy.ap-south-1.rds.amazonaws.com
set LOCAL_PORT=5433

title DB Tunnel — localhost:%LOCAL_PORT% ^> RDS (keep open)
echo.
echo  ============================================
echo   CtrlChecks DB Tunnel
echo   localhost:%LOCAL_PORT% ---[SSH]---> RDS:5432
echo   DO NOT CLOSE THIS WINDOW
echo  ============================================
echo.

:loop
echo [%TIME%] Connecting SSH tunnel...
ssh -i "%PEM_KEY%" -N ^
    -o StrictHostKeyChecking=no ^
    -o ServerAliveInterval=10 ^
    -o ServerAliveCountMax=6 ^
    -o ExitOnForwardFailure=no ^
    -o TCPKeepAlive=yes ^
    -L %LOCAL_PORT%:%RDS_HOST%:5432 ^
    %EC2_HOST%
echo [%TIME%] Tunnel exited (code %ERRORLEVEL%). Reconnecting in 3s...
timeout /t 3 /nobreak > nul
goto loop
