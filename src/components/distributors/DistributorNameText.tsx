import React from "react";
import {
  FormControl,
  InputLabel,
  TextField,
  FormHelperText,
} from "@mui/material";
import type { ChangeEvent } from "react";
import type { FormikErrors, FormikTouched } from "formik";

interface DistributorNameTextProps {
  labelId: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: FormikErrors<{ name?: string }>;
  touched: FormikTouched<{ name?: boolean }>;
}

const DistributorNameText: React.FC<DistributorNameTextProps> = ({
  labelId,
  name,
  onChange,
  errors,
  touched,
}) => (
  <FormControl fullWidth error={touched.name && Boolean(errors.name)}>
    <InputLabel htmlFor={labelId}>Distributor Name</InputLabel>
    <TextField
      id={labelId}
      name="name"
      value={name}
      onChange={onChange}
      aria-labelledby={labelId}
    />
    <FormHelperText>{touched.name && errors.name}</FormHelperText>
  </FormControl>
);

export default DistributorNameText;
