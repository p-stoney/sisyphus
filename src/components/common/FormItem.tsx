import React from "react";
import type { FormikErrors, FormikTouched } from "formik";
import {
  Grid,
  IconButton,
  InputLabel,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { FormValues } from "~/server/helpers/formUtils";

interface FormItemProps {
  item: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  };
  handleRemove: () => void;
  handleChange: (field: string, value: string | number) => void;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
}

const FormItem: React.FC<FormItemProps> = ({
  item,
  handleRemove,
  handleChange,
  errors,
  touched,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(
    `(min-width:${theme.breakpoints.values.sm}px) and (max-width:899px)`,
  );
  const isLargeScreen = useMediaQuery(`(min-width:900px)`);

  const nameError = errors.name;
  const nameTouched = touched.name;
  const quantityError = errors.items?.[Number(item.id)];
  const quantityTouched = touched.items?.[Number(item.id)];
  const priceError = errors.items?.[Number(item.id)];
  const priceTouched = touched.items?.[Number(item.id)];

  const { quantity, price } = item;

  const calculateTotal = () => {
    return (quantity * price).toFixed(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let fieldName = name;
    if (name === "itemQuantity" || name === "itemPrice") {
      fieldName = `items[${item.id}].${name.split("item")[1]!.toLowerCase()}`;
    }

    let newValue;
    if (name === "itemQuantity" || name === "itemPrice") {
      newValue = value === "" ? 0 : parseFloat(value);
      if (isNaN(newValue)) newValue = 0;
    } else {
      newValue = value;
    }

    handleChange(fieldName, newValue);
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="flex-start"
      justifyContent="center"
      sx={{ justifyContent: isLargeScreen ? "flex-start" : "center" }}
    >
      <Grid item xs={12} md={5}>
        <InputLabel htmlFor={`itemName-${item.name}`}>Item Name</InputLabel>
        <TextField
          fullWidth
          id={`itemName-${item.id}`}
          name={`items[${item.id}].name`}
          value={item.name}
          type="text"
          onChange={handleInputChange}
          error={nameTouched && Boolean(nameError)}
          helperText={nameTouched && nameError}
        />
      </Grid>
      <Grid item xs={isMobile ? 3 : 6} md={2}>
        <InputLabel htmlFor={`itemQty-${item.quantity}`}>Qty.</InputLabel>
        <TextField
          fullWidth
          id={`itemQty-${item.id}`}
          name={`items[${item.id}].quantity`}
          value={item.quantity}
          type="number"
          onChange={handleInputChange}
          error={quantityTouched && Boolean(quantityError)}
          helperText={quantityTouched && (quantityError?.toString() ?? "")}
        />
      </Grid>
      <Grid item xs={isMobile ? 3 : 6} md={2}>
        <InputLabel htmlFor={`itemPrice-${item.price}`}>Price</InputLabel>
        <TextField
          fullWidth
          id={`itemPrice-${item.id}`}
          name={`items[${item.id}].price`}
          value={item.price}
          type="text"
          onChange={handleInputChange}
          error={priceTouched && Boolean(priceError)}
          helperText={priceTouched && (priceError?.toString() ?? "")}
        />
      </Grid>
      <Grid item xs={isMobile ? 4 : isMediumScreen ? 8 : 6} md={2}>
        <InputLabel htmlFor={`total-${item.total}`}>Total</InputLabel>
        <TextField
          fullWidth
          id={`total-${item.id}`}
          value={calculateTotal()}
          disabled
        />
      </Grid>
      <Grid item xs={isMobile ? 1 : isMediumScreen ? 1 : 2} md={1}>
        <IconButton
          onClick={() => handleRemove()}
          sx={{
            paddingTop: "2.2rem",
            paddingRight: isMobile ? "1.5rem" : "initial",
            marginLeft: "-.3rem",
            alignItems: "center",
          }}
        >
          <DeleteIcon data-testid="delete-icon" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default FormItem;
