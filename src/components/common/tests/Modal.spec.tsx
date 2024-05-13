import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommonModal from "../Modal";
import { vi } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material";

function setup({ isOpen = true }: { isOpen?: boolean } = {}) {
  const onClose = vi.fn();
  const user = userEvent.setup();
  const theme = createTheme();

  render(
    <ThemeProvider theme={theme}>
      <CommonModal isOpen={isOpen} onClose={onClose} title="Modal Title">
        <div>Modal Content</div>
      </CommonModal>
    </ThemeProvider>,
  );

  return {
    onClose,
    user,
  };
}

describe("CommonModal Component", () => {
  it("renders the modal with the correct title and content when open", () => {
    setup({ isOpen: true });
    expect(screen.getByText("Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render the modal when it is not open", () => {
    setup({ isOpen: false });
    expect(screen.queryByText("Modal Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("calls the onClose function when the dialog backdrop is clicked", async () => {
    const { onClose, user } = setup({ isOpen: true });
    await user.click(document.querySelector(".MuiBackdrop-root")!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
