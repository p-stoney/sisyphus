import { render, screen } from "@testing-library/react";
import InvoiceCardContent from "../InvoiceCardContent";
import { mockInvoice } from "~/__mocks__/mocks";

vi.mock("~/utils/api", () => ({
  api: {
    distributor: {
      getById: {
        useQuery: vi.fn(() => ({
          data: mockInvoice,
          isLoading: false,
        })),
      },
    },
  },
}));

describe("InvoiceCardContent Component", () => {
  it("renders invoice details and distributor information correctly", () => {
    render(<InvoiceCardContent {...mockInvoice} />);

    expect(screen.getByText(`#${mockInvoice.id}`)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockInvoice.createdAt.toString()}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockInvoice.dueBy.toString()}`),
    ).toBeInTheDocument();
  });
});
