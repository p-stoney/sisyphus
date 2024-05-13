import React from "react";
import type { RouterOutputs } from "~/utils/api";
import { StyledCard } from "../common/Card";
import { TableWrapper } from "../common/TableWrapper";
import { Content } from "../common/Content";
import SingleDistributorHeader from "./SingleDistributorHeader";
import DistributorCardContent from "./DistributorCardContent";
import DistributorTable from "./DistributorTable";

type DistributorComputed = RouterOutputs["distributor"]["getById"];

const DistributorView: React.FC<DistributorComputed> = (distributor) => {
  return (
    <Content>
      <SingleDistributorHeader onBack={() => window.history.back()} />
      <StyledCard>
        <DistributorCardContent {...distributor} />
        <TableWrapper>
          <DistributorTable {...distributor} />
        </TableWrapper>
      </StyledCard>
    </Content>
  );
};

export default DistributorView;
