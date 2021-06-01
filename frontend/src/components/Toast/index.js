import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Toast = ({ text, type }) => {
  const notify = () => {
    const config = [
      text,
      {
        toastId: "",
        position: toast.POSITION.TOP_RIGHT,
      },
    ];

    if (type === "default") {
      toast(...config);
    }
    if (type === "error") {
      toast.error(...config);
    }
    if (type === "success") {
      toast.success(...config);
    }
    if (type === "info") {
      toast.info(...config);
    }
  };
  return <h1>{notify()}</h1>;
};

export default Toast;
