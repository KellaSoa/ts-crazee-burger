import { toast, ToastOptions, TypeOptions } from "react-toastify";

type toastType = Exclude<TypeOptions, "default">;

export const displayToastNotification = (
  toastMessage: string,
  toastType: toastType,
  toastOptions?: ToastOptions,
) => {
  const toastOptionsByDefault: ToastOptions = {
    theme: "dark",
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...toastOptions,
  };
  toast[toastType](toastMessage, toastOptionsByDefault);
};
