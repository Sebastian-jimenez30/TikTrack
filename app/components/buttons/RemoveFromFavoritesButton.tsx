"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { JSX, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { Pathname } from "~/i18n/routing";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

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
  isFavorite?: boolean;
  onSuccess?: () => void;
}

export default function RemoveFromFavoritesButton({
  variant,
  redirect,
  actionUrl,
  influencerId,
  messages,
  httpMethod = "delete",
  isFavorite = false,
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
        router.refresh();
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
      disabled={loading}
      className={clsx(
        "p-2 rounded-full transition-all hover:scale-110 bg-purple/10 text-purple"
      )}
      aria-label={removed ? messages.success : messages.remove}
      title={removed ? messages.success : messages.remove}
    >
      <FontAwesomeIcon
        icon={solidHeart}
        className={clsx("text-2xl text-purple")}
        spin={loading}
      />
    </button>
  );
}
