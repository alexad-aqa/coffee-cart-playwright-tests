import { test, expect } from '@playwright/test';

test('Item Removed from Tooltip List via Minus Icon ', async ({ page }) => {

  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cafe_Latte"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('$16.00');
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('(1)');
  await page.locator('[data-test="checkout"]').hover();
  await page.getByRole('button', { name: 'Remove one Cafe Latte' }).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText('$0.00');
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('(0)');

});

test('Discount Promo Dismissed', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Americano"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.getByRole('button', { name: 'Nah, I\'ll skip.' }).click();
  await expect(page.getByText('It\'s your lucky day! Get an extra cup of Mocha for $4.espressochocolate')).toBeHidden();
});

test('Discounted Item Added to Cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await page.locator('[data-test="checkout"]').hover();
  await expect(page.getByText('(Discounted) Mocha x 1+-')).toBeVisible();
  await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $45.00');
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('(4)');
   
});

test('Coffee Purchased', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Cafe_Latte"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('User');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('user@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: 'Thanks for your purchase.' })).toBeVisible();
});

test('Increase Coffee Qty by 1 via + Icon', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await page.getByRole('button', { name: 'Add one Espresso' }).click();
  await expect(page.locator('#app')).toContainText('x 2');
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('(2)');
  await expect(page.locator('#app')).toContainText('$20.00');
});


