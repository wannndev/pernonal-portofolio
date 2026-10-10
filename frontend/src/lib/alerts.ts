import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const showAlert = {
  success: (title: string, text?: string) => {
    return Swal.fire({
      icon: "success",
      title,
      text,
      confirmButtonText: "OK",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-3xl border border-border shadow-2xl p-6 sm:p-8 bg-card text-card-foreground",
        title: "text-lg sm:text-xl font-bold text-foreground",
        htmlContainer: "text-xs sm:text-sm text-muted-foreground",
        confirmButton: "px-6 py-2.5 rounded-full font-semibold text-xs bg-foreground text-background hover:opacity-90 transition-all shadow-md cursor-pointer",
      },
    });
  },

  error: (title: string, text?: string) => {
    return Swal.fire({
      icon: "error",
      title,
      text,
      confirmButtonText: "Dismiss",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-3xl border border-rose-500/20 shadow-2xl p-6 sm:p-8 bg-card text-card-foreground",
        title: "text-lg sm:text-xl font-bold text-foreground",
        htmlContainer: "text-xs sm:text-sm text-muted-foreground",
        confirmButton: "px-6 py-2.5 rounded-full font-semibold text-xs bg-rose-600 text-white hover:bg-rose-700 transition-all shadow-md cursor-pointer",
      },
    });
  },

  confirm: async (
    title: string,
    text?: string,
    confirmBtnText = "Yes, delete it"
  ): Promise<boolean> => {
    const res = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: confirmBtnText,
      cancelButtonText: "Cancel",
      reverseButtons: true,
      buttonsStyling: false,
      customClass: {
        popup: "rounded-3xl border border-border shadow-2xl p-6 sm:p-8 bg-card text-card-foreground",
        title: "text-lg sm:text-xl font-bold text-foreground",
        htmlContainer: "text-xs sm:text-sm text-muted-foreground",
        actions: "flex items-center justify-center gap-3 pt-4",
        confirmButton: "px-5 py-2.5 rounded-full font-semibold text-xs bg-rose-600 text-white hover:bg-rose-700 transition-all shadow-md cursor-pointer",
        cancelButton: "px-5 py-2.5 rounded-full font-semibold text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border transition-all cursor-pointer",
      },
    });
    return res.isConfirmed;
  },

  toast: (title: string, icon: "success" | "error" | "info" | "warning" = "success") => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        popup: "rounded-2xl border border-border shadow-xl px-4 py-3 bg-card text-foreground",
        title: "text-xs font-semibold text-foreground",
      },
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    return Toast.fire({
      icon,
      title,
    });
  },
};

export default showAlert;
