import React from "react";
import type {
  FieldArrayRenderProps,
  FormikErrors,
  FormikTouched,
} from "formik";
import { Grid } from "@mui/material";
import FormItem from "../common/FormItem";
import styled from "styled-components";
import type { FormValues } from "~/server/helpers/formUtils";

interface ItemsListProps {
  values: FormValues;
  arrayHelpers: FieldArrayRenderProps;
  handleChange: (field: string, value: string | number) => void;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
}

interface ButtonProps {
  $fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: #6096b4;
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 0.6rem 0.8rem;
  margin-top: 1rem;
  font-size: 0.84rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  cursor: pointer;
  margin-right: 0.25rem;
  outline: none;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

  &:hover {
    background-color: #2a7096;
  }
`;

const PlusIcon = styled.span`
  background-color: #eee9da;
  border: 1px solid #6096b4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  font-size: 0.9rem;
  color: #6096b4;
  margin-left: -0.3rem;
`;

const ItemsList: React.FC<ItemsListProps> = ({
  values,
  arrayHelpers,
  handleChange,
  errors,
  touched,
}) => {
  const handleRemoveById = (id: string) => {
    const index = values.items.findIndex((item) => item.id === id);
    if (index > -1) {
      arrayHelpers.remove(index);
    }
  };

  return (
    <Grid container spacing={2}>
      {values.items.map((item) => (
        <Grid item xs={12} key={item.id}>
          <FormItem
            // key={item.id}
            item={item}
            handleRemove={() => handleRemoveById(item.id)}
            handleChange={handleChange}
            errors={errors}
            touched={touched}
          />
        </Grid>
      ))}
      <Button
        $fullWidth
        type="button"
        onClick={() =>
          arrayHelpers.push({
            id: Date.now().toString(),
            name: "",
            quantity: 1,
            price: 0.0,
            productId: "",
          })
        }
      >
        <PlusIcon>+</PlusIcon> Add New Item
      </Button>
    </Grid>
  );
};

export default ItemsList;
