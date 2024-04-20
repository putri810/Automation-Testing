import { test, expect } from "@playwright/test";
import { HomePage } from "ui/pages/HomePage";

test.beforeEach( async({ page }) => {
    await page.goto('https://www.automationexercise.com/');
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
});

test.describe("Scroll up using 'Arrow' button", () => {

    test("Test Case 26: Verify Scroll Up without 'Arrow' button and Scroll Down functionality", async({ page }) => {
        await HomePage;
        
        const scrollToBottom = async() => {
            await page.mouse.wheel(0,10000);
        }
        await scrollToBottom; 
        await expect(page.getByRole('heading', { name: 'Subscription' })).toBeVisible();
        
        const scrollToTop = async() => {
            await page.mouse.wheel(0,-10000);
          }
        await scrollToTop();

        await expect(page.locator("#slider-carousel").locator(".active").getByRole('heading', { name: 'Full-Fledged practice website for Automation Engineers' })).toBeVisible();
    });
});