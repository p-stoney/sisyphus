import { z } from "zod";

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

export const CreateInvoiceSchema = z.object({
  businessId: z.number().min(1, "Business ID must be greater than 0"),
  distributorId: z.number().min(1, "Distributor ID must be greater than 0"),
  items: z
    .array(InvoiceItemSchema)
    .nonempty("Invoice must contain at least one item"),
});

export const DeleteInvoiceSchema = z.object({
  invoiceId: z.number(),
});

export const UpdateInvoiceSchema = z.object({
  invoiceId: z.string(),
  newStatus: z.enum(["PAID", "UNPAID"]),
});

export type GetByIdDTO = z.TypeOf<typeof GetByIdSchema>;
export type GetByDistributorIdDTO = z.TypeOf<typeof GetByDistributorIdSchema>;
export type CreateInvoiceDto = z.TypeOf<typeof CreateInvoiceSchema>;
export type DeleteInvoiceDto = z.TypeOf<typeof DeleteInvoiceSchema>;
export type UpdateInvoiceDto = z.TypeOf<typeof UpdateInvoiceSchema>;
