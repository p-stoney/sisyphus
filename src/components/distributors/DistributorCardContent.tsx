import React from "react";
import type { RouterOutputs } from "~/utils/api";
import { CardContent } from "../common/CardContent";
import { Grid } from "@mui/material";
import { HeaderTypography, EmphasizedTypography } from "../common/Typography";
import styled from "styled-components";

const CustomGridItem = styled(Grid)`
  display: flex;
  flex-direction: column !important;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media only screen and (min-width: 600px) and (max-width: 961px) {
    align-items: stretch;
      justify-content: center;
    }
  }
`;

type Distributor = RouterOutputs["distributor"]["getById"];

const DistributorCardContent: React.FC<Distributor> = (distributor) => {
  return (
    <CardContent>
      <Grid container spacing={2} sx={{ justifyContent: "space-around" }}>
        <CustomGridItem
          item
          xs={12}
          sm={4}
          sx={{ paddingLeft: "0rem !important" }}
        >
          <HeaderTypography>Name</HeaderTypography>
          <EmphasizedTypography sx={{ mb: ".5rem" }}>
            {distributor.name}
          </EmphasizedTypography>
          <HeaderTypography>Email</HeaderTypography>
          <EmphasizedTypography>{distributor.email}</EmphasizedTypography>
        </CustomGridItem>
        <CustomGridItem
          item
          xs={12}
          sm={4}
          sx={{ paddingLeft: "0rem !important" }}
        >
          <HeaderTypography>Address</HeaderTypography>
          <EmphasizedTypography>{distributor.address}</EmphasizedTypography>
          <EmphasizedTypography>{distributor.city}</EmphasizedTypography>
          <EmphasizedTypography>{distributor.state}</EmphasizedTypography>
          <EmphasizedTypography>{distributor.postalCode}</EmphasizedTypography>
        </CustomGridItem>
      </Grid>
    </CardContent>
  );
};

export default DistributorCardContent;
