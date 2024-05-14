import React from "react";
import type {
  FieldArrayRenderProps,
  FormikErrors,
  FormikTouched,
} from "formik";
import { Grid } from "@mui/material";
import { ButtonWithProps, PlusIcon } from "../common/Button";
import FormItem from "../common/FormItem";
import type { FormValues as InvoiceFormValues } from "~/server/helpers/formUtils";
import type { Product } from "@prisma/client";

interface ItemsListProps {
  products: Product[];
  values: InvoiceFormValues;
  arrayHelpers: FieldArrayRenderProps;
  setFieldValue: (field: string, value: string | number) => void;
  errors: FormikErrors<InvoiceFormValues>;
  touched: FormikTouched<InvoiceFormValues>;
}

const ItemsList: React.FC<ItemsListProps> = ({
  products,
  values,
  arrayHelpers,
  setFieldValue,
  errors,
  touched,
}) => {
  const handleRemove = (index: number) => {
    arrayHelpers.replace(index, { ...values.items[index], isDeleted: true });
  };

  return (
    <Grid container spacing={2}>
      {values.items.map((item, index) => {
        if (item.isDeleted) {
          return null;
        }

        return (
          <Grid item xs={12} key={index}>
            <FormItem
              item={item}
              index={index}
              handleRemove={() => handleRemove(index)}
              setFieldValue={setFieldValue}
              errors={
                (errors.items &&
                  (errors.items[index] as
                    | FormikErrors<typeof item>
                    | undefined)) ||
                {}
              }
              touched={(touched.items && touched.items[index]) || {}}
              products={products}
            />
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Grid item xs={12}>
          <ButtonWithProps
            $fullWidth
            type="button"
            onClick={() => {
              arrayHelpers.push({
                id: "",
                name: "",
                quantity: 0,
                price: 0,
                total: 0,
              });
            }}
          >
            <PlusIcon>+</PlusIcon>Add New Item
          </ButtonWithProps>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemsList;
