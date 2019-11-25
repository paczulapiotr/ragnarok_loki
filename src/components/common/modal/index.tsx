import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import React from "react";

interface Props {
  modalTitle?: string;
  contentText?: string;
  actions?: ModalButton[];
  children?: JSX.Element;
  open: boolean;
  fullWidth?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  setOpen: (state: boolean) => void;
}

const ModalBase = ({
  modalTitle,
  contentText,
  children,
  actions = [],
  fullWidth = false,
  maxWidth = "sm",
  open,
  setOpen
}: Props) => {
  const actionWrapper = (
    callback?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  ) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpen(false);

    // tslint:disable-next-line: no-unused-expression
    callback && callback(e);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        {actions.map((x, index) => (
          <Button key={index} onClick={actionWrapper(x.onClick)}>
            {x.content}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default ModalBase;
