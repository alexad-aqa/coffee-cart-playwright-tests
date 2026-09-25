import { test, expect } from '@playwright/test';

test.describe('coffee-cart-hw6', {tag: '@hw6:css'} , () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

test('Item Removed from Tooltip List via Minus Icon ', async ({ page }) => {
  await page.locator(
  '.cup' +
  ':has(.espresso[style*="height: 30%"])' +
  ':has(.steamed.milk[style*="height: 50%"])' +
  ':has(.milk.foam[style*="height: 20%"])'
  ).click();
  await expect(page.locator('[class="pay"]')).toContainText('$16.00');
  await expect(page.locator('a[href="/cart"]')).toContainText('(1)');
  await page.locator('[class="pay"]').hover();
  await page.locator('ul.cart-preview > li.list-item:has-text("Cafe Latte") [aria-label="Remove one Cafe Latte"]').click();
  await expect(page.locator('[class="pay"]')).toContainText('$0.00');
  await expect(page.locator('a[href="/cart"]')).toContainText('(0)');
});

test('Discount Promo Dismissed', async ({ page }) => {
  await page.locator(
  '.cup-body' +
  ':has(.espresso[style*="height: 30%"])' +
  ':has(.steamed.milk[style*="height: 20%"])' +
  ':has(.milk.foam[style*="height: 50%"])'
  ).click();
  await page.locator(
  '.cup-body' +
  ':has(.espresso[style*="height: 30%"])' +
  ':has(.water[style*="height: 70%"])'
  ).click();
  await page.locator(
  '.cup-body' +
  ':has(.espresso[style*="height: 30%"])' +
  ':has(.milk.foam[style*="height: 15%"])'
  ).click();
  await page.locator('.buttons button').filter({ hasText: /Nah, I'll skip/ }).click();
  await expect(page.locator('.promo')).toBeHidden();
  await page.locator('[class="pay"]').hover();
  await expect(page.locator('.cart-preview .list-item')).toHaveCount(3)
});

test('Discounted Item Added to Cart', async ({ page }) => {
 await page.locator(
  '.cup-body' +
  ':has(.espresso[style*="height: 30%"])' +
  ':has(.steamed.milk[style*="height: 20%"])' +
  ':has(.milk.foam[style*="height: 50%"])'
  ).click();
  await page.locator(
  '.cup-body' +
  ':has(.espresso[style*="height: 30%"])' +
  ':has(.water[style*="height: 70%"])'
  ).click();
  await page.locator(
  '.cup-body' +
  ':has(.espresso[style*="height: 30%"])' +
  ':has(.milk.foam[style*="height: 15%"])'
  ).click();
  await page.locator('.buttons button').filter({ hasText: /Yes, of course!/ }).click();
  await page.locator('[class="pay"]').hover();
  await expect(page.locator('.cart-preview .list-item').filter({ hasText: '(Discounted) Mocha' })).toBeVisible();
  await expect(page.locator('.cart-preview .list-item')).toHaveCount(4)
  await expect(page.locator('[class="pay"]')).toContainText('Total: $42.00');
  await expect(page.locator('a[href="/cart"]')).toContainText('(4)');  
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
  await page.locator(
  '.cup-body' +
  ':has(.espresso[style*="height: 30%"])'
).filter({ has: page.locator('> div:nth-child(1):nth-last-child(1)') }).click();

  await page.locator('a[href="/cart"]').click();
  await page.locator('ul:not(.cart-preview) > li.list-item:has-text("Espresso") [aria-label="Add one Espresso"]').click();
  await expect(page.locator('#app')).toContainText('x 2');
  await expect(page.locator('a[href="/cart"]')).toContainText('(2)');
  await expect(page.locator('#app')).toContainText('$20.00');
});

});


