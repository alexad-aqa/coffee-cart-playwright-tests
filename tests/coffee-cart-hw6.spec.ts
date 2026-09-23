import { test, expect } from '@playwright/test';

test.describe('coffee-cart-hw6', {tag: '@hw6'} , () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

test('Item Removed from Tooltip List via Minus Icon ', async ({ page }) => {
  await page.getByTestId('Cafe_Latte').click();
  await expect(page.getByTestId('checkout')).toContainText('$16.00');
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('(1)');
  await page.getByTestId('checkout').hover();
  await page.getByRole('button', { name: 'Remove one Cafe Latte' }).click();
  await expect(page.getByTestId('checkout')).toContainText('$0.00');
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('(0)');
});

test('Discount Promo Dismissed', async ({ page }) => {
  await page.getByTestId('Cappuccino').click();
  await page.getByTestId('Americano').click();
  await page.getByTestId('Espresso_Macchiato').click();
  await page.getByRole('button', { name: 'Nah, I\'ll skip.' }).click();
  await expect(page.getByText('It\'s your lucky day! Get an extra cup of Mocha for $4.espressochocolate')).toBeHidden();
  await page.getByTestId('checkout').hover();
  await expect(page.getByText('(Discounted) Mocha x 1+-')).toBeHidden();
});

test('Discounted Item Added to Cart', async ({ page }) => {
  await page.getByTestId('Espresso').click();
  await page.getByTestId('Espresso_Macchiato').click();
  await page.getByTestId('Cappuccino').click();
  await page.getByRole('button', { name: 'Yes, of course!' }).click();
  await page.getByTestId('checkout').hover();
  await expect(page.getByText('(Discounted) Mocha x 1+-')).toBeVisible();
  await expect(page.getByTestId('checkout')).toContainText('Total: $45.00');
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('(4)');  
});

test('Coffee Purchased Success Test', async ({ page }) => {
  await page.getByTestId('Cafe_Latte').click();
  await page.getByTestId('checkout').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('User');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('user@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('button', { name: 'Thanks for your purchase.' })).toBeVisible();
});

test('Increase Coffee Qty by 1 via + Icon', async ({ page }) => {
  await page.getByTestId('Espresso').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await page.getByRole('button', { name: 'Add one Espresso' }).click();
  await expect(page.locator('#app')).toContainText('x 2');
  await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('(2)');
  await expect(page.locator('#app')).toContainText('$20.00');
});

});


