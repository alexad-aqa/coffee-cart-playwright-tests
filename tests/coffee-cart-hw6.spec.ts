import { test, expect } from '@playwright/test';

test.describe('coffee-cart-hw6', {tag: '@hw6'} , () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

test('Item Removed from Tooltip List via Minus Icon ', async ({ page }) => {
  await page.locator('[aria-label="Cafe Latte"]').click();
  await expect(page.locator('[aria-label="Proceed to checkout"]')).toContainText('$16.00');
  await expect(page.locator('[aria-label="Cart page"]')).toContainText('(1)');
  await page.locator('[class="pay"]').hover();
  await page.locator('[aria-label="Remove one Cafe Latte"]').click();
  await expect(page.locator('[class="pay"]')).toContainText('$0.00');
  await expect(page.locator('[aria-label="Cart page"]')).toContainText('(0)');
});

test('Discount Promo Dismissed', async ({ page }) => {
  await page.locator('[aria-label="Cappuccino"]').click();
  await page.locator('[aria-label="Americano"]').click();
  await page.locator('[aria-label="Espresso Macchiato"]').click();
  await page.locator('.buttons button').filter({ hasText: /Nah, I'll skip/ }).click();
  await expect(page.locator('.promo')).toBeHidden();
  await page.locator('[class="pay"]').hover();
  await expect(page.locator('.cart-preview .list-item')).toHaveCount(3)
});

test('Discounted Item Added to Cart', async ({ page }) => {
  await page.locator('[aria-label="Espresso"]').click();
  await page.locator('[aria-label="Espresso Macchiato"]').click();
  await page.locator('[aria-label="Cappuccino"]').click();
  await page.locator('.buttons button').filter({ hasText: /Yes, of course!/ }).click();
  await page.locator('[class="pay"]').hover();
  await expect(page.locator('.cart-preview .list-item').filter({ hasText: '(Discounted) Mocha' })).toBeVisible();
  await expect(page.locator('.cart-preview .list-item')).toHaveCount(4)
  await expect(page.locator('[class="pay"]')).toContainText('Total: $45.00');
  await expect(page.locator('[aria-label="Cart page"]')).toContainText('(4)');  
});

test('Coffee Purchased Success Test', async ({ page }) => {
  await page.locator('[data-test="Cafe_Latte"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('#name').fill('User');
  await page.locator('#email').fill('user@gmail.com');
  await page.locator('#submit-payment').click();
  await expect(page.locator('[class~="snackbar"]')).toBeVisible();
});

test('Increase Coffee Qty by 1 via + Icon on Cart Page', async ({ page }) => {
  await page.locator('[aria-label="Espresso"]').click();
  await page.locator('[aria-label="Cart page"]').click();
  await page.locator('ul:not(.cart-preview) > li.list-item:has-text("Espresso") [aria-label="Add one Espresso"]').click();
  await expect(page.locator('#app')).toContainText('x 2');
  await expect(page.locator('[aria-label="Cart page"]')).toContainText('(2)');
  await expect(page.locator('#app')).toContainText('$20.00');
});

});


