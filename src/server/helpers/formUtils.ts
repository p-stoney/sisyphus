/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

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

export interface FormValues {
  // Distributor fields
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;

  // Invoice-specific fields
  businessId?: string;
  distributorId: string;
  dateGenerated: string;
  paymentTerms: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
    isDeleted?: boolean;
  }[];
}

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
  items: [{ id: uuidv4(), name: "", quantity: 0, price: 0, total: 0 }],
};

/**
 * baseValidationSchema defines the validation rules for form fields using Yup.
 * It specifies the requirements for each field, such as being required or following a specific format.
 */
export const baseValidationSchema = Yup.object().shape({
  name: Yup.string().required("Distributor name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string()
    .matches(/^\d+$/, "Postal code must be numeric")
    .min(5, "Postal code must be at least 5 characters long")
    .required("Postal code is required"),
  paymentTerms: Yup.number().required("Payment terms are required"),
});

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

export const invoiceValidationSchema = baseValidationSchema.concat(
  Yup.object().shape({
    dateGenerated: Yup.string().min(1, "Invoice date is required"),
    paymentTerms: Yup.number().min(0, "Invalid payment terms"),
    name: Yup.string().required("Distributor name is required"),
    items: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Item name is required"),
        quantity: Yup.number()
          .test(
            "is-nan",
            "Quantity must be a number",
            (value) => value !== undefined && !isNaN(value),
          )
          .min(1, "Quantity must be greater than 0")
          .required("Quantity is required"),
        price: Yup.number()
          .typeError("Price must be a valid number")
          .test(
            "is-nan",
            "Price must be a number",
            (value) => value !== undefined && !isNaN(value),
          )
          .min(0.01, "Price must be greater than 0.01")
          .required("Price is required"),
        // total: Yup.number()
        //   .min(0, "Total cannot be negative")
        //   .required("Total is required"),
      }),
    ),
  }),
);

// export const invoiceValidationSchema = baseDistributorSchema.extend({
//   dateGenerated: z.string().min(1, "Invoice date is required"),
//   paymentTerms: z.number().min(0, "Invalid payment terms"),
// items: z
//   .array(
//     z.object({
//       name: z.string().min(1, "Item name is required"),
//       quantity: z.number().min(1, "Quantity must be at least 1"),
//       price: z.number().min(0.01, "Price must be at least $0.01"),
//     }),
//   )
//   .nonempty("At least one item is required"),
// });

// export const InvoiceItemSchema = z.object({
//   name: z.string().min(1, "Item name is required"),
//   quantity: z.number().min(1, "Quantity must be at least 1"),
//   price: z.number().min(0.01, "Price must be at least $0.01"),
// });

// export const InvoiceValidationSchema = z.object({
//   distributorId: z.string().min(1, "Distributor is required"),
//   dateGenerated: z.string().min(1, "Date is required"),
//   paymentTerms: z.number().min(0, "Invalid payment terms"),
//   items: z.array(InvoiceItemSchema).nonempty("At least one item is required"),
// });
