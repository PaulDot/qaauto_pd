const { execSync } = require('child_process');
const envConfig = require('../test-env.config.js'); 

const action = process.argv[2];
const name = envConfig.CONTAINER_NAME;

// 1. Inform but continue if Docker missing/not runnning.
try { 
  execSync('docker ps', { stdio: 'ignore' }); 
} catch (e) {
  console.log('\n📡 Docker is closed or missing. Testing framework will gracefully fall back to the live site.\n');
  process.exit(0);  // Skip further actions in this script if docker is not available.
}

// 2. Manage Actions
if (action === 'start') {
  console.log(`🚀 Starting ${name}...`);
  try { execSync(`docker rm -f ${name}`, { stdio: 'ignore' }); } catch {}
  
  // Start container and monitor health for next step
  execSync(`docker run -d --name ${name} -p ${envConfig.LOCAL_PORT}:5000 --health-cmd "curl -f http://localhost:5000/ || exit 1" --health-interval 1s ${envConfig.DOCKER_IMAGE}`, { stdio: 'inherit' });
  
  console.log('⏳ Waiting for server response...');
  // Check the container's internal health status every 0.5s; exit the loop when "healthy"
  execSync(`until [ "$(docker inspect --format='{{.State.Health.Status}}' ${name})" = "healthy" ]; do sleep 0.5; done`, { stdio: 'inherit' });
  console.log('✅ Server is ready!');

} else if (action === 'stop') {
  console.log(`🛑 Stopping ${name}...`);
  try {
    execSync(`docker rm -f ${name}`, { stdio: 'ignore' });
    console.log('✨ Clean up complete!');
  } catch {
    console.log('⚠️ No container found to stop.');
  }
}
