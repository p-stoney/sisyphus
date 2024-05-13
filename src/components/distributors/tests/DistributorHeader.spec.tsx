import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DistributorHeader from "../DistributorHeader";

function setup({
  pendingDistributorsCount = 5,
  onNewDistributorClick = vi.fn(),
  filterOptions = [
    { label: "All Invoices Paid", value: "true" },
    { label: "Outstanding Invoices", value: "false" },
  ],
  onFilterChange = vi.fn(),
  filterCriteria = { allInvoicesPaid: undefined, name: "" },
}) {
  const user = userEvent.setup();

  render(
    <DistributorHeader
      pendingDistributorsCount={pendingDistributorsCount}
      onNewDistributorClick={onNewDistributorClick}
      filterOptions={filterOptions}
      onFilterChange={onFilterChange}
      filterCriteria={filterCriteria}
    />,
  );

  return { user, onNewDistributorClick, onFilterChange };
}

describe("DistributorHeader Component", () => {
  it("renders title and subtitle with distributor count", () => {
    setup({ pendingDistributorsCount: 3 });

    expect(screen.getByText("Distributors")).toBeInTheDocument();
    expect(screen.getByText("3 unpaid accounts")).toBeInTheDocument();
  });

  it("calls onNewDistributorClick when the 'New Distributor' button is clicked", async () => {
    const { user, onNewDistributorClick } = setup({});
    const button = screen.getByText("New Distributor");

    await user.click(button);

    expect(onNewDistributorClick).toHaveBeenCalledTimes(1);
  });

  it("renders distributor filter content correctly and updates criteria", async () => {
    const { user, onFilterChange } = setup({});

    await user.click(screen.getByText(/Filter/));

    expect(screen.getByLabelText("Distributor Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("All Invoices Paid")).toBeInTheDocument();
    expect(screen.getByLabelText("Outstanding Invoices")).toBeInTheDocument();

    const nameInput = screen.getByLabelText("Distributor Name:");
    await user.type(nameInput, "Test Distributor");

    expect(onFilterChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ name: "r" }),
    );

    const allInvoicesPaidCheckbox = screen.getByLabelText("All Invoices Paid");
    await user.click(allInvoicesPaidCheckbox);

    expect(onFilterChange).toHaveBeenLastCalledWith(
      expect.objectContaining({ allInvoicesPaid: true }),
    );
  });
});
