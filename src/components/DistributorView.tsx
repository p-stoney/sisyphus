import React from "react";
import type { RouterOutputs } from "~/utils/api";
import { StyledCard } from "./common/Card";
import { TableWrapper } from "./common/TableWrapper";
import { Content } from "./common/Content";
import { SingleDistributorHeader } from "./distributors/SingleDistributorHeader";
import DistributorCardContent from "./distributors/DistributorCardContent";
import DistributorTable from "./distributors/DistributorTable";

type Distributor = RouterOutputs["distributor"]["getById"];

export const DistributorView: React.FC<Distributor> = (distributor) => {
  return (
    <Content>
      <SingleDistributorHeader onBack={() => window.history.back()} />
      <StyledCard>
        <DistributorCardContent {...distributor} />
        <TableWrapper>
          <DistributorTable invoices={distributor.invoices} />
        </TableWrapper>
      </StyledCard>
    </Content>
  );
};
