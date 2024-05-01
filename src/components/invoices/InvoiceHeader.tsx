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

interface InvoiceHeaderProps {
  pendingInvoiceCount: number | undefined;
  onNewInvoiceClick: () => void;
  filterOptions: FilterOption[];
  onFilterChange: (criteria: FilterCriteria) => void;
  filterCriteria: FilterCriteria;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  pendingInvoiceCount,
  onNewInvoiceClick,
  filterOptions,
  onFilterChange,
  filterCriteria,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCheckboxChange = (option: "paid" | "pending") => {
    const updatedCriteria: FilterCriteria = {
      ...filterCriteria,
      [option]: filterCriteria[option] !== true,
    };
    onFilterChange(updatedCriteria);
  };

  const renderInvoiceFilterContent = () => (
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
      <div>
        <label htmlFor="invoiceId">Invoice ID:</label>
        <InputField
          type="text"
          id="invoiceId"
          name="invoiceId"
          value={filterCriteria.id || ""}
          onChange={(e) =>
            onFilterChange({ ...filterCriteria, id: e.target.value })
          }
        />
      </div>
      <CheckboxRow>
        {filterOptions.map((option, index) => (
          <CheckboxLabelPair key={index}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              name={option.value}
              checked={!!filterCriteria[option.value as keyof FilterCriteria]}
              onChange={() =>
                handleCheckboxChange(option.value as "paid" | "pending")
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
      title="Invoices"
      subtitle={`${pendingInvoiceCount} pending invoices`}
      renderFilterContent={renderInvoiceFilterContent}
      dropdownLabel={isMobile ? "Filter" : "Filter invoices"}
      filterOptions={filterOptions}
      onFilterChange={onFilterChange}
      filterCriteria={filterCriteria}
      newButtonLabel="New Invoice"
      onNewButtonClick={onNewInvoiceClick}
    />
  );
};

export default InvoiceHeader;
