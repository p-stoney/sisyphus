import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DistributorTable from "../DistributorTable";
import { mockDistributor, mockInvoices } from "~/__mocks__/mocks";

const mockTheme = createTheme();

describe("DistributorTable Component", () => {
  const renderDistributorTable = () =>
    render(
      <ThemeProvider theme={mockTheme}>
        <DistributorTable {...mockDistributor} />
      </ThemeProvider>,
    );

  it("renders a list of invoices correctly", () => {
    renderDistributorTable();

    mockInvoices.forEach((invoice) => {
      expect(screen.getByText(`#${invoice.id}`)).toBeInTheDocument();
      expect(
        screen.getByText(invoice.dueBy.toISOString().slice(0, 10)),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`$${invoice.amountDue.toFixed(2)}`),
      ).toBeInTheDocument();
    });

    const unpaidStatuses = mockInvoices.filter(
      (invoice) => invoice.status === "UNPAID",
    ).length;
    expect(screen.getAllByText("UNPAID")).toHaveLength(unpaidStatuses);
  });

  it("displays the total unpaid amount at the end of the table", () => {
    renderDistributorTable();

    const expectedTotalUnpaid = mockInvoices
      .filter((invoice) => invoice.status === "UNPAID")
      .reduce((acc, invoice) => acc + invoice.amountDue, 0)
      .toFixed(2);

    expect(screen.getByText(`$${expectedTotalUnpaid}`)).toBeInTheDocument();
    expect(screen.getByText("Total Unpaid")).toBeInTheDocument();
  });
});
