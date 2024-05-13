import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InvoiceHeader from "../InvoiceHeader";

function setup({
  pendingInvoiceCount = 3,
  onNewInvoiceClick = vi.fn(),
  filterOptions = [
    { label: "Paid Invoices", value: "PAID" },
    { label: "Unpaid Invoices", value: "UNPAID" },
  ],
  onFilterChange = vi.fn(),
  filterCriteria = { status: undefined, name: "", id: "" },
}) {
  const user = userEvent.setup();

  render(
    <InvoiceHeader
      pendingInvoiceCount={pendingInvoiceCount}
      onNewInvoiceClick={onNewInvoiceClick}
      filterOptions={filterOptions}
      onFilterChange={onFilterChange}
      filterCriteria={filterCriteria}
    />,
  );

  return { user, onNewInvoiceClick, onFilterChange };
}

describe("InvoiceHeader Component", () => {
  it("renders title and subtitle with pending invoice count", () => {
    setup({ pendingInvoiceCount: 5 });

    expect(screen.getByText("Invoices")).toBeInTheDocument();
    expect(screen.getByText("5 pending invoices")).toBeInTheDocument();
  });

  it("calls onNewInvoiceClick when the 'New Invoice' button is clicked", async () => {
    const { user, onNewInvoiceClick } = setup({});
    const button = screen.getByText("New Invoice");

    await user.click(button);

    expect(onNewInvoiceClick).toHaveBeenCalledTimes(1);
  });

  it("renders invoice filter content correctly and updates criteria", async () => {
    const { user, onFilterChange } = setup({});

    await user.click(screen.getByText(/Filter/));

    expect(screen.getByLabelText("Distributor Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Invoice ID:")).toBeInTheDocument();

    const nameInput = screen.getByLabelText("Distributor Name:");
    await user.type(nameInput, "Sample Distributor");

    expect(onFilterChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ name: "r" }),
    );

    const paidCheckbox = screen.getByLabelText("Paid Invoices");
    await user.click(paidCheckbox);

    expect(onFilterChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ status: "PAID" }),
    );
  });
});
