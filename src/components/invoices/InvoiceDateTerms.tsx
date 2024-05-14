import React from "react";
import { Grid, InputLabel, TextField } from "@mui/material";
import type { FormikErrors, FormikTouched } from "formik";
import type { FormValues } from "~/server/helpers/formUtils";

interface InvoiceDateAndTermsProps {
  values: FormValues;
  setFieldValue: (field: string, value: string) => void;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
}

const InvoiceDateTerms: React.FC<InvoiceDateAndTermsProps> = ({
  values,
  setFieldValue,
  errors,
  touched,
}) => {
  return (
    <Grid item xs={12} md={6}>
      <InputLabel htmlFor="invoice-date">Invoice Date</InputLabel>
      <TextField
        fullWidth
        type="date"
        id="invoice-date"
        name="dateGenerated"
        value={values.dateGenerated}
        InputLabelProps={{ shrink: true }}
        error={touched.dateGenerated && Boolean(errors.dateGenerated)}
        helperText={touched.dateGenerated && errors.dateGenerated}
        onChange={(e) => setFieldValue("dateGenerated", e.target.value)}
      />
    </Grid>
  );
};

export default InvoiceDateTerms;
