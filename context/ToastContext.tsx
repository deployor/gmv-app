import React, { createContext, ReactNode, useContext, useState } from 'react';
import Toast from '../components/ui/Toast';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastContextProps {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('info');
  const [duration, setDuration] = useState(3000);

  const showToast = (
    toastMessage: string,
    type: ToastType = 'info',
    toastDuration: number = 3000
  ) => {
    setMessage(toastMessage);
    setToastType(type);
    setDuration(toastDuration);
    setVisible(true);
  };

  const hideToast = () => {
    setVisible(false);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        hideToast,
      }}
    >
      {children}
      <Toast
        visible={visible}
        message={message}
        type={toastType}
        duration={duration}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
} 