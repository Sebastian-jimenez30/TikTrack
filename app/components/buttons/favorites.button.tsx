"use client";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import { usePathname } from "next/navigation";
import HeartIcon from "~/app/components/icons/heart.icon";
import { toast } from "sonner";

interface FavoritesButtonProps {
  actionUrl: string;
  userId: number;
  influencerId: string;
  messages: {
    success: string;
    error: string;
    alreadyFavorite: string;
    adding: string;
    add: string;
  };
  isFavorite: boolean;
}

export default function FavoritesButton({
  actionUrl,
  userId,
  influencerId,
  messages,
  isFavorite,
}: FavoritesButtonProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [liked, setLiked] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      let response;
      if (liked) {
        response = await axios.delete(actionUrl, {
          data: { userId, influencerId },
        });
      } else {
        response = await axios.post(actionUrl, { userId, influencerId });
      }
      const result = response.data.pageData ?? response.data;
      if (result.isSuccess) {
        if (liked) {
          setLiked(false);
          toast.success(messages.success);
          router.refresh();
        } else {
          setLiked(true);
          toast.success(messages.success);
          router.refresh();
        }
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
      className={clsx(
        "p-2 rounded-full transition-all hover:scale-110",
        liked ? "text-purple cursor-pointer" : "text-gray-400 hover:text-purple"
      )}
      aria-label={liked ? messages.alreadyFavorite : messages.add}
      title={liked ? messages.alreadyFavorite : messages.add}
    >
      <HeartIcon
        className={clsx(
          "w-6 h-6",
          liked ? "fill-purple" : "fill-gray-400 hover:fill-purple",
          loading && "animate-spin"
        )}
      />
    </button>
  );
}
