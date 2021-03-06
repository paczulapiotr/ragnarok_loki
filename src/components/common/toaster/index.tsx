import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
const Toaster = () => {
  useEffect(() => {
    toast.configure();
  }, []);

  return (
    <div className={"toast-container"}>
      <ToastContainer toastClassName={"toast-item"} />
    </div>
  );
};

export default Toaster;
