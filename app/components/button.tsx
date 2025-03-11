import clsx from "clsx";
import { JSX } from "react";
import { Link } from "~/i18n/routing";

interface ButtonProps {
  variant: "primary" | "secondary" | "danger";
  href: "/" | "/influencers" | "/sign-in" | "/sign-up" | { pathname: "/"; } | { pathname: "/influencers"; } | { pathname: "/sign-in"; } | { pathname: "/sign-up"; };
  children: React.ReactNode;
}

export default function Button({
  variant,
  href,
  children,
}: ButtonProps): JSX.Element {
  return (
    <Link
      href={href} 
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
      {children}
    </Link>
  );
}