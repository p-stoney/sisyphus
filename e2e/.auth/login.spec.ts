import { clerkSetup, setupClerkTestingToken } from "@clerk/testing/playwright";
import { test } from "@playwright/test";
import {
  authFile,
  frontendApiUrl,
  password,
  publishableKey,
  username,
} from "./constants";

test("logs in and navigates from DistributorsPage to InvoicesPage and back", async ({
  page,
}) => {
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

  const pageContext = await page.context();
  let cookies = await pageContext.cookies();

  while (!cookies.some((c) => c.name === "__session")) {
    cookies = await pageContext.cookies();
  }

  await pageContext.storageState({ path: authFile });
});
