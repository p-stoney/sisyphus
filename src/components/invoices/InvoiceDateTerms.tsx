import React from "react";
import { Grid, InputLabel, TextField, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import type { FormikErrors, FormikTouched } from "formik";
import type { FormValues } from "~/server/helpers/formUtils";

interface InvoiceDateAndTermsProps {
  paymentTermsOptions: number[];
  handleChange: (field: keyof FormValues, value: string | number) => void;
  values: FormValues;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
}

const InvoiceDateTerms: React.FC<InvoiceDateAndTermsProps> = ({
  paymentTermsOptions,
  handleChange,
  values,
  errors,
  touched,
}) => {
  /**
   * InvoiceDateAndTerms component represents the invoice date and payment terms in the invoice creation form.
   * It is part of the InvoiceModal and utilizes Formik for form handling.
   */
  return (
    <Grid container spacing={2} marginBottom=".75rem">
      {/* Invoice Date Field */}
      <Grid item xs={12} md={6}>
        <InputLabel htmlFor="invoice-date">Invoice Date</InputLabel>
        <TextField
          fullWidth
          type="date"
          id="invoice-date"
          name="dateGenerated"
          InputLabelProps={{ shrink: true }}
          error={touched.dateGenerated && Boolean(errors.dateGenerated)}
          helperText={touched.dateGenerated && errors.dateGenerated}
          onChange={(e) => handleChange("dateGenerated", e.target.value)}
          /**
           * Formik integration for handling errors and helper text.
           * Displays validation feedback for the date field.
           */
        />
      </Grid>
      {/* Payment Terms Dropdown */}
      <Grid item xs={12} md={6}>
        <InputLabel htmlFor={"input-id"}>Payment Terms</InputLabel>
        <Select
          fullWidth
          id="payment-terms"
          name="paymentTerms"
          value={values.paymentTerms}
          onChange={(e) => handleChange("paymentTerms", e.target.value)}
          inputProps={{ id: "input-id" }}
        >
          {paymentTermsOptions.map((term) => (
            <MenuItem key={term} value={term}>
              {term}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default InvoiceDateTerms;
