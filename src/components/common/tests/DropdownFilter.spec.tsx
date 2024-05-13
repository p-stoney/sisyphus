import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropdownFilter from "../DropdownFilter";

function setup() {
  const renderContent = () => <div>Filter Content</div>;
  const onFilterChange = vi.fn();
  const user = userEvent.setup();

  const utils = render(
    <DropdownFilter
      filterOptions={[]}
      onFilterChange={onFilterChange}
      filterCriteria={{}}
      renderContent={renderContent}
      dropdownLabel="Filter"
    />,
  );

  return {
    renderContent,
    onFilterChange,
    user,
    ...utils,
  };
}

describe("DropdownFilter Component", () => {
  it("renders the dropdown button with label", () => {
    setup();
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("opens and displays content when the dropdown button is clicked", async () => {
    const { user } = setup();
    await user.click(screen.getByText("Filter"));
    expect(screen.getByText("Filter Content")).toBeVisible();
  });

  it("closes the dropdown when clicking outside", async () => {
    const { user } = setup();
    await user.click(screen.getByText("Filter"));
    expect(screen.getByText("Filter Content")).toBeVisible();
    await user.click(document.body);
    expect(screen.queryByText("Filter Content")).not.toBeInTheDocument();
  });

  it("closes the dropdown when the Escape key is pressed", async () => {
    const { user } = setup();
    await user.click(screen.getByText("Filter"));
    expect(screen.getByText("Filter Content")).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("Filter Content")).not.toBeInTheDocument();
  });
});
