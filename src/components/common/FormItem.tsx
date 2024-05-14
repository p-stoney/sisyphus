import React from "react";
import type { FormikErrors, FormikTouched } from "formik";
import {
  Grid,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
  InputLabel,
  TextField,
  useTheme,
  useMediaQuery,
  type SelectChangeEvent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Product } from "@prisma/client";

interface FormItemProps {
  item: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
  };
  index: number;
  handleRemove: () => void;
  setFieldValue: (field: string, value: string | number) => void;
  errors: FormikErrors<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  touched: FormikTouched<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  products: Product[];
}

const FormItem: React.FC<FormItemProps> = ({
  item,
  index,
  handleRemove,
  setFieldValue,
  errors,
  touched,
  products,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(
    `(min-width:${theme.breakpoints.values.sm}px) and (max-width:899px)`,
  );
  const isLargeScreen = useMediaQuery(`(min-width:900px)`);

  const nameError = errors.name;
  const nameTouched = touched.name;
  const quantityError = errors.quantity;
  const quantityTouched = touched.quantity;
  const priceError = errors.price;
  const priceTouched = touched.price;

  const { quantity, price } = item;

  const calculateTotal = () => {
    return (quantity * price).toFixed(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let fieldName = name;
    if (name === "itemQuantity" || name === "itemPrice") {
      fieldName = `items[${index}].${name.split("item")[1]!.toLowerCase()}`;
    }

    let newValue;
    if (name === "itemQuantity" || name === "itemPrice") {
      newValue = value === "" ? 0 : parseFloat(value);
      if (isNaN(newValue)) newValue = 0;
    } else {
      newValue = value;
    }
    setFieldValue(fieldName, newValue);
  };

  const handleProductChange = (e: SelectChangeEvent<string>) => {
    const selectedProduct = products.find(
      (product) => product.id === e.target.value,
    );
    if (selectedProduct) {
      setFieldValue(`items[${index}].id`, selectedProduct.id);
      setFieldValue(`items[${index}].name`, selectedProduct.id);
      setFieldValue(
        `items[${index}].price`,
        parseFloat(selectedProduct.price.toString()),
      );
      setFieldValue(
        `items[${index}].total`,
        (parseFloat(selectedProduct.price.toString()) * item.quantity).toFixed(
          2,
        ),
      );
    }
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
        <InputLabel htmlFor={`itemName-${index}`}>Item Name</InputLabel>
        <Select
          aria-label={`itemName-${index}`}
          fullWidth
          id={`itemName-${index}`}
          name={`items[${index}].name`}
          value={item.name}
          onChange={handleProductChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
        {nameTouched && Boolean(nameError) && (
          <FormHelperText>{nameError}</FormHelperText>
        )}
      </Grid>
      <Grid item xs={isMobile ? 3 : 6} md={2}>
        <InputLabel htmlFor={`itemQty-${index}`}>Qty.</InputLabel>
        <TextField
          fullWidth
          id={`itemQty-${index}`}
          name={`items[${index}].quantity`}
          value={quantity}
          type="number"
          onChange={handleInputChange}
          error={quantityTouched && Boolean(quantityError)}
          helperText={quantityTouched && quantityError}
        />
      </Grid>
      <Grid item xs={isMobile ? 3 : 6} md={2}>
        <InputLabel htmlFor={`itemPrice-${index}`}>Price</InputLabel>
        <TextField
          fullWidth
          id={`itemPrice-${index}`}
          name={`items[${index}].price`}
          value={price}
          type="number"
          onChange={handleInputChange}
          error={priceTouched && Boolean(priceError)}
          helperText={priceTouched && priceError}
        />
      </Grid>
      <Grid item xs={isMobile ? 4 : isMediumScreen ? 8 : 6} md={2}>
        <InputLabel htmlFor={`total-${index}`}>Total</InputLabel>
        <TextField
          fullWidth
          id={`total-${index}`}
          value={calculateTotal()}
          disabled
        />
      </Grid>
      <Grid item xs={isMobile ? 1 : isMediumScreen ? 1 : 2} md={1}>
        <IconButton
          onClick={() => {
            handleRemove();
          }}
          aria-label={`remove-item-${index}`}
          sx={{
            paddingTop: "2.2rem",
            paddingRight: isMobile ? "1.5rem" : "initial",
            marginLeft: "-.3rem",
            alignItems: "center",
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default FormItem;
