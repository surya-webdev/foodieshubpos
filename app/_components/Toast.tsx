import { toast } from "react-toastify";

export function Toast() {
  const toasts = toast.success("Thanks for comming !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  return <div className="">{toasts}</div>;
}
