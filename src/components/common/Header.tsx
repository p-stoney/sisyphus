import React from "react";
import styled from "styled-components";
import { Button, PlusIcon } from "./Button";
import DropdownFilter, {
  type FilterOption,
  type FilterCriteria,
} from "./DropdownFilter";

const HeaderLayout = styled.header`
  padding: 2rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  background-color: #eee9da;
  border-radius: 8px;
  font-size: 1rem;

  @media (max-width: 600px) {
    padding: 1rem;
    margin-bottom: 0.95rem;
    margin-top: 0.95rem;
    font-size: 0.65rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.25rem;
  h2 {
    font-size: 0.65rem;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1.1rem;
`;

interface HeaderProps {
  children: React.ReactNode;
}

interface CommonHeaderProps {
  title: string;
  subtitle: string;
  onNewButtonClick: () => void;
  renderFilterContent: () => React.ReactNode;
  dropdownLabel: string;
  filterOptions: FilterOption[];
  onFilterChange: (criteria: FilterCriteria) => void;
  filterCriteria: FilterCriteria;
  newButtonLabel: string;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return <HeaderLayout>{children}</HeaderLayout>;
};

const CommonHeader: React.FC<CommonHeaderProps> = ({
  title,
  subtitle,
  onNewButtonClick,
  renderFilterContent,
  dropdownLabel,
  filterOptions,
  onFilterChange,
  filterCriteria,
  newButtonLabel,
}) => {
  return (
    <Header>
      <HeaderContainer>
        <TextContainer>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
        </TextContainer>
        <DropdownFilter
          renderContent={renderFilterContent}
          dropdownLabel={dropdownLabel}
          filterOptions={filterOptions}
          onFilterChange={onFilterChange}
          filterCriteria={filterCriteria}
        />
        <Button onClick={onNewButtonClick}>
          <PlusIcon>+</PlusIcon> {newButtonLabel}
        </Button>
      </HeaderContainer>
    </Header>
  );
};

export default CommonHeader;
