import { toast } from "react-toastify";

const options = {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const notification = {
  success: (message) => toast.success(message, options),
  error: (message) => toast.error(message, options),
  warn: (message) => toast.warn(message, options),
  info: (message) => toast.info(message, options),
  apiFailure: (message = "Exception: Failed to call api") =>
    toast.error(message, options),
};
