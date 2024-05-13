import type {
  Invoice,
  InvoiceItem,
  Distributor as PrismaDistributor,
} from "@prisma/client";

export type ExtendedDistributor = PrismaDistributor & {
  invoices: ExtendedInvoice[];
};

export type ExtendedInvoice = Invoice & {
  items: InvoiceItem[];
  amountDue: number;
};

export interface FilterOption {
  label: string;
  value: string;
}

export interface DFilterCriteria {
  allInvoicesPaid?: boolean;
  name?: string;
}

export interface IFilterCriteria {
  status?: "PAID" | "UNPAID" | null;
  name?: string;
  id?: string;
}
