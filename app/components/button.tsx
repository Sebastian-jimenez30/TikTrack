import clsx from "clsx";
import { JSX } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "danger";
  href: string;
  children: React.ReactNode;
}

export default function Button({
  variant,
  href,
  children,
}: ButtonProps): JSX.Element {
  return (
    <a
      className={clsx(
        "px-4 py-2 rounded-md font-semibold transition-all hover:",
        variant === "primary" &&
          "bg-purple text-white cursor-pointer hover:bg-darkPurple",
        variant === "secondary" &&
          "bg-darkGrey text-white cursor-pointer hover:bg-black",
        variant === "danger" &&
          "bg-red-600 text-white cursor-pointer hover:bg-red-700"
      )}
      href={href}
    >
      {children}
    </a>
  );
}
