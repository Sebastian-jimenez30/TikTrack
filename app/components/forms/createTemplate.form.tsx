"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import axios from "axios";
import ROUTES_API from "~/constants/urls/api.urls";
import { toast } from "sonner";

interface CreateMessageProps {
  userId: string;
}

export default function CreateMessage({ userId }: CreateMessageProps) {
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Forms.message");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    startTransition(async () => {
      const result = await axios.post(ROUTES_API.MESSAGE_CREATE, {
        content: message,
        user_id: Number(userId),
      });
      if (result.status === 200) {
        setMessage("");
        toast.success(t("success"));
        window.location.reload();
      } else {
        toast.error(t("error"));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 w-full text-center">
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("placeholder")}
          className="border p-3 rounded w-full mb-2 text-sm md:text-xl border-purple"
          disabled={isPending}
        />
        <button
          type="submit"
          className="mt-4 bg-purple text-white font-bold transition-all px-4 py-2 rounded hover:bg-darkPurple"
          disabled={isPending || !message.trim()}
        >
          {t("saveTemplate")}
        </button>
      </div>
    </form>
  );
}
