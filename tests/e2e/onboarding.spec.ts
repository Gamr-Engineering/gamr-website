import { test, expect } from "@playwright/test";

test.describe("Gamr Onboarding Flow", () => {
  test.beforeEach(async ({ page }) => {
    page.on("console", (msg) => console.log(`[BROWSER] ${msg.type().toUpperCase()}: ${msg.text()}`));
    await page.goto("/claim-gamrtag");
  });

  test("Step 1: Successfully enter GamrTag and continue", async ({ page }) => {
    const gamrTagInput = page.locator('input[placeholder="your-gamr-tag"]');
    const uniqueTag = `testuser_${Date.now()}`;
    
    await gamrTagInput.fill(uniqueTag);
    
    // Wait for availability check
    await expect(page.locator(".text-green-400")).toBeVisible({ timeout: 10000 });
    
    const continueBtn = page.getByRole("button", { name: "Continue" });
    await expect(continueBtn).toBeEnabled();
    await continueBtn.click();
    
    // Should be on Step 2
    await expect(page.getByText("Step 2 of 4")).toBeVisible();
    await expect(page.getByRole("heading", { name: "About You" })).toBeVisible();
  });

  test("Step 2: Regression - Continue button enables when form is valid", async ({ page }) => {
    // Skip Step 1
    const uniqueTag = `testuser_${Date.now()}`;
    await page.locator('input[placeholder="your-gamr-tag"]').fill(uniqueTag);
    await page.getByRole("button", { name: "Continue" }).click();

    // Step 2 Form
    await page.locator('input[placeholder="First name"]').fill("Test");
    await page.locator('input[placeholder="Last name"]').fill("Player");
    await page.locator('input[placeholder="you@example.com"]').fill(`test_${Date.now()}@example.com`);
    
    // Phone input is tricky with react-phone-input-2, usually has a specific class
    await page.locator(".form-control").fill("8123456789"); // Nigeria default

    // Select Country
    await page.getByRole("combobox").first().click();
    await page.getByRole("option", { name: "Nigeria" }).click();

    const continueBtn = page.getByRole("button", { name: "Continue" });
    
    // Wait for async email check
    await expect(page.locator(".text-green-400")).toBeVisible({ timeout: 10000 });
    
    await expect(continueBtn).toBeEnabled();
    await continueBtn.click();

    // Should be on Step 3
    await expect(page.getByText("Step 3 of 4")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Gaming Profile" })).toBeVisible();
  });

  test("Step 2: Handle Duplicate Email validation", async ({ page }) => {
    // Skip Step 1
    await page.locator('input[placeholder="your-gamr-tag"]').fill(`testuser_${Date.now()}`);
    await page.getByRole("button", { name: "Continue" }).click();

    // Use a known existing email (from previous diagnostic)
    const existingEmail = "seyi@gamr.africa";
    await page.locator('input[placeholder="you@example.com"]').fill(existingEmail);
    
    // Check for error indicator (X icon)
    await expect(page.locator(".text-red-400")).toBeVisible({ timeout: 10000 });
    
    // Check for the specific error text
    await expect(page.getByText("This email is already registered. Please log in or use another email.")).toBeVisible();
    
    const continueBtn = page.getByRole("button", { name: "Continue" });
    await expect(continueBtn).toBeDisabled();
  });

  test("Step 2: Successfully validate unique randomized email", async ({ page }) => {
    // Skip Step 1
    await page.locator('input[placeholder="your-gamr-tag"]').fill(`testuser_${Date.now()}`);
    await page.getByRole("button", { name: "Continue" }).click();

    // Step 2 Form with Randomized Email
    await page.locator('input[placeholder="First name"]').fill("Unique");
    await page.locator('input[placeholder="Last name"]').fill("Player");
    
    const randomEmail = `test_${Date.now()}@example.com`;
    await page.locator('input[placeholder="you@example.com"]').fill(randomEmail);
    
    // Select Country
    await page.getByRole("combobox").first().click();
    await page.getByRole("option", { name: "Nigeria" }).click();

    const continueBtn = page.getByRole("button", { name: "Continue" });
    
    // Wait for async email check (Deterministic result: Green checkmark)
    await expect(page.locator(".text-green-400")).toBeVisible({ timeout: 15000 });
    
    await expect(continueBtn).toBeEnabled();
    await continueBtn.click();

    // Should be on Step 3
    await expect(page.getByText("Step 3 of 4")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Gaming Profile" })).toBeVisible();
  });

  test("Complete full onboarding flow to Success Page", async ({ page }) => {
    const uniqueId = Date.now();
    const uniqueTag = `hero_${uniqueId}`;
    const uniqueEmail = `hero_${uniqueId}@example.com`;

    // Step 1: GamrTag
    await page.locator('input[placeholder="your-gamr-tag"]').fill(uniqueTag);
    await expect(page.locator(".text-green-400")).toBeVisible({ timeout: 15000 });
    await page.getByRole("button", { name: "Continue" }).click();

    // Step 2: About You
    await page.locator('input[placeholder="First name"]').fill("Ultimate");
    await page.locator('input[placeholder="Last name"]').fill("Gamer");
    await page.locator('input[placeholder="you@example.com"]').fill(uniqueEmail);
    await page.getByRole("combobox").first().click();
    await page.getByRole("option", { name: "Nigeria" }).click();
    await expect(page.locator(".text-green-400")).toBeVisible({ timeout: 15000 });
    await page.getByRole("button", { name: "Continue" }).click();

    // Step 3: Gaming Profile
    // SELECT LATEST EA FC 
    await page.getByText("FIFA / EA FC").click();
    
    // Select Platform
    await page.getByRole("combobox").first().click();
    await page.getByRole("option", { name: "PlayStation" }).click();
    
    // Select Region
    await page.getByRole("combobox").nth(1).click();
    await page.getByRole("option", { name: "West Africa" }).click();
    
    await page.getByRole("button", { name: "Continue" }).click();

    // Step 4: Gamer DNA
    await page.getByText("Competitor").click();
    await page.getByText("Casual").click();
    await page.getByText("Team Player").click();
    
    // Submit
    const claimBtn = page.getByRole("button", { name: "Claim GamrTag" });
    await expect(claimBtn).toBeEnabled();
    await claimBtn.click();

    // Step 5: Success
    await expect(page.getByText("Welcome,")).toBeVisible({ timeout: 20000 });
    // Use first() or a more specific locator to avoid strict mode violation (matches both heading and grid)
    await expect(page.locator("h1").getByText(`@${uniqueTag}`)).toBeVisible();
    await expect(page.getByText("Your Profile")).toBeVisible();
    
    // Check Summary Grid
    await expect(page.getByText("Ultimate Gamer")).toBeVisible();
    await expect(page.getByText("PlayStation")).toBeVisible();
    await expect(page.getByText("West Africa")).toBeVisible();
    await expect(page.getByText("Competitor")).toBeVisible();
    await expect(page.getByText("Casual")).toBeVisible();
    await expect(page.getByText(uniqueEmail)).toBeVisible();
  });
});
