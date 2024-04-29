import { z } from "zod";

export interface FormValues {
  name: string;
  distributorId?: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  dateGenerated?: string;
  paymentTerms: number;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
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
  items: [{ name: "", quantity: 0, price: 0, total: 0 }],
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
