import type { SweetAlertResult } from "sweetalert2";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

/**
 * Show a SweetAlert with optional loading and follow-up content
 * @param title - Title content for the alert (React.ReactNode or string)
 * @param confirmButtonText - Text for the confirm button
 * @param onConfirm - Callback function to execute when OK button is clicked
 */
export const sweetAlert = async (
  title: React.ReactNode | string,
  confirmButtonText?: string,
  onConfirm?: () => void | Promise<void>
): Promise<SweetAlertResult> => {
  return await MySwal.fire({
    title: title,
    icon: "success",
    confirmButtonText: confirmButtonText || "OK",
    confirmButtonColor: "#2778c4",
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    }
    return result;
  });
};
