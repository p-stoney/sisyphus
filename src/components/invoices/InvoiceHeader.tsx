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

  const handleCheckboxChange = (option: "PAID" | "UNPAID") => {
    const currentStatus = filterCriteria.status;
    const newValue = currentStatus === option ? undefined : option;
    const updatedCriteria: FilterCriteria = {
      ...filterCriteria,
      status: newValue,
    };
    onFilterChange(updatedCriteria);
  };

  const renderInvoiceFilterContent = () => (
    <>
      <div>
        <label htmlFor="name">Distributor Name:</label>
        <InputField
          type="text"
          id="name"
          name="name"
          value={filterCriteria.name || ""}
          onChange={(e) =>
            onFilterChange({
              ...filterCriteria,
              name: e.target.value,
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
              checked={filterCriteria.status === option.value}
              onChange={() =>
                handleCheckboxChange(option.value as "PAID" | "UNPAID")
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
