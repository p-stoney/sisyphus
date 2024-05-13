import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DistributorView from "../DistributorView";
import { mockDistributor } from "~/__mocks__/mocks";

describe("DistributorView Component", () => {
  beforeEach(() => {
    vi.spyOn(window.history, "back");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders distributor information and invoice details correctly", () => {
    render(<DistributorView {...mockDistributor} />);

    expect(screen.getByText("ABC Distributors")).toBeInTheDocument();
    expect(screen.getByText("contact@abcdist.com")).toBeInTheDocument();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("$1000.00")).toBeInTheDocument();
    expect(screen.getByText("2024-02-01")).toBeInTheDocument();
    expect(screen.getByText("$500.00")).toBeInTheDocument();
  });

  it("handles back navigation", async () => {
    const historyBackSpy = vi.spyOn(window.history, "back");
    const user = userEvent.setup();
    render(<DistributorView {...mockDistributor} />);
    const backButton = screen.getByLabelText("back");

    await user.click(backButton);

    expect(historyBackSpy).toHaveBeenCalledTimes(1);
  });
});
