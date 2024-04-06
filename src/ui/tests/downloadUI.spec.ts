import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { RegisterPage } from "../pages/RegisterPage";
import { creditCardData } from "../data/CreditCard";
import { usersData } from "../data/DataUser";
import { DeleteAccountPage } from "../pages/DeleteAccountPage";

test.describe('Cart:', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://www.automationexercise.com/');
		await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
	});

	test('Test Case 24: Download Invoice after purchase order', async ({ page }) => {
		const homePage = new HomePage(page);
        const firstProductId = 1;
		await page.click('//*[contains(text()," Products")]');

		await expect(page).toHaveURL('https://www.automationexercise.com/products');

		await page.locator(`a[data-product-id="${firstProductId}"]`).first().click();
		await page.click('//*[contains(text(),"View Cart")]');
		await expect(page).toHaveURL('https://www.automationexercise.com/view_cart');
        await page.click('//*[contains(text(),"Proceed To Checkout")]');

        await page.click('//*[contains(text(),"Register / Login")]');
        await page.goto('https://www.automationexercise.com/login');
  
        const loginPage = new LoginPage(page);
        const getSignupFormTitle = await loginPage.getSignupFormTitle();
        await expect(getSignupFormTitle).toBeVisible();
    
        await loginPage.fillSignupForm(usersData.name, usersData.email);
    
        await loginPage.clickSignupButton();
    
        const signupPage = new SignupPage(page);
        const getAccountInfoFormTitle = await signupPage.getAccountInfoFormTitle();
        await expect(getAccountInfoFormTitle).toBeVisible();
    
        const nameFromField = await signupPage.getValueFromNameField();
        expect(nameFromField).toEqual(usersData.name);
    
        const emailFromField = await signupPage.getValueFromEmailField();
        expect(emailFromField).toEqual(usersData.email);
    
        await signupPage.fillAccountInfoForm(usersData);
        await signupPage.fillAddressInfoForm(usersData);
    
        await signupPage.clickCreateAccountButton();
    
        const createAccountPage = new RegisterPage(page);
        const accountCreatedTitle = await createAccountPage.getPageTitle();
        await expect(accountCreatedTitle).toBeVisible();
    
        await createAccountPage.clickContinueButton();

        const loggedInText = await homePage.getLoggedInText();
        await expect(loggedInText).toHaveText(`Logged in as ${usersData.name}`);
        await expect(loggedInText).toBeVisible();

        await page.click('//*[contains(text(),"Cart")]');
		await page.goto('https://www.automationexercise.com/view_cart');
        await page.click('//*[contains(text(),"Proceed To Checkout")]');

        await page.goto('https://automationexercise.com/checkout');
        await page.click('//*[contains(text(),"Place Order")]');

        await page.goto('https://automationexercise.com/payment');
        await page.locator('input[data-qa="name-on-card"]') .fill(usersData.name);
        await page.locator('input[data-qa="card-number"]')  .fill(creditCardData.number);
        await page.locator('input[data-qa="cvc"]')          .fill(creditCardData.cvc);
        await page.locator('input[data-qa="expiry-month"]') .fill(creditCardData.month);
        await page.locator('input[data-qa="expiry-year"]')  .fill(creditCardData.year);
        await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

        await page.goto('https://automationexercise.com/payment_done/500');
        const download = await Promise.all([
            page.waitForEvent("download"),
            page.getByRole('link', { name: 'Download Invoice' }).click(),
          ]);
        await expect(download[0].path).toBeTruthy();
        
        await page.getByRole('link', { name: 'Continue' }).click();
        await DeleteAccountPage;
        });
});