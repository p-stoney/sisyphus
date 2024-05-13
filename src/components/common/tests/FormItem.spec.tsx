import { vi, type Mock } from "vitest";
import React, { useState, type FunctionComponent } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormItem from "../FormItem";

interface TestWrapperProps {
  onHandleRemove: () => void;
}

const TestWrapper: FunctionComponent<TestWrapperProps> = ({
  onHandleRemove,
}) => {
  const [item, setItem] = useState({
    id: "1",
    name: "Test Item",
    quantity: 10,
    price: 100,
    total: 1000,
  });

  const setFieldValue = (field: string, value: string | number) => {
    const parts = field.match(/([a-zA-Z]+)\[(\d+)\]\.([a-zA-Z]+)/);
    if (parts && parts.length === 4) {
      const key = parts[3] as keyof typeof item;
      setItem((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  return (
    <FormItem
      item={item}
      index={0}
      handleRemove={onHandleRemove}
      setFieldValue={setFieldValue}
      errors={{}}
      touched={{}}
    />
  );
};

describe("FormItem Component", () => {
  let handleRemoveSpy: Mock;

  beforeEach(() => {
    handleRemoveSpy = vi.fn();
  });

  it("handles changes in input fields", async () => {
    const user = userEvent.setup();
    render(<TestWrapper onHandleRemove={handleRemoveSpy} />);
    const priceInput = screen.getByLabelText("Price");

    await user.clear(priceInput);
    await user.type(priceInput, "200");

    expect(priceInput).toHaveValue("200");
  });

  it("removes an item when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(<TestWrapper onHandleRemove={handleRemoveSpy} />);

    const deleteButton = screen.getByLabelText("remove-item-0");
    await user.click(deleteButton);

    expect(handleRemoveSpy).toHaveBeenCalledTimes(1);
  });
});
