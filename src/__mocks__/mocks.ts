import { Prisma } from "@prisma/client";
import type { ExtendedDistributor, ExtendedInvoice } from "~/types";
import type { FormValues as InvoiceFormValues } from "~/server/helpers/formUtils";

export const mockInvoice: ExtendedInvoice = {
  id: "inv1",
  dueBy: new Date("2024-01-01"),
  status: "UNPAID",
  businessId: "businessId",
  distributorId: "distributorId",
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  items: [
    {
      id: "item1",
      name: "Item 1",
      price: new Prisma.Decimal(500),
      quantity: 2,
      invoiceId: "inv1",
      productId: "productId",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: "item2",
      name: "Item 2",
      price: new Prisma.Decimal(300),
      quantity: 3,
      invoiceId: "inv1",
      productId: "productId2",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ],
  amountDue: 1300,
};

export const invoices: ExtendedInvoice[] = [
  {
    id: "inv1",
    dueBy: new Date("2024-01-01"),
    status: "UNPAID",
    businessId: "businessId",
    distributorId: "distributorId",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    items: [
      {
        id: "item1",
        name: "Item 1",
        price: new Prisma.Decimal(500),
        quantity: 2,
        invoiceId: "invoiceId",
        productId: "productId",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ],
    amountDue: 1000,
  },
  {
    id: "inv2",
    dueBy: new Date("2024-02-01"),
    status: "UNPAID",
    businessId: "businessId",
    distributorId: "distributorId",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    items: [
      {
        id: "item2",
        name: "Item 2",
        price: new Prisma.Decimal(500),
        quantity: 1,
        invoiceId: "invoiceId2",
        productId: "productId2",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ],
    amountDue: 500,
  },
];

export const mockInvoices = invoices;

export const mockDistributor: ExtendedDistributor = {
  id: "1",
  name: "ABC Distributors",
  email: "contact@abcdist.com",
  address: "123 Any Street",
  city: "Anytown",
  state: "Anystate",
  postalCode: "12345",
  paymentTerms: 30,
  invoices,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const initialFormValues: InvoiceFormValues = {
  name: "",
  email: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  businessId: "some-id",
  distributorId: "distributor-id",
  dateGenerated: "2022-01-01",
  paymentTerms: 30,
  items: [
    {
      id: "1",
      name: "Product A",
      quantity: 2,
      price: 100,
      total: 200,
      isDeleted: false,
    },
    {
      id: "2",
      name: "Product B",
      quantity: 3,
      price: 150,
      total: 450,
      isDeleted: false,
    },
  ],
};
