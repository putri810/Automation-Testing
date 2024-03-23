import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { RegisterPage } from "../pages/RegisterPage";
import { usersData } from "../data/User";

test("register", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
  
    const homePageLogo = await homePage.getLogo();
    await expect(homePageLogo).toBeVisible();
  
    await homePage.clickSignupLoginButton();
  
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
});