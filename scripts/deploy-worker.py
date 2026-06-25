#!/usr/bin/env python3
"""
deploy-worker.py — Python alternative to deploy-worker.sh for Windows (no sshpass needed).

Usage:
  DEPLOY_PASS="CtrlChecksHostinger@2026" python scripts/deploy-worker.py

Or on Windows PowerShell:
  $env:DEPLOY_PASS="CtrlChecksHostinger@2026"; python scripts/deploy-worker.py

Requires: pip install paramiko
"""
import sys, os, io, subprocess, tempfile, time, tarfile, pathlib

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

import paramiko

HOST = "187.127.185.105"
USER = "root"
PASS = os.environ.get("DEPLOY_PASS", "")
TARGET = "/opt/ctrlchecks-worker"

if not PASS:
    print("ERROR: DEPLOY_PASS env var not set.", file=sys.stderr)
    sys.exit(1)

REPO_ROOT = pathlib.Path(__file__).parent.parent
WORKER_DIR = REPO_ROOT / "worker"

# ── Build ───────────────────────────────────────────────────────────────────
print("▶ Type-checking worker...")
subprocess.run(["npm", "run", "type-check"], cwd=WORKER_DIR, check=True)
print("✅ Type-check passed")

print("▶ Linting worker...")
subprocess.run(["npm", "run", "lint"], cwd=WORKER_DIR, check=True)
print("✅ Lint passed")

print("▶ Building worker...")
env = {**os.environ, "NODE_OPTIONS": "--max-old-space-size=4096"}
subprocess.run(["npm", "run", "build"], cwd=WORKER_DIR, check=True, env=env)
print("✅ Build complete")

# ── Package ─────────────────────────────────────────────────────────────────
tmp = tempfile.NamedTemporaryFile(suffix=".tar.gz", delete=False)
tmp.close()
tar_path = tmp.name

print(f"▶ Packaging -> {tar_path}")
with tarfile.open(tar_path, "w:gz") as tar:
    for name in ["dist", "package.json", "package-lock.json", "prisma", "public"]:
        src = WORKER_DIR / name
        if src.exists():
            tar.add(str(src), arcname=name)

size_kb = pathlib.Path(tar_path).stat().st_size // 1024
print(f"✅ Package: {size_kb}KB")

# ── SSH connect ─────────────────────────────────────────────────────────────
print(f"▶ Connecting to {USER}@{HOST}...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# Hostinger SSH server requires disabling rsa-sha2-256/512 for password auth to work
ssh.connect(
    HOST,
    username=USER,
    password=PASS,
    timeout=15,
    look_for_keys=False,
    allow_agent=False,
    disabled_algorithms={"pubkeys": ["rsa-sha2-256", "rsa-sha2-512"]},
    banner_timeout=20,
)
print("✅ SSH connected")

def run(cmd, desc, timeout=180):
    print(f"  -> {desc}")
    _, out, err = ssh.exec_command(cmd, timeout=timeout)
    output = (out.read() + err.read()).decode("utf-8", errors="replace").strip()
    rc = out.channel.recv_exit_status()
    if output:
        for line in output.split("\n")[:20]:
            print(f"    {line}")
    if rc != 0:
        print(f"  FAILED (exit {rc}) — {desc}")
        sys.exit(1)
    return output

# ── Upload ──────────────────────────────────────────────────────────────────
remote_tar = "/tmp/worker-deploy.tar.gz"
print(f"▶ Uploading {size_kb}KB -> {HOST}:{remote_tar}")
sftp = ssh.open_sftp()
sftp.put(tar_path, remote_tar)
sftp.close()
os.unlink(tar_path)
print("✅ Upload complete")

# ── Extract + restart ───────────────────────────────────────────────────────
run(f"tar -xzf {remote_tar} -C {TARGET} && rm {remote_tar}", "extract + cleanup")
run(f"cd {TARGET} && npm ci --omit=dev 2>&1 | tail -3", "npm ci")
run(f"cd {TARGET} && npx prisma migrate deploy 2>&1 | tail -5 || true", "prisma migrate")
run("systemctl restart ctrlchecks-worker", "restart service")

print("  Waiting 8s for startup...")
time.sleep(8)

run("systemctl is-active ctrlchecks-worker", "service active?")
run("curl -fs http://localhost:3001/health/live", "/health/live")

ssh.close()
print()
print("✅ Worker deployed to Hostinger successfully!")
print("   https://worker.ctrlchecks.com/health/live")
