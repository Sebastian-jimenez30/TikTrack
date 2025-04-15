import { JSX } from "react";
import ErrorIcon from "~/app/components/icons/error.icon";

interface ErrorCardProps {
  message: string;
}

export default function ErrorCard({ message }: ErrorCardProps): JSX.Element {
  return (
    <div className="w-full max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow">
      <div className="flex items-start space-x-2">
        <ErrorIcon></ErrorIcon>
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
