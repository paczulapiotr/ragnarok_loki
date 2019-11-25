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
    shouldKeepModal?: boolean,
    callback?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  ) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!shouldKeepModal) {
      setOpen(false);
    }
    if (callback) {
      callback(e);
    }
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
          <Button
            key={index}
            onClick={actionWrapper(x.shouldKeepModal, x.onClick)}
          >
            {x.content}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default ModalBase;
