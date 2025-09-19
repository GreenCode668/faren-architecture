import { useCallback } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export interface NotificationOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export interface SweetAlertOptions {
  title?: string;
  text?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
}

export const useNotification = () => {
  // Toast notifications
  const showSuccess = useCallback((message: string, options?: NotificationOptions) => {
    return toast.success(message, {
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
    });
  }, []);

  const showError = useCallback((message: string, options?: NotificationOptions) => {
    return toast.error(message, {
      duration: options?.duration || 6000,
      position: options?.position || 'top-right',
    });
  }, []);

  const showWarning = useCallback((message: string, options?: NotificationOptions) => {
    return toast(message, {
      icon: '⚠️',
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
      style: {
        background: '#FEF3C7',
        color: '#92400E',
        border: '1px solid #F59E0B',
      },
    });
  }, []);

  const showInfo = useCallback((message: string, options?: NotificationOptions) => {
    return toast(message, {
      icon: 'ℹ️',
      duration: options?.duration || 4000,
      position: options?.position || 'top-right',
      style: {
        background: '#DBEAFE',
        color: '#1E40AF',
        border: '1px solid #3B82F6',
      },
    });
  }, []);

  const showLoading = useCallback((message: string = 'Loading...') => {
    return toast.loading(message);
  }, []);

  const dismiss = useCallback((toastId?: string) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  }, []);

  // SweetAlert2 notifications
  const showAlert = useCallback(async (options: SweetAlertOptions) => {
    return await Swal.fire({
      confirmButtonColor: '#FF833B',
      cancelButtonColor: '#6b7280',
      ...options,
    });
  }, []);

  const showConfirm = useCallback(async (
    title: string,
    text?: string,
    options?: Partial<SweetAlertOptions>
  ) => {
    return await Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#FF833B',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      ...options,
    });
  }, []);

  const showSuccessAlert = useCallback(async (
    title: string,
    text?: string,
    options?: Partial<SweetAlertOptions>
  ) => {
    return await Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonColor: '#FF833B',
      ...options,
    });
  }, []);

  const showErrorAlert = useCallback(async (
    title: string,
    text?: string,
    options?: Partial<SweetAlertOptions>
  ) => {
    return await Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonColor: '#FF833B',
      ...options,
    });
  }, []);

  const showWarningAlert = useCallback(async (
    title: string,
    text?: string,
    options?: Partial<SweetAlertOptions>
  ) => {
    return await Swal.fire({
      title,
      text,
      icon: 'warning',
      confirmButtonColor: '#FF833B',
      ...options,
    });
  }, []);

  return {
    // Toast notifications
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,

    // SweetAlert notifications
    showAlert,
    showConfirm,
    showSuccessAlert,
    showErrorAlert,
    showWarningAlert,
  };
};

export default useNotification;