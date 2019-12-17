import { Dialog } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import React from "react";
import { isDeviceMode } from "utils/contants";
import "./style.scss";

interface Props {
  children?: JSX.Element | JSX.Element[];
  open: boolean;
  fullWidth?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  setOpen: (state: boolean) => void;
  classes?: any;
  fullscreen?: boolean;
}

const ModalBase = ({
  children,
  fullWidth = false,
  maxWidth = "sm",
  open,
  setOpen,
  classes,
  fullscreen = false
}: Props) => {
  const isFullscreen = fullscreen && isDeviceMode();
  const closeModal = () => setOpen(false);
  return (
    <Dialog
      fullScreen={isFullscreen}
      open={open}
      onClose={closeModal}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      PaperProps={{ className: classes }}
      className="modal-container"
    >
      <>
        <CloseOutlined className="x-close-modal" onClick={closeModal} />
        {children}
      </>
    </Dialog>
  );
};

export default ModalBase;
