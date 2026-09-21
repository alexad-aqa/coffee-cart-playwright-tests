import { test, expect } from '@playwright/test';

test('Navigation via Search Results', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('button', { name: 'Search (Meta+k)' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('MCP');
  await expect(page.locator('#docsearch-hits_playwright-nodejs_1-item-5')).toContainText('MCP');
  await page.locator('#docsearch-hits_playwright-nodejs_1-item-5').getByRole('link', { name: 'Playwright MCP' }).click();
  await expect(page.locator('h1')).toContainText('Playwright MCP');
  await expect(page).toHaveURL('https://playwright.dev/docs/getting-started-mcp');
});

test('Recent Search item can be added to Favorites', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('button', { name: 'Search (Meta+k)' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('MCP');
  await page.locator('#docsearch-hits_playwright-nodejs_0-item-0').getByRole('link', { name: 'Playwright MCP' }).click();
  await page.getByRole('button', { name: 'Search (Meta+k)' }).click();
  await expect(page.getByRole('button', { name: 'Save this search' })).toBeVisible();
  await expect(page.locator('#docsearch-recentSearches-list')).toContainText('Playwright MCP');
  await page.getByRole('button', { name: 'Save this search' }).click();
  await expect(page.getByRole('button', { name: 'Save this search' })).toBeHidden;
  await expect(page.locator('#docsearch-favoriteSearches-item-0')).toContainText('Playwright MCP');
});

test('Recent Search item can be deleted via X icon ', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('button', { name: 'Search (Meta+k)' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('locator');
  await page.getByRole('link', { name: 'Filtering Locators Locators' }).click();
  await page.getByRole('button', { name: 'Search (Meta+k)' }).click();
  await expect(page.getByRole('link', { name: 'Filtering Locators Locators' })).toBeVisible();
  await page.locator('#docsearch-recentSearches-item-0').getByRole('button', { name: 'Remove this search from' }).click
  await expect(page.getByRole('link', { name: 'Filtering Locators Locators' })).toBeHidden();
});