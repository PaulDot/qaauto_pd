import { test, expect } from '@playwright/test';

test.describe('Infrastructure Smoke Check', () => {
  test('should verify connection routing target', async ({ page, baseURL }) => {
    console.log(`📡 Current Test Session Routing Target: ${baseURL}`);
    
    // Perform a ping to verify the target endpoint is reachable
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });
});