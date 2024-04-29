import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import styled from "styled-components";

const DialogHeader = styled.div`
  display: flex;
  background-color: #eee9da;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 1rem;
`;

const StyledDialogContent = styled(DialogContent)`
  background-color: #eee9da;
  overflow-y: visible !important;
`;

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: isMobile ? "90%" : "auto",
          height: isMobile ? "80%" : "auto",
          maxWidth: "500px",
        },
      }}
    >
      <DialogHeader>
        <DialogTitle sx={{ marginbottom: "1px" }}>{title}</DialogTitle>
      </DialogHeader>
      <StyledDialogContent>{children}</StyledDialogContent>
    </Dialog>
  );
};

export default CommonModal;
