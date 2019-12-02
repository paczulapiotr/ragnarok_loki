import {
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import React from "react";
interface Props {
  modalTitle?: string;
  contentText?: string;
  children?: JSX.Element | JSX.Element[];
}
const ModalContent = ({ children, contentText, modalTitle }: Props) => {
  return (
    <>
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
        {children}
      </DialogContent>
    </>
  );
};

export default ModalContent;
