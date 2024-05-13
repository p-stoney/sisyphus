import React from "react";
import styled from "styled-components";

interface StatusBadgeProps {
  $status: "PAID" | "UNPAID" | "AllInvoicesPaid";
  children: React.ReactNode;
}

const getStatusStyles = ($status: "PAID" | "UNPAID" | "AllInvoicesPaid") => {
  /**
   * Returns styling based on the status value.
   * This function is used to determine the background color and text color
   * of the status badge depending on the $status prop.
   */
  switch ($status) {
    case "PAID":
      return { backgroundColor: "#08c28d", color: "green" };
    case "UNPAID":
      return { backgroundColor: "#e89e3f", color: "red" };
    case "AllInvoicesPaid":
      return { backgroundColor: "#08c28d", color: "green" };
    default:
      return { backgroundColor: "#e89e3f", color: "red" };
  }
};

export const CommonStatusBadge = styled.div<StatusBadgeProps>`
  background-color: ${(props) =>
    getStatusStyles(props.$status).backgroundColor};
  color: ${(props) => getStatusStyles(props.$status).color};
  border-radius: 1rem;
  padding: 0.3rem 0.65rem;
  text-align: center;
  flex-basis: 15%;

  @media (max-width: 600px) {
    padding: 0.15rem 0.45rem;
    flex-basis: 22%;
    font-size: 0.8rem;
  }
`;

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  $status,
  children,
}) => {
  return <CommonStatusBadge $status={$status}>{children}</CommonStatusBadge>;
};

// export default StatusBadge;
