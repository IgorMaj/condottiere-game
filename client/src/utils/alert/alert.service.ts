import { toast } from "react-toastify";
import { TOAST_TIMEOUT } from "../constants";

export const showAlert = (msg: string) => {
  toast(msg, {
    position: "top-center",
    type: "default",
    progress: 0,
    toastId: msg,
    closeOnClick: true,
    autoClose: TOAST_TIMEOUT,
    progressStyle: {
      background: "transparent",
      height: "0px",
    },
    style: {
      marginTop: "0.5em",
      border: "none",
      boxShadow: "none",
      boxSizing: "unset",
      borderRadius: "0px",
      textAlign: "center",
      fontWeight: "bolder",
      fontSize: "30px",
      padding: "0.1em",
      textShadow:
        "0.1em 0 black, 0 0.1em black, -0.1em 0 black, 0 -0.1em black",
      color: "var(--messageColor)",
      backgroundColor: "transparent",
    },
  });
};
