import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import mockRouter from "next-router-mock";
import AppBar from "../AppBar";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
vi.mock("next/router", () => require("next-router-mock"));

describe("AppBar Component", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });

  it("renders correctly", () => {
    render(<AppBar />, { wrapper: MemoryRouterProvider });

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Inventory" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Distributors" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Invoices" })).toBeInTheDocument();
  });

  it("contains correct links for navigation", () => {
    render(<AppBar />, { wrapper: MemoryRouterProvider });

    const distributorLink = screen.getByRole("link", { name: "Distributors" });
    expect(distributorLink).toHaveAttribute("href", "/distributors");

    const invoicesLink = screen.getByRole("link", { name: "Invoices" });
    expect(invoicesLink).toHaveAttribute("href", "/invoices");
  });
});
