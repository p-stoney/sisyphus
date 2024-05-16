import { test, expect } from "@playwright/test";

test("creates a new distributor through DistributorModal", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "+ New Distributor" }).click();

  await page.getByLabel("Distributor Name").click();
  await page.getByLabel("Distributor Name").fill("Distributor F");
  await page.getByLabel("Distributor Name").press("Tab");
  await page.getByLabel("Email Address").fill("f@contact.com");
  await page.getByLabel("Email Address").press("Tab");
  await page.getByLabel("Address", { exact: true }).fill("75 F St");
  await page.getByLabel("Address", { exact: true }).press("Tab");
  await page.getByLabel("City").fill("Bethesda");
  await page.getByLabel("City").press("Tab");
  await page.getByLabel("Postal Code").fill("20720");
  await page.getByLabel("Postal Code").press("Tab");
  await page.getByRole("combobox", { name: "​", exact: true }).click();
  await page.getByRole("option", { name: "Maryland" }).click();
  await page.getByLabel("30").click();
  await page.getByRole("option", { name: "14" }).click();
  await page.getByRole("button", { name: "Save Distributor" }).click();

  expect(
    page
      .locator("a")
      .filter({ hasText: "Distributor Ff@contact.com$0." })
      .count(),
  ).toBe(1);
});
