import Toast, { ToastShowParams } from 'react-native-toast-message';

export type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  description?: string;
  duration?: number;
  position?: 'top' | 'bottom';
  //! Allow passing any native overrides if critically needed
  nativeProps?: Omit<ToastShowParams, 'type' | 'text1' | 'text2' | 'position' | 'visibilityTime'>;
}

export const toast = {
  /**
   * Triggers a global toast notification.
   * @param type - Standard visual style ('success' | 'error' | 'info')
   * @param head - Main bold text heading
   * @param options - Optional configuration overrides (description, timer, position)
   */
  show: (type: ToastType, head: string, options?: ToastOptions) => {
    Toast.show({
      type: type,
      text1: head,
      text2: options?.description,
      position: options?.position ?? 'top',
      visibilityTime: options?.duration ?? 4000, // 4 seconds default
      autoHide: true,
      topOffset: 60, //! Pushes it comfortably below native status bars
      bottomOffset: 40,
      ...options?.nativeProps,
    });
  },

  /**
   * Manually dismisses any active toast.
   */
  hide: () => {
    Toast.hide();
  },
};
