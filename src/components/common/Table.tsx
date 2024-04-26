import React from "react";
import { Table as MuiTable } from "@mui/material";
import styled from "styled-components";

interface CommonTableProps {
  children: React.ReactNode;
}

const StyledTable = styled(MuiTable)`
  // Add any common table styling here
`;

export const Table: React.FC<CommonTableProps> = ({ children }) => {
  return <StyledTable>{children}</StyledTable>;
};
