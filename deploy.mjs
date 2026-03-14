#!/usr/bin/env node
// ── deploy.mjs — SkyMaxx USA Production Deployment Pipeline ──
// Usage:
//   node deploy.mjs              Build + ship + deploy to production
//   node deploy.mjs --status     Show what's running on the server vs local
//   node deploy.mjs --build-only Build the image locally without deploying
//   node deploy.mjs --logs       Tail the last 50 lines of server logs
//   node deploy.mjs --restart    Restart the container without rebuilding
//   node deploy.mjs --rollback   Restore the previous image on the server
//   node deploy.mjs --shell      Open an SSH session to the server

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

// ── Server Config ──
const SERVER = {
  host: 'jmartin@104.243.45.247',
  port: 4000,
  remotePath: '~/skymaxxusa',
  container: 'skymaxxusa',
  imageName: 'localhost/skymaxxusa:latest',
  tmpImage: '/tmp/skymaxxusa-image.tar.gz',
  healthUrl: 'https://skymaxx.southernsky.cloud',
};

// ── Helpers ──
function run(cmd, opts = {}) {
  const { silent = false, allowFail = false, timeout = 120_000 } = opts;
  try {
    const result = execSync(cmd, {
      cwd: ROOT,
      timeout,
      stdio: silent ? 'pipe' : 'inherit',
      encoding: 'utf-8',
    });
    return (result || '').trim();
  } catch (e) {
    if (allowFail) return '';
    throw e;
  }
}

