import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { ListItem } from "../common/List";
import { RightCaret } from "../common/RightCaret";
import { StatusBadge } from "../common/StatusBadge";

const InvoiceContainer = styled(ListItem)`
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

const PaymentDue = styled.div`
  font-size: 0.72rem;
  font-style: italic;
  line-height: 1.125;
  letter-spacing: -0.25px;
  flex-basis: 25%;

  @media (max-width: 600px) {
    font-size: 0.57rem;
    font-style: normal;
    line-height: normal;
    flex-basis: 20%;
  }
`;

const Id = styled.div`
  flex-basis: 15%;

  @media (max-width: 600px) {
    font-size: 0.72rem;
    flex-basis: 12%;
  }
`;

const AmountDue = styled.div`
  flex-basis: 12%;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 0.72rem;
    flex-basis: 18%;
  }
`;

interface InvoiceItemProps {
  id: string;
  paymentDueDate: string;
  name: string;
  amountDue: number;
  status: "PAID" | "UNPAID";
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({
  id,
  paymentDueDate,
  name,
  amountDue,
  status,
}) => {
  const displayAmount = status === "PAID" ? 0 : amountDue.toFixed(2);

  return (
    <Link href={`/invoices/${id}`} passHref aria-label="Go to details">
      <InvoiceContainer>
        <DistributorName>{name}</DistributorName>
        <Id>#{id}</Id>
        <PaymentDue>Due {paymentDueDate}</PaymentDue>
        <AmountDue>${displayAmount}</AmountDue>
        <StatusBadge $status={status}>{status}</StatusBadge>
        <RightCaret alt="Go to details" />
      </InvoiceContainer>
    </Link>
  );
};

export default InvoiceItem;
