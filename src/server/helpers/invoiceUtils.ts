import type { InvoiceItem } from "@prisma/client";

export const calculateInvoiceAmount = (items: InvoiceItem[]): number => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};

export const calculatePaymentDueDate = (
  dateGenerated: string,
  paymentTerms: number,
): string => {
  const date = new Date(dateGenerated);
  date.setDate(date.getDate() + paymentTerms);
  return date.toISOString().split("T")[0] as string;
};

export const calculateTotalAmount = (
  items: Array<{ price: number; quantity: number }>,
): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