function ssh(cmd, opts = {}) {
  const escaped = cmd.replace(/'/g, "'\\''");
  return run(`ssh ${SERVER.host} "sg docker -c '${escaped}'"`, opts);
}

function getLocalCommit() {
  return run('git rev-parse --short HEAD', { silent: true });
}

function getServerVersion() {
  try {
    const json = ssh(`cat ${SERVER.remotePath}/deployed-version.json`, { silent: true });
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function writeDeployedVersion(commit) {
  const payload = JSON.stringify({
    commit,
    deployedAt: new Date().toISOString(),
    deployedFrom: 'Zeus',
  }, null, 2);
  ssh(`cat > ${SERVER.remotePath}/deployed-version.json << 'VEOF'
${payload}
VEOF`);
  const logPath = resolve(ROOT, 'deploy.log');
  const line = `[${new Date().toISOString()}] Deployed (${commit}) to ${SERVER.host}\n`;
  const existing = existsSync(logPath) ? readFileSync(logPath, 'utf-8') : '';
  writeFileSync(logPath, existing + line);
}

// ── Commands ──
const arg = process.argv[2];

// ── --status ──
if (arg === '--status') {
  console.log('\n══════════════════════════════════════════════');
  console.log('  SkyMaxx USA Deployment Status');
  console.log('══════════════════════════════════════════════\n');

  const localCommit = getLocalCommit();
  console.log(`  Local:  ${localCommit}`);

  const serverInfo = getServerVersion();
  if (serverInfo) {
    console.log(`  Server: ${serverInfo.commit}`);
    console.log(`  Deployed: ${serverInfo.deployedAt}`);
    if (localCommit !== serverInfo.commit) {
      console.log('\n  ⚠️  Server is behind local — run `node deploy.mjs` to update');
    } else {
      console.log('\n  ✅ Server matches local');
    }
  } else {
    console.log('  Server: (no version tracking — deploy once to initialize)');
  }

  try {
    const status = ssh(`docker inspect --format='{{.State.Status}}' ${SERVER.container}`, { silent: true });
    const uptime = ssh(`docker inspect --format='{{.State.StartedAt}}' ${SERVER.container}`, { silent: true });
    console.log(`\n  Container: ${status}`);
    console.log(`  Started: ${uptime}`);
  } catch {
    console.log('\n  Container: not running ❌');
  }

  try {
    const code = run(`curl -s -o /dev/null -w "%{http_code}" --max-time 5 ${SERVER.healthUrl}`, { silent: true });
    console.log(`  HTTPS: ${code === '200' ? '200 ✅' : code + ' ⚠️'}`);
  } catch {
    console.log('  HTTPS: unreachable ❌');
  }

  console.log('\n══════════════════════════════════════════════\n');
  process.exit(0);
}

// ── --logs ──
if (arg === '--logs') {
  console.log('\n📋 Server logs (last 50 lines):\n');
  ssh(`docker logs ${SERVER.container} --tail 50`);
  process.exit(0);
}

// ── --restart ──
if (arg === '--restart') {
  console.log('\n🔄 Restarting container...\n');
  ssh(`cd ${SERVER.remotePath} && docker compose restart`);
  console.log('✅ Restarted.\n');
  run('sleep 3');
  ssh(`docker logs ${SERVER.container} --tail 10`);
  process.exit(0);
}

// ── --shell ──
if (arg === '--shell') {
  execSync(`ssh ${SERVER.host}`, { stdio: 'inherit' });
  process.exit(0);
}

// ── --rollback ──
if (arg === '--rollback') {
  console.log('\n══════════════════════════════════════════════');
  console.log('  SkyMaxx USA Rollback');
  console.log('══════════════════════════════════════════════\n');

  try {
    const hasPrev = ssh(`test -f ~/skymaxxusa-image-prev.tar.gz && echo yes || echo no`, { silent: true });
    if (hasPrev !== 'yes') {
      console.log('  ❌ No previous image found. Cannot rollback.\n');
      process.exit(1);
    }
    console.log('  📦 Loading previous image...');
    ssh(`docker load < ~/skymaxxusa-image-prev.tar.gz`);
    console.log('  🔄 Restarting with previous image...');
    ssh(`cd ${SERVER.remotePath} && docker compose down && docker compose up -d`);
    run('sleep 3');
    const code = run(`curl -s -o /dev/null -w "%{http_code}" --max-time 5 ${SERVER.healthUrl}`, { silent: true });
    console.log(`  HTTPS: ${code === '200' ? '200 ✅' : code + ' ⚠️'}`);
    console.log('\n  ✅ Rolled back to previous deployment.\n');
  } catch (e) {
    console.error(`\n  ❌ Rollback failed: ${e.message}\n`);
    process.exit(1);
  }
  process.exit(0);
}

// ── Main Deploy ──
const buildOnly = arg === '--build-only';
const startTime = Date.now();
const commit = getLocalCommit();

console.log('\n══════════════════════════════════════════════');
console.log(`  SkyMaxx USA Deploy${buildOnly ? ' (build only)' : ''}`);
console.log(`  Commit: ${commit}`);
console.log('══════════════════════════════════════════════\n');

// Step 1: Pre-flight
console.log('1️⃣  Pre-flight checks...\n');
const gitStatus = run('git status --porcelain', { silent: true });
if (gitStatus) {
  console.log('  ⚠️  Uncommitted changes:');
  gitStatus.split('\n').slice(0, 10).forEach(l => console.log(`     ${l}`));
  console.log('\n  Image will match LAST COMMIT, not working tree.\n');
}

// Step 2: Build
console.log('2️⃣  Building Docker image...\n');
try {
  run(`podman build --no-cache -t skymaxxusa:latest .`, { timeout: 300_000 });
} catch (e) {
  console.error('\n  ❌ Build failed. Fix errors and retry.\n');
  process.exit(1);
}

// Step 3: Export
console.log('\n3️⃣  Exporting image...\n');
run(`podman save skymaxxusa:latest | gzip > ${SERVER.tmpImage}`, { timeout: 300_000 });
const sizeBytes = parseInt(run(`stat -c%s ${SERVER.tmpImage}`, { silent: true }));
const sizeMB = (sizeBytes / 1024 / 1024).toFixed(1);
console.log(`  📦 Image: ${sizeMB}MB\n`);

if (buildOnly) {
  console.log(`  ✅ Image built at ${SERVER.tmpImage}`);
  console.log(`  Run \`node deploy.mjs\` to ship it.\n`);
  process.exit(0);
}

// Step 4: Upload
console.log('4️⃣  Uploading to server...\n');
try {
  ssh(`mkdir -p ${SERVER.remotePath}`, { silent: true, allowFail: true });
  ssh(`test -f ~/skymaxxusa-image.tar.gz && cp ~/skymaxxusa-image.tar.gz ~/skymaxxusa-image-prev.tar.gz || true`, { silent: true });
  run(`scp ${SERVER.tmpImage} ${SERVER.host}:~/skymaxxusa-image.tar.gz`, { timeout: 300_000 });
  console.log('  ✅ Uploaded\n');
} catch (e) {
  console.error(`\n  ❌ Upload failed: ${e.message}\n`);
  process.exit(1);
}

// Step 5: Deploy
console.log('5️⃣  Deploying on server...\n');
try {
  ssh('docker load < ~/skymaxxusa-image.tar.gz');
  // Ensure docker-compose.yml exists on server
  run(`scp ${resolve(ROOT, 'docker-compose.yml')} ${SERVER.host}:${SERVER.remotePath}/docker-compose.yml`);
  ssh(`cd ${SERVER.remotePath} && docker compose down && docker compose up -d`);
} catch (e) {
  console.error(`\n  ❌ Deploy failed: ${e.message}\n`);
  console.log('  💡 Try: node deploy.mjs --rollback\n');
  process.exit(1);
}

// Step 6: Health check
console.log('\n6️⃣  Health check...\n');
run('sleep 4');
try {
  ssh(`docker logs ${SERVER.container} --tail 8`);
} catch {}

let healthy = false;
try {
  const code = run(`curl -s -o /dev/null -w "%{http_code}" --max-time 10 ${SERVER.healthUrl}`, { silent: true });
  if (code === '200') {
    console.log(`\n  ✅ HTTPS 200 — site is live`);
    healthy = true;
  } else {
    console.log(`\n  ⚠️  HTTPS ${code} — check server logs`);
  }
} catch {
  console.log('\n  ⚠️  HTTPS check failed — server may still be starting');
}

// Step 7: Record
console.log('\n7️⃣  Recording deployment...\n');
writeDeployedVersion(commit);

const tagName = `deploy-${commit}`;
try {
  run(`git tag -a ${tagName} -m "Deployed to production"`, { silent: true, allowFail: true });
  console.log(`  🏷️  Git tag: ${tagName}`);
} catch {}

const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
console.log(`\n══════════════════════════════════════════════`);
if (healthy) {
  console.log(`  ✅ Deployed (${commit}) in ${elapsed}s`);
  console.log(`  🌐 ${SERVER.healthUrl}`);
} else {
  console.log(`  ⚠️  Deployed but health check uncertain`);
  console.log(`  Run: node deploy.mjs --logs`);
}
console.log('══════════════════════════════════════════════\n');
