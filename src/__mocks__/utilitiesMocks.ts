// import { vi } from "vitest";
// import { Prisma, type InvoiceItem } from "@prisma/client";

// export const mockCalculateInvoiceAmount = vi.fn((items: InvoiceItem[]) => {
//   console.log("Calculating invoice amount for items:", items);
//   return items.reduce((sum, item) => {
//     const itemTotal = Number(item.price) * item.quantity;
//     console.log(
//       `Item: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}, Item Total: ${itemTotal}`,
//     );
//     return sum + itemTotal;
//   }, 0);
// });

// vi.mock("~/server/helpers/invoiceUtils", () => ({
//   calculateInvoiceAmount: mockCalculateInvoiceAmount,
// }));
