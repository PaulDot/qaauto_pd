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
  timeout: 60_000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Limit parallel tests on CI due to free github tier limitations, use 40% of cores locally. */
  workers: process.env.CI ? 2 : '40%',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Environment override OR auto-detected fallback URL
    baseURL: process.env.BASE_URL || defaultUrl,
    trace: 'on-first-retry',
    colorScheme: 'dark',
    screenshot: 'only-on-failure',
    launchOptions: {
      // if SLOMO=true use slowed down headed browser(s)
      slowMo: process.env.SLOMO ? 1_000 : 0,
      headless: process.env.SLOMO ? false : undefined,
    }
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
      grepInvert: [/@api/, /@smoke/], 
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      grepInvert: [/@api/, /@smoke/], 
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      grepInvert: [/@api/, /@smoke/], 
    },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    //   grepInvert: [/@api/, /@smoke/], 
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    //   grepInvert: [/@api/, /@smoke/], 
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    //   grepInvert: [/@api/, /@smoke/], 
    // },
  ],

});
