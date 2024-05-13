import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import DistributorItem from "../DistributorItem";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
vi.mock("next/router", () => require("next-router-mock"));

describe("DistributorItem Component", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });

  const defaultProps = {
    id: "dist123",
    name: "Test Distributor",
    distributorEmail: "test@distributor.com",
    amountDue: 1200.5,
    allInvoicesPaid: false,
  };

  it("renders distributor details correctly", () => {
    render(<DistributorItem {...defaultProps} />, {
      wrapper: MemoryRouterProvider,
    });

    expect(screen.getByText("Test Distributor")).toBeInTheDocument();
    expect(screen.getByText("test@distributor.com")).toBeInTheDocument();
    expect(screen.getByText("$1200.50")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByAltText("Go to details")).toBeInTheDocument();
  });

  it("displays 'All Paid' status when all invoices are paid", () => {
    render(<DistributorItem {...defaultProps} allInvoicesPaid={true} />, {
      wrapper: MemoryRouterProvider,
    });

    expect(screen.getByText("All Paid")).toBeInTheDocument();
  });

  it("contains correct links for navigation", () => {
    render(<DistributorItem {...defaultProps} />, {
      wrapper: MemoryRouterProvider,
    });

    const distributorLink = screen.getByRole("link", { name: "Go to details" });
    expect(distributorLink).toHaveAttribute("href", "/distributors/dist123");
  });
});
