import React from "react";
import type { RouterOutputs } from "~/utils/api";
import Link from "next/link";
import { Table } from "../common/Table";
import { TableBody, TableCell, TableRow, TableHead, Box } from "@mui/material";
import { RightCaret } from "../common/RightCaret";
import { StatusBadge } from "../common/StatusBadge";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

// TODO: Extract and import table components

type DistributorComputed = RouterOutputs["distributor"]["getById"];

const DistributorTable: React.FC<DistributorComputed> = (
  props: DistributorComputed,
) => {
  const { invoices } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!invoices) {
    return null;
  }

  const totalUnpaidAmount = invoices
    .filter((invoice) => invoice.status === "UNPAID")
    .reduce((acc, invoice) => acc + invoice.amountDue, 0);

  return (
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#6096B4" }}>
          <TableCell sx={{ borderBottom: "none", color: "#f5e7d7" }}>
            Invoice ID
          </TableCell>
          <TableCell
            align="left"
            sx={{ borderBottom: "none", color: "#f5e7d7" }}
          >
            Payment Due
          </TableCell>
          <TableCell
            align="left"
            sx={{ borderBottom: "none", color: "#f5e7d7" }}
          >
            Amt Due
          </TableCell>
          <TableCell
            align={isMobile ? "center" : "right"}
            sx={{ borderBottom: "none", color: "#f5e7d7" }}
          >
            Status
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell
              align="left"
              sx={{ borderBottom: "none", color: "#69635e" }}
            >
              #{invoice.id}
            </TableCell>
            <TableCell
              align="left"
              sx={{ borderBottom: "none", color: "#69635e" }}
            >
              {invoice.dueBy.toISOString().slice(0, 10)}
            </TableCell>
            <TableCell
              align="left"
              sx={{ borderBottom: "none", color: "#69635e" }}
            >
              ${invoice.amountDue.toFixed(2)}
            </TableCell>
            <TableCell
              align={isMobile ? "center" : "right"}
              sx={{ borderBottom: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isMobile ? "flex-start" : "flex-end",
                }}
              >
                <StatusBadge $status={invoice.status}>
                  {invoice.status}
                </StatusBadge>
                <Link href={`/invoices/${invoice.id}`} passHref>
                  <RightCaret alt="Go to details" />
                </Link>
              </Box>
            </TableCell>
          </TableRow>
        ))}
        <TableRow sx={{ backgroundColor: "black" }}>
          <TableCell
            colSpan={3}
            sx={{ color: "white", fontSize: isMobile ? ".75rem" : "1.5rem" }}
          >
            Total Unpaid
          </TableCell>
          <TableCell
            align={isMobile ? "center" : "right"}
            sx={{ color: "white", fontSize: isMobile ? ".75rem" : "1.5rem" }}
          >
            ${totalUnpaidAmount.toFixed(2)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default DistributorTable;
