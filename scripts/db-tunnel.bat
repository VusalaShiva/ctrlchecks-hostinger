@echo off
REM ─────────────────────────────────────────────────────────────────────────────
REM  db-tunnel.bat  —  SSH tunnel: localhost:5433 → EC2 → RDS:5432
REM
REM  WHY THIS EXISTS:
REM  The RDS instance lives inside the AWS VPC and can only be reached from the
REM  EC2 server. Your local IP changes every ~2 days (dynamic ISP), breaking any
REM  direct security-group rule. This tunnel routes DB traffic through the EC2,
REM  which always has VPC access — no security-group changes needed.
REM
REM  USAGE:
REM  1. Run this script ONCE before starting the worker locally.
REM  2. In worker\.env.local (or set DATABASE_URL env var), use:
REM       DATABASE_URL=postgresql://<user>:<pass>@localhost:5433/ctrlchecks
REM  3. Keep this window open while developing. Press Ctrl+C to stop.
REM ─────────────────────────────────────────────────────────────────────────────

set PEM_KEY=%~dp0..\Guide\Worker\ctrlchecks-backend.pem
set EC2_USER=ubuntu
set EC2_HOST=3.7.115.58
set RDS_HOST=ctrlchecks-db.cxm8gymyysvy.ap-south-1.rds.amazonaws.com
set RDS_PORT=5432
set LOCAL_PORT=5433

echo.
echo  DB Tunnel starting...
echo  Local port  : localhost:%LOCAL_PORT%
echo  Through EC2 : %EC2_USER%@%EC2_HOST%
echo  To RDS      : %RDS_HOST%:%RDS_PORT%
echo.
echo  Set DATABASE_URL in your local .env to:
echo  postgresql://^<user^>:^<pass^>@localhost:%LOCAL_PORT%/ctrlchecks
echo.
echo  Press Ctrl+C to stop the tunnel.
echo.

ssh -i "%PEM_KEY%" ^
    -N ^
    -o ServerAliveInterval=60 ^
    -o ServerAliveCountMax=10 ^
    -o ExitOnForwardFailure=yes ^
    -L %LOCAL_PORT%:%RDS_HOST%:%RDS_PORT% ^
    %EC2_USER%@%EC2_HOST%
