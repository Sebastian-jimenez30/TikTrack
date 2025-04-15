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
  value: string;
}

export default function RedirectButton({
  variant,
  redirect,
  actionUrl,
  value,
}: RedirectButtonProps): JSX.Element {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const handleClick = async () => {
    const result = (await axios.patch(`${actionUrl}`)).data.pageData;

    if (result.isSuccess) {
      router.push(`/${locale}${redirect}`);
    } else {
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
