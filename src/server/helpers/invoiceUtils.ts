import type { InvoiceItem } from "@prisma/client";

export const calculateInvoiceAmount = (items: InvoiceItem[]): number => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};

// import type { Invoice } from "@prisma/client";

// export const calculateTotalUnpaid = (invoices: Invoice[]) => {
//   return invoices
//     .filter((invoice) => invoice.status === "UNPAID")
//     .reduce((acc, invoice) => acc + invoice.amountDue, 0);
// };
