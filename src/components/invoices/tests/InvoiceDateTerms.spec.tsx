import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InvoiceDateTerms from "../InvoiceDateTerms";
import type { FormValues } from "~/server/helpers/formUtils";

describe("InvoiceDateTerms Component", () => {
  const setFieldValueMock = vi.fn();
  const errorsMock = {
    dateGenerated: "Date is required",
  };
  const touchedMock = {
    dateGenerated: true,
  };
  const valuesMock = { dateGenerated: "" } as FormValues;

  function setup({
    errors = errorsMock,
    touched = touchedMock,
    setFieldValue = setFieldValueMock,
    values = valuesMock,
  } = {}) {
    render(
      <InvoiceDateTerms
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
      />,
    );
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays the error message when the date is required", () => {
    setup();

    expect(screen.getByLabelText("Invoice Date")).toHaveAttribute(
      "type",
      "date",
    );
    expect(screen.getByText("Date is required")).toBeInTheDocument();
  });

  it("calls setFieldValue with the correct value on date change", async () => {
    setup({
      errors: errorsMock,
      touched: touchedMock,
      setFieldValue: setFieldValueMock,
      values: valuesMock,
    });
    const user = userEvent.setup();

    const dateInput = screen.getByLabelText("Invoice Date");
    await user.type(dateInput, "2024-05-10");

    expect(setFieldValueMock).toHaveBeenCalledWith(
      "dateGenerated",
      "2024-05-10",
    );
  });
});
