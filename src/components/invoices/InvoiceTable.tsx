import React from "react";
import type { RouterOutputs } from "~/utils/api";
import { Table } from "../common/Table";
import { TableBody, TableCell, TableRow, TableHead } from "@mui/material";
import { calculateTotalAmount } from "~/server/helpers/invoiceUtils";

type InvoiceWithId = RouterOutputs["invoice"]["getById"];

const InvoiceTable: React.FC<InvoiceWithId> = (props: InvoiceWithId) => {
  const { invoiceItems, amountDue } = props;

  if (!invoiceItems) {
    return null;
  }

  const items = invoiceItems[0]?.items;

  if (!items) {
    return null;
  }

  return (
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: "#6096B4" }}>
          <TableCell sx={{ borderBottom: "none", color: "#f5e7d7" }}>
            Item Name
          </TableCell>
          <TableCell
            align="left"
            sx={{ borderBottom: "none", color: "#f5e7d7" }}
          >
            Qty.
          </TableCell>
          <TableCell
            align="left"
            sx={{ borderBottom: "none", color: "#f5e7d7" }}
          >
            Price
          </TableCell>
          <TableCell
            align="right"
            sx={{ borderBottom: "none", color: "#f5e7d7" }}
          >
            Total
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell
              align="left"
              sx={{ borderBottom: "none", color: "#69635e" }}
            >
              {item.name}
            </TableCell>
            <TableCell
              align="left"
              sx={{ borderBottom: "none", color: "#69635e" }}
            >
              {item.quantity}
            </TableCell>
            <TableCell
              align="left"
              sx={{ borderBottom: "none", color: "#69635e" }}
            >
              ${Number(item.price).toFixed(2)}
            </TableCell>
            <TableCell
              align="right"
              sx={{ borderBottom: "none", color: "#69635e" }}
            >
              $
              {calculateTotalAmount([
                { ...item, price: Number(item.price) },
              ]).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
        <TableRow sx={{ backgroundColor: "black" }}>
          <TableCell colSpan={3} sx={{ color: "white" }}>
            Amount Due
          </TableCell>
          <TableCell align="right" sx={{ color: "white", fontSize: "1.5rem" }}>
            ${amountDue.toFixed(2)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default InvoiceTable;
