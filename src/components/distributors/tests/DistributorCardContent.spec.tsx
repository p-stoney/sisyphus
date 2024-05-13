import { render, screen } from "@testing-library/react";
import DistributorCardContent from "../DistributorCardContent";
import { mockDistributor } from "~/__mocks__/mocks";

function setup() {
  render(<DistributorCardContent {...mockDistributor} />);
}

describe("DistributorCardContent Component", () => {
  it("renders the distributor's name, email, and address details", () => {
    setup();

    expect(screen.getByText("ABC Distributors")).toBeInTheDocument();
    expect(screen.getByText("contact@abcdist.com")).toBeInTheDocument();
    expect(screen.getByText("123 Any Street")).toBeInTheDocument();
    expect(screen.getByText("Anytown")).toBeInTheDocument();
    expect(screen.getByText("Anystate")).toBeInTheDocument();
    expect(screen.getByText("12345")).toBeInTheDocument();
  });
});
