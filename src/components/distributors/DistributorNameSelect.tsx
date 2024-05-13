import React from "react";
import {
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { Distributor } from "@prisma/client";
import type { FormikErrors, FormikTouched } from "formik";

interface DistributorNameSelectProps {
  labelId: string;
  distributorId: string;
  onChange: (e: SelectChangeEvent<string>) => void;
  distributors: Distributor[];
  errors: FormikErrors<{ distributorId?: string }>;
  touched: FormikTouched<{ distributorId?: boolean }>;
}

const DistributorNameSelect: React.FC<DistributorNameSelectProps> = ({
  labelId,
  distributorId,
  onChange,
  distributors,
  errors,
  touched,
}) => (
  <Grid item xs={12} md={6}>
    <InputLabel id={labelId}>Distributor</InputLabel>
    <Select
      fullWidth
      labelId={labelId}
      id="distributor-id-select"
      name="distributorId"
      value={distributorId}
      onChange={onChange}
      displayEmpty
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {distributors.map((distributor) => (
        <MenuItem key={distributor.id} value={distributor.id}>
          {distributor.name}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText>
      {touched.distributorId && errors.distributorId}
    </FormHelperText>
  </Grid>
);

export default DistributorNameSelect;
