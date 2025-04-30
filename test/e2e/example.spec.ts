import { test, expect } from '@playwright/test';

test('homepage has welcome text', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.q-toolbar__title')).toContainText('Shop Tools');
});

/* test('get started link', async ({ page }) => {
  await page.goto('https://ghislaingirardeau.github.io/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' }),
  ).toBeVisible();
}); */
