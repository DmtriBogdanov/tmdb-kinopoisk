import { toast } from "react-toastify";

export const errorToast = (
  message: string,
  error?: unknown,
) => {
  toast.error(message);

  if (error) {
    console.error(error);
  }
};