import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import InvoiceItem from "../InvoiceItem";
import { type InvoiceStatus } from "@prisma/client";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
vi.mock("next/router", () => require("next-router-mock"));

describe("InvoiceItem Component", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });

  const defaultProps = {
    id: "inv123",
    paymentDueDate: "2023-12-31",
    name: "Test Invoice",
    amountDue: 250.75,
    status: "UNPAID" as InvoiceStatus,
  };

  it("renders invoice details correctly", () => {
    render(<InvoiceItem {...defaultProps} />, {
      wrapper: MemoryRouterProvider,
    });

    expect(screen.getByText("Test Invoice")).toBeInTheDocument();
    expect(screen.getByText("#inv123")).toBeInTheDocument();
    expect(screen.getByText("Due 2023-12-31")).toBeInTheDocument();
    expect(screen.getByText("$250.75")).toBeInTheDocument();
    expect(screen.getByText("UNPAID")).toBeInTheDocument();
    expect(screen.getByAltText("Go to details")).toBeInTheDocument();
  });

  it("displays '0' for amount due when status is 'PAID'", () => {
    render(<InvoiceItem {...defaultProps} status="PAID" />, {
      wrapper: MemoryRouterProvider,
    });

    expect(screen.getByText("PAID")).toBeInTheDocument();
  });

  it("contains correct links for navigation", () => {
    render(<InvoiceItem {...defaultProps} />, {
      wrapper: MemoryRouterProvider,
    });

    const invoiceLink = screen.getByRole("link", { name: "Go to details" });
    expect(invoiceLink).toHaveAttribute("href", "/invoices/inv123");
  });
});
