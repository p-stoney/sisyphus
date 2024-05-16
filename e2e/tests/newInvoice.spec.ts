import { test, expect } from "@playwright/test";

test("creates a new distributor through DistributorModal", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Invoices").getByRole("button").click();

  await page.getByRole("button", { name: "+ New Invoice" }).click();
  await page.getByLabel("Distributor Name").click();
  await page.getByRole("option", { name: "Distributor D" }).click();
  await page.getByLabel("Invoice Date").fill("2024-05-16");
  await page.getByLabel("30").click();
  await page.getByRole("option", { name: "14" }).click();

  await page.getByLabel("itemName-0").click();
  await page.getByRole("option", { name: "Product 7" }).click();
  await page.getByLabel("Qty.").click();
  await page.getByLabel("Qty.").fill("3");
  await page.getByRole("button", { name: "+ Add New Item" }).click();
  await page.getByLabel("itemName-1").click();
  await page.getByRole("option", { name: "Product 9" }).click();
  await page.locator("#itemQty-1").click();
  await page.locator("#itemQty-1").fill("1");
  await page.getByRole("button", { name: "Save Invoice" }).click();

  expect(
    page
      .locator("a")
      .filter({ hasText: "Distributor Ff@contact.com$0." })
      .count(),
  ).toBe(2);
});
