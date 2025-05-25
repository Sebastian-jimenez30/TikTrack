"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { JSX, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { Pathname } from "~/i18n/routing";
import { usePathname } from "next/navigation";

interface RemoveFromFavoritesButtonProps {
  variant: "primary" | "secondary" | "danger";
  redirect: Pathname;
  actionUrl: string;
  influencerId: string;
  messages: {
    success: string;
    error: string;
    removing: string;
    remove: string;
  };
  httpMethod?: "delete" | "post";
  onSuccess?: () => void;
}

export default function RemoveFromFavoritesButton({
  variant,
  redirect,
  actionUrl,
  influencerId,
  messages,
  httpMethod = "delete",
  onSuccess,
}: RemoveFromFavoritesButtonProps): JSX.Element {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const [removed, setRemoved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      let response;
      if (httpMethod === "delete") {
        response = await axios.delete(actionUrl, { data: { influencerId } });
      } else {
        response = await axios.post(actionUrl, { influencerId });
      }
      const result = response.data.pageData ?? response.data;

      if (result.isSuccess || result.success) {
        setRemoved(true);
        sessionStorage.setItem("notification", messages.success);
        sessionStorage.setItem("notificationType", "success");
        if (onSuccess) onSuccess();
      } else {
        sessionStorage.setItem("notification", messages.error);
        sessionStorage.setItem("notificationType", "error");
        router.push(pathname);
      }
    } catch (error) {
      sessionStorage.setItem("notification", messages.error);
      sessionStorage.setItem("notificationType", "error");
      router.push(pathname);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={removed || loading}
      className={clsx(
        "px-4 py-2 rounded-md font-semibold transition-all hover:",
        variant === "primary" &&
          "bg-purple text-white cursor-pointer hover:bg-darkPurple",
        variant === "secondary" &&
          "bg-darkGrey text-white cursor-pointer hover:bg-black",
        variant === "danger" &&
          "bg-red-600 text-white cursor-pointer hover:bg-red-700"
      )}
    >
      {removed
        ? messages.success
        : loading
          ? messages.removing
          : messages.remove}
    </button>
  );
}
