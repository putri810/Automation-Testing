import { test, expect } from '@playwright/test';

test.describe('Cart:', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://www.automationexercise.com/');
		await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
	});

	test('Test Case 13: Verify Product quantity in Cart', async ({ page }) => {
		await page.click('//*[contains(text()," Products")]');

		await expect(page).toHaveURL('https://www.automationexercise.com/products');

		await page.locator('i[class="fa fa-plus-square"]').first().click();
		await expect(page).toHaveURL('https://www.automationexercise.com/product_details/1');

		await page.fill('#quantity', '4');
		await page.click('button[class="btn btn-default cart"]');

		await page.click('//*[contains(text(),"View Cart")]');
		await expect(page).toHaveURL('https://www.automationexercise.com/view_cart');

		await expect(page.locator(`#product-1 .cart_quantity button`)).toHaveText('4');
    });

    test('Test Case 17: Remove Products From Cart', async ({ page }) => {
		await page.click('//*[contains(text()," Products")]');

		await expect(page).toHaveURL('https://www.automationexercise.com/products');

		await page.locator(`a[data-product-id="1"]`).first().click();
		await page.click('//*[contains(text(),"View Cart")]');

		await expect(page).toHaveURL('https://www.automationexercise.com/view_cart');

		await page.click('#product-1 .cart_delete a');
		//await expect(page.locator(`#product-1 .cart_quantity button`)).toHaveText('4');
		await expect(page.locator('//*[contains(text(),"Cart is empty!")]')).toBeVisible();
	});
});   