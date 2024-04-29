import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { ListItem } from "../common/List";
import { RightCaret } from "../common/RightCaret";
import { StatusBadge } from "../common/StatusBadge";

const DistributorContainer = styled(ListItem)`
  &:hover {
    background-color: #e0e0e0;
  }
`;

const DistributorName = styled.div`
  font-weight: bold;
  flex-grow: 2;
  margin-left: 0.75rem;

  @media (max-width: 600px) {
    flex-basis: 20%;
    margin-left: 0rem;
    font-size: 0.65rem;
  }
`;

const DistributorEmail = styled.div`
  font-size: 0.75rem;
  font-style: italic;
  line-height: 1.125;
  letter-spacing: -0.25px;
  flex-basis: 30%;

  @media (max-width: 600px) {
    flex-basis: 35%;
    margin-left: 0rem;
    font-size: 0.65rem;
    font-style: normal;
  }
`;

const AmountDue = styled.div`
  flex-basis: 20%;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 0.72rem;
    flex-basis: 15%;
    margin-left: 0.2rem;
  }
`;

interface DistributorItemProps {
  distributorName: string;
  distributorEmail: string;
  amountDue: number;
  allInvoicesPaid: boolean;
  routeName: string;
}

const DistributorItem: React.FC<DistributorItemProps> = ({
  distributorName,
  distributorEmail,
  amountDue,
  allInvoicesPaid,
  routeName,
}) => {
  return (
    <Link href={`/distributors/${routeName}`} passHref>
      <DistributorContainer>
        <DistributorName>{distributorName}</DistributorName>
        <DistributorEmail>{distributorEmail}</DistributorEmail>
        <AmountDue>${amountDue.toFixed(2)}</AmountDue>
        <StatusBadge $status={allInvoicesPaid ? "PAID" : "UNPAID"}>
          {allInvoicesPaid ? "All Paid" : "Pending"}
        </StatusBadge>
        <RightCaret alt="Go to details" />
      </DistributorContainer>
    </Link>
  );
};

export default DistributorItem;
