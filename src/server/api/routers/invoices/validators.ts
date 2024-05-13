import { z } from "zod";

export const GetAllSchema = z.object({
  userId: z.string(),
});

export const GetByIdSchema = z.object({
  invoiceId: z.string(),
});

export const GetByDistributorIdSchema = z.object({
  distributorId: z.string(),
});

export const InvoiceItemSchema = z.object({
  productId: z.number().min(1, "Product ID must be greater than 0"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export const CreateInvoiceItemSchema = z.object({
  name: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0.01),
});

export const CreateInvoiceSchema = z.object({
  businessId: z.string(),
  distributorId: z.string(),
  items: z.array(CreateInvoiceItemSchema),
  paymentTerms: z.number().min(0),
  dateGenerated: z.string(),
});

export const DeleteInvoiceSchema = z.object({
  invoiceId: z.number(),
});

export const UpdateInvoiceSchema = z.object({
  invoiceId: z.string(),
  newStatus: z.enum(["PAID", "UNPAID"]),
});

export type GetAllDTO = z.TypeOf<typeof GetAllSchema>;
export type GetByIdDTO = z.TypeOf<typeof GetByIdSchema>;
export type GetByDistributorIdDTO = z.TypeOf<typeof GetByDistributorIdSchema>;
export type CreateInvoiceDTO = z.TypeOf<typeof CreateInvoiceSchema>;
export type DeleteInvoiceDto = z.TypeOf<typeof DeleteInvoiceSchema>;
export type UpdateInvoiceDto = z.TypeOf<typeof UpdateInvoiceSchema>;
