/**
 * Calculates the payment due date based on the generated date and payment terms.
 *
 * @param {string} dateGenerated - The date the invoice was generated.
 * @param {number} paymentTerms - The number of days for payment terms.
 * @returns {string} The payment due date in YYYY-MM-DD format.
 */
export const calculatePaymentDueDate = (
  dateGenerated: string,
  paymentTerms: number,
): string => {
  const date = new Date(dateGenerated);
  date.setDate(date.getDate() + paymentTerms);
  return date.toISOString().split("T")[0] as string;
};

/**
 * Calculates the total amount for an array of items based on their price and quantity.
 *
 * @param {Array<{ price: number; quantity: number }>} items - The items with their prices and quantities.
 * @returns {number} The total amount.
 */
export const calculateTotalAmount = (
  items: Array<{ price: number; quantity: number }>,
): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
