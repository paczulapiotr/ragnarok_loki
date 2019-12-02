import { Button, DialogActions } from "@material-ui/core";
import React from "react";
interface Props {
  actions: ModalButton[];
  setOpen: (open: boolean) => void;
}
const ModalFooter = ({ actions, setOpen }: Props) => {
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
  );
};

export default ModalFooter;
