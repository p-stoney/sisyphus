import React from "react";
import { CardContent as MuiCardContent } from "@mui/material";

interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <MuiCardContent>{children}</MuiCardContent>;
};
