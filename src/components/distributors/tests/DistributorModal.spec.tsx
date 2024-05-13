/* eslint-disable @typescript-eslint/no-unsafe-call */
import { vi, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import DistributorModal from "../DistributorModal";
import { useAuth } from "@clerk/nextjs";
import { api } from "~/utils/api";

vi.mock("@clerk/nextjs", () => ({
  useAuth: vi.fn(),
}));

vi.mock("~/utils/api", () => ({
  api: {
    user: {
      getBusinessId: {
        useQuery: vi.fn(),
      },
    },
    distributor: {
      createDistributor: {
        useMutation: vi.fn(),
      },
    },
  },
}));

describe("DistributorModal Component", () => {
  const onCloseMock = vi.fn();

  const mockBusinessId = "mock-business-id";
  const mockUserId = "mock-user-id";

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as Mock).mockReturnValue({ userId: mockUserId });

    // Mock the API data
    api.user.getBusinessId.useQuery.mockReturnValue({
      data: mockBusinessId,
      isLoading: false,
    });

    api.distributor.createDistributor.useMutation.mockReturnValue({
      mutateAsync: vi.fn().mockResolvedValue({}),
    });
  });

  const renderDistributorModal = () =>
    render(<DistributorModal isOpen={true} onClose={onCloseMock} />);

  it("renders the modal and form fields", () => {
    renderDistributorModal();

    expect(screen.getByText("New Distributor")).toBeInTheDocument();
    expect(screen.getByText("Save Distributor")).toBeInTheDocument();
  });

  it("displays 'Loading business details...' when business data is loading", () => {
    api.user.getBusinessId.useQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    renderDistributorModal();

    expect(screen.getByText("Loading business details...")).toBeInTheDocument();
  });
});
