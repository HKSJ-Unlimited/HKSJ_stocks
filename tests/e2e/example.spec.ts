import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, browser }) => {
  await page.goto("http://localhost:3000/")
});

test.describe('login flow', () => {
  test('should allow me to login', async ({ page }) => {
    const loginButton = page.getByRole('link', { name: 'Login' });
    await loginButton.click()
  })

})