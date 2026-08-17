import { defineConfig, devices } from '@playwright/test';
import { execSync } from 'child_process';
import envConfig from './test-env.config.js';

function isContainerRunning(containerName: string): boolean {
  try {
    const output = execSync(
      // Filter for matching, running container
      `docker ps -q --filter "name=^/${containerName}$" --filter "status=running"`,
      // Capture just the stdout
      { stdio: ['ignore', 'pipe', 'ignore'] }
    ).toString().trim();

    return output.length > 0;
  } catch {
    return false;
  }
}

const localAppRunning = isContainerRunning(envConfig.CONTAINER_NAME);
const defaultUrl = localAppRunning ? envConfig.LOCAL_URL : envConfig.LIVE_URL;


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Environment override OR auto-detected fallback URL
    baseURL: process.env.BASE_URL || defaultUrl,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    colorScheme: 'dark',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: /.*smoke\.spec\.ts/,
    },

    /* {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: /.*smoke\.spec\.ts/,
    }, */

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      testIgnore: /.*smoke\.spec\.ts/,
    },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    //   testIgnore: /.*smoke\.spec\.ts/,
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

});
