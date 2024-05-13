import { render, screen } from "@testing-library/react";
import InvoiceTable from "../InvoiceTable";
import { mockInvoice } from "~/__mocks__/mocks";

describe("InvoiceTable Component", () => {
  const renderInvoiceTable = () => {
    return render(<InvoiceTable {...mockInvoice} />);
  };

  it("renders a list of invoice items correctly", () => {
    renderInvoiceTable();

    mockInvoice.items.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.quantity.toString())).toBeInTheDocument();
      expect(screen.getByText(`$${item.price.toFixed(2)}`)).toBeInTheDocument();
      expect(
        screen.getByText(`$${(Number(item.price) * item.quantity).toFixed(2)}`),
      ).toBeInTheDocument();
    });
  });

  it("displays the total amount due", () => {
    renderInvoiceTable();
    expect(screen.getByText("Amount Due")).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockInvoice.amountDue.toFixed(2)}`),
    ).toBeInTheDocument();
  });
});
