import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { StyledBackButton } from "../common/Button";
import { Header, HeaderContent } from "../common/Header";

interface SingleDistributorHeaderProps {
  onBack: () => void;
}

export const SingleDistributorHeader: React.FC<
  SingleDistributorHeaderProps
> = ({ onBack }) => {
  return (
    <Header>
      <HeaderContent>
        <StyledBackButton onClick={onBack}>
          <IconButton className="icon-button" data-testid="back-button">
            <ArrowBackIcon />
          </IconButton>
        </StyledBackButton>
      </HeaderContent>
    </Header>
  );
};

// export default SingleDistributorHeader;
