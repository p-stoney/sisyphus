import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import rightCaretIcon from "../../assets/right-caret.svg";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterCriteria {
  paid?: boolean;
  pending?: boolean;
  distributorName?: string;
  id?: string;
  allInvoicesPaid?: boolean;
}

export const CheckboxRow = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-evenly;
  margin-top: 0.25rem;
`;

export const CheckboxLabelPair = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

export const InputField = styled.input`
  width: 10rem;
  margin-top: 0.2rem;
`;

/**
 * DropdownFilterProps interface represents the props taken by the DropdownFilter component.
 * - `filterOptions`: Array of objects representing the filter options available.
 * - `onFilterChange`: Function that is called when the filter criteria change.
 * - `filterCriteria`: Object representing the current filter criteria.
 * - `renderContent`: Function to render the content within the dropdown.
 * - `dropdownLabel`: Text label for the dropdown button.
 */
interface DropdownFilterProps {
  filterOptions: FilterOption[];
  onFilterChange: (criteria: FilterCriteria) => void;
  filterCriteria: FilterCriteria;
  renderContent: () => React.ReactNode;
  dropdownLabel: string;
}

export interface DropdownFilterUIProps {
  filterOptions: FilterOption[];
  filterCriteria: FilterCriteria;
  onFilterChange: (criteria: FilterCriteria) => void;
}

const DropdownContainer = styled.div`
  position: relative;
`;

const FilterOptionsContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  background-color: #eee9da;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  margin-top: 0.75rem;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 550;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  outline: none;
  font-size: 0.84rem;
  font-weight: bold;
`;

const CaretIcon = styled.img`
  transition: transform 0.3s ease;
  width: 0.76rem;
  height: auto;
`;

/**
 * `showFilterOptions` state is used to toggle the visibility of the filter options.
 */
const DropdownFilter: React.FC<DropdownFilterProps> = ({
  renderContent,
  dropdownLabel,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Toggles the visibility of the filter options.
   * This function is triggered when the dropdown button is clicked.
   */
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  /**
   * Effect hook to handle click events outside the component.
   * It listens for clicks outside the dropdown to close the filter options.
   */
  useEffect(() => {
    if (isDropdownOpen) {
      window.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        {dropdownLabel}
        <CaretIcon
          src={rightCaretIcon as string}
          style={{
            transform: `rotate(${isDropdownOpen ? "-90deg" : "90deg"})`,
          }}
        />
      </DropdownButton>
      {isDropdownOpen && (
        <FilterOptionsContainer>{renderContent()}</FilterOptionsContainer>
      )}
    </DropdownContainer>
  );
};

export default DropdownFilter;
