import { test, expect } from "@playwright/test";

test("checks render for DistributorHeader filter", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Filter distributors" }).click();

  await page.getByLabel("Paid", { exact: true }).check();
  await expect(
    page.locator("a").filter({ hasText: "Distributor Eemaile@gmail.com" }),
  ).toBeVisible();
  await expect(
    page.locator("a").filter({ hasText: "Distributor Ff@contact.com$0." }),
  ).toBeVisible();
  await page.getByLabel("Paid", { exact: true }).uncheck();

  await page.getByLabel("Unpaid").check();
  await expect(
    page.locator("a").filter({ hasText: "Distributor Acontact@" }),
  ).toBeVisible();
  await expect(
    page.locator("a").filter({ hasText: "Distributor Bcontact@" }),
  ).toBeVisible();
  await expect(
    page.locator("a").filter({ hasText: "Distributor Ccontact@" }),
  ).toBeVisible();
  await expect(
    page.locator("a").filter({ hasText: "Distributor Dcontact@" }),
  ).toBeVisible();
  await page.getByLabel("Unpaid").uncheck();

  await page.getByLabel("Distributor Name:").click();
  await page.getByLabel("Distributor Name:").fill("Distributor C");
  await expect(
    page.locator("a").filter({ hasText: "Distributor Ccontact@" }),
  ).toBeVisible();
  await page.getByLabel("Distributor Name:").fill("");
  await page.getByLabel("Distributor Name:").press("Escape");
});

test("checks render for InvoiceHeader filter", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Invoices").getByRole("button").click();

  await page.getByRole("button", { name: "Filter invoices" }).click();
  await page.getByLabel("Paid").check();
  await expect(
    page
      .locator("a")
      .filter({
        hasText: "Distributor D#clvl65zrq000fob8guy3uujkxDue 2023-09-10$0PAID",
      }),
  ).toBeVisible();
  await expect(
    page
      .locator("a")
      .filter({
        hasText: "Distributor D#clvl65zrq000eob8ghvy21fptDue 2023-08-20$0PAID",
      }),
  ).toBeVisible();
  await page.getByLabel("Paid").uncheck();

  await page.getByLabel("Pending").check();
  await expect(
    page
      .locator("a")
      .filter({
        hasText:
          "Distributor D#clw6hrk100001mn8qwew133puDue 2024-06-13$91.00UNPAID",
      }),
  ).toBeVisible();
  await expect(
    page
      .locator("a")
      .filter({
        hasText:
          "Distributor D#clw94b1a50002q0m2t4ck1vioDue 2024-05-30$42.75UNPAID",
      }),
  ).toBeVisible();
  await page.getByLabel("Pending").uncheck();

  await page.getByLabel("Distributor Name:").click();
  await page.getByLabel("Distributor Name:").fill("Distributor D");
  await expect(
    page
      .locator("a")
      .filter({
        hasText: "Distributor D#clvl65zrq000fob8guy3uujkxDue 2023-09-10$0PAID",
      }),
  ).toBeVisible();
  await expect(
    page
      .locator("a")
      .filter({
        hasText: "Distributor D#clvl65zrq000eob8ghvy21fptDue 2023-08-20$0PAID",
      }),
  ).toBeVisible();
  await expect(
    page
      .locator("a")
      .filter({
        hasText:
          "Distributor D#clw6hrk100001mn8qwew133puDue 2024-06-13$91.00UNPAID",
      }),
  ).toBeVisible();
  await expect(
    page
      .locator("a")
      .filter({
        hasText:
          "Distributor D#clw94b1a50002q0m2t4ck1vioDue 2024-05-30$42.75UNPAID",
      }),
  ).toBeVisible();
  await page.getByLabel("Distributor Name:").fill("");
  await page.getByLabel("Distributor Name:").press("Escape");
});
