import React from "react";
import { Grid, Select, MenuItem, InputLabel } from "@mui/material";

interface PaymentTermsFieldProps {
  paymentTerms: number;
  setPaymentTerms: (value: string) => void;
  paymentTermsOptions: number[];
}

const PaymentTermsField: React.FC<PaymentTermsFieldProps> = ({
  paymentTerms,
  setPaymentTerms,
  paymentTermsOptions,
}) => {
  return (
    <Grid item xs={12}>
      <InputLabel htmlFor={"input-id"}>Payment Terms</InputLabel>
      <Select
        fullWidth
        id="payment-terms"
        name="paymentTerms"
        value={paymentTerms}
        onChange={(e) => setPaymentTerms(String(e.target.value))}
        inputProps={{ id: "input-id" }}
      >
        {paymentTermsOptions.map((term) => (
          <MenuItem key={term} value={term}>
            {term}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};

export default PaymentTermsField;
