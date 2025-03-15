
import { useState, useEffect, useCallback } from "react";
import { toast as sonnerToast } from "sonner";

// Toast types
type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

// Use a singleton pattern to ensure we can use the toast from anywhere
export function toast({
  title,
  description,
  variant = "default",
  ...props
}: ToastProps) {
  return sonnerToast[variant === "destructive" ? "error" : "success"](title, {
    description,
    ...props,
  });
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    return () => {
      // Clean up toasts when component unmounts
      setToasts([]);
    };
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  }, []);

  return {
    toasts,
    toast,
    dismissToast,
  };
}
