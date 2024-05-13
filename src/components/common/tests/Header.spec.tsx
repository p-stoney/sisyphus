import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommonHeader from "../Header";
import { vi } from "vitest";

vi.mock("./DropdownFilter", () => ({
  __esModule: true,
  default: ({
    renderContent,
    dropdownLabel,
    onFilterChange,
  }: {
    renderContent: () => JSX.Element;
    dropdownLabel: string;
    onFilterChange: (value: { status: string }) => void;
  }) => (
    <div onClick={() => onFilterChange({ status: "PAID" })}>
      <button>{dropdownLabel}</button>
      {renderContent()}
    </div>
  ),
}));
vi.mock("./Button", () => ({
  __esModule: true,
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

function setup() {
  const onNewButtonClick = vi.fn();
  const onFilterChange = vi.fn();
  const renderFilterContent = () => <div>Filter Content</div>;
  const user = userEvent.setup();

  render(
    <CommonHeader
      title="Invoice Header"
      subtitle="All Invoices"
      onNewButtonClick={onNewButtonClick}
      renderFilterContent={renderFilterContent}
      dropdownLabel="Filter"
      filterOptions={[]}
      onFilterChange={onFilterChange}
      filterCriteria={{}}
      newButtonLabel="New Invoice"
    />,
  );

  return {
    onNewButtonClick,
    onFilterChange,
    renderFilterContent,
    user,
  };
}

describe("CommonHeader Component", () => {
  it("renders the title and subtitle", () => {
    setup();
    expect(screen.getByText("Invoice Header")).toBeInTheDocument();
    expect(screen.getByText("All Invoices")).toBeInTheDocument();
  });

  it("opens filter dropdown and displays content", async () => {
    const { user } = setup();
    await user.click(screen.getByText("Filter"));
    expect(screen.getByText("Filter Content")).toBeInTheDocument();
  });

  it("calls onNewButtonClick when new invoice button is clicked", async () => {
    const { user, onNewButtonClick } = setup();
    await user.click(screen.getByText("New Invoice"));
    expect(onNewButtonClick).toHaveBeenCalledTimes(1);
  });
});
