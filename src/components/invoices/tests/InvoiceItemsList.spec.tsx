import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik, Form, type FieldArrayRenderProps } from "formik";
import ItemsList from "../InvoiceItemsList";
import { initialFormValues } from "~/__mocks__/mocks";
import { mockProducts } from "~/__mocks__/mocks";

describe("InvoiceItemsList Component", () => {
  const mockSetFieldValue = vi.fn();

  const mockArrayHelpers: Partial<FieldArrayRenderProps> = {
    push: vi.fn(),
    remove: vi.fn() as (index: number) => undefined,
    replace: vi.fn(),
  };

  const renderInvoiceItemsList = () =>
    render(
      <Formik initialValues={initialFormValues} onSubmit={vi.fn()}>
        <Form>
          <ItemsList
            products={mockProducts}
            values={initialFormValues}
            arrayHelpers={mockArrayHelpers as FieldArrayRenderProps}
            setFieldValue={mockSetFieldValue}
            errors={{}}
            touched={{}}
          />
        </Form>
      </Formik>,
    );

  it("renders items not marked as deleted", () => {
    renderInvoiceItemsList();
    const nameInput = screen.getByLabelText(`itemName-0`);
    expect(nameInput).toBeInTheDocument();
    const nameInput2 = screen.getByLabelText(`itemName-1`);
    expect(nameInput2).toBeInTheDocument();
  });

  it("does not render items marked as deleted", () => {
    initialFormValues.items[1]!.isDeleted = true;
    renderInvoiceItemsList();
    const nameInput = screen.getByLabelText(`itemName-0`);
    expect(nameInput).toBeInTheDocument();
    const nameInput2 = screen.queryByText(`itemName-1`);
    expect(nameInput2).not.toBeInTheDocument();
  });

  it("adds a new item when the add button is clicked", async () => {
    const user = userEvent.setup();
    renderInvoiceItemsList();

    const addButton = screen.getByText("Add New Item");
    await user.click(addButton);

    expect(mockArrayHelpers.push).toHaveBeenCalledWith({
      id: "",
      name: "",
      quantity: 0,
      price: 0,
      total: 0,
    });
  });

  it("calls handleRemove with the correct index when the remove button is clicked", async () => {
    const user = userEvent.setup();
    renderInvoiceItemsList();

    const firstRemoveButton = screen.getByLabelText("remove-item-0");
    await user.click(firstRemoveButton);

    expect(mockArrayHelpers.replace).toHaveBeenCalledTimes(1);
  });
});
