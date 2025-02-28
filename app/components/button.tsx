import clsx from "clsx";

interface ButtonProps {
  variant: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

export default function Button({ variant, children }: ButtonProps) {
  return (
    <a
      className={clsx(
        "px-4 py-2 rounded-md font-semibold transition-all hover:",
        variant === "primary" &&
          "bg-purple text-white cursor-pointer hover:bg-darkPurple",
        variant === "secondary" &&
          "bg-darkGray text-white cursor-pointer hover:bg-black",
        variant === "danger" &&
          "bg-red-600 text-white cursor-pointer hover:bg-red-700"
      )}
    >
      {children}
    </a>
  );
}
