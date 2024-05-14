import React from "react";
import Link from "next/link";
import { api, type RouterOutputs } from "~/utils/api";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
// import { TRPCError } from "@trpc/server";
import { CardContent } from "../common/CardContent";
import { RightCaret } from "../common/RightCaret";
import { Typography, Grid, Box } from "@mui/material";
import { HeaderTypography, EmphasizedTypography } from "../common/Typography";

type InvoiceComputed = RouterOutputs["invoice"]["getById"];

const InvoiceCardContent: React.FC<InvoiceComputed> = (invoice) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { distributorId } = invoice;
  const { data } = api.distributor.getById.useQuery({
    distributorId,
  });
  const { ...distributor } = data;

  return (
    <CardContent>
      <Grid
        container
        spacing={2}
        sx={{ margin: "0.25rem", width: "100% !important" }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            marginBottom: "1.5rem",
            fontWeight: "bold",
          }}
        >
          #{invoice.id}
        </Typography>

        {isMobile ? (
          <>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-around",
                  padding: "0rem !important",
                }}
              >
                <HeaderTypography>Invoice Date</HeaderTypography>
                <HeaderTypography sx={{ marginTop: "1rem" }}>
                  Payment Due
                </HeaderTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "space-around",
                  padding: "0rem !important",
                }}
              >
                <EmphasizedTypography>
                  #{invoice.createdAt.toString()}
                </EmphasizedTypography>
                <EmphasizedTypography>
                  {invoice.dueBy.toString()}
                </EmphasizedTypography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <HeaderTypography>Bill To</HeaderTypography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <EmphasizedTypography>
                    {distributor.name}
                  </EmphasizedTypography>
                  <Link href={`/distributor/${distributor.id}`} passHref>
                    <RightCaret alt="Go to details" />
                  </Link>
                </Box>
                <div>{distributor.address}</div>
                <div>{distributor.city}</div>
                <div>{distributor.state}</div>
                <div>{distributor.postalCode}</div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingBottom: "1rem",
                }}
              >
                <HeaderTypography>Send To</HeaderTypography>
                <EmphasizedTypography>{distributor.email}</EmphasizedTypography>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              container
              spacing={2}
              sx={{
                margin: "0rem !important",
                width: "100% !important",
              }}
            >
              <Grid item xs={12} sm={4}>
                <HeaderTypography>Invoice Date</HeaderTypography>
                <EmphasizedTypography>
                  {invoice.createdAt.toString()}
                </EmphasizedTypography>
                <HeaderTypography sx={{ marginTop: "1rem" }}>
                  Payment Due
                </HeaderTypography>
                <EmphasizedTypography>
                  {invoice.dueBy.toString()}
                </EmphasizedTypography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <HeaderTypography>Bill To</HeaderTypography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <EmphasizedTypography>
                    {distributor.name}
                  </EmphasizedTypography>
                  <Link href={`/distributors/${distributor.id}`} passHref>
                    <RightCaret alt="Go to details" />
                  </Link>
                </Box>
                <div>{distributor.address}</div>
                <div>{distributor.city}</div>
                <div>{distributor.state}</div>
                <div>{distributor.postalCode}</div>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ overflowWrap: "anywhere" }}>
                <HeaderTypography>Send To</HeaderTypography>
                <EmphasizedTypography>{distributor.email}</EmphasizedTypography>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </CardContent>
  );
};

export default InvoiceCardContent;
