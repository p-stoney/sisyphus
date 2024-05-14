import React, { useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import { StyledCard } from "../common/Card";
import { TableWrapper } from "../common/TableWrapper";
import { Content } from "../common/Content";
import SingleInvoiceHeader from "./SingleInvoiceHeader";
import InvoiceCardContent from "./InvoiceCardContent";
import InvoiceTable from "./InvoiceTable";

type InvoiceComputed = RouterOutputs["invoice"]["getById"];

const InvoiceView: React.FC<InvoiceComputed> = (invoice) => {
  const [currentStatus, setCurrentStatus] = useState(invoice.status);
  const updateStatusMutation = api.invoice.updateStatus.useMutation();

  const handleStatusToggle = () => {
    const newStatus = currentStatus === "PAID" ? "UNPAID" : "PAID";
    updateStatusMutation.mutate(
      {
        invoiceId: invoice.id,
        newStatus: newStatus,
      },
      {
        onSuccess: () => {
          setCurrentStatus(newStatus);
        },
        onError: (error) => {
          console.error("Failed to update status:", error);
        },
      },
    );
  };

  return (
    <Content>
      <SingleInvoiceHeader
        status={currentStatus.toString() as "PAID" | "UNPAID"}
        onBack={() => window.history.back()}
        onStatusChange={handleStatusToggle}
      />
      <StyledCard>
        <InvoiceCardContent {...invoice} />
        <TableWrapper>
          <InvoiceTable {...invoice} />
        </TableWrapper>
      </StyledCard>
    </Content>
  );
};

export default InvoiceView;
