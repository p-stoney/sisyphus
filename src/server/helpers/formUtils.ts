import { z } from "zod";

export interface FormValues {
  // Distributor fields
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;

  // Invoice-specific fields
  distributorId?: string;
  dateGenerated?: string | undefined;
  paymentTerms: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
}

export const baseDistributorSchema = z.object({
  name: z.string().min(1, "Distributor name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z
    .string()
    .regex(/^\d+$/, "Postal code must be numeric")
    .min(5, "Postal code must be at least 5 characters long"),
});

export const invoiceValidationSchema = baseDistributorSchema.extend({
  dateGenerated: z.string().min(1, "Invoice date is required"),
  paymentTerms: z.number().min(0, "Invalid payment terms"),
  items: z
    .array(
      z.object({
        name: z.string().min(1, "Item name is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        price: z.number().min(0.01, "Price must be at least $0.01"),
      }),
    )
    .nonempty("At least one item is required"),
});

export const initialFormValues: FormValues = {
  name: "",
  distributorId: "",
  email: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  dateGenerated: "",
  paymentTerms: 30,
  items: [
    { id: `temp-${Date.now()}`, name: "", quantity: 0, price: 0, total: 0 },
  ],
};

export const ValidationSchema = z.object({
  name: z.string().min(1, { message: "Distributor name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  address: z.string().min(1, { message: "Street address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  postalCode: z
    .string()
    .regex(/^\d+$/, { message: "Postal code must be numeric" })
    .min(5, { message: "Postal code must be at least 5 characters long" })
    .min(1, { message: "Postal code is required" }),
  paymentTerms: z.number(),
  // Add other shared fields here
});

export interface InvoiceFormValues {
  distributorId: string;
  dateGenerated: string;
  paymentTerms: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export const initialInvoiceFormValues: InvoiceFormValues = {
  distributorId: "",
  dateGenerated: new Date().toISOString().slice(0, 10), // formatted as "YYYY-MM-DD"
  paymentTerms: 30,
  items: [
    {
      id: `temp-${Date.now()}`,
      name: "",
      quantity: 1,
      price: 0.0,
    },
  ],
};

export const InvoiceItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().min(0.01, "Price must be at least $0.01"),
});

export const InvoiceValidationSchema = z.object({
  distributorId: z.string().min(1, "Distributor is required"),
  dateGenerated: z.string().min(1, "Date is required"),
  paymentTerms: z.number().min(0, "Invalid payment terms"),
  items: z.array(InvoiceItemSchema).nonempty("At least one item is required"),
});

export const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District Of Columbia",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export const paymentTermsOptions = [1, 14, 30, 45, 60];
