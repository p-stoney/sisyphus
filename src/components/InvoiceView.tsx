import React from "react";
import { api, type RouterOutputs } from "~/utils/api";
import { StyledCard } from "./common/Card";
import { TableWrapper } from "./common/TableWrapper";
import { Content } from "./common/Content";
import SingleInvoiceHeader from "./invoices/SingleInvoiceHeader";
import InvoiceCardContent from "./invoices/InvoiceCardContent";
import InvoiceTable from "./invoices/InvoiceTable";

type InvoiceWithId = RouterOutputs["invoice"]["getById"];

export const InvoiceView: React.FC<InvoiceWithId> = (props: InvoiceWithId) => {
  const { invoice } = props;
  const updateStatusMutation = api.invoice.updateStatus.useMutation();

  const handleStatusToggle = () => {
    const newStatus = invoice.status === "PAID" ? "UNPAID" : "PAID";
    updateStatusMutation.mutate(
      {
        invoiceId: invoice.id,
        newStatus: newStatus,
      },
      {
        onSuccess: () => {
          console.log("Status updated successfully.");
        },
        onError: (error) => {
          console.error("Failed to update status:", error);
        },
      },
    );
  };

  return (
    <Content>
      {invoice && (
        <>
          <SingleInvoiceHeader
            status={invoice.status.toString() as "Paid" | "Pending"}
            onBack={() => window.history.back()}
            onStatusChange={handleStatusToggle}
          />
          <StyledCard>
            <InvoiceCardContent {...props} />
            <TableWrapper>
              <InvoiceTable {...props} />
            </TableWrapper>
          </StyledCard>
        </>
      )}
    </Content>
  );
};
