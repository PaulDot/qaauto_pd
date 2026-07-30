const { execSync } = require('child_process');
const http = require('http');

const action = process.argv[2]; // Extracts the actual string argument passed ('start' or 'stop')
const containerName = 'the-internet-test-app';
const dockerImage = 'gprestes/the-internet:v2.6.5';

// 1. Universal Pre-Check: Is Docker installed?
try {
  execSync('docker --version', { stdio: 'ignore' });
} catch (e) {
  console.error('\n❌ ERROR: Docker is not installed or not running.');
  console.error('👉 Please start Docker Desktop, or run "npm run test" to test against the live site directly.\n');
  process.exit(1);
}

// Poll the application until it responds with a 200
function waitForApp(url, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      if (Date.now() - start > timeoutMs) {
        clearInterval(interval);
        reject(new Error('Timeout waiting for application to respond.'));
      }
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          clearInterval(interval);
          resolve();
        }
      }).on('error', () => {
        // App is not ready yet, swallow error and retry
      });
    }, 1000);
  });
}

// 2. Execute requested action
if (action === 'start') {
  console.log('🧹 Cleaning up old containers if they exist...');
  try {
    execSync(`docker rm -f ${containerName}`, { stdio: 'ignore' });
  } catch (e) {}

  console.log('🚀 Spinning up the-internet Docker container...');
  execSync(`docker run -d --name ${containerName} -p 7080:5000 ${dockerImage}`, { stdio: 'inherit' });

  console.log('⏳ Waiting for application to initialize on http://localhost:7080...');
  
  // Keep the process alive until the container actually handles HTTP requests
  waitForApp('http://127.0.0.1:7080')
    .then(() => {
      console.log('✅ Server is ready! Handing over to test runner...');
      // Sleep briefly or exit cleanly now that the endpoint handles traffic
      process.exit(0);
    })
    .catch((err) => {
      console.error(`❌ ${err.message}`);
      process.exit(1);
    });

} else if (action === 'stop') {
  try {
    console.log('🛑 Stopping and removing the container...');
    execSync(`docker stop ${containerName}`, { stdio: 'ignore' });
    execSync(`docker rm ${containerName}`, { stdio: 'ignore' });
    console.log('✨ Clean up complete!');
  } catch (e) {
    console.log('⚠️ No running container found to stop.');
  }
}
