import { test } from "@playwright/test";

test("logs in and navigates from DistributorsPage to InvoicesPage and back", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator("a")
    .filter({ hasText: "Distributor Eemaile@gmail.com" })
    .click();
  await page.goto("/distributors/clw5vq0z90000quunyd15p1er");
  await page.getByLabel("back").click();
  await page.locator("a").filter({ hasText: "Distributor Dcontact@" }).click();
  await page
    .getByRole("row", { name: "#clvl65zrq000fob8guy3uujkx" })
    .getByRole("link")
    .click();
  await page.getByTestId("back-button").click();
  await page.getByLabel("back").click();
});
