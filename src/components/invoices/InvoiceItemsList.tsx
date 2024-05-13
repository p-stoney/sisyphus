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

interface ItemsListProps {
  values: InvoiceFormValues;
  arrayHelpers: FieldArrayRenderProps;
  setFieldValue: (field: string, value: string | number) => void;
  errors: FormikErrors<InvoiceFormValues>;
  touched: FormikTouched<InvoiceFormValues>;
}

const ItemsList: React.FC<ItemsListProps> = ({
  values,
  arrayHelpers,
  setFieldValue,
  errors,
  touched,
}) => {
  const handleRemove = (index: number) => {
    console.log(
      `Marking item at index ${index} as deleted`,
      values.items[index],
    );
    arrayHelpers.replace(index, { ...values.items[index], isDeleted: true });
  };

  return (
    <Grid container spacing={2}>
      {values.items.map((item, index) => {
        if (item.isDeleted) {
          console.log(
            `Item at index ${index} is marked deleted and not rendered`,
          );
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
              arrayHelpers.push({ name: "", quantity: 0, price: 0, total: 0 });
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
