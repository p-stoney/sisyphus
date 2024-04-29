import React from "react";
import Link from "next/link";
import { api, type RouterOutputs } from "~/utils/api";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { TRPCError } from "@trpc/server";
import { CardContent } from "../common/CardContent";
import { RightCaret } from "../common/RightCaret";
import { Typography, Grid, Box } from "@mui/material";
import { HeaderTypography, EmphasizedTypography } from "../common/Typography";

type Invoice = RouterOutputs["invoice"]["getById"];

const InvoiceCardContent: React.FC<Invoice> = (invoice) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { id, distributorId } = invoice;

  if (!id) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Invoice not found",
    });
  }

  if (!distributorId) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Distributor not found",
    });
  }

  const { ...distributor } = api.distributor.getById.useQuery({
    distributorId,
  });

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
          // Mobile View
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
                  #{(invoice.createdAt as Date)?.toString()}
                </EmphasizedTypography>
                <EmphasizedTypography>
                  {invoice.dueBy?.toString()}
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
                    {distributor.data?.name}
                  </EmphasizedTypography>
                  <Link href={`/invoice/${distributor.data?.id}`} passHref>
                    <RightCaret alt="Go to details" />
                  </Link>
                </Box>
                <div>{distributor.data?.address}</div>
                <div>{distributor.data?.city}</div>
                <div>{distributor.data?.state}</div>
                <div>{distributor.data?.postalCode}</div>
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
                <EmphasizedTypography>
                  {distributor.data?.email}
                </EmphasizedTypography>
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
                  {(invoice.createdAt as Date)?.toString()}
                </EmphasizedTypography>
                <HeaderTypography sx={{ marginTop: "1rem" }}>
                  Payment Due
                </HeaderTypography>
                <EmphasizedTypography>
                  {invoice.dueBy?.toString()}
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
                    {distributor.data?.name}
                  </EmphasizedTypography>
                  <Link href={`/invoice/${distributor.data?.id}`} passHref>
                    <RightCaret alt="Go to details" />
                  </Link>
                </Box>
                <div>{distributor.data?.address}</div>
                <div>{distributor.data?.city}</div>
                <div>{distributor.data?.state}</div>
                <div>{distributor.data?.postalCode}</div>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ overflowWrap: "anywhere" }}>
                <HeaderTypography>Send To</HeaderTypography>
                <EmphasizedTypography>
                  {distributor.data?.email}
                </EmphasizedTypography>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </CardContent>
  );
};

export default InvoiceCardContent;
