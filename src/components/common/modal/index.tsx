import { Dialog } from "@material-ui/core";
import React from "react";

interface Props {
  children?: JSX.Element | JSX.Element[];
  open: boolean;
  fullWidth?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  setOpen: (state: boolean) => void;
  classes?: any;
}

const ModalBase = ({
  children,
  fullWidth = false,
  maxWidth = "sm",
  open,
  setOpen,
  classes
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      PaperProps={{ className: classes }}
    >
      {children}
    </Dialog>
  );
};

export default ModalBase;
