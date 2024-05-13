import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DistributorInfo from "../DistributorInfo";
import { mockDistributor } from "~/__mocks__/mocks";

const usStates = ["NY", "CA", "TX", "FL"];

const defaultValues = {
  distributorId: "",
  name: "",
  email: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
};

const setFieldValueMock = vi.fn();
const setDistributorIdMock = vi.fn();

const renderDistributorInfo = (props = {}) => {
  return render(
    <DistributorInfo
      usStates={usStates}
      setFieldValue={setFieldValueMock}
      setDistributorId={setDistributorIdMock}
      values={{
        ...defaultValues,
        ...props,
        dateGenerated: "",
        paymentTerms: 0,
        items: [],
      }}
      distributors={[mockDistributor]}
      errors={{}}
      touched={{}}
      isDropdown
    />,
  );
};

describe("DistributorInfo Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls setFieldValue and setDistributorId on distributor selection", async () => {
    const user = userEvent.setup();
    renderDistributorInfo();

    const distributorDropdown = screen.getByLabelText("Distributor");

    await user.click(distributorDropdown);
    await user.click(screen.getByText("ABC Distributors"));

    expect(setDistributorIdMock).toHaveBeenCalledWith("1");
  });

  it("updates field values on input change", async () => {
    const user = userEvent.setup();
    renderDistributorInfo();

    const emailInput = screen.getByLabelText("Email Address");
    await user.type(emailInput, "new@distributor.com");
    expect(setFieldValueMock).toHaveBeenLastCalledWith("email", "m");

    const cityInput = screen.getByLabelText("City");
    await user.type(cityInput, "Los Angeles");
    expect(setFieldValueMock).toHaveBeenLastCalledWith("city", "s");
  });
});
