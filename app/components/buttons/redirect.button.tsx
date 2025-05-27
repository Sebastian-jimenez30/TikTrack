"use client";
import { Pathname } from "~/i18n/routing";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { JSX } from "react";
import clsx from "clsx";
import axios from "axios";
import { usePathname } from "next/navigation";

interface RedirectButtonProps {
  variant: "primary" | "secondary" | "danger";
  redirect: Pathname;
  actionUrl: string;
  influencerId?: string;
  value: string;
  messages: {
    success: string;
    error: string;
  };
  httpMethod?: "patch" | "post";
}

export default function RedirectButton({
  variant,
  redirect,
  actionUrl,
  influencerId,
  value,
  messages,
  httpMethod = "patch",
}: RedirectButtonProps): JSX.Element {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const handleClick = async () => {
    try {
      let response;
      if (httpMethod === "post") {
        response = await axios.post(actionUrl, { influencerId });
      } else {
        response = await axios.patch(actionUrl, { influencerId });
      }
      const result = response.data.pageData ?? response.data;

      if (result.isSuccess || result.success) {
        sessionStorage.setItem("notification", messages.success);
        sessionStorage.setItem("notificationType", "success");
        router.push(`/${locale}${redirect}`);
      } else {
        sessionStorage.setItem("notification", messages.error);
        sessionStorage.setItem("notificationType", "error");
        router.push(pathname);
      }
    } catch {
      sessionStorage.setItem("notification", messages.error);
      sessionStorage.setItem("notificationType", "error");
      router.push(pathname);
    }
  };

  return (
    <button
      onClick={handleClick}
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
      {value}
    </button>
  );
}
