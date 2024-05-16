import { clerkSetup, setupClerkTestingToken } from "@clerk/testing/playwright";
import { test, expect } from "@playwright/test";

test("navigates from DistributorsPage to InvoicesPage and back", async ({
  page,
}) => {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const frontendApiUrl = process.env.CLERK_FRONTEND_API_URL;
  const username = process.env.E2E_CLERK_USER_USERNAME;
  const password = process.env.E2E_CLERK_USER_PASSWORD;

  await clerkSetup({ publishableKey, frontendApiUrl });

  await setupClerkTestingToken({
    page,
    options: { frontendApiUrl: process.env.CLERK_FRONTEND_API_URL },
  });

  await page.goto("/");

  await page.locator('[id="__next"] div').click();
  await page
    .getByRole("button", { name: "Sign in with Google Continue" })
    .click();
  await page.getByLabel("Email or phone").click();
  await page.getByLabel("Email or phone").fill(username || "");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("Enter your password").click();
  await page.getByLabel("Enter your password").fill(password || "");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByRole("link", { name: "Go to details" })).toBeVisible();
  await page.getByLabel("Invoices").getByRole("button").click();
  await page.getByLabel("Distributors").getByRole("button").click();
});
