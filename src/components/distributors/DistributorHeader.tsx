import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import CommonHeader from "../common/Header";
import {
  type FilterOption,
  type FilterCriteria,
  CheckboxRow,
  CheckboxLabelPair,
  InputField,
} from "../common/DropdownFilter";

interface DistributorHeaderProps {
  pendingDistributorsCount: number | undefined;
  onNewDistributorClick: () => void;
  filterOptions: FilterOption[];
  onFilterChange: (criteria: FilterCriteria) => void;
  filterCriteria: FilterCriteria;
}

const DistributorHeader: React.FC<DistributorHeaderProps> = ({
  pendingDistributorsCount,
  onNewDistributorClick,
  filterOptions,
  onFilterChange,
  filterCriteria,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCheckboxChange = (option: "allPaid" | "pending") => {
    const updatedValue = option === "allPaid";
    onFilterChange({
      ...filterCriteria,
      allInvoicesPaid:
        filterCriteria.allInvoicesPaid === updatedValue
          ? undefined
          : updatedValue,
    });
  };

  const renderDistributorFilterContent = () => (
    <>
      <div>
        <label htmlFor="distributorName">Distributor Name:</label>
        <InputField
          type="text"
          id="distributorName"
          name="distributorName"
          value={filterCriteria.distributorName || ""}
          onChange={(e) =>
            onFilterChange({
              ...filterCriteria,
              distributorName: e.target.value,
            })
          }
        />
      </div>
      <CheckboxRow>
        {filterOptions.map((option, index) => (
          <CheckboxLabelPair key={option.value}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              name={option.value}
              checked={
                filterCriteria.allInvoicesPaid === (option.value === "allPaid")
              }
              onChange={() =>
                handleCheckboxChange(
                  option.value === "allPaid" ? "allPaid" : "pending",
                )
              }
            />
            <label htmlFor={`checkbox-${index}`}>{option.label}</label>
          </CheckboxLabelPair>
        ))}
      </CheckboxRow>
    </>
  );

  return (
    <CommonHeader
      title="Distributors"
      subtitle={`${pendingDistributorsCount} unpaid accounts`}
      onNewButtonClick={onNewDistributorClick}
      renderFilterContent={renderDistributorFilterContent}
      dropdownLabel={isMobile ? "Filter" : "Filter distributors"}
      filterOptions={filterOptions}
      onFilterChange={onFilterChange}
      filterCriteria={filterCriteria}
      newButtonLabel="New Distributor"
    />
  );
};

export default DistributorHeader;
