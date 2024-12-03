import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const renderMsg = (message: string) => {
  return (
    <>
      <div className={"toast-body-wrapper-content"}>
        {message && <p className="toast-message">{message}</p>}
      </div>
    </>
  );
};

export const notify = (
  type: "error" | "info" | "warn" | "success",
  message: string
) => {
  toast.dismiss();

  toast[type](renderMsg(message), {
    toastId: message as any,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};
