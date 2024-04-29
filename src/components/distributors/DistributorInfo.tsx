import React, { useEffect } from "react";
import {
  Grid,
  InputLabel,
  TextField,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import type { Distributor } from "@prisma/client";
import type { FormikErrors, FormikTouched } from "formik";
import type { FormValues } from "~/server/helpers/formUtils";

interface DistributorInfoProps {
  usStates: string[];
  handleChange: (field: keyof FormValues, value: string | number) => void;
  setDistributorId?: (id: string) => void;
  values: FormValues;
  distributors: Distributor[];
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  isDropdown?: boolean;
}

const DistributorInfo: React.FC<DistributorInfoProps> = ({
  usStates,
  handleChange,
  setDistributorId,
  values,
  distributors,
  errors,
  touched,
  isDropdown = false,
}) => {
  const ITEM_HEIGHT = 48;

  useEffect(() => {
    if (values.distributorId) {
      const distributor = distributors.find(
        (d) => d.id === values.distributorId,
      );
      if (distributor) {
        handleChange("name", distributor.name);
        handleChange("email", distributor.email);
        handleChange("address", distributor.address);
        handleChange("city", distributor.city);
        handleChange("postalCode", distributor.postalCode);
        handleChange("state", distributor.state);
      }
    }
  }, [values.distributorId, distributors, handleChange]);

  return (
    <Grid container spacing={2} marginBottom=".75rem">
      {/* Conditional Distributor Name Field */}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth error={touched.name && Boolean(errors.name)}>
          <InputLabel id="distributor-select-label">Distributor</InputLabel>
          {isDropdown ? (
            <Select
              labelId="distributor-select-label"
              id="distributor-select"
              name="distributorId"
              value={values.distributorId}
              onChange={(e) => {
                handleChange("distributorId", e.target.value);
                if (setDistributorId) {
                  setDistributorId(e.target.value);
                }
              }}
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
          ) : (
            <TextField
              fullWidth
              id="distributor-name"
              name="name"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          )}
          <FormHelperText>{touched.name && errors.name}</FormHelperText>
        </FormControl>
      </Grid>
      {/* Email Address Field */}
      <Grid item xs={12} md={6}>
        <InputLabel htmlFor="distributor-email">Email Address</InputLabel>
        <TextField
          fullWidth
          id="distributor-email"
          name="distributorEmail"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
      </Grid>
      {/* Address Field */}
      <Grid item xs={12}>
        <InputLabel htmlFor="distributor-address">Address</InputLabel>
        <TextField
          fullWidth
          id="distributor-address"
          name="distributorAddress"
          value={values.address}
          onChange={(e) => handleChange("address", e.target.value)}
          error={touched.address && Boolean(errors.address)}
          helperText={touched.address && errors.address}
        />
      </Grid>
      {/* City Field */}
      <Grid item xs={12} md={4}>
        <InputLabel htmlFor="distributor-city">City</InputLabel>
        <TextField
          fullWidth
          id="distributor-city"
          name="distributorCity"
          value={values.city}
          onChange={(e) => handleChange("city", e.target.value)}
          error={touched.city && Boolean(errors.city)}
          helperText={touched.city && errors.city}
        />
      </Grid>
      {/* Postal Code Field */}
      <Grid item xs={6} md={4}>
        <InputLabel htmlFor="distributor-postal-code">Postal Code</InputLabel>
        <TextField
          fullWidth
          id="distributor-postal-code"
          name="distributorPostalCode"
          value={values.postalCode}
          onChange={(e) => handleChange("postalCode", e.target.value)}
          error={touched.postalCode && Boolean(errors.postalCode)}
          helperText={touched.postalCode && errors.postalCode}
        />
      </Grid>
      {/* State Dropdown */}
      <Grid item xs={6} md={4}>
        <InputLabel htmlFor={"input-id2"}>State</InputLabel>
        <Select
          fullWidth
          id="distributor-state"
          name="distributorState"
          value={values.state}
          onChange={(e) => handleChange("state", e.target.value)}
          error={touched.state && Boolean(errors.state)}
          inputProps={{ id: "input-id2" }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 150,
              },
            },
          }}
        >
          {usStates.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default DistributorInfo;
