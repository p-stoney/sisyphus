import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PaymentTermsField from "../PaymentTermsField";

function setup() {
  const paymentTermsOptions = [1, 14, 30, 45, 60];
  const mockSetPaymentTerms = vi.fn();
  const user = userEvent.setup();

  const utils = render(
    <PaymentTermsField
      paymentTerms={30}
      setPaymentTerms={mockSetPaymentTerms}
      paymentTermsOptions={paymentTermsOptions}
    />,
  );

  return {
    paymentTermsOptions,
    mockSetPaymentTerms,
    user,
    ...utils,
  };
}

describe("PaymentTermsField Component", () => {
  it("renders correctly with initial payment term selected", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("combobox"));
    expect(screen.getByRole("option", { name: "30" })).toBeInTheDocument();
  });

  it("displays all payment terms options", async () => {
    const { user, paymentTermsOptions } = setup();
    await user.click(screen.getByRole("combobox"));
    paymentTermsOptions.forEach((term) => {
      expect(
        screen.getByRole("option", { name: term.toString() }),
      ).toBeInTheDocument();
    });
  });

  it("changes payment term on selection", async () => {
    const { user, mockSetPaymentTerms } = setup();

    await user.click(screen.getByRole("combobox"));
    await user.selectOptions(
      screen.getByRole("listbox"),
      screen.getByRole("option", { name: "60" }),
    );

    expect(mockSetPaymentTerms).toHaveBeenCalledTimes(1);
    expect(mockSetPaymentTerms).toHaveBeenCalledWith(60);
  });
});
