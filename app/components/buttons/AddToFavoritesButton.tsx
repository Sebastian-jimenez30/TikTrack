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

interface AddToFavoritesButtonProps {
  variant: "primary" | "secondary" | "danger";
  redirect: Pathname;
  actionUrl: string;
  influencerId: string;
  messages: {
    success: string;
    error: string;
    alreadyFavorite: string;
    adding: string;
    add: string;
  };
  httpMethod?: "patch" | "post";
  isFavorite?: boolean;
  onSuccess?: () => void;
}

export default function AddToFavoritesButton({
  variant,
  redirect,
  actionUrl,
  influencerId,
  messages,
  httpMethod = "post",
  isFavorite = false,
  onSuccess,
}: AddToFavoritesButtonProps): JSX.Element {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const [liked, setLiked] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      let response;
      if (httpMethod === "post") {
        response = await axios.post(actionUrl, { influencerId });
      } else {
        response = await axios.patch(actionUrl, { influencerId });
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
      disabled={liked || loading}
      className={clsx(
        "p-2 rounded-full transition-all hover:scale-110",
        liked
          ? "bg-purple/10 text-purple"
          : "bg-gray-100 text-gray-400 hover:text-purple"
      )}
      aria-label={liked ? messages.alreadyFavorite : messages.add}
      title={liked ? messages.alreadyFavorite : messages.add}
    >
      <FontAwesomeIcon
        icon={liked ? solidHeart : regularHeart}
        className={clsx(
          "text-2xl text-gray-400"
        )}
        spin={loading}
      />
    </button>
  );
}