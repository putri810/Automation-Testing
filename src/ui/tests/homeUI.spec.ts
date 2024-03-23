import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test("home page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
  
    const homePageLogo = await homePage.getLogo();
    await expect(homePageLogo).toBeVisible();
  
    await homePage.clickSignupLoginButton();
});