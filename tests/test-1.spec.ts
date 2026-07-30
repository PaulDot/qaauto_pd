import { test, expect } from '@playwright/test';


test('verify dynamic loading elements', async ({ page }) => {
  // Navigates to baseUrl + /dynamic_loading/1
  await page.goto('/dynamic_loading/1'); 
  
  await page.getByRole('button', { name: 'Start' }).click();
  
  const finishText = page.locator('#finish');
  await expect(finishText).toHaveText('Hello World!', { timeout: 10000 });
});