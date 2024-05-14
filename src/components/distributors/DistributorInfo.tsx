import React, { useEffect } from "react";
import { Grid, InputLabel, TextField, Select, MenuItem } from "@mui/material";
import type { Distributor } from "@prisma/client";
import type { FormikErrors, FormikTouched } from "formik";
import type { FormValues } from "~/server/helpers/formUtils";
import DistributorNameSelect from "./DistributorNameSelect";

interface DistributorInfoProps {
  usStates: string[];
  setFieldValue: (field: string, value: string) => void;
  setDistributorId?: (id: string) => void;
  values: FormValues;
  distributors: Distributor[];
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  isDropdown?: boolean;
}

const DistributorInfo: React.FC<DistributorInfoProps> = ({
  usStates,
  setFieldValue,
  setDistributorId,
  values,
  distributors,
  errors,
  touched,
  isDropdown = false,
}) => {
  const ITEM_HEIGHT = 48;

  useEffect(() => {
    if (values.distributorId && distributors.length) {
      const distributor = distributors.find(
        (d) => d.id === values.distributorId,
      );
      if (distributor) {
        setFieldValue("name", distributor.name);
        setFieldValue("email", distributor.email);
        setFieldValue("address", distributor.address);
        setFieldValue("city", distributor.city);
        setFieldValue("postalCode", distributor.postalCode);
        setFieldValue("state", distributor.state);
      }
    }
  }, [values.distributorId, distributors, setFieldValue]);

  return (
    <Grid container spacing={2} marginBottom=".75rem">
      {/* Distributor Name Field */}
      {isDropdown ? (
        <DistributorNameSelect
          labelId="distributor-id"
          distributorId={values.distributorId}
          onChange={(e) => {
            const id = e.target.value;
            setFieldValue("distributorId", id);
            if (setDistributorId) {
              setDistributorId(id);
            }
          }}
          distributors={distributors}
          errors={errors}
          touched={touched}
        />
      ) : (
        <Grid item xs={12} md={6}>
          <InputLabel htmlFor="distributor-name">Distributor Name</InputLabel>
          <TextField
            fullWidth
            id="distributor-name"
            name="distributorName"
            value={values.name}
            onChange={(e) => setFieldValue("name", e.target.value)}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
        </Grid>
      )}
      {/* Email Address Field */}
      <Grid item xs={12} md={6}>
        <InputLabel htmlFor="distributor-email">Email Address</InputLabel>
        <TextField
          fullWidth
          id="distributor-email"
          name="distributorEmail"
          value={values.email}
          onChange={(e) => setFieldValue("email", e.target.value)}
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
          onChange={(e) => setFieldValue("address", e.target.value)}
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
          onChange={(e) => setFieldValue("city", e.target.value)}
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
          onChange={(e) => setFieldValue("postalCode", e.target.value)}
          error={touched.postalCode && Boolean(errors.postalCode)}
          helperText={touched.postalCode && errors.postalCode}
        />
      </Grid>
      {/* State Dropdown */}
      <Grid item xs={6} md={4}>
        <InputLabel htmlFor="distributor-state">State</InputLabel>
        <Select
          fullWidth
          id="distributor-state"
          name="state"
          value={values.state}
          onChange={(e) => setFieldValue("state", e.target.value)}
          error={touched.state && Boolean(errors.state)}
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
