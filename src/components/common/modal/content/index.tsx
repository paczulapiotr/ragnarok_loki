import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles
} from "@material-ui/core";
import React from "react";
interface Props {
  modalTitle?: string;
  contentText?: string;
  children?: JSX.Element | JSX.Element[];
  classes?: any;
}

const useStyles = makeStyles({ root: { backgroundColor: "#e2e2e2" } });
const ModalContent = ({
  children,
  contentText,
  modalTitle,
  classes
}: Props) => {
  const titleClass = useStyles();
  return (
    <>
      <DialogTitle className={titleClass.root}>{modalTitle}</DialogTitle>
      <DialogContent className={classes}>
        <DialogContentText>{contentText}</DialogContentText>
        {children}
      </DialogContent>
    </>
  );
};

export default ModalContent;
