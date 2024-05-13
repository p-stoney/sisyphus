import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledBackButton, ToggleButton, XIcon } from "../common/Button";
import { Header, HeaderContent } from "../common/Header";

interface InvoiceDetailHeaderProps {
  status: "PAID" | "UNPAID";
  onBack: () => void;
  onStatusChange: () => void;
}

const SingleInvoiceHeader: React.FC<InvoiceDetailHeaderProps> = ({
  status,
  onBack,
  onStatusChange,
}) => {
  return (
    <Header>
      <HeaderContent>
        <StyledBackButton onClick={onBack}>
          <IconButton className="icon-button" data-testid="back-button">
            <ArrowBackIcon />
          </IconButton>
        </StyledBackButton>
        <ToggleButton $status={status} onClick={onStatusChange}>
          <XIcon $status={status}>X</XIcon>
          {status === "PAID" ? "Mark as Pending" : "Mark as Paid"}
        </ToggleButton>
      </HeaderContent>
    </Header>
  );
};

export default SingleInvoiceHeader;
