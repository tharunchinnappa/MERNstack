import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        position: "absolute",
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
        top: "50%",
        left: "50%",
        transform: "translateX(-50%,-50%)",
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
