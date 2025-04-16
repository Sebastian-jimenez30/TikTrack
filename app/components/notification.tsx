"use client";

import { useEffect } from "react";
import { toast } from "sonner";

interface NotificationProps {
  type: "error" | "warning" | "info" | "success" | "default";
}

export default function Notification({ type }: NotificationProps) {
  useEffect(() => {
    const message = sessionStorage.getItem("notification");
    if (message) {
      if (type === "error") {
        toast.error(message);
      } else if (type === "warning") {
        toast.warning(message);
      } else if (type === "info") {
        toast.info(message);
      } else if (type === "success") {
        toast.success(message);
      } else {
        toast(message);
      }
      sessionStorage.removeItem("notification");
    }
  }, [type]);

  return null;
}
