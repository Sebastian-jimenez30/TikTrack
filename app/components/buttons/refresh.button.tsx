"use client";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import RefreshIcon from "~/app/components/icons/refresh.icon";

interface FavoritesButtonProps {
  actionUrl: string;
  influencerUsername: string;
  messages: {
    success: string;
    error: string;
  };
}

export default function FavoritesButton({
  actionUrl,
  influencerUsername,
  messages,
}: FavoritesButtonProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(actionUrl, { influencerUsername });
      const result = response.data.pageData ?? response.data;
      if (result.isSuccess) {
        toast.success(messages.success);
        router.refresh();
      } else {
        toast.error(messages.error);
        router.push(pathname);
      }
    } catch {
      toast.error(messages.error);
      router.push(pathname);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="p-2 rounded-full transition-all hover:scale-110 text-purple cursor-pointer"
    >
      <RefreshIcon
        className={clsx("w-6 h-6 fill-purple", loading && "animate-spin")}
      />
    </button>
  );
}
