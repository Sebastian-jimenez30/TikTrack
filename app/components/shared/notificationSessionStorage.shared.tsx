"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function NotificationSessionStorage() {
  useEffect(() => {
    const message = sessionStorage.getItem("notification");
    const type = sessionStorage.getItem("notificationType");
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
  }, []);

  return null;
}
